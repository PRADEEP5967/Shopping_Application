
import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Eye, ShoppingBag } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModernProductCard from '@/components/ModernProductCard';
import { Product } from '@/types';
import { getAllProducts } from '@/data/products';
import { useAuth } from '@/contexts/AuthContext';

export const PersonalizedRecommendationsSection: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [forYou, setForYou] = useState<Product[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    const products = getAllProducts();
    
    // Get recently viewed from localStorage
    const viewed = localStorage.getItem('recentlyViewed');
    if (viewed) {
      const viewedIds = JSON.parse(viewed);
      const viewedProducts = products.filter(p => viewedIds.includes(p.id)).slice(0, 4);
      setRecentlyViewed(viewedProducts);
    }

    // Generate personalized recommendations
    const userPreferences = localStorage.getItem('userPreferences');
    let recommendedProducts = [...products];
    
    if (userPreferences) {
      const prefs = JSON.parse(userPreferences);
      recommendedProducts = products.filter(p => 
        prefs.categories?.includes(p.category) || 
        p.rating >= (prefs.minRating || 4)
      );
    }
    
    // Sort by rating and price for better recommendations
    recommendedProducts.sort((a, b) => b.rating - a.rating);
    setForYou(recommendedProducts.slice(0, 6));
    
    // Trending products (highest rated + most reviews)
    const trendingProducts = [...products]
      .sort((a, b) => (b.rating * (b.reviewCount || 1)) - (a.rating * (a.reviewCount || 1)))
      .slice(0, 6);
    setTrending(trendingProducts);

    // New arrivals (simulate with random selection)
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setNewArrivals(shuffled.slice(0, 6));
  }, []);

  const sections = [
    {
      id: 'for-you',
      title: 'For You',
      icon: <Sparkles className="h-4 w-4" />,
      products: forYou,
      description: 'Personalized picks based on your preferences'
    },
    {
      id: 'trending',
      title: 'Trending',
      icon: <TrendingUp className="h-4 w-4" />,
      products: trending,
      description: 'Most popular items right now'
    },
    {
      id: 'recent',
      title: 'Recently Viewed',
      icon: <Eye className="h-4 w-4" />,
      products: recentlyViewed,
      description: 'Continue where you left off'
    },
    {
      id: 'new',
      title: 'New Arrivals',
      icon: <ShoppingBag className="h-4 w-4" />,
      products: newArrivals,
      description: 'Fresh additions to our catalog'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium">Just For You</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Personalized Recommendations
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {isAuthenticated 
              ? `Welcome back${user ? `, ${user.firstName}` : ''}! Here are some items picked just for you.`
              : 'Discover products tailored to your interests and trending items.'
            }
          </p>
        </div>

        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full mb-8">
            {sections.map((section) => (
              <TabsTrigger 
                key={section.id} 
                value={section.id} 
                className="flex items-center gap-2 text-xs sm:text-sm"
              >
                {section.icon}
                <span className="hidden sm:inline">{section.title}</span>
                <span className="sm:hidden">{section.title.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {sections.map((section) => (
            <TabsContent key={section.id} value={section.id}>
              <Card className="border-0 shadow-sm">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="flex items-center justify-center gap-2 text-xl sm:text-2xl">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm sm:text-base">{section.description}</p>
                </CardHeader>
                <CardContent>
                  {section.products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                      {section.products.map((product) => (
                        <ModernProductCard 
                          key={product.id} 
                          product={product}
                          showQuickView={false}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {section.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {section.id === 'recent' ? 'No Recent Views' : 'Coming Soon'}
                      </h3>
                      <p className="text-gray-500">
                        {section.id === 'recent' 
                          ? 'Start browsing to see your recently viewed items here'
                          : 'We\'re working on getting great recommendations for you'
                        }
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
