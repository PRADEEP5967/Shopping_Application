
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import RatingFilter from '../shared/RatingFilter';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface MobileFilterSheetProps {
  priceRange: number[];
  handlePriceChange: (value: number[]) => void;
  brands: string[];
  selectedBrands: string[];
  handleBrandToggle: (brand: string) => void;
  selectedRating: number;
  handleRatingChange: (rating: number) => void;
}

const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({
  priceRange,
  handlePriceChange,
  brands,
  selectedBrands,
  handleBrandToggle,
  selectedRating,
  handleRatingChange,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
          <SheetDescription>
            Narrow down products by applying filters
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {/* Mobile Filter UI */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="px-2">
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex items-center justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Rating</h3>
            <RatingFilter
              selectedRating={selectedRating}
              onRatingChange={handleRatingChange}
            />
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Brands</h3>
            <div className="space-y-2">
              {brands.map(brand => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`mobile-brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <label 
                    htmlFor={`mobile-brand-${brand}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterSheet;
