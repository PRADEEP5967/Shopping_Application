
import React from 'react';
import Hero from '@/components/Hero';
import TrendingProducts from '@/components/TrendingProducts';
import DealsSection from '@/components/DealsSection';
import Testimonials from '@/components/Testimonials';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { ModernHero } from '@/components/modern/ModernHero';
import { ModernFeatures } from '@/components/modern/ModernFeatures';
import ModernProductShowcase from '@/components/modern/ModernProductShowcase';
import { ModernTestimonials } from '@/components/modern/ModernTestimonials';
import { StatsSection } from '@/components/modern/StatsSection';
import { FeaturedProductsSection } from '@/components/sections/FeaturedProductsSection';
import { PersonalizedRecommendationsSection } from '@/components/sections/PersonalizedRecommendationsSection';
import CategoryNav from '@/components/CategoryNav';
import { getAllProducts, getProductCategories, getFeaturedProducts } from '@/data/products';

const Index = () => {
  const allProducts = getAllProducts();
  const categories = getProductCategories();
  const featuredProducts = getFeaturedProducts(8);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        <ModernHero />
        
        {/* Top Categories Section */}
        <section className="bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Top Categories</h2>
              <p className="text-gray-600">Browse our most popular product categories</p>
            </div>
            <CategoryNav categories={categories} />
          </div>
        </section>

        <ModernFeatures />
        
        {/* Featured Products Section */}
        <FeaturedProductsSection featuredProducts={featuredProducts} />
        
        <TrendingProducts products={allProducts} />
        <ModernProductShowcase />
        <DealsSection />
        
        {/* Personalized Recommendations Section */}
        <PersonalizedRecommendationsSection />
        
        <StatsSection />
        <ModernTestimonials />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
