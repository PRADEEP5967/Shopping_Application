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
import { ArrowRight, Baby, Heart, Star, TrendingUp, Sparkles, Shield, Gift, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const BabyPage: React.FC = () => {
  const allProducts = getAllProducts();
  const babyProducts = allProducts.filter(product => 
    product.category.toLowerCase().includes('baby') || 
    product.name.toLowerCase().includes('baby') ||
    product.name.toLowerCase().includes('kids')
  );
  
  // Get featured/bestseller products (use all products if no baby specific)
  const featuredProducts = useMemo(() => {
    const products = babyProducts.length > 0 ? babyProducts : allProducts;
    return products.filter(p => p.rating && p.rating >= 4.5).slice(0, 10);
  }, [babyProducts, allProducts]);
  
  const bestsellers = useMemo(() => {
    const products = babyProducts.length > 0 ? babyProducts : allProducts;
    return [...products].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10);
  }, [babyProducts, allProducts]);
  
  const relatedProducts = useMemo(() => {
    return allProducts.filter(p => ['Clothing', 'Accessories'].includes(p.category)).slice(0, 10);
  }, [allProducts]);

  const features = [
    {
      icon: Shield,
      title: 'Trusted Brands',
      description: 'Shop only the most trusted brands in baby care and essentials.',
      gradient: 'from-sky-500 to-blue-500'
    },
    {
      icon: Heart,
      title: 'Soft & Gentle',
      description: 'All products tested for comfort and sensitive baby skin.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Star,
      title: 'Parent-Approved',
      description: 'Loved by parents for quality, value, and a touch of cuteness.',
      gradient: 'from-amber-500 to-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-sky-950/20 via-emerald-950/20 to-teal-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-sky-500/20 text-sky-300 border-sky-500/30">
                <Baby className="w-3 h-3 mr-1" />
                Baby Essentials
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Gentle Care for Your Little One
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore adorable baby clothing, safe accessories, gentle skincare, and all the must-haves for happy moments and peaceful nights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 hover:scale-105 transition-all border-0">
                  <Baby className="mr-2 w-5 h-5" />
                  Shop Baby Collection
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-sky-500/30 text-foreground hover:bg-sky-500/10 transition-all">
                  <Gift className="mr-2 w-5 h-5" />
                  Gift Ideas
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Parents Love Our Baby Store</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Handpicked essentials for newborns and toddlers—safety tested, extra gentle, and always adorable.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-sky-500/30 transition-all duration-300"
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
        <section className="py-12 bg-gradient-to-r from-sky-950/20 to-emerald-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '500+', label: 'Products' },
                { value: '4.9', label: 'Parent Rating' },
                { value: '10K+', label: 'Happy Families' },
                { value: '100%', label: 'Safe Materials' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-sky-400 mb-2">{stat.value}</div>
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
            title="Top Rated Baby Products"
            subtitle="Our highest-rated essentials for your little one"
            icon={<Star className="w-6 h-6 text-sky-500" />}
            badge="Featured"
            badgeVariant="featured"
            viewAllLink="/category/baby"
            gradient="from-sky-950/10 to-emerald-950/10"
          />
        )}

        {/* Bestsellers Carousel */}
        {bestsellers.length > 0 && (
          <ProductCarousel
            products={bestsellers}
            title="Bestselling Baby Essentials"
            subtitle="Most loved by parents everywhere"
            icon={<TrendingUp className="w-6 h-6 text-emerald-500" />}
            badge="Bestseller"
            badgeVariant="bestseller"
            viewAllLink="/category/baby"
            gradient="from-emerald-950/10 to-teal-950/10"
          />
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <ProductCarousel
            products={relatedProducts}
            title="You May Also Like"
            subtitle="Clothing & Accessories for the family"
            icon={<Sparkles className="w-6 h-6 text-teal-500" />}
            badge="Trending"
            badgeVariant="trending"
            viewAllLink="/products"
            gradient="from-teal-950/10 to-cyan-950/10"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Baby Collection</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need for your growing family.
              </p>
            </motion.div>
            
            {babyProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ModernProductGrid products={babyProducts} />
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Baby className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Baby products coming soon!</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-sky-600 to-emerald-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4 py-8">
          <RelatedCategoriesGrid currentCategorySlug="baby" />
        </div>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-sky-600 to-emerald-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Heart className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">For Happy, Healthy Babies</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of happy parents who trust us for their baby's essentials.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-sky-600 hover:bg-white/90">
                Shop Baby Collection
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

export default BabyPage;