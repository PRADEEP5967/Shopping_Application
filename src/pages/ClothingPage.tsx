import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductGrid from '@/components/ProductGrid';
import { getAllProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

const ClothingPage = () => {
  const allProducts = getAllProducts();
  const clothingProducts = allProducts.filter(product => product.category === 'Clothing');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-pink-100 text-pink-700 border-pink-200 animate-fade-in">
                <Heart className="w-3 h-3 mr-1" />
                Fashion Forward
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent animate-fade-in">
                Clothing Collection
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
                Express your unique style with our carefully curated clothing collection. From casual comfort to elegant sophistication.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Button size="lg" className="group bg-pink-600 hover:bg-pink-700 hover:scale-105 transition-all">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Explore Fashion
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-pink-600 hover:text-white transition-all">
                  New Arrivals
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Style Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">Style Categories</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group text-center animate-fade-in hover:scale-105 transition-transform">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-12 h-12 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Casual Wear</h3>
                <p className="text-gray-600">Comfortable and stylish everyday clothing for relaxed moments.</p>
              </div>
              <div className="group text-center animate-fade-in hover:scale-105 transition-transform">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-12 h-12 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Basics</h3>
                <p className="text-gray-600">High-quality essentials that form the foundation of your wardrobe.</p>
              </div>
              <div className="group text-center animate-fade-in hover:scale-105 transition-transform">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Statement Pieces</h3>
                <p className="text-gray-600">Bold designs that help you express your unique personality.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">Featured Clothing</h2>
              <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
                Discover clothing that blends comfort, quality, and contemporary style.
              </p>
            </div>
            
            {clothingProducts.length > 0 ? (
              <div className="animate-fade-in">
                <ProductGrid products={clothingProducts} />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No clothing products available at the moment.</p>
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

export default ClothingPage;
