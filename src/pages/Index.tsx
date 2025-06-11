import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import CategoryNav from '@/components/CategoryNav';
import ModernCategoryNav from '@/components/ModernCategoryNav';
import DealsSection from '@/components/DealsSection';
import TrendingProducts from '@/components/TrendingProducts';
import PromoFeatures from '@/components/PromoFeatures';
import Testimonials from '@/components/Testimonials';
import ProductGrid from '@/components/ProductGrid';
import FeaturedCategories from '@/components/FeaturedCategories';
import SmartRecommendations from '@/components/SmartRecommendations';
import RecentlyViewed from '@/components/features/RecentlyViewed';
import NewsletterSignup from '@/components/marketing/NewsletterSignup';

// Modern Components
import { ModernHero } from '@/components/modern/ModernHero';
import { ModernFeatures } from '@/components/modern/ModernFeatures';
import { ModernCTA } from '@/components/modern/ModernCTA';
import { ModernTestimonials } from '@/components/modern/ModernTestimonials';
import { StatsSection } from '@/components/modern/StatsSection';

import { getFeaturedProducts, getProductCategories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles, Gift, Zap, ShoppingBag, Star, Users, HelpCircle } from 'lucide-react';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const categories = getProductCategories();
  
  const quickLinks = [
    { title: "All Products", href: "/products", icon: <ShoppingBag className="h-5 w-5" />, description: "Browse our complete catalog" },
    { title: "Categories", href: "/categories", icon: <Gift className="h-5 w-5" />, description: "Shop by category" },
    { title: "New Arrivals", href: "/new-arrivals", icon: <Sparkles className="h-5 w-5" />, description: "Latest products" },
    { title: "Deals & Discounts", href: "/deals-discounts", icon: <Zap className="h-5 w-5" />, description: "Special offers" },
    { title: "Performance", href: "/performance", icon: <Star className="h-5 w-5" />, description: "High performance solutions" },
    { title: "Efficiency", href: "/efficiency", icon: <ArrowRight className="h-5 w-5" />, description: "Optimized workflows" },
    { title: "Quality", href: "/quality", icon: <Star className="h-5 w-5" />, description: "Premium quality products" }
  ];

  const customerServiceLinks = [
    { title: "My Account", href: "/my-account", icon: <Users className="h-5 w-5" /> },
    { title: "Order History", href: "/order-history", icon: <ShoppingBag className="h-5 w-5" /> },
    { title: "Wishlist", href: "/wishlist", icon: <Star className="h-5 w-5" /> },
    { title: "Shipping Policy", href: "/shipping-policy", icon: <Gift className="h-5 w-5" /> },
    { title: "Returns & Exchanges", href: "/returns-exchanges", icon: <ArrowRight className="h-5 w-5" /> },
    { title: "FAQs", href: "/faq", icon: <HelpCircle className="h-5 w-5" /> },
    { title: "Contact Us", href: "/contact-us", icon: <Users className="h-5 w-5" /> }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <CartFlyout />
      
      <CategoryNav categories={categories} />
      
      <main className="flex-grow">
        {/* Modern Hero Section */}
        <ModernHero />
        
        <ModernCategoryNav />

        {/* Quick Links Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Explore Our Store
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover our comprehensive range of products and services designed to meet all your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.href} className="group">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        {link.icon}
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{link.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Smart Recommendations Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <SmartRecommendations />
          </div>
        </section>

        {/* Recently Viewed Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <RecentlyViewed />
          </div>
        </section>
        
        <DealsSection />
        
        {/* Modern Features Section */}
        <ModernFeatures />
        
        {/* Featured Products with Modern Design */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">Handpicked for You</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Featured Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover our most popular products, carefully selected by our team to bring you the best shopping experience.
              </p>
            </div>
            
            <ProductGrid 
              products={featuredProducts.slice(0, 8)} 
              title=""
              subtitle=""
            />
            
            <div className="text-center mt-12">
              <Link to="/products">
                <Button size="lg" className="group hover:scale-105 transition-all duration-200">
                  View All Products 
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <FeaturedCategories />
        
        <TrendingProducts products={featuredProducts.slice(4, 8)} />
        
        <StatsSection />

        {/* Customer Service Links */}
        <section className="py-16 bg-gradient-to-r from-primary/5 via-blue-50 to-purple-50 dark:from-primary/10 dark:via-blue-900/20 dark:to-purple-900/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Customer Service</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                We're here to help you every step of the way. Access your account, track orders, and get support.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {customerServiceLinks.map((link, index) => (
                <Link key={index} to={link.href} className="group">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                        {link.icon}
                      </div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{link.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Enhanced Promo Features */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose NextCommerce?</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Experience the future of online shopping with our cutting-edge features and exceptional service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Gift className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-600 dark:text-gray-400">Free shipping on orders over $50. No minimum purchase required for premium members.</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600 dark:text-gray-400">Lightning-fast delivery with same-day shipping available in major cities.</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600 dark:text-gray-400">Carefully curated products from trusted brands with quality guarantee.</p>
              </div>
            </div>
          </div>
        </section>
        
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
        <section className="py-16 bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">Exclusive Offers</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
                Stay in the Loop
              </h2>
              <p className="text-xl mb-8 text-white/90 animate-fade-in">
                Subscribe to our newsletter for exclusive deals, early access to new products, and personalized recommendations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 border-0 focus:ring-4 focus:ring-white/30 transition-all"
                />
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-200">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm mt-6 text-white/80">
                Join 50,000+ shoppers who save with our exclusive deals. Unsubscribe anytime.
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
