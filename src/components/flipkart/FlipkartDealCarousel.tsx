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
  bgColor = 'bg-gradient-to-r from-purple-600 to-blue-600',
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
    <section className={`${bgColor} py-4 sm:py-6`}>
      <div className="container mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
          </div>
          <button className="text-white/80 hover:text-white font-semibold text-sm">
            View All →
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg -ml-2 sm:-ml-4"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
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
                className="min-w-[140px] sm:min-w-[180px] bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                {/* Image */}
                <div className="relative aspect-square p-3 bg-gray-50">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold">
                    {deal.discount}% OFF
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-2 sm:p-3">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                    {deal.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      ${deal.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                      ${deal.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center bg-green-600 text-white text-[10px] px-1 py-0.5 rounded">
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
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg -mr-2 sm:-mr-4"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlipkartDealCarousel;
