
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, Filter, X } from 'lucide-react';

interface ModernCategoryFiltersProps {
  priceRange: number[];
  onPriceChange: (value: number[]) => void;
  brands: string[];
  selectedBrands: string[];
  onBrandToggle: (brand: string) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  activeFiltersCount: number;
  onClearFilters: () => void;
}

const ModernCategoryFilters: React.FC<ModernCategoryFiltersProps> = ({
  priceRange,
  onPriceChange,
  brands,
  selectedBrands,
  onBrandToggle,
  selectedRating,
  onRatingChange,
  activeFiltersCount,
  onClearFilters,
}) => {
  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{activeFiltersCount} active</Badge>
                <Button variant="ghost" size="sm" onClick={onClearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={onPriceChange}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRating === rating}
                onCheckedChange={() => onRatingChange(rating === selectedRating ? 0 : rating)}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="flex items-center space-x-1 text-sm cursor-pointer"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span>& up</span>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Brands</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => onBrandToggle(brand)}
                />
                <label
                  htmlFor={`brand-${brand}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {brand}
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModernCategoryFilters;
