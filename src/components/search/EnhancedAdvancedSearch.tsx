
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import SearchInput from './SearchInput';
import IntelligentAutocomplete from './IntelligentAutocomplete';
import AdvancedFilterButton from './AdvancedFilterButton';

interface EnhancedAdvancedSearchProps {
  onClose?: () => void;
  className?: string;
  showVoiceSearch?: boolean;
}

const EnhancedAdvancedSearch: React.FC<EnhancedAdvancedSearchProps> = ({ 
  onClose, 
  className,
  showVoiceSearch = true 
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

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
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 10);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
      setQuery('');
      setIsOpen(false);
      onClose?.();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
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
        showVoiceSearch={showVoiceSearch}
      />

      <IntelligentAutocomplete
        query={query}
        onSuggestionClick={handleSuggestionClick}
        onProductClick={handleProductClick}
        recentSearches={recentSearches}
        isVisible={isOpen}
      />

      {/* Advanced Filter Button (shown when dropdown is open) */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-40">
          <AdvancedFilterButton onFilterClick={handleFilterClick} />
        </div>
      )}
    </div>
  );
};

export default EnhancedAdvancedSearch;
