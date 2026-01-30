import React from 'react';
import FlipkartProductCard from './FlipkartProductCard';

const sampleProducts = [
  {
    id: '1',
    name: 'Samsung Galaxy S24 Ultra 5G (Titanium Black, 256GB)',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    price: 74999,
    originalPrice: 134999,
    discount: 44,
    rating: 4.5,
    reviews: 12456,
    badge: 'Bestseller',
  },
  {
    id: '2',
    name: 'Apple MacBook Air M2 Chip (8GB/256GB SSD)',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    price: 99999,
    originalPrice: 119900,
    discount: 17,
    rating: 4.7,
    reviews: 8934,
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    price: 26990,
    originalPrice: 34990,
    discount: 23,
    rating: 4.6,
    reviews: 5621,
    badge: 'Top Rated',
  },
  {
    id: '4',
    name: 'Nike Air Jordan 1 Retro High OG',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    price: 16995,
    originalPrice: 18995,
    discount: 11,
    rating: 4.4,
    reviews: 3245,
  },
  {
    id: '5',
    name: 'Apple Watch Series 9 GPS + Cellular (45mm)',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    price: 49999,
    originalPrice: 59900,
    discount: 17,
    rating: 4.8,
    reviews: 7832,
    badge: 'New',
  },
  {
    id: '6',
    name: 'LG 55" 4K Ultra HD Smart OLED TV',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
    price: 99990,
    originalPrice: 149990,
    discount: 33,
    rating: 4.5,
    reviews: 2156,
  },
  {
    id: '7',
    name: 'Canon EOS R6 Mark II Mirrorless Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    price: 215990,
    originalPrice: 259995,
    discount: 17,
    rating: 4.9,
    reviews: 892,
    badge: 'Premium',
  },
  {
    id: '8',
    name: 'Dyson V15 Detect Absolute Cordless Vacuum',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop',
    price: 62900,
    originalPrice: 72900,
    discount: 14,
    rating: 4.6,
    reviews: 1543,
  },
];

interface FlipkartProductGridProps {
  title?: string;
  showViewAll?: boolean;
}

const FlipkartProductGrid: React.FC<FlipkartProductGridProps> = ({
  title = 'Best Deals on Top Products',
  showViewAll = true,
}) => {
  return (
    <section className="bg-white py-4 sm:py-6">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">{title}</h2>
          {showViewAll && (
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base">
              View All →
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {sampleProducts.map((product) => (
            <FlipkartProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlipkartProductGrid;
