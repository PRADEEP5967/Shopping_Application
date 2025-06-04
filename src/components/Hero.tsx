
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

const heroSlides = [
  {
    title: "Premium Tech Collection 2025",
    description: "Discover cutting-edge technology with lightning-fast delivery and world-class customer support.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2070&auto=format&fit=crop",
    color: "from-blue-600 via-purple-600 to-indigo-700",
    accent: "text-blue-300"
  },
  {
    title: "Fashion Forward Collection",
    description: "Elevate your style with our curated selection of premium fashion essentials and trending pieces.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    color: "from-purple-600 via-pink-600 to-rose-600",
    accent: "text-purple-300"
  },
  {
    title: "Smart Living Solutions",
    description: "Transform your lifestyle with intelligent products designed for the modern home and workplace.",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070&auto=format&fit=crop",
    color: "from-teal-600 via-cyan-600 to-blue-600",
    accent: "text-teal-300"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const slide = heroSlides[currentSlide];
  
  return (
    <div className={`relative min-h-[90vh] bg-gradient-to-br ${slide.color} text-white overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-[60vh]">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            {/* Slide Content */}
            <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className={`h-5 w-5 ${slide.accent}`} />
                <span className={`text-sm font-medium ${slide.accent} uppercase tracking-wider`}>
                  New Collection
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                {slide.title}
              </h1>
              
              <p className="text-lg md:text-xl opacity-90 max-w-lg mb-8 leading-relaxed">
                {slide.description}
              </p>

              {/* Feature Highlights */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm">Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Secure Payment</span>
                </div>
              </div>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link to="/products">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl group">
                  Shop Now 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/deals">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                  Explore Deals
                </Button>
              </Link>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex space-x-3 mt-12">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-white scale-125 shadow-lg' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
            {/* Floating Product Cards */}
            <div className="relative">
              <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="relative w-full max-w-lg">
                  <img 
                    src={slide.image} 
                    alt="Featured Products" 
                    className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  
                  {/* Floating Stats Cards */}
                  <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl animate-float">
                    <div className="text-gray-900 text-center">
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-sm text-gray-600">Happy Customers</div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl animate-float delay-500">
                    <div className="text-gray-900 text-center">
                      <div className="text-2xl font-bold">4.9★</div>
                      <div className="text-sm text-gray-600">Customer Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Geometric Shapes */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
};

export default Hero;
