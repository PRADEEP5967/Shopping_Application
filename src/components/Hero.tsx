
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="hero-gradient text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
              Next-Generation Shopping Experience
            </h1>
            <p className="mt-4 text-lg md:text-xl opacity-90 max-w-lg animate-fade-in">
              Discover premium products with lightning-fast delivery and exceptional customer service.
            </p>
            <div className="mt-8 flex space-x-4 animate-fade-in">
              <Link to="/products">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end animate-scale-in">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop" 
                alt="Premium Headphones" 
                className="w-full max-w-md rounded-lg shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
