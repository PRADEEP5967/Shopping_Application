
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import RatingFilter from '../shared/RatingFilter';
import { Filter, X } from 'lucide-react';

interface DesktopSidebarProps {
  priceRange: number[];
  handlePriceChange: (value: number[]) => void;
  brands: string[];
  selectedBrands: string[];
  handleBrandToggle: (brand: string) => void;
  selectedRating: number;
  handleRatingChange: (rating: number) => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  priceRange,
  handlePriceChange,
  brands,
  selectedBrands,
  handleBrandToggle,
  selectedRating,
  handleRatingChange,
}) => {
  const clearAllFilters = () => {
    handlePriceChange([0, 1000]);
    selectedBrands.forEach(brand => handleBrandToggle(brand));
    handleRatingChange(0);
  };

  const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < 1000 || 
    selectedBrands.length > 0 || selectedRating > 0;

  return (
    <div className="hidden md:block w-64 flex-shrink-0">
      <div className="sticky top-28 space-y-6 bg-white p-6 rounded-lg shadow-sm">
        {/* Filter Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <h3 className="font-medium text-lg">Filters</h3>
          </div>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Price Range */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-base">Price Range</h3>
            {(priceRange[0] > 0 || priceRange[1] < 1000) && (
              <Badge variant="secondary" className="text-xs">
                Active
              </Badge>
            )}
          </div>
          <div className="px-2">
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="mb-6"
            />
            <div className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
              <span className="font-medium">${priceRange[0]}</span>
              <span className="text-gray-500">to</span>
              <span className="font-medium">${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-base">Customer Rating</h3>
            {selectedRating > 0 && (
              <Badge variant="secondary" className="text-xs">
                {selectedRating}+ stars
              </Badge>
            )}
          </div>
          <RatingFilter
            selectedRating={selectedRating}
            onRatingChange={handleRatingChange}
          />
        </div>
        
        {/* Brands */}
        {brands.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-base">Brands</h3>
              {selectedBrands.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {selectedBrands.length} selected
                </Badge>
              )}
            </div>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {brands.map(brand => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <label 
                    htmlFor={`brand-${brand}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="border-t pt-4">
          <h3 className="font-medium text-base mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start text-sm"
              onClick={() => handleRatingChange(4)}
            >
              Show 4+ Star Products
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start text-sm"
              onClick={() => handlePriceChange([0, 100])}
            >
              Under $100
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start text-sm"
              onClick={() => handlePriceChange([100, 500])}
            >
              $100 - $500
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
