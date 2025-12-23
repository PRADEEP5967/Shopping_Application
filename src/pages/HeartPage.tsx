import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ModernProductGrid from "@/components/ModernProductGrid";
import ProductCarousel from '@/components/product/ProductCarousel';
import { getAllProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Heart, Star, TrendingUp, Sparkles, Gift, Shield, Smile } from 'lucide-react';
import { motion } from 'framer-motion';
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const HeartPage: React.FC = () => {
  const allProducts = getAllProducts();
  const wellnessProducts = allProducts.filter(product => 
    product.category.toLowerCase().includes('health') || 
    product.category.toLowerCase().includes('wellness') ||
    product.name.toLowerCase().includes('care') ||
    product.name.toLowerCase().includes('skin')
  );
  
  // Get featured/bestseller products (use all products if no wellness specific)
  const featuredProducts = useMemo(() => {
    const products = wellnessProducts.length > 0 ? wellnessProducts : allProducts;
    return products.filter(p => p.rating && p.rating >= 4.5).slice(0, 10);
  }, [wellnessProducts, allProducts]);
  
  const bestsellers = useMemo(() => {
    const products = wellnessProducts.length > 0 ? wellnessProducts : allProducts;
    return [...products].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10);
  }, [wellnessProducts, allProducts]);
  
  const relatedProducts = useMemo(() => {
    return allProducts.filter(p => ['Wearables', 'Accessories'].includes(p.category)).slice(0, 10);
  }, [allProducts]);

  const features = [
    {
      icon: Smile,
      title: 'Self-Care Essentials',
      description: 'Face & body care, wellness kits, soothing aids for daily routines.',
      gradient: 'from-rose-500 to-pink-500'
    },
    {
      icon: Gift,
      title: 'Thoughtful Gifting',
      description: 'Curated for birthdays, health milestones, just-because treats.',
      gradient: 'from-fuchsia-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Trusted Brands',
      description: 'Leaders in personal care, wellness, and natural beauty.',
      gradient: 'from-red-500 to-rose-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-rose-950/20 via-pink-950/20 to-fuchsia-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-rose-500/20 text-rose-300 border-rose-500/30">
                <Heart className="w-3 h-3 mr-1" />
                Personal Care & Wellness
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                Love Yourself: Wellness & Care
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover top personal care and wellness products that make self-care simple, joyful, and effective. Because every day is worth loving yourself!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 hover:scale-105 transition-all border-0">
                  <Heart className="mr-2 w-5 h-5" />
                  Explore Wellness Products
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-rose-500/30 text-foreground hover:bg-rose-500/10 transition-all">
                  <Gift className="mr-2 w-5 h-5" />
                  Gift Sets
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose Our Care Collection?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Handpicked wellness, skincare, and personal products – focused on comfort, safety, and a touch of self-love.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-rose-500/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-rose-950/20 to-pink-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '200+', label: 'Products' },
                { value: '4.9', label: 'Avg Rating' },
                { value: '15K+', label: 'Happy Customers' },
                { value: '100%', label: 'Natural' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-rose-400 mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Carousel */}
        {featuredProducts.length > 0 && (
          <ProductCarousel
            products={featuredProducts}
            title="Top Rated Wellness"
            subtitle="Our highest-rated self-care essentials"
            icon={<Star className="w-6 h-6 text-rose-500" />}
            badge="Featured"
            badgeVariant="featured"
            viewAllLink="/category/heart"
            gradient="from-rose-950/10 to-pink-950/10"
          />
        )}

        {/* Bestsellers Carousel */}
        {bestsellers.length > 0 && (
          <ProductCarousel
            products={bestsellers}
            title="Bestselling Care Products"
            subtitle="Most loved by our wellness community"
            icon={<TrendingUp className="w-6 h-6 text-pink-500" />}
            badge="Bestseller"
            badgeVariant="bestseller"
            viewAllLink="/category/heart"
            gradient="from-pink-950/10 to-fuchsia-950/10"
          />
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <ProductCarousel
            products={relatedProducts}
            title="You May Also Like"
            subtitle="Wearables & Accessories"
            icon={<Sparkles className="w-6 h-6 text-fuchsia-500" />}
            badge="Trending"
            badgeVariant="trending"
            viewAllLink="/products"
            gradient="from-fuchsia-950/10 to-purple-950/10"
          />
        )}

        {/* Products Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-foreground">Wellness Collection</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need for your self-care journey.
              </p>
            </motion.div>
            
            {wellnessProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ModernProductGrid products={wellnessProducts} />
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Wellness products coming soon!</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-rose-600 to-pink-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4 py-8">
          <RelatedCategoriesGrid currentCategorySlug="heart" />
        </div>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-rose-600 to-pink-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Heart className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Start Your Self-Care Journey</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Treat yourself to products that nurture your body and soul.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-rose-600 hover:bg-white/90">
                Shop Wellness
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HeartPage;