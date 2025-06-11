
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles, Gift, Zap, ShoppingBag, Star } from 'lucide-react';

export const QuickLinksSection: React.FC = () => {
  const quickLinks = [
    { title: "All Products", href: "/products", icon: <ShoppingBag className="h-5 w-5" />, description: "Browse our complete catalog" },
    { title: "Categories", href: "/categories", icon: <Gift className="h-5 w-5" />, description: "Shop by category" },
    { title: "New Arrivals", href: "/new-arrivals", icon: <Sparkles className="h-5 w-5" />, description: "Latest products" },
    { title: "Deals & Discounts", href: "/deals-discounts", icon: <Zap className="h-5 w-5" />, description: "Special offers" },
    { title: "Performance", href: "/performance", icon: <Star className="h-5 w-5" />, description: "High performance solutions" },
    { title: "Efficiency", href: "/efficiency", icon: <ArrowRight className="h-5 w-5" />, description: "Optimized workflows" },
    { title: "Quality", href: "/quality", icon: <Star className="h-5 w-5" />, description: "Premium quality products" }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Explore Our Store
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our comprehensive range of products and services designed to meet all your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.href} className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    {link.icon}
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{link.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
