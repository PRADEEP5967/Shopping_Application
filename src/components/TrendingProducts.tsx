
import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface TrendingProductsProps {
  products: Product[];
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [productsPerView, setProductsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProductsPerView(1);
      } else if (window.innerWidth < 768) {
        setProductsPerView(2);
      } else if (window.innerWidth < 1024) {
        setProductsPerView(3);
      } else {
        setProductsPerView(4);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    updateVisibleProducts();
  }, [currentIndex, productsPerView, products]);

  const updateVisibleProducts = () => {
    const endIndex = currentIndex + productsPerView;
    const visibleItems = [];
    
    for (let i = currentIndex; i < endIndex; i++) {
      const index = i % products.length;
      visibleItems.push(products[index]);
    }
    
    setVisibleProducts(visibleItems);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Now</h2>
            <p className="mt-2 text-gray-600">Top trending products this week</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button 
              onClick={prevSlide}
              aria-label="Previous" 
              className="rounded-full w-10 h-10 bg-white shadow flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              aria-label="Next" 
              className="rounded-full w-10 h-10 bg-white shadow flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product, index) => (
            <ProductCard 
              key={`${product.id}-${index}`} 
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
