import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import CategoryNav from '@/components/CategoryNav';
import ModernCategoryNav from '@/components/ModernCategoryNav';
import TestimonialsSlider from "@/components/TestimonialsSlider";
import { AnimatedContentSection } from "@/components/sections/AnimatedContentSection";
import { ModernTeamHomeSection } from "@/components/sections/ModernTeamHomeSection";
// Modern Components
import { ModernFeatures } from '@/components/modern/ModernFeatures';
import { ModernCTA } from '@/components/modern/ModernCTA';
import { ModernTestimonials } from '@/components/modern/ModernTestimonials';
import { StatsSection } from '@/components/modern/StatsSection';
// New Section Components
import { HeroSection } from '@/components/sections/HeroSection';
import { QuickLinksSection } from '@/components/sections/QuickLinksSection';
import { FeaturedProductsSection } from '@/components/sections/FeaturedProductsSection';
import { CustomerServiceSection } from '@/components/sections/CustomerServiceSection';
import { PromoSection } from '@/components/sections/PromoSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { getFeaturedProducts, getProductCategories } from '@/data/products';
import ModernImageSlider from '@/components/ModernImageSlider';
// New for Homepage Modern UI
import AnimatedFeatureCard from "@/components/modern/AnimatedFeatureCard";
import { Zap, ShieldCheck, Headphones, Truck, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const HOMEPAGE_FEATURES = [
  {
    icon: Zap,
    title: "Blazing Performance",
    description: "Our platform leverages the latest technology for instant page loads and smooth interactions."
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Secure",
    description: "Top-tier encryption and compliance means your data and payments stay safe."
  },
  {
    icon: Headphones,
    title: "24/7 Human Support",
    description: "Dedicated, friendly support staff always ready to help you by chat, email, or phone."
  },
  {
    icon: Truck,
    title: "Express Delivery",
    description: "We ensure your products reach you rapidly, with real-time tracking on every order."
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day returns, no questions asked. Your satisfaction is guaranteed or your money back."
  },
];

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const categories = getProductCategories();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      {/* Flipkart-style Category Navigation Bar */}
      <FlipkartCategoryBar />
      <CartFlyout />

      {/* Modern Hero Section */}
      <main className="flex-grow">
        <HeroSection />
        <ModernImageSlider />

        {/* Modern Feature Callouts */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="text-center mb-12"
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Modern Shopping, Brilliant Features
              </motion.h2>
              <motion.p
                className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Experience enterprise-grade UI, secure payments, and personalized support — all on a lightning-fast, modern shopping platform.
              </motion.p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
              {HOMEPAGE_FEATURES.map((feature, i) => (
                <AnimatedFeatureCard key={feature.title} index={i} {...feature} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Quick Links Section */}
        <QuickLinksSection />

        {/* Animated Content Section */}
        <AnimatedContentSection />

        {/* Category Navigation (Modern) */}
        <ModernCategoryNav />
        
        {/* Featured Products (Animated, Modern Cards) */}
        <FeaturedProductsSection featuredProducts={featuredProducts} />
        
        {/* Modern Team Home Section */}
        <ModernTeamHomeSection />

        {/* Testimonials */}
        <TestimonialsSlider />
        <ModernTestimonials />

        {/* Stats + Call to Action */}
        <StatsSection />
        <ModernCTA />

        {/* Customer Service */}
        <CustomerServiceSection />

        {/* Promo Section + Newsletter */}
        <PromoSection />
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
