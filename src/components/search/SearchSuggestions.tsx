
import React from 'react';
import { Search, Star } from 'lucide-react';
import { Product } from '@/types';

interface SearchSuggestionsProps {
  suggestions: Product[];
  onProductClick: (product: Product) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, onProductClick }) => {
  if (suggestions.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <Search className="h-4 w-4" />
        Products
      </h3>
      <div className="space-y-2">
        {suggestions.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductClick(product)}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
          >
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-10 h-10 object-cover rounded-md"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate group-hover:text-primary">
                {product.name}
              </p>
              <p className="text-xs text-gray-500">${product.price}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-500">{product.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
