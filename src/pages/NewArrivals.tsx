import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getAllProducts } from '@/data/products';
import { Sparkles, Calendar, TrendingUp, Filter } from 'lucide-react';
import ModernProductGrid from "@/components/ModernProductGrid";

const NewArrivals = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Get all products and simulate new arrivals
  const allProducts = getAllProducts();
  const newArrivals = allProducts.slice(0, 16).map((product, index) => ({
    ...product,
    isNew: true,
    arrivalDate: new Date(Date.now() - (index * 2 * 24 * 60 * 60 * 1000)), // Last 2 weeks
    trending: index < 4 // Mark first 4 as trending
  }));

  const categories = [
    { id: 'all', name: 'All Categories', count: newArrivals.length },
    { id: 'electronics', name: 'Electronics', count: 5 },
    { id: 'clothing', name: 'Clothing', count: 4 },
    { id: 'home', name: 'Home & Garden', count: 3 },
    { id: 'sports', name: 'Sports & Outdoors', count: 4 }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? newArrivals 
    : newArrivals.filter(product => product.category.toLowerCase().includes(selectedCategory));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.arrivalDate.getTime() - a.arrivalDate.getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">New Arrivals</h1>
              <p className="text-xl mb-6 text-white/90">
                Discover the latest products that just landed in our store. 
                Fresh styles, cutting-edge tech, and innovative designs.
              </p>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Calendar className="h-4 w-4 mr-2" />
                Updated Weekly
              </Badge>
            </div>
          </div>
        </section>

        {/* Filters & Stats */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    {category.name}
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-3">
                <Filter className="h-4 w-4 text-gray-500" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="trending">Trending</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold mb-1">{newArrivals.length}</h3>
                  <p className="text-gray-600">New Products</p>
                  <p className="text-xs text-gray-500 mt-1">This month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold mb-1">4</h3>
                  <p className="text-gray-600">Trending Items</p>
                  <p className="text-xs text-gray-500 mt-1">Hot picks</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold mb-1">7</h3>
                  <p className="text-gray-600">Days Ago</p>
                  <p className="text-xs text-gray-500 mt-1">Latest arrival</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedCategory === 'all' ? 'All New Arrivals' : `New in ${categories.find(c => c.id === selectedCategory)?.name}`}
              </h2>
              <p className="text-gray-600">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {sortedProducts.length > 0 ? (
              <ModernProductGrid products={sortedProducts} />
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No new arrivals</h3>
                  <p className="text-gray-600 mb-4">
                    No new products in this category yet. Check back soon!
                  </p>
                  <Button onClick={() => setSelectedCategory('all')}>
                    View All Categories
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="mb-6 text-white/90">
                Be the first to know about our latest arrivals, exclusive deals, and special promotions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="px-4 py-3 rounded-md text-gray-900 w-full sm:w-auto sm:min-w-[300px] focus:ring-2 focus:ring-white"
                />
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm mt-4 text-white/70">
                Join over 10,000 subscribers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewArrivals;
