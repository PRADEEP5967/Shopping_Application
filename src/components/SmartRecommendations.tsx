
import React, { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, Clock, Heart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ModernProductCard from '@/components/ModernProductCard';
import { Product } from '@/types';
import { getAllProducts } from '@/data/products';
import { useAuth } from '@/contexts/AuthContext';

const SmartRecommendations: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);

  useEffect(() => {
    const products = getAllProducts();
    
    // Get recently viewed from localStorage
    const viewed = localStorage.getItem('recentlyViewed');
    if (viewed) {
      const viewedIds = JSON.parse(viewed);
      const viewedProducts = products.filter(p => viewedIds.includes(p.id)).slice(0, 4);
      setRecentlyViewed(viewedProducts);
    }

    // Generate smart recommendations based on user behavior
    const userPreferences = localStorage.getItem('userPreferences');
    let recommendedProducts = products;
    
    if (userPreferences) {
      const prefs = JSON.parse(userPreferences);
      recommendedProducts = products.filter(p => 
        prefs.categories?.includes(p.category) || 
        p.rating >= (prefs.minRating || 4)
      );
    }
    
    setRecommendations(recommendedProducts.slice(0, 6));
    
    // Set trending products (highest rated + most reviews)
    const trendingProducts = [...products]
      .sort((a, b) => (b.rating * (b.reviewCount || 1)) - (a.rating * (a.reviewCount || 1)))
      .slice(0, 4);
    setTrending(trendingProducts);
  }, []);

  return (
    <div className="space-y-8">
      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clock className="h-5 w-5 text-primary" />
              Recently Viewed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentlyViewed.map((product) => (
                <ModernProductCard 
                  key={product.id} 
                  product={product}
                  showQuickView={false}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personalized Recommendations */}
      {isAuthenticated && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-5 w-5 text-primary" />
              Recommended for You
              {user && <span className="text-sm font-normal text-gray-500">Hi, {user.firstName}!</span>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.slice(0, 6).map((product) => (
                <ModernProductCard key={product.id} product={product} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trending Products */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="h-5 w-5 text-primary" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trending.map((product) => (
              <ModernProductCard 
                key={product.id} 
                product={product}
                showQuickView={false}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartRecommendations;
