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
import { ArrowRight, Shirt, Heart, Sparkles, TrendingUp, Star, Package, Palette, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const ClothingPage = () => {
  const allProducts = getAllProducts();
  const clothingProducts = allProducts.filter(product => product.category === 'Clothing');
  
  // Get featured/bestseller products
  const featuredProducts = useMemo(() => {
    return clothingProducts.filter(p => p.rating && p.rating >= 4.5).slice(0, 10);
  }, [clothingProducts]);
  
  const bestsellers = useMemo(() => {
    return [...clothingProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10);
  }, [clothingProducts]);
  
  const relatedProducts = useMemo(() => {
    return allProducts.filter(p => ['Accessories', 'Shoes'].includes(p.category)).slice(0, 10);
  }, [allProducts]);

  const features = [
    {
      icon: Palette,
      title: 'Style Forward',
      description: 'Contemporary designs that keep you ahead of the fashion curve.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Shield,
      title: 'Premium Quality',
      description: 'Carefully selected fabrics that ensure comfort and durability.',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      icon: Package,
      title: 'Sustainable Fashion',
      description: 'Eco-friendly materials and ethical production practices.',
      gradient: 'from-teal-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-pink-950/20 via-rose-950/20 to-fuchsia-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-pink-500/20 text-pink-300 border-pink-500/30">
                <Heart className="w-3 h-3 mr-1" />
                Fashion Forward
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
                Clothing Collection
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Express your unique style with our carefully curated clothing collection. From casual comfort to elegant sophistication.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 hover:scale-105 transition-all border-0">
                  <Shirt className="mr-2 w-5 h-5" />
                  Explore Fashion
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-pink-500/30 text-foreground hover:bg-pink-500/10 transition-all">
                  New Arrivals
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Style Categories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover fashion that combines comfort, quality, and contemporary style.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-pink-500/30 transition-all duration-300"
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
        <section className="py-12 bg-gradient-to-r from-pink-950/20 to-rose-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: `${clothingProducts.length}+`, label: 'Products' },
                { value: '4.8', label: 'Avg Rating' },
                { value: '1000+', label: 'Happy Customers' },
                { value: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-pink-400 mb-2">{stat.value}</div>
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
            title="Top Rated Fashion"
            subtitle="Our highest-rated clothing pieces"
            icon={<Star className="w-6 h-6 text-pink-500" />}
            badge="Featured"
            badgeVariant="featured"
            viewAllLink="/category/clothing"
            gradient="from-pink-950/10 to-rose-950/10"
          />
        )}

        {/* Bestsellers Carousel */}
        {bestsellers.length > 0 && (
          <ProductCarousel
            products={bestsellers}
            title="Bestselling Styles"
            subtitle="Most popular picks from our customers"
            icon={<TrendingUp className="w-6 h-6 text-rose-500" />}
            badge="Bestseller"
            badgeVariant="bestseller"
            viewAllLink="/category/clothing"
            gradient="from-rose-950/10 to-fuchsia-950/10"
          />
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <ProductCarousel
            products={relatedProducts}
            title="Complete Your Look"
            subtitle="Accessories & Shoes to match"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Featured Clothing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover clothing that blends comfort, quality, and contemporary style.
              </p>
            </motion.div>
            
            {clothingProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ModernProductGrid products={clothingProducts} />
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Shirt className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No clothing products available at the moment.</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-pink-600 to-rose-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-pink-600 to-rose-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Heart className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Express Your Style</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of fashion enthusiasts who have found their perfect look with us.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-white/90">
                Shop All Clothing
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

export default ClothingPage;