
import React from 'react';
import { Grid3X3, Sparkles, TrendingUp } from 'lucide-react';

interface CategorySectionHeaderProps {
  trendingCount: number;
}

const CategorySectionHeader: React.FC<CategorySectionHeaderProps> = ({ trendingCount }) => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <Grid3X3 className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Shop by Category
        </h2>
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white animate-pulse" />
        </div>
      </div>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
        Discover amazing products across all categories with exclusive deals and premium quality
      </p>
      
      {/* Trending indicator */}
      <div className="flex items-center justify-center space-x-2 mb-8">
        <TrendingUp className="h-5 w-5 text-orange-500" />
        <span className="text-sm font-medium text-orange-600">
          {trendingCount} Trending Categories This Week
        </span>
      </div>
    </div>
  );
};

export default CategorySectionHeader;
