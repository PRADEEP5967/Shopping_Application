import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const banners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop',
    title: 'Big Billion Days Sale',
    subtitle: 'Up to 80% Off on Electronics',
    gradient: 'from-blue-600 to-purple-600',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
    title: 'Fashion Fest',
    subtitle: 'Min 50% Off on Top Brands',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop',
    title: 'Home Makeover Sale',
    subtitle: 'Furniture & Decor Starting ₹299',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=400&fit=crop',
    title: 'Gadget Deals',
    subtitle: 'Latest Tech at Best Prices',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=400&fit=crop',
    title: 'Book Festival',
    subtitle: 'Bestsellers Starting at ₹99',
    gradient: 'from-indigo-600 to-blue-500',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=400&fit=crop',
    title: 'Pet Paradise Sale',
    subtitle: 'Everything for Your Furry Friends',
    gradient: 'from-yellow-500 to-amber-500',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&h=400&fit=crop',
    title: 'Beauty Bonanza',
    subtitle: 'Skincare & Makeup Up to 70% Off',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=400&fit=crop',
    title: 'Jewelry Collection',
    subtitle: 'Exclusive Designs at Amazing Prices',
    gradient: 'from-purple-600 to-violet-600',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&h=400&fit=crop',
    title: 'Tool Time Sale',
    subtitle: 'Power Tools & Equipment Deals',
    gradient: 'from-slate-600 to-gray-700',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=1200&h=400&fit=crop',
    title: 'Travel Essentials',
    subtitle: 'Luggage & Accessories from ₹499',
    gradient: 'from-cyan-500 to-blue-500',
  },
];

const FlipkartHeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);

  return (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden bg-gray-100">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-60`} />
            <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-12 md:px-20">
              <h2 className="text-xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
                {banner.title}
              </h2>
              <p className="text-sm sm:text-lg md:text-2xl text-white/90 drop-shadow-md">
                {banner.subtitle}
              </p>
              <Button className="mt-4 bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6">
                Shop Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FlipkartHeroCarousel;
