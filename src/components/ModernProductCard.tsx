
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ModernProductCardProps {
  product: Product;
  className?: string;
  showQuickView?: boolean;
}

const ModernProductCard: React.FC<ModernProductCardProps> = ({ 
  product, 
  className,
  showQuickView = true 
}) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const inWishlist = isInWishlist(product.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("group relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-square">
          {/* Product Image */}
          <div className="relative w-full h-full">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className={cn(
                "w-full h-full object-cover transition-all duration-700",
                imageLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0",
                isHovered && "scale-110"
              )}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Hover overlay with second image */}
            {product.images[1] && (
              <img 
                src={product.images[1]} 
                alt={product.name}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              />
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {!product.inStock && (
              <Badge variant="destructive" className="bg-red-500 text-white">
                Out of Stock
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-green-500 text-white">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className={cn(
            "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          )}>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/90 hover:bg-white shadow-lg"
              onClick={handleToggleWishlist}
            >
              <Heart className={cn(
                "h-4 w-4 transition-colors",
                inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
              )} />
            </Button>
            
            {showQuickView && (
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/90 hover:bg-white shadow-lg"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </Button>
            )}
          </div>

          {/* Quick Add to Cart */}
          <div className={cn(
            "absolute bottom-3 left-3 right-3 transition-all duration-300",
            isHovered && product.inStock ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Button
              onClick={handleAddToCart}
              className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Sold Out</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.round(product.rating || 0) 
                      ? "text-yellow-400 fill-current" 
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviewCount || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <ArrowRight className={cn(
              "h-4 w-4 text-gray-400 transition-all duration-200",
              isHovered ? "text-primary translate-x-1" : ""
            )} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ModernProductCard;
