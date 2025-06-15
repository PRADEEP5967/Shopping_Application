
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, Package, TrendingUp } from 'lucide-react';

interface CategoryHeaderProps {
  categoryName: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ categoryName }) => {
  const trendingCategories = ['Electronics', 'Gaming', 'Smart Home', 'Wearables'];
  const isTrending = trendingCategories.includes(categoryName);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 mb-8 overflow-hidden shadow-lg">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] opacity-30" />
      
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={`https://images.unsplash.com/photo-1581591524425-c7e0978865fc?q=80&w=2070&auto=format&fit=crop`}
          alt={categoryName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      </div>
      
      <div className="relative z-10">
        {/* Category badges */}
        <div className="flex items-center space-x-3 mb-4">
          <Badge className="bg-white/90 text-blue-700 border-blue-200 shadow-sm">
            <Package className="w-3 h-3 mr-1" />
            Category
          </Badge>
          {isTrending && (
            <Badge className="bg-orange-500 text-white animate-pulse shadow-sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
          <Badge className="bg-green-500 text-white shadow-sm">
            <Star className="w-3 h-3 mr-1" />
            Premium Quality
          </Badge>
        </div>

        {/* Enhanced title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
          {categoryName}
        </h1>
        
        {/* Enhanced description */}
        <div className="max-w-3xl">
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Explore our premium selection of {categoryName.toLowerCase()} products. 
            From top brands to exclusive deals, find exactly what you're looking for with guaranteed quality and fast delivery.
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>Best Prices</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl" />
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-xl" />
    </div>
  );
};

export default CategoryHeader;
