
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ModernProductCard from '@/components/ModernProductCard';
import { Product } from '@/types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedProductsSectionProps {
  featuredProducts: Product[];
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({ featuredProducts }) => {
  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full mb-3 sm:mb-4">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            <span className="text-primary font-medium text-sm sm:text-base">Handpicked for You</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Discover our most popular products, carefully selected by our team to bring you the best shopping experience.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ModernProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <Link to="/products">
            <Button size="lg" className="group hover:scale-105 transition-all duration-200 text-sm sm:text-base px-6 sm:px-8">
              View All Products 
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
