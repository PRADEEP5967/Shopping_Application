
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface QuickFiltersBarProps {
  quickFilters: {
    inStock: boolean;
    onSale: boolean;
    highRated: boolean;
  };
  handleQuickFilter: (filterType: keyof typeof quickFilters) => void;
  activeFiltersCount: number;
  clearFilters: () => void;
}

const QuickFiltersBar: React.FC<QuickFiltersBarProps> = ({
  quickFilters,
  handleQuickFilter,
  activeFiltersCount,
  clearFilters,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-white rounded-lg shadow-sm">
      <span className="text-sm font-medium text-gray-700 mr-2">Quick Filters:</span>
      <Button
        variant={quickFilters.inStock ? "default" : "outline"}
        size="sm"
        onClick={() => handleQuickFilter('inStock')}
        className="text-xs"
      >
        In Stock
      </Button>
      <Button
        variant={quickFilters.onSale ? "default" : "outline"}
        size="sm"
        onClick={() => handleQuickFilter('onSale')}
        className="text-xs"
      >
        On Sale
      </Button>
      <Button
        variant={quickFilters.highRated ? "default" : "outline"}
        size="sm"
        onClick={() => handleQuickFilter('highRated')}
        className="text-xs"
      >
        4+ Stars
      </Button>
      {activeFiltersCount > 0 && (
        <Badge variant="secondary" className="ml-2">
          {activeFiltersCount} active
        </Badge>
      )}
      {activeFiltersCount > 0 && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
          <X className="h-3 w-3 mr-1" />
          Clear All
        </Button>
      )}
    </div>
  );
};

export default QuickFiltersBar;
