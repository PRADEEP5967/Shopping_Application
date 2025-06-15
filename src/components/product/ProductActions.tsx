
import React from 'react';
import { ShoppingCart, Heart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, ProductVariant } from '@/types';

interface ProductActionsProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  quantity: number;
  isProductInWishlist: boolean;
  isInStock: boolean;
  onAddToCart: () => void;
  onWishlistToggle: () => void;
  onIncrementQuantity: () => void;
  onDecrementQuantity: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  selectedVariant,
  quantity,
  isProductInWishlist,
  isInStock,
  onAddToCart,
  onWishlistToggle,
  onIncrementQuantity,
  onDecrementQuantity
}) => {
  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div>
        <h3 className="font-semibold mb-2">Quantity</h3>
        <div className="flex items-center border rounded-lg w-fit">
          <Button
            variant="ghost"
            size="icon"
            onClick={onDecrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onIncrementQuantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button 
          className="flex-1" 
          size="lg"
          onClick={onAddToCart}
          disabled={!isInStock}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
        <Button 
          variant={isProductInWishlist ? "default" : "outline"}
          size="lg"
          onClick={onWishlistToggle}
        >
          <Heart className={`h-5 w-5 ${isProductInWishlist ? 'fill-current' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;
