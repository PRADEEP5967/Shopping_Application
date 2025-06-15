import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ModernProductGrid from "@/components/ModernProductGrid";
import { getAllProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, TrendingUp, Package, Heart, Shield } from 'lucide-react';

const AccessoriesPage = () => {
  const allProducts = getAllProducts();
  const accessoriesProducts = allProducts.filter(product => product.category === 'Accessories');

  const subcategories = [
    { name: 'Bags & Backpacks', icon: Package, count: '15+' },
    { name: 'Wallets & Cases', icon: Shield, count: '8+' },
    { name: 'Lifestyle', icon: Heart, count: '12+' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 animate-fade-in">
                <Star className="w-3 h-3 mr-1" />
                Premium Collection
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
                Accessories Collection
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
                Discover our curated selection of premium accessories designed to complement your style and elevate your everyday look.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Button size="lg" className="group hover:scale-105 transition-all">
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-primary hover:text-white transition-all">
                  <TrendingUp className="mr-2 w-5 h-5" />
                  View Trending
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Subcategories */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Browse Subcategories</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subcategories.map((sub, index) => {
                const IconComponent = sub.icon;
                return (
                  <div key={sub.name} className="group p-6 bg-gray-50 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer animate-fade-in">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 group-hover:bg-white/20 rounded-lg flex items-center justify-center transition-all">
                        <IconComponent className="w-6 h-6 text-primary group-hover:text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{sub.name}</h3>
                        <p className="text-sm text-gray-600 group-hover:text-white/80">{sub.count} products</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-fade-in">
                <div className="text-3xl font-bold text-primary mb-2">{accessoriesProducts.length}+</div>
                <div className="text-gray-600">Products</div>
              </div>
              <div className="animate-fade-in">
                <div className="text-3xl font-bold text-primary mb-2">4.8</div>
                <div className="text-gray-600">Avg Rating</div>
              </div>
              <div className="animate-fade-in">
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="animate-fade-in">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">Featured Accessories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
                From premium backpacks to elegant wallets, discover accessories that combine style with functionality.
              </p>
            </div>
            
            {accessoriesProducts.length > 0 ? (
              <div className="animate-fade-in">
                <ModernProductGrid products={accessoriesProducts} />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No accessories products available at the moment.</p>
                <Link to="/products">
                  <Button>View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccessoriesPage;
