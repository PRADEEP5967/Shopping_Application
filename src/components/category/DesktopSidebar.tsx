
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface DesktopSidebarProps {
  priceRange: number[];
  handlePriceChange: (value: number[]) => void;
  brands: string[];
  selectedBrands: string[];
  handleBrandToggle: (brand: string) => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  priceRange,
  handlePriceChange,
  brands,
  selectedBrands,
  handleBrandToggle
}) => {
  return (
    <div className="hidden md:block w-64 flex-shrink-0">
      <div className="sticky top-28 space-y-6">
        <div>
          <h3 className="font-medium text-lg mb-3">Price Range</h3>
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
          <h3 className="font-medium text-lg mb-3">Brands</h3>
          <div className="space-y-2">
            {brands.map(brand => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox 
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandToggle(brand)}
                />
                <label 
                  htmlFor={`brand-${brand}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
