import React, { useMemo } from 'react';
import { Zap, TrendingUp, Sparkles, Gift, Crown, Percent, Star, ShoppingBag, Clock, Award } from 'lucide-react';
import FlipkartHeroCarousel from './FlipkartHeroCarousel';
import FlipkartCategoryGrid from './FlipkartCategoryGrid';
import FlipkartProductGrid from './FlipkartProductGrid';
import FlipkartDealCarousel from './FlipkartDealCarousel';
import FlipkartBannerStrip from './FlipkartBannerStrip';
import { getAllProducts } from '@/data/products';

const FlipkartHomepage: React.FC = () => {
  const allProducts = useMemo(() => getAllProducts(), []);

  // Helper to convert Product to Deal format for carousels
  const toDeal = (p: any) => ({
    id: p.id,
    name: p.name,
    image: p.images[0],
    price: p.price,
    originalPrice: p.originalPrice || Math.round(p.price * 1.4),
    discount: p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 30,
    rating: p.rating,
  });

  // Get products by category
  const getByCategory = (category: string, limit = 8) =>
    allProducts.filter(p => p.category === category).slice(0, limit).map(toDeal);

  // Get mixed products starting from an offset
  const getSlice = (start: number, count: number) =>
    allProducts.slice(start, start + count).map(toDeal);

  const flashDeals = getSlice(0, 8);
  const trendingDeals = getSlice(8, 8);
  const fashionDeals = [...getByCategory('Clothing', 4), ...getByCategory('Shoes', 4)];
  const newArrivals = getSlice(16, 8);
  const premiumDeals = [...getByCategory('Computers', 2), ...getByCategory('Photography', 2), ...getByCategory('TV', 2), ...getByCategory('Electronics', 2)];
  const homeDeals = [...getByCategory('Kitchen', 4), ...getByCategory('Furniture', 4)];
  const sportsDeals = [...getByCategory('Fitness', 4), ...getByCategory('Sports', 4)];
  const limitedDeals = [...getByCategory('Gaming', 2), ...getByCategory('Smart Home', 2), ...getByCategory('Wearables', 2), ...getByCategory('Audio', 2)];
  const beautyDeals = [...getByCategory('Beauty', 4), ...getByCategory('Jewelry', 4)];
  const specialDeals = getSlice(24, 8);

  return (
    <div className="min-h-screen bg-gray-100">
      <FlipkartHeroCarousel />
      <FlipkartCategoryGrid />

      <FlipkartDealCarousel
        title="⚡ Flash Deals - Ending Soon!"
        icon={<Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
        bgColor="bg-gradient-to-r from-purple-600 to-blue-600"
        deals={flashDeals}
      />

      <FlipkartBannerStrip />
      <FlipkartProductGrid title="Best Deals on Top Products" />

      <FlipkartDealCarousel
        title="🔥 Trending Now"
        icon={<TrendingUp className="w-5 h-5 text-orange-400" />}
        bgColor="bg-gradient-to-r from-orange-500 to-pink-500"
        deals={trendingDeals}
      />

      <FlipkartDealCarousel
        title="👗 Fashion Fest - Min 50% Off"
        icon={<ShoppingBag className="w-5 h-5 text-pink-300" />}
        bgColor="bg-gradient-to-r from-pink-500 to-rose-500"
        deals={fashionDeals}
      />

      <FlipkartDealCarousel
        title="✨ New Arrivals"
        icon={<Sparkles className="w-5 h-5 text-cyan-300" />}
        bgColor="bg-gradient-to-r from-cyan-600 to-teal-600"
        deals={newArrivals}
      />

      <FlipkartDealCarousel
        title="👑 Premium Collection"
        icon={<Crown className="w-5 h-5 text-yellow-300" />}
        bgColor="bg-gradient-to-r from-amber-600 to-yellow-500"
        deals={premiumDeals}
      />

      <FlipkartDealCarousel
        title="🏠 Home & Kitchen Specials"
        icon={<Percent className="w-5 h-5 text-green-300" />}
        bgColor="bg-gradient-to-r from-green-600 to-emerald-500"
        deals={homeDeals}
      />

      <FlipkartProductGrid title="Top Picks for You" showViewAll />

      <FlipkartDealCarousel
        title="💪 Sports & Fitness"
        icon={<Award className="w-5 h-5 text-blue-300" />}
        bgColor="bg-gradient-to-r from-blue-600 to-indigo-600"
        deals={sportsDeals}
      />

      <FlipkartDealCarousel
        title="⏰ Limited Time Offers"
        icon={<Clock className="w-5 h-5 text-red-300" />}
        bgColor="bg-gradient-to-r from-red-600 to-orange-500"
        deals={limitedDeals}
      />

      <FlipkartDealCarousel
        title="💄 Beauty & Grooming"
        icon={<Star className="w-5 h-5 text-purple-300" />}
        bgColor="bg-gradient-to-r from-purple-500 to-violet-600"
        deals={beautyDeals}
      />

      <FlipkartDealCarousel
        title="🎁 Special Offers"
        icon={<Gift className="w-5 h-5 text-pink-300" />}
        bgColor="bg-gradient-to-r from-pink-600 to-rose-600"
        deals={specialDeals}
      />

      <FlipkartProductGrid title="Recommended for You" showViewAll />
    </div>
  );
};

export default FlipkartHomepage;
