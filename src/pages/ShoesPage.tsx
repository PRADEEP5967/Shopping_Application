
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductGrid from '@/components/ProductGrid';
import { getAllProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Award } from 'lucide-react';

const ShoesPage = () => {
  const allProducts = getAllProducts();
  const shoesProducts = allProducts.filter(product => product.category === 'Shoes');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200 animate-fade-in">
                <Award className="w-3 h-3 mr-1" />
                Performance Collection
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
                Shoes Collection
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
                Step into comfort and style with our premium footwear collection. From athletic performance to casual elegance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Button size="lg" className="group bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all">
                  <Zap className="mr-2 w-5 h-5" />
                  Shop Collection
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-blue-600 hover:text-white transition-all">
                  View Bestsellers
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Performance First</h3>
                <p className="text-gray-600">Advanced cushioning and support technology for maximum comfort.</p>
              </div>
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">Handcrafted with the finest materials for durability and style.</p>
              </div>
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick shipping to get your new shoes to your door fast.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">Featured Footwear</h2>
              <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
                Discover shoes that combine cutting-edge technology with timeless design.
              </p>
            </div>
            
            {shoesProducts.length > 0 ? (
              <div className="animate-fade-in">
                <ProductGrid products={shoesProducts} />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No shoes products available at the moment.</p>
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

export default ShoesPage;
