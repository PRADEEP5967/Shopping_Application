
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp } from 'lucide-react';
import { useReviews } from '@/contexts/ReviewsContext';
import { Review } from '@/types/reviews';
import { cn } from '@/lib/utils';

interface ReviewsListProps {
  productId: string;
}

const ReviewItem: React.FC<{ review: Review; onMarkHelpful: (id: string) => void }> = ({ 
  review, 
  onMarkHelpful 
}) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "w-4 h-4",
                      star <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              {review.verified && (
                <Badge variant="outline" className="text-xs">
                  Verified Purchase
                </Badge>
              )}
            </div>
            <h4 className="font-semibold">{review.title}</h4>
            <p className="text-sm text-gray-600">
              By {review.userName} • {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{review.comment}</p>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkHelpful(review.id)}
            className="text-gray-600 hover:text-gray-800"
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            Helpful ({review.helpful})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ReviewsList: React.FC<ReviewsListProps> = ({ productId }) => {
  const { getProductReviews, markHelpful } = useReviews();
  const reviews = getProductReviews(productId);

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div>
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          onMarkHelpful={markHelpful}
        />
      ))}
    </div>
  );
};

export default ReviewsList;
