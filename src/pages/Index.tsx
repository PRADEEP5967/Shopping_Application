
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
import { getAllProducts } from '@/data/products';

const Index = () => {
  const allProducts = getAllProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        <ModernHero />
        <ModernFeatures />
        <TrendingProducts products={allProducts} />
        <ModernProductShowcase />
        <DealsSection />
        <StatsSection />
        <ModernTestimonials />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
