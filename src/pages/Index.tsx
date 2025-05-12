
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import FeaturedCategories from '@/components/FeaturedCategories';
import PromoFeatures from '@/components/PromoFeatures';
import Testimonials from '@/components/Testimonials';
import CategoryNav from '@/components/CategoryNav';
import TrendingProducts from '@/components/TrendingProducts';
import DealsSection from '@/components/DealsSection';

import { getFeaturedProducts, getProductCategories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const categories = getProductCategories();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <CategoryNav categories={categories} />
      
      <main className="flex-grow">
        <Hero />
        
        <DealsSection />
        
        <div className="container mx-auto px-4 py-12">
          <ProductGrid 
            products={featuredProducts.slice(0, 4)} 
            title="Featured Products"
            subtitle="Our most popular products handpicked by our team"
          />
          <div className="text-center mt-8">
            <Link to="/products">
              <Button variant="outline" size="lg" className="flex items-center gap-2 hover:bg-primary hover:text-white transition-all">
                View All Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        <FeaturedCategories />
        
        <TrendingProducts products={featuredProducts.slice(4, 8)} />
        
        <PromoFeatures />
        <Testimonials />
        
        {/* Newsletter Section */}
        <section className="py-12 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">Stay Updated</h2>
              <p className="mb-6 animate-fade-in">Subscribe to our newsletter for exclusive deals and updates on new products.</p>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-md text-gray-900 w-full sm:w-auto sm:min-w-[300px] focus:ring-2 focus:ring-white"
                />
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-transform">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm mt-4 text-white/80">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
