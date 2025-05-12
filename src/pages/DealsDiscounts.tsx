
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { getAllProducts } from '@/data/products';
import { Product } from '@/types';
import { 
  Clock, 
  Percent, 
  Tag, 
  Sparkles,
  ArrowRight 
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const DealsDiscounts = () => {
  const allProducts = getAllProducts();
  
  // Create mock sale products with discounted prices
  const dealProducts: Product[] = allProducts
    .slice(0, 12)
    .map(product => ({
      ...product,
      originalPrice: product.price,
      price: Number((product.price * 0.8).toFixed(2)), // 20% discount
      salePercentage: 20
    }));
  
  // Flash sale products (higher discount)
  const flashSaleProducts = dealProducts.slice(0, 4).map(product => ({
    ...product,
    price: Number((product.originalPrice! * 0.6).toFixed(2)), // 40% discount
    salePercentage: 40
  }));
  
  // Clearance products
  const clearanceProducts = dealProducts.slice(8, 12).map(product => ({
    ...product,
    price: Number((product.originalPrice! * 0.5).toFixed(2)), // 50% discount
    salePercentage: 50
  }));
  
  // Calculate time remaining for flash sale (mock)
  const getTimeRemaining = () => {
    const hours = 5;
    const minutes = 42;
    const seconds = 18;
    
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  };
  
  const timeRemaining = getTimeRemaining();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              Limited Time Offers
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Deals & Discounts</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Incredible savings on top products. Don't miss these limited-time offers!
            </p>
          </div>
        </div>
        
        {/* Flash Sale */}
        <section className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Sparkles className="h-6 w-6 text-red-500 mr-2" />
                <h2 className="text-2xl md:text-3xl font-bold">Flash Sale</h2>
              </div>
              <p className="text-gray-600 mt-1">Up to 40% off - Today Only</p>
            </div>
            
            <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-3">
              <Clock className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium">Ends in:</span>
              <div className="flex items-center space-x-1">
                <div className="bg-gray-800 text-white px-2 py-1 rounded">{timeRemaining.hours}</div>
                <span>:</span>
                <div className="bg-gray-800 text-white px-2 py-1 rounded">{timeRemaining.minutes}</div>
                <span>:</span>
                <div className="bg-gray-800 text-white px-2 py-1 rounded">{timeRemaining.seconds}</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) => (
              <div key={product.id} className="relative">
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.salePercentage}%
                  </span>
                </div>
                <ProductCard product={product} />
                {product.originalPrice && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="line-through text-gray-400">
                      {formatCurrency(product.originalPrice)}
                    </span>
                    <span className="text-red-500 font-semibold">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        
        {/* Weekly Deals Banner */}
        <section className="bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl overflow-hidden shadow-xl">
              <div className="md:flex items-center">
                <div className="md:w-1/2 p-8 md:p-12">
                  <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Weekly Deal
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Save Big on Premium Headphones
                  </h2>
                  <p className="text-white/90 mb-6 text-lg">
                    Get up to 30% off on select models this week only.
                    Premium sound quality for less.
                  </p>
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                    Shop the Deal
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
                    alt="Premium Headphones"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Popular Deals */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center mb-8">
            <Percent className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold">Popular Deals</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {dealProducts.slice(4, 8).map((product) => (
              <div key={product.id} className="relative">
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.salePercentage}%
                  </span>
                </div>
                <ProductCard product={product} />
                {product.originalPrice && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="line-through text-gray-400">
                      {formatCurrency(product.originalPrice)}
                    </span>
                    <span className="text-green-600 font-semibold">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/products">
              <Button variant="outline" className="flex items-center gap-2">
                View All Deals
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Deal Categories */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Shop Deals By Category</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Electronics", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2301&auto=format&fit=crop", discount: "Up to 25% Off" },
                { name: "Wearables", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop", discount: "From $49.99" },
                { name: "Smart Home", image: "https://images.unsplash.com/photo-1558002038-1055e2dae1e7?q=80&w=2070&auto=format&fit=crop", discount: "Save 30%" },
                { name: "Computers", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop", discount: "Clearance" },
              ].map((category, index) => (
                <Link 
                  key={index} 
                  to={`/category/${category.name.toLowerCase().replace(' ', '-')}`} 
                  className="group"
                >
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
                    <div className="relative">
                      <img 
                        src={category.image}
                        alt={category.name}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-lg font-bold text-white mb-1">{category.name}</h3>
                          <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                            {category.discount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Clearance */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center mb-8">
            <Tag className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold">Clearance</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {clearanceProducts.map((product) => (
              <div key={product.id} className="relative">
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.salePercentage}%
                  </span>
                </div>
                <ProductCard product={product} />
                {product.originalPrice && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="line-through text-gray-400">
                      {formatCurrency(product.originalPrice)}
                    </span>
                    <span className="text-red-600 font-semibold">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Get Exclusive Deals
              </h2>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter and be the first to know about our special offers and promotions.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-primary"
                />
                <Button className="bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DealsDiscounts;
