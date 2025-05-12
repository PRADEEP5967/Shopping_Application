
import React from 'react';
import { Button } from '@/components/ui/button';

interface NoProductsFoundProps {
  onClearFilters: () => void;
}

const NoProductsFound: React.FC<NoProductsFoundProps> = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-2xl font-semibold mb-2">No products found</p>
      <p className="text-gray-600 mb-6">
        Try changing your filters to find products
      </p>
      <Button onClick={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default NoProductsFound;
