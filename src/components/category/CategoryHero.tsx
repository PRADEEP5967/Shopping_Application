
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Grid3X3 } from 'lucide-react';

const CategoryHero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 animate-fade-in">
            <Grid3X3 className="w-3 h-3 mr-1" />
            All Categories
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
            Shop by Category
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Discover our complete range of products across different categories. Find exactly what you're looking for with ease.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
