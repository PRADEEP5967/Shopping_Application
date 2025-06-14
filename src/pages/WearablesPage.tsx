
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductGrid from '@/components/ProductGrid';
import { getAllProducts } from '@/data/products';
import { Badge } from '@/components/ui/badge';
import { Watch } from 'lucide-react';

const WearablesPage = () => {
  const allProducts = getAllProducts();
  const wearablesProducts = allProducts.filter(p => p.category === "Wearables");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      <main className="flex-grow">
        <section className="relative py-20 bg-gradient-to-br from-pink-50 via-pink-100 to-purple-50 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <Badge className="mb-6 bg-pink-100 text-pink-700 border-pink-200 animate-fade-in">
              <Watch className="w-3 h-3 mr-1" />
              Wearables
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
              Wearables Collection
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
              Discover our curated range of smartwatches and fitness trackers for every lifestyle.
            </p>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">Featured Wearables</h2>
            </div>
            <div className="animate-fade-in">
              <ProductGrid products={wearablesProducts} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WearablesPage;
