import React from 'react';
import { Zap, TrendingUp, Sparkles, Gift } from 'lucide-react';
import FlipkartHeroCarousel from './FlipkartHeroCarousel';
import FlipkartCategoryGrid from './FlipkartCategoryGrid';
import FlipkartProductGrid from './FlipkartProductGrid';
import FlipkartDealCarousel from './FlipkartDealCarousel';
import FlipkartBannerStrip from './FlipkartBannerStrip';

// Additional deal data for variety
const trendingDeals = [
  {
    id: 't1',
    name: 'Wireless Charging Pad',
    image: 'https://images.unsplash.com/photo-1591815302525-756a9bcc3425?w=300&h=300&fit=crop',
    price: 799,
    originalPrice: 1999,
    discount: 60,
    rating: 4.2,
  },
  {
    id: 't2',
    name: 'Smart Watch Pro',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    price: 3999,
    originalPrice: 7999,
    discount: 50,
    rating: 4.5,
  },
  {
    id: 't3',
    name: 'Laptop Stand Aluminum',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.4,
  },
  {
    id: 't4',
    name: 'Noise Cancelling Earbuds',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
    price: 4999,
    originalPrice: 9999,
    discount: 50,
    rating: 4.6,
  },
  {
    id: 't5',
    name: 'USB Hub 7-in-1',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop',
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    rating: 4.3,
  },
  {
    id: 't6',
    name: 'Tablet Stand Adjustable',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
    price: 699,
    originalPrice: 1499,
    discount: 53,
    rating: 4.1,
  },
];

const newArrivals = [
  {
    id: 'n1',
    name: 'Ultra Slim Power Bank',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop',
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    rating: 4.4,
  },
  {
    id: 'n2',
    name: 'Smart Home Speaker',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    rating: 4.5,
  },
  {
    id: 'n3',
    name: 'Wireless Gaming Headset',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    rating: 4.6,
  },
  {
    id: 'n4',
    name: '4K Action Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop',
    price: 8999,
    originalPrice: 14999,
    discount: 40,
    rating: 4.3,
  },
  {
    id: 'n5',
    name: 'Smart LED Strip Lights',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop',
    price: 999,
    originalPrice: 1999,
    discount: 50,
    rating: 4.2,
  },
  {
    id: 'n6',
    name: 'Portable Monitor 15.6"',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
    price: 12999,
    originalPrice: 19999,
    discount: 35,
    rating: 4.5,
  },
];

const FlipkartHomepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Carousel */}
      <FlipkartHeroCarousel />

      {/* Category Grid */}
      <FlipkartCategoryGrid />

      {/* Flash Deals Carousel */}
      <FlipkartDealCarousel
        title="Flash Deals"
        icon={<Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
        bgColor="bg-gradient-to-r from-purple-600 to-blue-600"
      />

      {/* Banner Strip */}
      <FlipkartBannerStrip />

      {/* Product Grid */}
      <FlipkartProductGrid title="Best Deals on Top Products" />

      {/* Trending Deals Carousel */}
      <FlipkartDealCarousel
        title="Trending Now"
        icon={<TrendingUp className="w-5 h-5 text-orange-400" />}
        bgColor="bg-gradient-to-r from-orange-500 to-pink-500"
        deals={trendingDeals}
      />

      {/* New Arrivals Carousel */}
      <FlipkartDealCarousel
        title="New Arrivals"
        icon={<Sparkles className="w-5 h-5 text-cyan-300" />}
        bgColor="bg-gradient-to-r from-cyan-600 to-teal-600"
        deals={newArrivals}
      />

      {/* Another Product Grid */}
      <FlipkartProductGrid title="Top Picks for You" showViewAll />

      {/* Special Offers Carousel */}
      <FlipkartDealCarousel
        title="Special Offers"
        icon={<Gift className="w-5 h-5 text-pink-300" />}
        bgColor="bg-gradient-to-r from-pink-600 to-rose-600"
      />
    </div>
  );
};

export default FlipkartHomepage;
