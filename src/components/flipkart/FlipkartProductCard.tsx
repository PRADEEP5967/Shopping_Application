import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FlipkartProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  badge?: string;
  freeDelivery?: boolean;
}

const FlipkartProductCard: React.FC<FlipkartProductCardProps> = ({
  id,
  name,
  image,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
  badge,
  freeDelivery = true,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-300 group overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square p-4 bg-gray-50">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Discount Badge */}
        {discount && (
          <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1">
            {discount}% OFF
          </Badge>
        )}
        
        {/* Special Badge */}
        {badge && (
          <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-xs">
            {badge}
          </Badge>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
            <span className="font-semibold">{rating}</span>
            <Star className="w-3 h-3 ml-0.5 fill-current" />
          </div>
          <span className="text-gray-500 text-xs">({reviews.toLocaleString()})</span>
        </div>
        
        {/* Name */}
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-gray-800 text-sm sm:text-base line-clamp-2 hover:text-blue-600 transition-colors mb-2">
            {name}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            ₹{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
          {discount && (
            <span className="text-sm font-medium text-green-600">
              {discount}% off
            </span>
          )}
        </div>
        
        {/* Free Delivery */}
        {freeDelivery && (
          <p className="text-xs text-gray-500 mt-2">Free Delivery</p>
        )}
        
        {/* Add to Cart */}
        <Button 
          size="sm" 
          className="w-full mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default FlipkartProductCard;
