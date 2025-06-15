
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getProductCategories } from '@/data/products';
import { categoryDetails, slugify } from './category/categoryData';
import CategorySectionHeader from './category/CategorySectionHeader';
import CategoryCard from './category/CategoryCard';

const ModernCategoryNav = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const categoryNames = getProductCategories();
  
  const categories = categoryNames.map(name => {
    const details = categoryDetails[name] || categoryDetails.default;
    return {
      id: name,
      name,
      icon: details.icon,
      image: details.image,
      link: `/category/${slugify(name)}`,
      badge: details.badge,
      color: details.color,
      trending: details.trending,
      description: details.description
    };
  });

  const trendingCount = categories.filter(c => c.trending).length;

  return (
    <div className="bg-white py-12 border-t border-gray-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <CategorySectionHeader trendingCount={trendingCount} />

        {/* Enhanced Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              isHovered={hoveredIndex === index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Link to="/categories" className="flex items-center">
              <span>View All Categories</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModernCategoryNav;
