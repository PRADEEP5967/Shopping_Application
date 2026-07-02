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
    <section className="py-14 sm:py-20 border-b border-border/40">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-end justify-between mb-10 border-b border-border/60 pb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-primary/80 mb-2">Curated Selection</p>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground uppercase tracking-tight">{title}</h2>
          </div>
          {showViewAll && (
            <button className="hidden sm:block text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground hover:text-primary transition-colors">
              View All
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
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
