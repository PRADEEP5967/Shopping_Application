
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import PartnerLogosSection from '@/components/sections/PartnerLogosSection';
import QuickLinksFlashSection from '@/components/sections/QuickLinksFlashSection';
import AnimatedCountersSection from '@/components/sections/AnimatedCountersSection';
import ModernImageSlider from '@/components/ModernImageSlider';
import TestimonialsSlider from "@/components/TestimonialsSlider";
import { AnimatedContentSection } from "@/components/sections/AnimatedContentSection";
import { ModernTeamHomeSection } from "@/components/sections/ModernTeamHomeSection";
import { ModernFeatures } from '@/components/modern/ModernFeatures';
import { ModernCTA } from '@/components/modern/ModernCTA';
import { ModernTestimonials } from '@/components/modern/ModernTestimonials';
import { StatsSection } from '@/components/modern/StatsSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { QuickLinksSection } from '@/components/sections/QuickLinksSection';
import { FeaturedProductsSection } from '@/components/sections/FeaturedProductsSection';
import { CustomerServiceSection } from '@/components/sections/CustomerServiceSection';
import { PromoSection } from '@/components/sections/PromoSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { getFeaturedProducts, getProductCategories } from '@/data/products';

// Refactored: section components below
import HeroBlissSection from './HomeSections/HeroBlissSection';
import FeaturesSection from './HomeSections/FeaturesSection';
import CategoryAdvantagesSection from './HomeSections/CategoryAdvantagesSection';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const categories = getProductCategories();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/30 via-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <CartFlyout />

      {/* Hero Section */}
      <HeroBlissSection />

      {/* Partner Logos */}
      <PartnerLogosSection />

      {/* Flash/Trending Quick Links */}
      <section className="relative z-10 animate-fade-in">
        <QuickLinksFlashSection />
      </section>

      {/* Modern Image Slider */}
      <section className="py-8 md:py-12 animate-fade-in">
        <ModernImageSlider />
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Category Advantages */}
      <CategoryAdvantagesSection />

      {/* Animated Counters Section */}
      <AnimatedCountersSection />

      {/* Product Highlights: combo of Featured & New Arrivals */}
      <section id="featured-products">
        <FeaturedProductsSection featuredProducts={featuredProducts} />
      </section>

      {/* Testimonials and Trust—slider and visuals */}
      <section className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-900 py-20 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-700 via-purple-600 to-teal-400 bg-clip-text text-transparent">
              Trusted by Shoppers Everywhere
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands who’ve found better, faster, friendlier shopping here.
            </p>
          </div>
          <TestimonialsSlider />
        </div>
      </section>
      <ModernTestimonials />

      {/* Stats Section + Modern Team Call-to-Action */}
      <StatsSection />
      <ModernCTA />

      {/* Customer Service */}
      <CustomerServiceSection />

      {/* Promo Section + Newsletter */}
      <PromoSection />
      <NewsletterSection />
    </div>
  );
};

export default Index;
