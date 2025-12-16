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
import { FeaturedCategoriesSection } from '@/components/sections/FeaturedCategoriesSection';
import { PromotionalBannerSection } from '@/components/sections/PromotionalBannerSection';
import { PersonalizedRecommendationsSection } from '@/components/sections/PersonalizedRecommendationsSection';
import { TrustSignalsSection } from '@/components/sections/TrustSignalsSection';
import { getFeaturedProducts, getProductCategories } from '@/data/products';
import ModernCategoryNav from '@/components/ModernCategoryNav';
import SEOHead, { generateOrganizationSchema } from '@/components/seo/SEOHead';

// Refactored: section components below
import HeroBlissSection from './HomeSections/HeroBlissSection';
import FeaturesSection from './HomeSections/FeaturesSection';
import CategoryAdvantagesSection from './HomeSections/CategoryAdvantagesSection';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const categories = getProductCategories();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title="Pradeep Sahani Mart - Your Ultimate Shopping Destination"
        description="Discover amazing products at unbeatable prices. Shop electronics, fashion, home goods and more with fast shipping and secure checkout."
        keywords="ecommerce, online shopping, electronics, fashion, deals, discounts"
        structuredData={generateOrganizationSchema()}
      />
      <Header />
      <CartFlyout />

      {/* Hero Section */}
      <HeroBlissSection />

      {/* Featured Categories Section - NEW */}
      <FeaturedCategoriesSection />

      {/* Promotional Banner Section - NEW */}
      <PromotionalBannerSection />

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

      {/* Personalized Recommendations Section - NEW */}
      <PersonalizedRecommendationsSection />

      {/* Trust Signals Section - NEW */}
      <TrustSignalsSection />

      {/* Testimonials and Trust—slider and visuals */}
      <section className="bg-background py-20 animate-fade-in" aria-labelledby="testimonials-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 id="testimonials-heading" className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Trusted by Shoppers Everywhere
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands who've found better, faster, friendlier shopping here.
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

      {/* Modern Category Section After Bottom Content */}
      <section className="py-16 bg-card/50" aria-labelledby="explore-categories-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="explore-categories-heading" className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Explore Our Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover amazing products across all our carefully curated categories
            </p>
          </div>
          <ModernCategoryNav />
        </div>
      </section>

      {/* Modern Image Gallery Section */}
      <section className="py-20 bg-background" aria-labelledby="gallery-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="gallery-heading" className="text-4xl font-bold mb-4 text-foreground">
              Experience Modern Shopping
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              High-quality products, stunning designs, and exceptional customer service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Modern Image Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80"
                alt="Modern Electronics"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Premium Electronics</h3>
                  <p className="text-gray-200">Latest technology at your fingertips</p>
                </div>
              </div>
            </div>

            {/* Modern Image Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80"
                alt="Fashion & Style"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Fashion & Style</h3>
                  <p className="text-gray-200">Trendy collections for every occasion</p>
                </div>
              </div>
            </div>

            {/* Modern Image Card 3 */}
            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 md:col-span-2 lg:col-span-1">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80"
                alt="Home & Living"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Home & Living</h3>
                  <p className="text-gray-200">Transform your space with style</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Modern Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            {/* Large Feature Image */}
            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                alt="Smart Technology"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/80 via-purple-600/60 to-transparent">
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-3xl font-bold mb-3">Smart Technology</h3>
                  <p className="text-xl text-blue-100 mb-4">Innovation meets everyday life</p>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                    Explore Now
                  </button>
                </div>
              </div>
            </div>

            {/* Stacked Images */}
            <div className="space-y-6">
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
                  alt="Sport & Fitness"
                  className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/70 to-red-500/70">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-bold">Sport & Fitness</h4>
                    <p className="text-orange-100">Gear up for success</p>
                  </div>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80"
                  alt="Beauty & Care"
                  className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/70 to-purple-500/70">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-bold">Beauty & Care</h4>
                    <p className="text-pink-100">Look and feel amazing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
