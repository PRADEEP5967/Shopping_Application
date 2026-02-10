import React, { useMemo } from 'react';
import FlipkartProductCard from './FlipkartProductCard';
import { getAllProducts } from '@/data/products';

interface FlipkartProductGridProps {
  title?: string;
  showViewAll?: boolean;
}

const FlipkartProductGrid: React.FC<FlipkartProductGridProps> = ({
  title = 'Best Deals on Top Products',
  showViewAll = true,
}) => {
  const products = useMemo(() => {
    const all = getAllProducts();
    // Shuffle and pick 8 random products each render
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
  }, []);

  return (
    <section className="bg-white py-4 sm:py-6">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">{title}</h2>
          {showViewAll && (
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base">
              View All →
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {products.map((product) => (
            <FlipkartProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.images[0]}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : undefined}
              rating={product.rating}
              reviews={product.reviewCount}
              badge={product.rating >= 4.8 ? 'Top Rated' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlipkartProductGrid;
