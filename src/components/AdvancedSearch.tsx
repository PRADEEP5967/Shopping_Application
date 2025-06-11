
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { getAllProducts } from '@/data/products';
import { Product } from '@/types';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Import the new smaller components
import SearchInput from '@/components/search/SearchInput';
import SearchSuggestions from '@/components/search/SearchSuggestions';
import RecentSearches from '@/components/search/RecentSearches';
import TrendingSearches from '@/components/search/TrendingSearches';
import AdvancedFilterButton from '@/components/search/AdvancedFilterButton';

interface AdvancedSearchProps {
  onClose?: () => void;
  className?: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onClose, className }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches] = useState(['Wireless headphones', 'Gaming mouse', 'Smart watch', 'Running shoes']);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const products = getAllProducts();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
      setQuery('');
      setIsOpen(false);
      onClose?.();
    }
  };

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
    setQuery('');
    setIsOpen(false);
    onClose?.();
  };

  const handleFilterClick = () => {
    navigate('/products');
    onClose?.();
  };

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-2xl", className)}>
      <SearchInput
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        onFocus={() => setIsOpen(true)}
      />

      {/* Search Suggestions Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <div className="p-4 space-y-4">
            {/* Product Suggestions */}
            <SearchSuggestions 
              suggestions={suggestions} 
              onProductClick={handleProductClick} 
            />

            {/* Recent Searches */}
            {recentSearches.length > 0 && query.length < 2 && (
              <RecentSearches 
                recentSearches={recentSearches} 
                onSearchClick={handleSearch} 
              />
            )}

            {/* Trending Searches */}
            {query.length < 2 && (
              <TrendingSearches 
                trendingSearches={trendingSearches} 
                onSearchClick={handleSearch} 
              />
            )}

            {/* Advanced Filter Button */}
            <AdvancedFilterButton onFilterClick={handleFilterClick} />
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdvancedSearch;
