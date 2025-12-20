import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';
import { Heart, ShoppingCart } from 'lucide-react';

interface ProductCarouselProps {
  products: Product[];
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeVariant?: 'featured' | 'bestseller' | 'new' | 'trending';
  viewAllLink?: string;
  gradient?: string;
}

const CarouselProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
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
    <Link to={`/product/${product.id}`} className="block group">
      <div className="relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discountPercentage > 0 && (
              <Badge className="bg-green-500 text-white text-xs">
                -{discountPercentage}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="destructive" className="text-xs">
                Sold Out
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-md"
              onClick={handleToggleWishlist}
            >
              <Heart className={cn(
                "h-4 w-4",
                inWishlist ? "fill-red-500 text-red-500" : "text-foreground"
              )} />
            </Button>
          </div>

          {/* Add to Cart */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Button
              size="sm"
              className="w-full rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.round(product.rating || 0)
                      ? "text-yellow-400 fill-current"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  title,
  subtitle,
  icon,
  badge,
  badgeVariant = 'featured',
  viewAllLink,
  gradient = 'from-primary/10 to-primary/5',
}) => {
  if (products.length === 0) return null;

  const badgeStyles = {
    featured: 'bg-primary/20 text-primary border-primary/30',
    bestseller: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    new: 'bg-green-500/20 text-green-300 border-green-500/30',
    trending: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  };

  const badgeIcons = {
    featured: <Sparkles className="w-3 h-3 mr-1" />,
    bestseller: <Star className="w-3 h-3 mr-1" />,
    new: <Sparkles className="w-3 h-3 mr-1" />,
    trending: <TrendingUp className="w-3 h-3 mr-1" />,
  };

  return (
    <section className={`py-12 bg-gradient-to-r ${gradient}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4">
            {icon && (
              <div className="p-3 rounded-xl bg-primary/10">
                {icon}
              </div>
            )}
            <div>
              {badge && (
                <Badge className={cn("mb-2", badgeStyles[badgeVariant])}>
                  {badgeIcons[badgeVariant]}
                  {badge}
                </Badge>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
              {subtitle && (
                <p className="text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          {viewAllLink && (
            <Link to={viewAllLink}>
              <Button variant="outline" className="group border-border hover:bg-primary hover:text-primary-foreground hover:border-primary">
                View All
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <CarouselProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation Buttons */}
            <CarouselPrevious className="hidden md:flex -left-4 bg-background/90 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground hover:border-primary" />
            <CarouselNext className="hidden md:flex -right-4 bg-background/90 backdrop-blur-sm border-border hover:bg-primary hover:text-primary-foreground hover:border-primary" />
          </Carousel>

          {/* Mobile scroll indicator */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <ChevronLeft className="w-4 h-4" />
              <span>Swipe to explore</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCarousel;
