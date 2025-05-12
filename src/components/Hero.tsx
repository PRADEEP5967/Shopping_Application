
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    title: "Next-Generation Shopping Experience",
    description: "Discover premium products with lightning-fast delivery and exceptional customer service.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    color: "from-blue-600 to-indigo-600"
  },
  {
    title: "Summer Collection 2025",
    description: "Explore the latest fashion trends and styles with our exclusive summer catalog.",
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop",
    color: "from-purple-600 to-fuchsia-600"
  },
  {
    title: "Smart Tech at Smart Prices",
    description: "Upgrade your lifestyle with cutting-edge technology at unbeatable prices.",
    image: "https://images.unsplash.com/photo-1495434942638-2a9601f2cb79?q=80&w=2070&auto=format&fit=crop",
    color: "from-teal-500 to-emerald-500"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const slide = heroSlides[currentSlide];
  
  return (
    <div className={`bg-gradient-to-r ${slide.color} text-white`}>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            {heroSlides.map((slide, index) => (
              <div 
                key={index} 
                className={`transition-all duration-500 ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 absolute translate-y-4'}`}
                style={{ display: currentSlide === index ? 'block' : 'none' }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {slide.title}
                </h1>
                <p className="mt-4 text-lg md:text-xl opacity-90 max-w-lg">
                  {slide.description}
                </p>
              </div>
            ))}
            
            <div className="mt-8 flex space-x-4 animate-fade-in">
              <Link to="/products">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-all">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Browse Categories
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white scale-125' : 'bg-white/40'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end animate-scale-in relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl"></div>
            
            {heroSlides.map((slide, index) => (
              <div 
                key={index} 
                className={`transition-all duration-500 ${currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'}`}
                style={{ display: currentSlide === index ? 'block' : 'none' }}
              >
                <img 
                  src={slide.image} 
                  alt="Featured Product" 
                  className="w-full max-w-md rounded-lg shadow-2xl relative z-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
