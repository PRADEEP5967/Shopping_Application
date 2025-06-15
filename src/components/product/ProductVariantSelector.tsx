
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductVariant } from '@/types';

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantSelect: (variant: ProductVariant) => void;
}

const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  variants,
  selectedVariant,
  onVariantSelect
}) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Available Options</h3>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <Button
            key={variant.id}
            variant={selectedVariant?.id === variant.id ? "default" : "outline"}
            onClick={() => onVariantSelect(variant)}
            className="relative"
            disabled={!variant.inStock}
          >
            {variant.name}
            {!variant.inStock && (
              <Badge className="absolute -top-2 -right-2 text-xs bg-red-500">
                Out of Stock
              </Badge>
            )}
          </Button>
        ))}
      </div>
      {selectedVariant && (
        <div className="text-sm text-gray-600">
          Selected: {selectedVariant.name} - ${selectedVariant.price}
          {!selectedVariant.inStock && (
            <span className="text-red-500 ml-2">(Out of Stock)</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductVariantSelector;
