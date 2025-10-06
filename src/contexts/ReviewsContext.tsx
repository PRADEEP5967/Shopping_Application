
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Review, ProductReviewStats } from '@/types/reviews';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles!reviews_user_id_fkey(
            first_name,
            last_name
          )
        `);

      if (error) throw error;

      if (data) {
        const formattedReviews: Review[] = (data as any[]).map(review => ({
          id: review.id,
          productId: review.product_id,
          userId: review.user_id,
          userName: `${review.profiles?.first_name || ''} ${review.profiles?.last_name || ''}`,
          userEmail: review.profiles?.email || '',
          rating: review.rating,
          title: review.title || '',
          comment: review.comment || '',
          helpful: review.helpful_count,
          verified: review.verified_purchase,
          createdAt: review.created_at,
          updatedAt: review.updated_at,
        }));
        setReviews(formattedReviews);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
      const savedReviews = localStorage.getItem('reviews');
      if (savedReviews) {
        try {
          setReviews(JSON.parse(savedReviews));
        } catch (error) {
          console.error('Failed to parse reviews from localStorage', error);
        }
      }
    }
  };

  // Save reviews to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = async (reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpful'>) => {
    try {
      const { data: session } = await supabase.auth.getSession();

      if (session.session && isAuthenticated) {
        const insertData: any = {
          product_id: reviewData.productId,
          user_id: reviewData.userId,
          rating: reviewData.rating,
          title: reviewData.title,
          comment: reviewData.comment,
          verified_purchase: true,
        };
        const { data, error } = await supabase
          .from('reviews')
          .insert(insertData)
          .select()
          .single();

        if (error) throw error;

        if (data) {
          const reviewResult = data as any;
          const newReview: Review = {
            id: reviewResult.id,
            productId: reviewResult.product_id,
            userId: reviewResult.user_id,
            userName: reviewData.userName,
            userEmail: reviewData.userEmail,
            rating: reviewResult.rating,
            title: reviewResult.title || '',
            comment: reviewResult.comment || '',
            helpful: reviewResult.helpful_count,
            verified: reviewResult.verified_purchase,
            createdAt: reviewResult.created_at,
            updatedAt: reviewResult.updated_at,
          };
          setReviews(prev => [newReview, ...prev]);
          toast.success('Review added successfully!');
          return;
        }
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }

    const newReview: Review = {
      ...reviewData,
      id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      helpful: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setReviews(prev => [newReview, ...prev]);
    localStorage.setItem('reviews', JSON.stringify([newReview, ...reviews]));
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

  const markHelpful = async (reviewId: string) => {
    try {
      const review = reviews.find(r => r.id === reviewId);
      if (!review) return;

      const { error } = await (supabase as any)
        .from('reviews')
        .update({ helpful_count: review.helpful + 1 })
        .eq('id', reviewId);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking review helpful:', error);
    }

    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
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
