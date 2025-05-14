
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    addItem(product, 1);
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    toggleWishlist(product);
  };

  // Ensure product has all required fields
  const productImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://placehold.co/300x300?text=No+Image';

  return (
    <Link 
      to={`/product/${product.id}`} 
      className={cn(
        "product-card group block relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="product-image-container aspect-square relative">
        <img 
          src={productImage} 
          alt={product.name}
          className="product-image w-full h-full object-cover"
        />
        
        {/* Wishlist button */}
        <button 
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center z-10 hover:bg-white transition-colors"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={cn(
              "h-5 w-5 transition-colors", 
              inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
            )} 
          />
        </button>
        
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <p className="text-white font-medium text-lg">Out of Stock</p>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
          
          {/* Ratings */}
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
          </div>
        </div>
        
        {/* Add to cart button */}
        <Button 
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full mt-2"
          size="sm"
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
