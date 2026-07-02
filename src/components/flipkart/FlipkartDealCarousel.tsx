import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface Deal {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
}

interface FlipkartDealCarouselProps {
  title?: string;
  icon?: React.ReactNode;
  bgColor?: string;
  deals?: Deal[];
}

const FlipkartDealCarousel: React.FC<FlipkartDealCarouselProps> = ({
  title = 'Flash Deals',
  icon = <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />,
  bgColor = '',
  deals = [],
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-10 sm:py-14 border-b border-border/40">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 border-b border-border/60 pb-4">
          <div className="flex items-center gap-4">
            <span className="opacity-80">{icon}</span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight uppercase">{title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:block text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground hover:text-primary transition-colors">
              View All
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/80 backdrop-blur border border-border hover:bg-primary hover:border-primary rounded-full p-2.5 -ml-2 sm:-ml-4 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none scroll-smooth px-2"
          >
            {deals.map((deal) => (
              <Link
                key={deal.id}
                to={`/product/${deal.id}`}
                className="min-w-[160px] sm:min-w-[220px] bg-card border border-border rounded-md overflow-hidden hover:border-primary/70 hover:shadow-[0_0_40px_hsl(var(--primary)/0.2)] transition-all group"
              >
                {/* Image */}
                <div className="relative aspect-square p-3 bg-background/40 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                  <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold rounded-none uppercase tracking-widest px-2">
                    {deal.discount}% OFF
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-medium text-foreground line-clamp-2 mb-2">
                    {deal.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm sm:text-base font-bold text-foreground">
                      ${deal.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                      ${deal.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center bg-primary/15 border border-primary/30 text-primary text-[10px] px-1.5 py-0.5 rounded-sm">
                      <span>{deal.rating}</span>
                      <Star className="w-2.5 h-2.5 ml-0.5 fill-current" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/80 backdrop-blur border border-border hover:bg-primary hover:border-primary rounded-full p-2.5 -mr-2 sm:-mr-4 transition-all"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlipkartDealCarousel;
