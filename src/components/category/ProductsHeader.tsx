
import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import MobileFilterSheet from './MobileFilterSheet';
import SortDropdown from './SortDropdown';

interface ProductsHeaderProps {
  filteredProductsCount: number;
  totalProductsCount: number;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  priceRange: number[];
  handlePriceChange: (value: number[]) => void;
  brands: string[];
  selectedBrands: string[];
  handleBrandToggle: (brand: string) => void;
  selectedRating: number;
  handleRatingChange: (rating: number) => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  filteredProductsCount,
  totalProductsCount,
  viewMode,
  setViewMode,
  sortOption,
  setSortOption,
  priceRange,
  handlePriceChange,
  brands,
  selectedBrands,
  handleBrandToggle,
  selectedRating,
  handleRatingChange,
}) => {
  return (
    <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <MobileFilterSheet 
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
          brands={brands}
          selectedBrands={selectedBrands}
          handleBrandToggle={handleBrandToggle}
          selectedRating={selectedRating}
          handleRatingChange={handleRatingChange}
        />
        <p className="text-sm text-gray-600 hidden md:block">
          Showing {filteredProductsCount} of {totalProductsCount} products
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        {/* View Mode Toggle */}
        <div className="flex items-center border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="px-2"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="px-2"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      </div>
    </div>
  );
};

export default ProductsHeader;
