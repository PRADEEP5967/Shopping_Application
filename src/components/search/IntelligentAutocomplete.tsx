
import React, { useState, useEffect } from 'react';
import { Search, Clock, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllProducts } from '@/data/products';
import { Product } from '@/types';

interface AutocompleteProps {
  query: string;
  onSuggestionClick: (suggestion: string) => void;
  onProductClick: (product: Product) => void;
  recentSearches: string[];
  isVisible: boolean;
}

const IntelligentAutocomplete: React.FC<AutocompleteProps> = ({
  query,
  onSuggestionClick,
  onProductClick,
  recentSearches,
  isVisible
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const trendingSearches = [
    'wireless headphones',
    'gaming mouse',
    'smart watch',
    'running shoes',
    'laptop bag',
    'phone case'
  ];

  useEffect(() => {
    if (query.length > 0) {
      const allProducts = getAllProducts();
      
      // Generate intelligent suggestions
      const productSuggestions = allProducts
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          (product.brand && product.brand.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5);

      // Extract search suggestions
      const searchSuggestions = Array.from(new Set([
        ...productSuggestions.map(p => p.name),
        ...productSuggestions.map(p => p.category),
        ...productSuggestions.filter(p => p.brand).map(p => p.brand!)
      ])).slice(0, 6);

      // Filter categories
      const relevantCategories = Array.from(new Set(
        allProducts
          .filter(product => 
            product.category.toLowerCase().includes(query.toLowerCase())
          )
          .map(product => product.category)
      )).slice(0, 3);

      setSuggestions(searchSuggestions);
      setProducts(productSuggestions);
      setCategories(relevantCategories);
    } else {
      setSuggestions([]);
      setProducts([]);
      setCategories([]);
    }
  }, [query]);

  if (!isVisible) return null;

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-xl border-0 bg-white/95 backdrop-blur-sm max-h-96 overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Search Suggestions */}
        {suggestions.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Search className="h-4 w-4" />
              Suggestions
            </h3>
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => onSuggestionClick(suggestion)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <Search className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Results */}
        {products.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Products</h3>
            <div className="space-y-2">
              {products.map((product) => (
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
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  onClick={() => onSuggestionClick(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Recent Searches (when no query) */}
        {query.length === 0 && recentSearches.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Searches
            </h3>
            <div className="space-y-1">
              {recentSearches.slice(0, 5).map((search, index) => (
                <div
                  key={index}
                  onClick={() => onSuggestionClick(search)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{search}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending Searches (when no query) */}
        {query.length === 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </h3>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((trend, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  onClick={() => onSuggestionClick(trend)}
                >
                  {trend}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default IntelligentAutocomplete;
