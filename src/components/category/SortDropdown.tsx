
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SortDropdownProps {
  sortOption: string;
  setSortOption: (option: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortOption, setSortOption }) => {
  return (
    <div className="flex items-center">
      <span className="text-gray-700 mr-2">Sort by:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            {sortOption === 'featured' && 'Featured'}
            {sortOption === 'price-asc' && 'Price: Low to High'}
            {sortOption === 'price-desc' && 'Price: High to Low'}
            {sortOption === 'rating' && 'Highest Rated'}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
            <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price-asc">Price: Low to High</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price-desc">Price: High to Low</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rating">Highest Rated</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortDropdown;
