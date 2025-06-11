
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (query: string) => void;
  onFocus: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery, onSearch, onFocus }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
      <Input
        type="text"
        placeholder="Search products, brands, categories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
        className="pl-10 pr-12 h-12 text-base border-2 border-gray-200 focus:border-primary rounded-xl transition-all duration-200"
        onFocus={onFocus}
      />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setQuery('')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
