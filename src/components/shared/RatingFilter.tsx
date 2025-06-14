
import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RatingFilterProps {
  selectedRating: number;
  onRatingChange: (rating: number) => void;
}

const ratings = [4, 3, 2, 1];

const RatingFilter: React.FC<RatingFilterProps> = ({ selectedRating, onRatingChange }) => {
  return (
    <div className="space-y-2">
      {ratings.map(rating => (
        <Button
          key={rating}
          variant={selectedRating === rating ? 'secondary' : 'ghost'}
          className="w-full justify-start text-sm"
          onClick={() => onRatingChange(selectedRating === rating ? 0 : rating)}
        >
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-2 text-sm">& up</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default RatingFilter;
