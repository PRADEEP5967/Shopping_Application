
import React from 'react';
import { Button } from '@/components/ui/button';
import { Package, SearchX } from 'lucide-react';

interface NoProductsFoundProps {
  onClearFilters: () => void;
}

const NoProductsFound: React.FC<NoProductsFoundProps> = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-purple-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-purple-100 to-indigo-100 p-10 rounded-full mb-6 shadow-md border border-purple-200">
          <SearchX className="h-24 w-24 text-indigo-500" strokeWidth={1.5} />
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">No products found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        We couldn't find any products matching your current filters. Try adjusting your search or browse our other categories.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onClearFilters}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          size="lg"
        >
          <Package className="mr-2 h-5 w-5" />
          Clear Filters
        </Button>
      </div>
      <div className="mt-8 text-gray-500 text-sm flex items-center gap-2">
        <span className="w-12 h-px bg-gray-200"></span>
        Or try using different search terms
        <span className="w-12 h-px bg-gray-200"></span>
      </div>
    </div>
  );
};

export default NoProductsFound;
