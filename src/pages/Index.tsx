import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import PartnerLogosSection from '@/components/sections/PartnerLogosSection';
import QuickLinksFlashSection from '@/components/sections/QuickLinksFlashSection';
import AnimatedCountersSection from '@/components/sections/AnimatedCountersSection';
import CategoryNav from '@/components/CategoryNav';
import ModernCategoryNav from '@/components/ModernCategoryNav';
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
import ModernImageSlider from '@/components/ModernImageSlider';
import AnimatedFeatureCard from "@/components/modern/AnimatedFeatureCard";
import { Zap, ShieldCheck, Headphones, Truck, RefreshCw, Star, Users, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

// New: Home Advantages section data and animation
const CATEGORY_ADVANTAGES = [
  {
    icon: <ShoppingBag className="w-8 h-8 text-primary" strokeWidth={2.5} />,
    title: "Curated Products",
    desc: "Best-in-class picks by passionate experts. Discover quality, not clutter.",
  },
  {
    icon: <Users className="w-8 h-8 text-secondary" strokeWidth={2.5} />,
    title: "Caring Community",
    desc: "20K+ happy shoppers & growing — you’re part of a buzzing, trusted crowd.",
  },
  {
    icon: <Star className="w-8 h-8 text-yellow-400" strokeWidth={2.5} />,
    title: "Top Reviews",
    desc: "Thousands of five-star reviews from real verified customers.",
  },
];

const HOMEPAGE_FEATURES = [
  {
    icon: Zap,
    title: "Blazing Performance",
    description: "Instant page loads, smooth shopping—technology should never slow you down.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    description: "Cutting-edge encryption and privacy—shop confidently.",
  },
  {
    icon: Headphones,
    title: "24/7 Real Human Support",
    description: "Our friendly team is always here to help, any time.",
  },
  {
    icon: Truck,
    title: "Express, Tracked Delivery",
    description: "Get your order faster, fully tracked. No more waiting.",
  },
  {
    icon: RefreshCw,
    title: "Effortless Returns",
    description: "Change your mind? No problem—easy, hassle-free returns.",
  },
];

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const categories = getProductCategories();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50/30 via-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <CartFlyout />

      {/* Enhanced Hero Section with 3D */}
      <section className="relative py-20 flex flex-col justify-center bg-gradient-to-br from-blue-200 via-white to-blue-50 overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-pink-100/30 to-white pointer-events-none" />
        <div className="container mx-auto relative z-10 px-4 text-center flex flex-col items-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5 bg-gradient-to-r from-blue-600 via-violet-500 to-pink-400 bg-clip-text text-transparent animate-scale-in"
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            Modern Shopping, Blissful Living.
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 font-medium animate-fade-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1 }}
          >
            Elevate how you discover, save, and buy. Explore trending essentials, trusted by thousands, with world-class support every step of your journey.
          </motion.p>
          <motion.a
            href="#featured-products"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 hover:from-pink-500 hover:to-indigo-500 transition-all animate-scale-in"
            whileTap={{ scale: 0.96 }}
          >
            Start Shopping Now
          </motion.a>
        </div>
      </section>

      {/* Home3DSlider removed */}

      {/* As Seen On/Partner Logos with nicer animation and spacing */}
      <PartnerLogosSection />

      {/* Flash/Trending Quick Links, more interactive */}
      <section className="relative z-10 animate-fade-in">
        <QuickLinksFlashSection />
      </section>

      {/* Modern Image Slider—high-drag touch carousel */}
      <section className="py-8 md:py-12 animate-fade-in">
        <ModernImageSlider />
      </section>

      {/* Modern Features: animated, interaction, callout color fixes */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5 animate-fade-in">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-center mb-12"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Features That Delight
            </motion.h2>
            <motion.p
              className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Lightning-fast experiences, real security, human support—plus seamless delivery and returns.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {HOMEPAGE_FEATURES.map((feature, i) => (
              <AnimatedFeatureCard key={feature.title} index={i} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Advantages & Trust—animated icons and badges */}
      <section className="py-12 bg-white dark:bg-gray-900 animate-fade-in">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {CATEGORY_ADVANTAGES.map((adv, i) => (
              <motion.div
                key={adv.title}
                className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-xl p-8 flex flex-col items-center text-center shadow group hover:scale-105 transition-transform duration-200"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <span className="mb-4">{adv.icon}</span>
                <span className="font-semibold text-lg text-gray-900 dark:text-white">{adv.title}</span>
                <span className="mt-2 text-md text-gray-600 dark:text-gray-400">{adv.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
