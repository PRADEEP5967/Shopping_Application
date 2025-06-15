
import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import ModernProductCard from './ModernProductCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface TrendingProductsProps {
  products: Product[];
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [productsPerView, setProductsPerView] = useState(4);

  // Handle empty products array
  const hasProducts = Array.isArray(products) && products.length > 0;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProductsPerView(2); // Show 2 on mobile
      } else if (window.innerWidth < 768) {
        setProductsPerView(2); // Show 2 on small tablets
      } else if (window.innerWidth < 1024) {
        setProductsPerView(3); // Show 3 on tablets
      } else if (window.innerWidth < 1280) {
        setProductsPerView(4); // Show 4 on desktop
      } else {
        setProductsPerView(5); // Show 5 on large screens
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (hasProducts) {
      updateVisibleProducts();
    }
  }, [currentIndex, productsPerView, products]);

  const updateVisibleProducts = () => {
    if (!hasProducts) return;
    
    const visibleItems = [];
    const maxProducts = Math.min(productsPerView, products.length);
    
    for (let i = 0; i < maxProducts; i++) {
      const index = (currentIndex + i) % products.length;
      visibleItems.push(products[index]);
    }
    
    setVisibleProducts(visibleItems);
  };

  const nextSlide = () => {
    if (!hasProducts) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    if (!hasProducts) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  if (!hasProducts) {
    return null;
  }

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Trending Now</h2>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Top trending products this week</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={prevSlide}
              aria-label="Previous" 
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-white shadow flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={nextSlide}
              aria-label="Next" 
              className="rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-white shadow flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowRight size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {visibleProducts.map((product, index) => (
            <ModernProductCard 
              key={`${product.id}-${index}`} 
              product={product} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
