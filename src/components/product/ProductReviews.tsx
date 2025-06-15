
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp, MessageSquare, User } from 'lucide-react';
import { useReviews } from '@/contexts/ReviewsContext';
import { useAuth } from '@/contexts/AuthContext';
import ReviewStats from '@/components/reviews/ReviewStats';
import ReviewsList from '@/components/reviews/ReviewsList';

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productName }) => {
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { addReview } = useReviews();
  const { user, isAuthenticated } = useAuth();

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) return;

    addReview({
      productId,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      userEmail: user.email,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      verified: true
    });

    setNewReview({ rating: 5, title: '', comment: '' });
    setShowReviewForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <ReviewStats productId={productId} />

      {/* Add Review Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>
        {isAuthenticated ? (
          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            variant="outline"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Write a Review
          </Button>
        ) : (
          <Badge variant="outline">Login to write a review</Badge>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && isAuthenticated && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review for {productName}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className="p-1"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= newReview.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Review Title</label>
                <Input
                  value={newReview.title}
                  onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Summary of your review"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <Textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your thoughts about this product..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">Submit Review</Button>
                <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <ReviewsList productId={productId} />
    </div>
  );
};

export default ProductReviews;
