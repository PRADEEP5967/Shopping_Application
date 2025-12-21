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
import { ArrowRight, Footprints, Sparkles, TrendingUp, Star, Mountain, Zap, Shield, Wind } from 'lucide-react';
import { motion } from 'framer-motion';

const ShoesPage = () => {
  const allProducts = getAllProducts();
  const shoesProducts = allProducts.filter(product => product.category === 'Shoes');
  
  // Get featured/bestseller products
  const featuredProducts = useMemo(() => {
    return shoesProducts.filter(p => p.rating && p.rating >= 4.5).slice(0, 10);
  }, [shoesProducts]);
  
  const bestsellers = useMemo(() => {
    return [...shoesProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10);
  }, [shoesProducts]);
  
  // Related categories products
  const relatedProducts = useMemo(() => {
    return allProducts.filter(p => ['Clothing', 'Accessories'].includes(p.category)).slice(0, 10);
  }, [allProducts]);

  const features = [
    {
      icon: Zap,
      title: 'Performance Tech',
      description: 'Advanced cushioning and support for maximum comfort and performance.',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      icon: Shield,
      title: 'Durable Quality',
      description: 'Premium materials built to last through every adventure and workout.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Wind,
      title: 'Breathable Design',
      description: 'Engineered mesh and ventilation systems keep your feet cool and dry.',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  const categories = [
    { name: 'Running', icon: '🏃', count: 45 },
    { name: 'Casual', icon: '👟', count: 32 },
    { name: 'Hiking', icon: '🥾', count: 28 },
    { name: 'Formal', icon: '👞', count: 21 }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-orange-950/20 via-amber-950/20 to-yellow-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-orange-500/20 text-orange-300 border-orange-500/30">
                <Sparkles className="w-3 h-3 mr-1" />
                Step Into Style
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Premium Footwear Collection
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                From running trails to city streets, discover shoes engineered for comfort, style, and performance in every step you take.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 hover:scale-105 transition-all border-0">
                  <Footprints className="mr-2 w-5 h-5" />
                  Shop All Shoes
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-orange-500/30 text-foreground hover:bg-orange-500/10 transition-all">
                  View New Arrivals
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Pills */}
        <section className="py-8 bg-card/50 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat, index) => (
                <motion.button
                  key={cat.name}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-background border border-border hover:border-orange-500/50 hover:bg-orange-500/10 transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="font-medium text-foreground">{cat.name}</span>
                  <Badge variant="secondary" className="text-xs">{cat.count}</Badge>
                </motion.button>
              ))}
            </div>
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose Our Footwear</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every pair is crafted with precision engineering for ultimate comfort and lasting quality.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-orange-500/30 transition-all duration-300"
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
        <section className="py-12 bg-gradient-to-r from-orange-950/20 to-amber-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: `${shoesProducts.length}+`, label: 'Styles' },
                { value: '150+', label: 'Brands' },
                { value: '50K+', label: 'Happy Customers' },
                { value: '4.8★', label: 'Average Rating' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-orange-400 mb-2">{stat.value}</div>
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
            title="Top Rated Shoes"
            subtitle="Our highest-rated footwear for every occasion"
            icon={<Star className="w-6 h-6 text-orange-500" />}
            badge="Featured"
            badgeVariant="featured"
            viewAllLink="/category/shoes"
            gradient="from-orange-950/10 to-amber-950/10"
          />
        )}

        {/* Bestsellers Carousel */}
        {bestsellers.length > 0 && (
          <ProductCarousel
            products={bestsellers}
            title="Bestselling Footwear"
            subtitle="Most loved shoes by our customers"
            icon={<TrendingUp className="w-6 h-6 text-amber-500" />}
            badge="Bestseller"
            badgeVariant="bestseller"
            viewAllLink="/category/shoes"
            gradient="from-amber-950/10 to-yellow-950/10"
          />
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <ProductCarousel
            products={relatedProducts}
            title="Complete Your Look"
            subtitle="Perfect matches from Clothing & Accessories"
            icon={<Sparkles className="w-6 h-6 text-yellow-500" />}
            badge="Trending"
            badgeVariant="trending"
            viewAllLink="/products"
            gradient="from-yellow-950/10 to-orange-950/10"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">All Footwear</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our complete collection of premium shoes for every lifestyle.
              </p>
            </motion.div>
            
            {shoesProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ModernProductGrid products={shoesProducts} />
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Footprints className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No footwear available at the moment.</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-orange-600 to-amber-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-orange-600 to-amber-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Mountain className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Ready for Your Next Adventure?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Find the perfect pair for running, hiking, casual outings, or formal occasions.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-white/90">
                Browse Collection
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

export default ShoesPage;
