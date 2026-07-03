import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';

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
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const product = getProductById(id);
    if (product) {
      addItem(product, 1);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const product = getProductById(id);
    if (product) {
      addItem(product, 1);
      navigate('/checkout');
    }
  };

  return (
    <div className="bg-card rounded-md border border-border hover:border-primary/60 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)] transition-all duration-500 group overflow-hidden">
      <div className="relative aspect-square p-4 bg-background/50 overflow-hidden">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        
        {discount && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest rounded-none border-0">
            {discount}% OFF
          </Badge>
        )}
        
        {badge && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground text-[10px] rounded-none uppercase tracking-widest">
            {badge}
          </Badge>
        )}
        
        <button className="absolute bottom-3 right-3 w-9 h-9 bg-card/80 backdrop-blur border border-border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:border-primary">
          <Heart className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
        </button>
      </div>
      
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center bg-primary/15 text-primary text-xs px-2 py-0.5 rounded-sm border border-primary/30">
            <span className="font-semibold">{rating}</span>
            <Star className="w-3 h-3 ml-0.5 fill-current" />
          </div>
          <span className="text-muted-foreground text-xs">({reviews.toLocaleString()})</span>
        </div>
        
        <Link to={`/product/${id}`}>
          <h3 className="font-heading font-semibold text-foreground text-sm sm:text-base line-clamp-2 hover:text-primary transition-colors mb-2">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg sm:text-xl font-bold text-foreground">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          {discount && (
            <span className="text-sm font-medium text-primary">
              {discount}% off
            </span>
          )}
        </div>
        
        {freeDelivery && (
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">Complimentary Delivery</p>
        )}
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            className="border-primary/50 text-foreground hover:bg-primary/10 font-semibold uppercase tracking-widest text-xs rounded-none py-5"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Cart
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold uppercase tracking-widest text-xs rounded-none py-5 shadow-[0_0_24px_hsl(var(--primary)/0.35)]"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlipkartProductCard;
