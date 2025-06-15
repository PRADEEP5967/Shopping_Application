
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Grid3X3, ArrowRight, Sparkles, Star, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryHero = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Enhanced badge */}
          <Badge className="mb-8 bg-white/90 text-blue-700 border-blue-200 shadow-lg px-6 py-2 text-base animate-fade-in backdrop-blur-sm">
            <Grid3X3 className="w-4 h-4 mr-2" />
            All Categories
            <Sparkles className="w-4 h-4 ml-2 text-orange-500" />
          </Badge>
          
          {/* Enhanced title with gradient */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in leading-tight">
            Shop by Category
          </h1>
          
          {/* Enhanced subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Discover our complete range of premium products across different categories. 
            Find exactly what you're looking for with ease and confidence.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto animate-fade-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-3">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                <Sparkles className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">1000+</div>
              <div className="text-gray-600">Products</div>
            </div>
          </div>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group px-8 py-3">
              <Link to="/products" className="flex items-center">
                <span>Browse All Products</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-blue-200 hover:bg-blue-50 px-8 py-3">
              <Link to="/special-offers">
                View Special Offers
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-32 left-1/4 animate-bounce">
        <div className="w-3 h-3 bg-blue-400 rounded-full opacity-60" />
      </div>
      <div className="absolute top-40 right-1/3 animate-bounce" style={{ animationDelay: '1s' }}>
        <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60" />
      </div>
      <div className="absolute bottom-32 left-1/3 animate-bounce" style={{ animationDelay: '2s' }}>
        <div className="w-4 h-4 bg-indigo-400 rounded-full opacity-60" />
      </div>
    </section>
  );
};

export default CategoryHero;
