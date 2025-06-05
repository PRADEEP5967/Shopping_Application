
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';
import { useReviews } from '@/contexts/ReviewsContext';
import { cn } from '@/lib/utils';

interface ReviewStatsProps {
  productId: string;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({ productId }) => {
  const { getProductStats } = useReviews();
  const stats = getProductStats(productId);

  if (stats.totalReviews === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Customer Reviews
          <span className="text-sm font-normal text-gray-600">
            ({stats.totalReviews} reviews)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "w-4 h-4",
                    star <= Math.round(stats.averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">out of 5</div>
          </div>
          
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2 mb-1">
                <span className="text-sm w-8">{rating}</span>
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <Progress
                  value={(stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] / stats.totalReviews) * 100}
                  className="flex-1 h-2"
                />
                <span className="text-xs text-gray-600 w-8">
                  {stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewStats;
