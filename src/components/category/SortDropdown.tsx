
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
  const getSortLabel = (option: string) => {
    switch (option) {
      case 'featured': return 'Featured';
      case 'price-asc': return 'Price: Low to High';
      case 'price-desc': return 'Price: High to Low';
      case 'rating': return 'Highest Rated';
      case 'newest': return 'Newest First';
      case 'name-asc': return 'Name: A-Z';
      case 'name-desc': return 'Name: Z-A';
      case 'popular': return 'Most Popular';
      default: return 'Featured';
    }
  };

  return (
    <div className="flex items-center">
      <span className="text-gray-700 mr-2 text-sm">Sort:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center min-w-[140px] justify-between">
            <span className="truncate">{getSortLabel(sortOption)}</span>
            <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
            <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="popular">Most Popular</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="newest">Newest First</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price-asc">Price: Low to High</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price-desc">Price: High to Low</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rating">Highest Rated</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name-asc">Name: A-Z</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name-desc">Name: Z-A</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortDropdown;
