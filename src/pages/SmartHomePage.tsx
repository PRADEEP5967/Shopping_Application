
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductGrid from '@/components/ProductGrid';
import { getAllProducts } from '@/data/products';
import { Badge } from '@/components/ui/badge';
import { Home as HomeIcon } from 'lucide-react';

const SmartHomePage = () => {
  const allProducts = getAllProducts();
  const smartHomeProducts = allProducts.filter(p => p.category === "Smart Home");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      <main className="flex-grow">
        <section className="relative py-20 bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px]" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <Badge className="mb-6 bg-green-100 text-green-700 border-green-200 animate-fade-in">
              <HomeIcon className="w-3 h-3 mr-1" />
              Smart Home
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent animate-fade-in">
              Smart Home Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
              Automate and modernize your home with intelligent devices and automation.
            </p>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">Best Smart Home Products</h2>
            </div>
            <div className="animate-fade-in">
              <ProductGrid products={smartHomeProducts} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SmartHomePage;
