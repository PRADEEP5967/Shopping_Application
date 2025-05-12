
import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface TrendingProductsProps {
  products: Product[];
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({ products }) => {
  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Now</h2>
            <p className="mt-2 text-gray-600">Top trending products this week</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button aria-label="Previous" className="rounded-full w-10 h-10 bg-white shadow flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button aria-label="Next" className="rounded-full w-10 h-10 bg-white shadow flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              className="transform transition-all duration-300 hover:-translate-y-2"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
