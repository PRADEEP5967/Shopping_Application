
import React from 'react';
import { Button } from '@/components/ui/button';
import { Package, SearchX } from 'lucide-react';

interface NoProductsFoundProps {
  onClearFilters: () => void;
}

const NoProductsFound: React.FC<NoProductsFoundProps> = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-blue-50 p-8 rounded-full mb-6 shadow-sm">
        <SearchX className="h-20 w-20 text-blue-500" strokeWidth={1.5} />
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">No products found</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn't find any products matching your current filters. Try adjusting your search or browse our other categories.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onClearFilters}
          className="hover-lift bg-blue-500 hover:bg-blue-600 transition-all duration-300"
          size="lg"
        >
          <Package className="mr-2 h-5 w-5" />
          Clear Filters
        </Button>
      </div>
      <div className="mt-8 text-gray-400 text-sm">
        Or try using different search terms
      </div>
    </div>
  );
};

export default NoProductsFound;
