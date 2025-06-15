
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShoppingBag, Laptop, Wrench, Briefcase } from 'lucide-react';

const SmallBusinessCategories = () => {
  const categories = [
    {
      title: 'Office Supplies',
      description: 'Everything you need to keep your office running smoothly.',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=500&h=300&fit=crop',
      itemCount: '250+ items',
      popular: true
    },
    {
      title: 'Technology',
      description: 'Latest tech solutions for modern businesses.',
      icon: Laptop,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      itemCount: '180+ items',
      popular: false
    },
    {
      title: 'Tools & Equipment',
      description: 'Professional tools for various business needs.',
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop',
      itemCount: '320+ items',
      popular: false
    },
    {
      title: 'Business Services',
      description: 'Professional services to support your growth.',
      icon: ShoppingBag,
      image: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=500&h=300&fit=crop',
      itemCount: '50+ services',
      popular: true
    }
  ];

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-800">
            Business Categories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Business Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover products and services organized by what your business needs most.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 animate-fade-in overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {category.popular && (
                    <Badge className="absolute top-3 right-3 bg-orange-500 text-white">
                      Popular
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-3 left-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-white/90 rounded-full">
                      <Icon className="h-5 w-5 text-gray-700" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.itemCount}</span>
                    <Button variant="ghost" size="sm" className="group/btn">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SmallBusinessCategories;
