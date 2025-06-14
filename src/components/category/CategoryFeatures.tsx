
import React from 'react';
import { Grid3X3, Sparkles, Zap } from 'lucide-react';

const CategoryFeatures = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">Why Shop by Category?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Browse our organized categories to find products that match your specific needs and preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Organized Shopping</h3>
            <p className="text-gray-600">Find products easily with our well-organized category structure.</p>
          </div>
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick Discovery</h3>
            <p className="text-gray-600">Discover new products and brands within your favorite categories.</p>
          </div>
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
            <p className="text-gray-600">Every category features hand-picked, high-quality products.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryFeatures;
