
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Star, RotateCcw } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';

export interface MobileFilterValues {
  priceRange: number[];
  selectedBrands: string[];
  selectedRating: number;
}

interface MobileFilterSheetProps {
  priceRange: number[];
  brands: string[];
  selectedBrands: string[];
  selectedRating: number;
  activeFiltersCount?: number;
  onApply: (values: MobileFilterValues) => void;
  onReset: () => void;
}

const DEFAULTS: MobileFilterValues = {
  priceRange: [0, 1000],
  selectedBrands: [],
  selectedRating: 0,
};

const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({
  priceRange,
  brands,
  selectedBrands,
  selectedRating,
  activeFiltersCount = 0,
  onApply,
  onReset,
}) => {
  const [open, setOpen] = useState(false);
  const [pendingPrice, setPendingPrice] = useState<number[]>(priceRange);
  const [pendingBrands, setPendingBrands] = useState<string[]>(selectedBrands);
  const [pendingRating, setPendingRating] = useState<number>(selectedRating);

  // Sync pending state from props whenever the drawer opens
  useEffect(() => {
    if (open) {
      setPendingPrice(priceRange);
      setPendingBrands(selectedBrands);
      setPendingRating(selectedRating);
    }
  }, [open, priceRange, selectedBrands, selectedRating]);

  const togglePendingBrand = (brand: string) => {
    setPendingBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleReset = () => {
    setPendingPrice(DEFAULTS.priceRange);
    setPendingBrands(DEFAULTS.selectedBrands);
    setPendingRating(DEFAULTS.selectedRating);
    onReset();
  };

  const handleApply = () => {
    onApply({
      priceRange: pendingPrice,
      selectedBrands: pendingBrands,
      selectedRating: pendingRating,
    });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden relative flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 h-5 min-w-5 px-1.5 flex items-center justify-center">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col"
      >
        <SheetHeader className="px-5 pt-5 pb-3 border-b">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Refine results, then tap Apply to update the list.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3 text-sm">Price Range</h3>
            <div className="px-1">
              <Slider
                max={1000}
                min={0}
                step={10}
                value={pendingPrice}
                onValueChange={setPendingPrice}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${pendingPrice[0]}</span>
                <span>${pendingPrice[1]}</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-medium mb-3 text-sm">Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((r) => (
                <label
                  key={r}
                  htmlFor={`mobile-rating-${r}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    id={`mobile-rating-${r}`}
                    checked={pendingRating === r}
                    onCheckedChange={() =>
                      setPendingRating(pendingRating === r ? 0 : r)
                    }
                  />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < r ? 'text-yellow-400 fill-current' : 'text-muted-foreground/40'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">& up</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          {brands.length > 0 && (
            <div>
              <h3 className="font-medium mb-3 text-sm">Brands</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mobile-brand-${brand}`}
                      checked={pendingBrands.includes(brand)}
                      onCheckedChange={() => togglePendingBrand(brand)}
                    />
                    <label
                      htmlFor={`mobile-brand-${brand}`}
                      className="text-sm leading-none cursor-pointer flex-1"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="px-5 py-3 border-t bg-background flex-row gap-2 sm:flex-row sm:justify-between sm:space-x-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button type="button" onClick={handleApply} className="flex-1">
            Apply
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterSheet;
