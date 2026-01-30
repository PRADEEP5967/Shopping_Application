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

const flashDeals: Deal[] = [
  {
    id: 'f1',
    name: 'Wireless Earbuds Pro',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
    price: 1999,
    originalPrice: 4999,
    discount: 60,
    rating: 4.3,
  },
  {
    id: 'f2',
    name: 'Smart Fitness Band',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop',
    price: 1499,
    originalPrice: 3999,
    discount: 63,
    rating: 4.2,
  },
  {
    id: 'f3',
    name: 'Portable Bluetooth Speaker',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
    price: 999,
    originalPrice: 2999,
    discount: 67,
    rating: 4.4,
  },
  {
    id: 'f4',
    name: 'Gaming Mouse RGB',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
    price: 799,
    originalPrice: 1999,
    discount: 60,
    rating: 4.5,
  },
  {
    id: 'f5',
    name: 'Mechanical Keyboard',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300&h=300&fit=crop',
    price: 2499,
    originalPrice: 5999,
    discount: 58,
    rating: 4.6,
  },
  {
    id: 'f6',
    name: 'USB-C Power Bank 20000mAh',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop',
    price: 1299,
    originalPrice: 2999,
    discount: 57,
    rating: 4.3,
  },
  {
    id: 'f7',
    name: 'Webcam HD 1080p',
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=300&h=300&fit=crop',
    price: 1999,
    originalPrice: 4499,
    discount: 56,
    rating: 4.1,
  },
  {
    id: 'f8',
    name: 'LED Desk Lamp Smart',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop',
    price: 899,
    originalPrice: 1999,
    discount: 55,
    rating: 4.4,
  },
];

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
  deals = flashDeals,
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
                      ₹{deal.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                      ₹{deal.originalPrice.toLocaleString()}
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
