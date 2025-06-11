
import React from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { Search } from 'lucide-react';

interface SearchResultsProps {
  query: string;
  results: Product[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="text-center py-12">
        <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Start your search</h3>
        <p className="text-gray-500">Enter keywords to find products</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-500">Try different keywords or browse our categories</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Search Results for "{query}" ({results.length} items)
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
