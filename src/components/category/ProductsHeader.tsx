
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-lg shadow-sm gap-3 sm:gap-4">
      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <MobileFilterSheet 
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
          brands={brands}
          selectedBrands={selectedBrands}
          handleBrandToggle={handleBrandToggle}
          selectedRating={selectedRating}
          handleRatingChange={handleRatingChange}
        />
        <p className="text-xs sm:text-sm text-gray-600 hidden md:block">
          Showing {filteredProductsCount} of {totalProductsCount} products
        </p>
        <p className="text-xs text-gray-600 md:hidden">
          {filteredProductsCount} of {totalProductsCount}
        </p>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {/* View Mode Toggle */}
        <div className="flex items-center border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="px-2 sm:px-3 h-8 sm:h-9"
          >
            <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="px-2 sm:px-3 h-8 sm:h-9"
          >
            <List className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
        
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      </div>
    </div>
  );
};

export default ProductsHeader;
