
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProductCategories } from '@/data/products';
import { categoryDetails, slugify } from '@/components/category/categoryData';

export const FeaturedCategoriesSection: React.FC = () => {
  const categoryNames = getProductCategories().slice(0, 6); // Show top 6 categories
  
  const featuredCategories = categoryNames.map(name => {
    const details = categoryDetails[name] || categoryDetails.default;
    return {
      name,
      icon: details.icon,
      image: details.image,
      link: `/category/${slugify(name)}`,
      badge: details.badge,
      trending: details.trending,
      description: details.description,
    };
  });

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium">Top Categories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Featured Categories
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our most popular product categories with the best deals and latest arrivals
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {featuredCategories.map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {category.trending && (
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                    Trending
                  </Badge>
                )}
              </div>
              <div className="p-3 sm:p-4 text-center">
                <div className="flex justify-center mb-2">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                  {category.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Link to="/categories">
            <Button size="lg" className="group">
              View All Categories
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
