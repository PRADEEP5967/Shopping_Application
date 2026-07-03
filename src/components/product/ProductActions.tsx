
import React from 'react';
import { ShoppingCart, Heart, Plus, Minus, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleBuyNow = () => {
    onAddToCart();
    navigate('/checkout');
  };

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
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={onAddToCart}
          disabled={!isInStock}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </Button>
        <Button
          size="lg"
          onClick={handleBuyNow}
          disabled={!isInStock}
          className="bg-primary hover:bg-primary/90 shadow-[0_0_24px_hsl(var(--primary)/0.35)]"
        >
          <Zap className="h-5 w-5 mr-2" />
          Buy Now
        </Button>
      </div>
      <Button
        variant={isProductInWishlist ? 'default' : 'outline'}
        size="lg"
        onClick={onWishlistToggle}
        className="w-full"
      >
        <Heart className={`h-5 w-5 mr-2 ${isProductInWishlist ? 'fill-current' : ''}`} />
        {isProductInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </Button>
    </div>
  );
};

export default ProductActions;
