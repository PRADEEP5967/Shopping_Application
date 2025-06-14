import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import CategoryNav from '@/components/CategoryNav';
import DealsSection from '@/components/DealsSection';
import TrendingProducts from '@/components/TrendingProducts';
import PromoFeatures from '@/components/PromoFeatures';
import Testimonials from '@/components/Testimonials';
import SmartRecommendations from '@/components/SmartRecommendations';
import NewsletterSignup from '@/components/marketing/NewsletterSignup';
import TestimonialsSlider from "@/components/TestimonialsSlider";
import { AnimatedContentSection } from "@/components/sections/AnimatedContentSection";
import { ModernTeamHomeSection } from "@/components/sections/ModernTeamHomeSection";

// Modern Components
import { ModernFeatures } from '@/components/modern/ModernFeatures';
import { ModernCTA } from '@/components/modern/ModernCTA';
import { ModernTestimonials } from '@/components/modern/ModernTestimonials';
import { StatsSection } from '@/components/modern/StatsSection';
import ModernCategoryNav from '@/components/ModernCategoryNav';

// New Section Components
import { HeroSection } from '@/components/sections/HeroSection';
import { QuickLinksSection } from '@/components/sections/QuickLinksSection';
import { FeaturedProductsSection } from '@/components/sections/FeaturedProductsSection';
import { CustomerServiceSection } from '@/components/sections/CustomerServiceSection';
import { PromoSection } from '@/components/sections/PromoSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';

import { getFeaturedProducts, getProductCategories } from '@/data/products';

import ModernImageSlider from '@/components/ModernImageSlider';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const categories = getProductCategories();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <CartFlyout />
      
      <CategoryNav categories={categories} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Add Modern Image Slider here */}
        <ModernImageSlider />
        
        {/* Quick Links Section */}
        <QuickLinksSection />
        
        {/* New: Animated Content Section */}
        <AnimatedContentSection />
        
        {/* Smart Recommendations Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <SmartRecommendations />
          </div>
        </section>
        
        <DealsSection />
        
        {/* Modern Features Section */}
        <ModernFeatures />
        
        {/* Featured Products Section */}
        <FeaturedProductsSection featuredProducts={featuredProducts} />
        
        <ModernCategoryNav />
        
        <TrendingProducts products={featuredProducts.slice(4, 8)} />
        
        <StatsSection />

        {/* Modern Our Team Section */}
        <ModernTeamHomeSection />

        {/* Testimonial Slider Section */}
        <TestimonialsSlider />

        {/* Customer Service Section */}
        <CustomerServiceSection />
        
        {/* Promo Section */}
        <PromoSection />
        
        <PromoFeatures />
        
        {/* Modern Testimonials */}
        <ModernTestimonials />
        
        <Testimonials />
        
        {/* Modern CTA Section */}
        <ModernCTA />
        
        {/* Newsletter Signup Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <NewsletterSignup />
            </div>
          </div>
        </section>
        
        {/* Enhanced Newsletter Section */}
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
