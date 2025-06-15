import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ModernProductGrid from "@/components/ModernProductGrid";
import { getAllProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Cpu, Smartphone } from 'lucide-react';
import BestFeaturesElectronics from "@/components/category/BestFeaturesElectronics";

const ElectronicsPage = () => {
  const allProducts = getAllProducts();
  const electronicsProducts = allProducts.filter(product => product.category === 'Electronics');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-cyan-100 text-cyan-700 border-cyan-200 animate-fade-in">
                <Zap className="w-3 h-3 mr-1" />
                Cutting-Edge Technology
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
                Electronics Collection
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
                Discover the latest in technology and innovation. From smart devices to audio equipment, power your digital lifestyle.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Button size="lg" className="group bg-cyan-600 hover:bg-cyan-700 hover:scale-105 transition-all">
                  <Cpu className="mr-2 w-5 h-5" />
                  Shop Electronics
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-cyan-600 hover:text-white transition-all">
                  Latest Tech
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">Technology Categories</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group text-center animate-fade-in hover:scale-105 transition-transform">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-12 h-12 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Devices</h3>
                <p className="text-gray-600">Connect and control your world with intelligent technology.</p>
              </div>
              <div className="group text-center animate-fade-in hover:scale-105 transition-transform">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-12 h-12 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">High Performance</h3>
                <p className="text-gray-600">Cutting-edge processors and advanced technology for peak performance.</p>
              </div>
              <div className="group text-center animate-fade-in hover:scale-105 transition-transform">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">Stay ahead with the latest technological innovations and features.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Features Section */}
        <BestFeaturesElectronics />

        {/* Stats */}
        <section className="py-12 bg-gradient-to-r from-cyan-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-fade-in">
                <div className="text-3xl font-bold text-cyan-600 mb-2">{electronicsProducts.length}+</div>
                <div className="text-gray-600">Tech Products</div>
              </div>
              <div className="animate-fade-in">
                <div className="text-3xl font-bold text-cyan-600 mb-2">99%</div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="animate-fade-in">
                <div className="text-3xl font-bold text-cyan-600 mb-2">2 Year</div>
                <div className="text-gray-600">Warranty</div>
              </div>
              <div className="animate-fade-in">
                <div className="text-3xl font-bold text-cyan-600 mb-2">24/7</div>
                <div className="text-gray-600">Tech Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">Featured Electronics</h2>
              <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
                Explore our premium selection of electronic devices and smart technology.
              </p>
            </div>
            
            {electronicsProducts.length > 0 ? (
              <div className="animate-fade-in">
                <ModernProductGrid products={electronicsProducts} />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No electronics products available at the moment.</p>
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

export default ElectronicsPage;
