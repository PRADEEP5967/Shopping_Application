
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Star, Timer, Zap } from 'lucide-react';

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  discount?: string;
  originalPrice?: string;
  salePrice?: string;
  rating?: number;
  timeLeft?: string;
  gradient: string;
}

const slides: CarouselSlide[] = [
  {
    id: '1',
    title: 'Fashion Mega Sale',
    subtitle: 'Up to 80% OFF',
    description: 'Discover the latest trends in fashion with unbeatable prices',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    buttonText: 'Shop Fashion',
    buttonLink: '/category/clothing',
    discount: '80%',
    originalPrice: '₹2,999',
    salePrice: '₹599',
    rating: 4.5,
    gradient: 'from-pink-500 via-purple-600 to-indigo-600'
  },
  {
    id: '2',
    title: 'Electronics Bonanza',
    subtitle: 'Latest Gadgets',
    description: 'Premium electronics with cutting-edge technology',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=1200&auto=format&fit=crop',
    buttonText: 'Explore Tech',
    buttonLink: '/category/electronics',
    discount: '60%',
    originalPrice: '₹49,999',
    salePrice: '₹19,999',
    rating: 4.8,
    timeLeft: '2 days left',
    gradient: 'from-blue-500 via-cyan-600 to-teal-600'
  },
  {
    id: '3',
    title: 'Home & Lifestyle',
    subtitle: 'Transform Your Space',
    description: 'Beautiful home essentials for modern living',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
    buttonText: 'Shop Home',
    buttonLink: '/category/home',
    discount: '50%',
    originalPrice: '₹8,999',
    salePrice: '₹4,499',
    rating: 4.6,
    gradient: 'from-orange-500 via-red-600 to-pink-600'
  }
];

const ModernCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-xl">
      {/* Main Slide */}
      <div className={`relative h-full bg-gradient-to-r ${slide.gradient} flex items-center`}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-6">
            {/* Discount Badge */}
            {slide.discount && (
              <div className="flex items-center space-x-3">
                <Badge className="bg-red-500 text-white px-3 py-1 text-lg font-bold animate-pulse">
                  {slide.discount} OFF
                </Badge>
                {slide.timeLeft && (
                  <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1">
                    <Timer className="h-4 w-4" />
                    <span className="text-sm font-medium">{slide.timeLeft}</span>
                  </div>
                )}
              </div>
            )}

            {/* Title & Subtitle */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-2 animate-fade-in">
                {slide.title}
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-white/90 animate-fade-in delay-100">
                {slide.subtitle}
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-white/80 max-w-md animate-fade-in delay-200">
              {slide.description}
            </p>

            {/* Price & Rating */}
            {slide.salePrice && (
              <div className="flex items-center space-x-4 animate-fade-in delay-300">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-white">{slide.salePrice}</span>
                    <span className="text-lg line-through text-white/60">{slide.originalPrice}</span>
                  </div>
                  {slide.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{slide.rating}</span>
                      <span className="text-sm text-white/60">(2.5k reviews)</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="flex space-x-4 animate-fade-in delay-400">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform"
              >
                <Zap className="mr-2 h-5 w-5" />
                {slide.buttonText}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/50 text-white hover:bg-white/10 px-8 py-3 text-lg backdrop-blur-sm"
              >
                View All Deals
              </Button>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative hidden md:block">
            <div className="relative">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-80 object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg animate-float">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.8★</div>
                  <div className="text-xs text-gray-600">Top Rated</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-3 shadow-lg animate-float delay-500">
                <div className="text-center">
                  <div className="text-sm font-bold">Free Delivery</div>
                  <div className="text-xs">Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm h-12 w-12 rounded-full"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm h-12 w-12 rounded-full"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ModernCarousel;
