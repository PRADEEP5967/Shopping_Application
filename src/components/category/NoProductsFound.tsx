
import React from 'react';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

interface NoProductsFoundProps {
  onClearFilters: () => void;
}

const NoProductsFound: React.FC<NoProductsFoundProps> = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <Package className="h-16 w-16 text-primary animate-pulse" strokeWidth={1.5} />
      </div>
      <p className="text-2xl font-semibold mb-2">No products found</p>
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn't find any products matching your current filters. Try adjusting your search criteria.
      </p>
      <Button 
        onClick={onClearFilters}
        className="hover-lift"
        size="lg"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default NoProductsFound;
