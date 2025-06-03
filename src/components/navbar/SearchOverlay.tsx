
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface SearchOverlayProps {
  isSearchOpen: boolean;
  toggleSearch: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isSearchOpen, toggleSearch }) => {
  if (!isSearchOpen) return null;

  return (
    <div className="hidden md:block absolute w-full bg-white shadow-md z-30 p-4">
      <div className="container mx-auto flex items-center">
        <Input
          type="search"
          placeholder="Search products..."
          className="w-full"
          autoFocus
        />
        <Button variant="ghost" size="icon" onClick={toggleSearch} className="ml-2">
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SearchOverlay;
