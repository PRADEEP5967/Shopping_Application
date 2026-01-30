import React from 'react';
import { Zap, TrendingUp, Sparkles, Gift, Crown, Percent, Star, ShoppingBag, Flame, Tag, Clock, Award } from 'lucide-react';
import FlipkartHeroCarousel from './FlipkartHeroCarousel';
import FlipkartCategoryGrid from './FlipkartCategoryGrid';
import FlipkartProductGrid from './FlipkartProductGrid';
import FlipkartDealCarousel from './FlipkartDealCarousel';
import FlipkartBannerStrip from './FlipkartBannerStrip';

// Flash Deals
const flashDeals = [
  { id: 'f1', name: 'Wireless Earbuds Pro', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop', price: 1999, originalPrice: 4999, discount: 60, rating: 4.3 },
  { id: 'f2', name: 'Smart Fitness Band', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop', price: 1499, originalPrice: 3999, discount: 63, rating: 4.2 },
  { id: 'f3', name: 'Bluetooth Speaker', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop', price: 999, originalPrice: 2999, discount: 67, rating: 4.4 },
  { id: 'f4', name: 'Gaming Mouse RGB', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop', price: 799, originalPrice: 1999, discount: 60, rating: 4.5 },
  { id: 'f5', name: 'Mechanical Keyboard', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300&h=300&fit=crop', price: 2499, originalPrice: 5999, discount: 58, rating: 4.6 },
  { id: 'f6', name: 'Power Bank 20000mAh', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop', price: 1299, originalPrice: 2999, discount: 57, rating: 4.3 },
  { id: 'f7', name: 'HD Webcam 1080p', image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=300&h=300&fit=crop', price: 1999, originalPrice: 4499, discount: 56, rating: 4.1 },
  { id: 'f8', name: 'Smart LED Lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop', price: 899, originalPrice: 1999, discount: 55, rating: 4.4 },
];

// Trending Deals
const trendingDeals = [
  { id: 't1', name: 'Wireless Charging Pad', image: 'https://images.unsplash.com/photo-1591815302525-756a9bcc3425?w=300&h=300&fit=crop', price: 799, originalPrice: 1999, discount: 60, rating: 4.2 },
  { id: 't2', name: 'Smart Watch Pro', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', price: 3999, originalPrice: 7999, discount: 50, rating: 4.5 },
  { id: 't3', name: 'Laptop Stand Aluminum', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop', price: 1299, originalPrice: 2499, discount: 48, rating: 4.4 },
  { id: 't4', name: 'Noise Cancelling Earbuds', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop', price: 4999, originalPrice: 9999, discount: 50, rating: 4.6 },
  { id: 't5', name: 'USB Hub 7-in-1', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop', price: 1499, originalPrice: 2999, discount: 50, rating: 4.3 },
  { id: 't6', name: 'Tablet Stand Adjustable', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop', price: 699, originalPrice: 1499, discount: 53, rating: 4.1 },
  { id: 't7', name: 'Mini Projector HD', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=300&fit=crop', price: 6999, originalPrice: 12999, discount: 46, rating: 4.3 },
  { id: 't8', name: 'Smart Ring Tracker', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop', price: 2499, originalPrice: 4999, discount: 50, rating: 4.4 },
];

// New Arrivals
const newArrivals = [
  { id: 'n1', name: 'Ultra Slim Power Bank', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop', price: 1999, originalPrice: 3499, discount: 43, rating: 4.4 },
  { id: 'n2', name: 'Smart Home Speaker', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop', price: 4999, originalPrice: 7999, discount: 38, rating: 4.5 },
  { id: 'n3', name: 'Wireless Gaming Headset', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', price: 3499, originalPrice: 5999, discount: 42, rating: 4.6 },
  { id: 'n4', name: '4K Action Camera', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop', price: 8999, originalPrice: 14999, discount: 40, rating: 4.3 },
  { id: 'n5', name: 'Smart LED Strip Lights', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop', price: 999, originalPrice: 1999, discount: 50, rating: 4.2 },
  { id: 'n6', name: 'Portable Monitor 15.6"', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop', price: 12999, originalPrice: 19999, discount: 35, rating: 4.5 },
  { id: 'n7', name: 'Smart Door Lock', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', price: 7999, originalPrice: 14999, discount: 47, rating: 4.4 },
  { id: 'n8', name: 'Robot Vacuum Cleaner', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=300&h=300&fit=crop', price: 15999, originalPrice: 29999, discount: 47, rating: 4.6 },
];

// Premium Deals
const premiumDeals = [
  { id: 'p1', name: 'MacBook Pro 14" M3', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop', price: 169990, originalPrice: 199900, discount: 15, rating: 4.9 },
  { id: 'p2', name: 'Sony A7 IV Camera', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop', price: 189990, originalPrice: 234990, discount: 19, rating: 4.8 },
  { id: 'p3', name: 'iPhone 15 Pro Max', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop', price: 149900, originalPrice: 159900, discount: 6, rating: 4.8 },
  { id: 'p4', name: 'Samsung 65" 8K TV', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop', price: 249990, originalPrice: 349990, discount: 29, rating: 4.7 },
  { id: 'p5', name: 'DJI Mavic 3 Pro', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&h=300&fit=crop', price: 189990, originalPrice: 219990, discount: 14, rating: 4.8 },
  { id: 'p6', name: 'Bose QC Ultra Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', price: 34990, originalPrice: 44990, discount: 22, rating: 4.7 },
];

// Fashion Deals
const fashionDeals = [
  { id: 'fa1', name: 'Designer Leather Jacket', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', price: 4999, originalPrice: 9999, discount: 50, rating: 4.5 },
  { id: 'fa2', name: 'Premium Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', price: 3999, originalPrice: 7999, discount: 50, rating: 4.6 },
  { id: 'fa3', name: 'Luxury Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', price: 8999, originalPrice: 14999, discount: 40, rating: 4.4 },
  { id: 'fa4', name: 'Designer Handbag', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop', price: 5999, originalPrice: 11999, discount: 50, rating: 4.5 },
  { id: 'fa5', name: 'Aviator Sunglasses', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop', price: 1999, originalPrice: 3999, discount: 50, rating: 4.3 },
  { id: 'fa6', name: 'Silk Scarf Collection', image: 'https://images.unsplash.com/photo-1601370690183-1c7796ecec61?w=300&h=300&fit=crop', price: 999, originalPrice: 2499, discount: 60, rating: 4.2 },
  { id: 'fa7', name: 'Premium Belt', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop', price: 1499, originalPrice: 2999, discount: 50, rating: 4.4 },
  { id: 'fa8', name: 'Formal Shoes', image: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=300&h=300&fit=crop', price: 2999, originalPrice: 5999, discount: 50, rating: 4.5 },
];

// Home & Kitchen Deals
const homeDeals = [
  { id: 'h1', name: 'Air Fryer XL', image: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=300&h=300&fit=crop', price: 4999, originalPrice: 8999, discount: 44, rating: 4.5 },
  { id: 'h2', name: 'Coffee Machine Pro', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop', price: 12999, originalPrice: 24999, discount: 48, rating: 4.6 },
  { id: 'h3', name: 'Robot Vacuum Mop', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', price: 19999, originalPrice: 39999, discount: 50, rating: 4.7 },
  { id: 'h4', name: 'Smart Air Purifier', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop', price: 8999, originalPrice: 14999, discount: 40, rating: 4.4 },
  { id: 'h5', name: 'Instant Pot Duo', image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=300&h=300&fit=crop', price: 6999, originalPrice: 12999, discount: 46, rating: 4.5 },
  { id: 'h6', name: 'Blender Pro 1000W', image: 'https://images.unsplash.com/photo-1570222094714-4f2bc61ff8a4?w=300&h=300&fit=crop', price: 2999, originalPrice: 5999, discount: 50, rating: 4.3 },
  { id: 'h7', name: 'Smart Thermostat', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=300&h=300&fit=crop', price: 9999, originalPrice: 16999, discount: 41, rating: 4.4 },
  { id: 'h8', name: 'Memory Foam Mattress', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=300&fit=crop', price: 14999, originalPrice: 29999, discount: 50, rating: 4.6 },
];

// Sports & Fitness Deals
const sportsDeals = [
  { id: 's1', name: 'Treadmill Pro', image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=300&h=300&fit=crop', price: 34999, originalPrice: 64999, discount: 46, rating: 4.5 },
  { id: 's2', name: 'Adjustable Dumbbells Set', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop', price: 8999, originalPrice: 15999, discount: 44, rating: 4.6 },
  { id: 's3', name: 'Yoga Mat Premium', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop', price: 1499, originalPrice: 2999, discount: 50, rating: 4.4 },
  { id: 's4', name: 'Smart Jump Rope', image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=300&h=300&fit=crop', price: 1999, originalPrice: 3999, discount: 50, rating: 4.3 },
  { id: 's5', name: 'Resistance Bands Set', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=300&h=300&fit=crop', price: 799, originalPrice: 1999, discount: 60, rating: 4.5 },
  { id: 's6', name: 'Exercise Bike', image: 'https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?w=300&h=300&fit=crop', price: 12999, originalPrice: 24999, discount: 48, rating: 4.4 },
];

// Limited Time Deals
const limitedDeals = [
  { id: 'l1', name: 'Nintendo Switch OLED', image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=300&h=300&fit=crop', price: 29999, originalPrice: 34999, discount: 14, rating: 4.8 },
  { id: 'l2', name: 'PS5 Digital Edition', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=300&fit=crop', price: 39999, originalPrice: 49990, discount: 20, rating: 4.9 },
  { id: 'l3', name: 'Xbox Series X', image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300&h=300&fit=crop', price: 44999, originalPrice: 54999, discount: 18, rating: 4.8 },
  { id: 'l4', name: 'Steam Deck 512GB', image: 'https://images.unsplash.com/photo-1640955014216-75201056c829?w=300&h=300&fit=crop', price: 54999, originalPrice: 64999, discount: 15, rating: 4.7 },
  { id: 'l5', name: 'Meta Quest 3', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=300&h=300&fit=crop', price: 44999, originalPrice: 54999, discount: 18, rating: 4.6 },
  { id: 'l6', name: 'Gaming Chair Pro', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=300&h=300&fit=crop', price: 14999, originalPrice: 24999, discount: 40, rating: 4.5 },
];

// Beauty & Grooming Deals
const beautyDeals = [
  { id: 'b1', name: 'Hair Dryer Pro', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop', price: 2999, originalPrice: 5999, discount: 50, rating: 4.4 },
  { id: 'b2', name: 'Electric Shaver', image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=300&h=300&fit=crop', price: 3999, originalPrice: 7999, discount: 50, rating: 4.5 },
  { id: 'b3', name: 'Skincare Set Premium', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop', price: 1999, originalPrice: 4999, discount: 60, rating: 4.3 },
  { id: 'b4', name: 'Hair Straightener', image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=300&h=300&fit=crop', price: 1499, originalPrice: 2999, discount: 50, rating: 4.4 },
  { id: 'b5', name: 'Massage Gun Pro', image: 'https://images.unsplash.com/photo-1611068120813-eca5a8cbf793?w=300&h=300&fit=crop', price: 4999, originalPrice: 9999, discount: 50, rating: 4.6 },
  { id: 'b6', name: 'LED Face Mask', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop', price: 6999, originalPrice: 12999, discount: 46, rating: 4.2 },
];

const FlipkartHomepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Carousel */}
      <FlipkartHeroCarousel />

      {/* Category Grid - Expanded */}
      <FlipkartCategoryGrid />

      {/* Flash Deals Carousel */}
      <FlipkartDealCarousel
        title="⚡ Flash Deals - Ending Soon!"
        icon={<Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
        bgColor="bg-gradient-to-r from-purple-600 to-blue-600"
        deals={flashDeals}
      />

      {/* Banner Strip */}
      <FlipkartBannerStrip />

      {/* Product Grid */}
      <FlipkartProductGrid title="Best Deals on Top Products" />

      {/* Trending Deals Carousel */}
      <FlipkartDealCarousel
        title="🔥 Trending Now"
        icon={<TrendingUp className="w-5 h-5 text-orange-400" />}
        bgColor="bg-gradient-to-r from-orange-500 to-pink-500"
        deals={trendingDeals}
      />

      {/* Fashion Deals */}
      <FlipkartDealCarousel
        title="👗 Fashion Fest - Min 50% Off"
        icon={<ShoppingBag className="w-5 h-5 text-pink-300" />}
        bgColor="bg-gradient-to-r from-pink-500 to-rose-500"
        deals={fashionDeals}
      />

      {/* New Arrivals Carousel */}
      <FlipkartDealCarousel
        title="✨ New Arrivals"
        icon={<Sparkles className="w-5 h-5 text-cyan-300" />}
        bgColor="bg-gradient-to-r from-cyan-600 to-teal-600"
        deals={newArrivals}
      />

      {/* Premium Products */}
      <FlipkartDealCarousel
        title="👑 Premium Collection"
        icon={<Crown className="w-5 h-5 text-yellow-300" />}
        bgColor="bg-gradient-to-r from-amber-600 to-yellow-500"
        deals={premiumDeals}
      />

      {/* Home & Kitchen */}
      <FlipkartDealCarousel
        title="🏠 Home & Kitchen Specials"
        icon={<Percent className="w-5 h-5 text-green-300" />}
        bgColor="bg-gradient-to-r from-green-600 to-emerald-500"
        deals={homeDeals}
      />

      {/* Another Product Grid */}
      <FlipkartProductGrid title="Top Picks for You" showViewAll />

      {/* Sports & Fitness */}
      <FlipkartDealCarousel
        title="💪 Sports & Fitness"
        icon={<Award className="w-5 h-5 text-blue-300" />}
        bgColor="bg-gradient-to-r from-blue-600 to-indigo-600"
        deals={sportsDeals}
      />

      {/* Limited Time Deals */}
      <FlipkartDealCarousel
        title="⏰ Limited Time Offers"
        icon={<Clock className="w-5 h-5 text-red-300" />}
        bgColor="bg-gradient-to-r from-red-600 to-orange-500"
        deals={limitedDeals}
      />

      {/* Beauty & Grooming */}
      <FlipkartDealCarousel
        title="💄 Beauty & Grooming"
        icon={<Star className="w-5 h-5 text-purple-300" />}
        bgColor="bg-gradient-to-r from-purple-500 to-violet-600"
        deals={beautyDeals}
      />

      {/* Special Offers Carousel */}
      <FlipkartDealCarousel
        title="🎁 Special Offers"
        icon={<Gift className="w-5 h-5 text-pink-300" />}
        bgColor="bg-gradient-to-r from-pink-600 to-rose-600"
        deals={flashDeals}
      />

      {/* Final Product Grid */}
      <FlipkartProductGrid title="Recommended for You" showViewAll />
    </div>
  );
};

export default FlipkartHomepage;
