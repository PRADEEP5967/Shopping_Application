
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Review, ProductReviewStats } from '@/types/reviews';
import { toast } from 'sonner';

type ReviewsContextType = {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpful'>) => void;
  getProductReviews: (productId: string) => Review[];
  getProductStats: (productId: string) => ProductReviewStats;
  markHelpful: (reviewId: string) => void;
};

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (error) {
        console.error('Failed to parse reviews from localStorage', error);
      }
    }
  }, []);

  // Save reviews to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpful'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      helpful: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setReviews(prev => {
      const updatedReviews = [newReview, ...prev];
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
      return updatedReviews;
    });
    toast.success('Review added successfully!');
  };

  const getProductReviews = (productId: string): Review[] => {
    return reviews.filter(review => review.productId === productId);
  };

  const getProductStats = (productId: string): ProductReviewStats => {
    const productReviews = getProductReviews(productId);
    
    if (productReviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / productReviews.length;

    const ratingDistribution = productReviews.reduce((dist, review) => {
      dist[review.rating as keyof typeof dist]++;
      return dist;
    }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

    return {
      averageRating,
      totalReviews: productReviews.length,
      ratingDistribution
    };
  };

  const markHelpful = (reviewId: string) => {
    setReviews(prev => {
      const updatedReviews = prev.map(review =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      );
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
      return updatedReviews;
    });
  };

  return (
    <ReviewsContext.Provider value={{
      reviews,
      addReview,
      getProductReviews,
      getProductStats,
      markHelpful
    }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};
