
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TrendingSearchesProps {
  trendingSearches: string[];
  onSearchClick: (search: string) => void;
}

const TrendingSearches: React.FC<TrendingSearchesProps> = ({ trendingSearches, onSearchClick }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <TrendingUp className="h-4 w-4" />
        Trending
      </h3>
      <div className="flex flex-wrap gap-2">
        {trendingSearches.map((search, index) => (
          <Badge
            key={index}
            variant="outline"
            className="cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-colors"
            onClick={() => onSearchClick(search)}
          >
            {search}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TrendingSearches;
