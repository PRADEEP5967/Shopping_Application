
import React from 'react';
import { Gift, Zap, Sparkles } from 'lucide-react';

export const PromoSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose NextCommerce?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the future of online shopping with our cutting-edge features and exceptional service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Gift className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600 dark:text-gray-400">Free shipping on orders over $50. No minimum purchase required for premium members.</p>
          </div>
          
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600 dark:text-gray-400">Lightning-fast delivery with same-day shipping available in major cities.</p>
          </div>
          
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600 dark:text-gray-400">Carefully curated products from trusted brands with quality guarantee.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
