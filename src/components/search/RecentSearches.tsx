
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface RecentSearchesProps {
  recentSearches: string[];
  onSearchClick: (search: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ recentSearches, onSearchClick }) => {
  if (recentSearches.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Searches</h3>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((search, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
            onClick={() => onSearchClick(search)}
          >
            {search}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
