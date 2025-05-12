
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductGrid from '@/components/ProductGrid';
import { Star } from 'lucide-react';
import { getAllProducts } from '@/data/products';

const NewArrivals = () => {
  // Get all products and sort by newest first
  // In a real app, this would filter by release date
  // Here we'll just take a random subset of products as "new"
  const allProducts = getAllProducts();
  const newProducts = allProducts
    .sort(() => 0.5 - Math.random()) // Random sort to simulate "newest"
    .slice(0, 8);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block mb-4 bg-white/20 p-3 rounded-full">
              <Star className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">New Arrivals</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Discover our latest products, fresh off the production line and ready to enhance your tech experience.
            </p>
          </div>
        </section>
        
        {/* Featured New Products */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Just Landed</h2>
              <p className="text-gray-600 mt-1">Our newest products that are making waves</p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <span className="text-sm text-gray-500">Updated weekly</span>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <ProductGrid products={newProducts.slice(0, 4)} />
        </section>
        
        {/* New Collections */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">New Collections</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop" 
                    alt="Premium Laptops" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">Premium Laptops</h3>
                      <p className="text-white/80 mt-1">Power and performance in sleek designs</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop" 
                    alt="Smart Devices" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">Smart Home Devices</h3>
                      <p className="text-white/80 mt-1">Transform your living space with intelligent technology</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* More New Arrivals */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">More New Arrivals</h2>
          <ProductGrid products={newProducts.slice(4, 8)} />
        </section>
        
        {/* Coming Soon */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Coming Soon</h2>
            <p className="text-lg max-w-2xl mx-auto mb-12 text-gray-300">
              Get a sneak peek at our upcoming products and be the first to know when they launch.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 rounded-lg p-6 transform transition-transform hover:scale-105">
                <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">Q3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Next-Gen Audio</h3>
                <p className="text-gray-400">
                  Revolutionary sound technology that will change how you experience music.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 transform transition-transform hover:scale-105">
                <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">Q4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Wearables</h3>
                <p className="text-gray-400">
                  The next generation of health and fitness tracking devices with AI assistance.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 transform transition-transform hover:scale-105">
                <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">Q1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Home Automation</h3>
                <p className="text-gray-400">
                  Seamless integration of smart devices to transform your home experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewArrivals;
