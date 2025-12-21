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
import { ArrowRight, Sofa, Sparkles, TrendingUp, Star, Home, Palette, Award, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const FurniturePage = () => {
  const allProducts = getAllProducts();
  const furnitureProducts = allProducts.filter(product => product.category === 'Furniture');
  
  // Get featured/bestseller products
  const featuredProducts = useMemo(() => {
    return furnitureProducts.filter(p => p.rating && p.rating >= 4.5).slice(0, 10);
  }, [furnitureProducts]);
  
  const bestsellers = useMemo(() => {
    return [...furnitureProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10);
  }, [furnitureProducts]);
  
  // Related categories products
  const relatedProducts = useMemo(() => {
    return allProducts.filter(p => ['Smart Home', 'Accessories'].includes(p.category)).slice(0, 10);
  }, [allProducts]);

  const features = [
    {
      icon: Palette,
      title: 'Modern Design',
      description: 'Contemporary aesthetics that complement any interior style and space.',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Crafted with finest materials for lasting durability and comfort.',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: Truck,
      title: 'White Glove Delivery',
      description: 'Professional assembly and placement service included with every purchase.',
      gradient: 'from-teal-500 to-cyan-500'
    }
  ];

  const roomCategories = [
    { name: 'Living Room', icon: '🛋️', count: 48 },
    { name: 'Bedroom', icon: '🛏️', count: 35 },
    { name: 'Office', icon: '💼', count: 28 },
    { name: 'Dining', icon: '🍽️', count: 22 }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-violet-950/20 via-purple-950/20 to-fuchsia-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-violet-500/20 text-violet-300 border-violet-500/30">
                <Sparkles className="w-3 h-3 mr-1" />
                Transform Your Space
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Modern Furniture Collection
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Elevate your living spaces with our curated collection of contemporary furniture, crafted for style, comfort, and lasting quality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 hover:scale-105 transition-all border-0">
                  <Sofa className="mr-2 w-5 h-5" />
                  Shop Furniture
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-violet-500/30 text-foreground hover:bg-violet-500/10 transition-all">
                  Design Consultation
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Room Category Pills */}
        <section className="py-8 bg-card/50 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {roomCategories.map((cat, index) => (
                <motion.button
                  key={cat.name}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-background border border-border hover:border-violet-500/50 hover:bg-violet-500/10 transition-all"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">The Furniture Experience</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every piece is designed with your comfort and style in mind.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-violet-500/30 transition-all duration-300"
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
        <section className="py-12 bg-gradient-to-r from-violet-950/20 to-purple-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: `${furnitureProducts.length}+`, label: 'Products' },
                { value: '10 Yr', label: 'Warranty' },
                { value: '100%', label: 'Satisfaction' },
                { value: 'Free', label: 'Assembly' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-violet-400 mb-2">{stat.value}</div>
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
            title="Top Rated Furniture"
            subtitle="Highest-rated pieces loved by our customers"
            icon={<Star className="w-6 h-6 text-violet-500" />}
            badge="Featured"
            badgeVariant="featured"
            viewAllLink="/category/furniture"
            gradient="from-violet-950/10 to-purple-950/10"
          />
        )}

        {/* Bestsellers Carousel */}
        {bestsellers.length > 0 && (
          <ProductCarousel
            products={bestsellers}
            title="Bestselling Furniture"
            subtitle="Most popular pieces in our collection"
            icon={<TrendingUp className="w-6 h-6 text-purple-500" />}
            badge="Bestseller"
            badgeVariant="bestseller"
            viewAllLink="/category/furniture"
            gradient="from-purple-950/10 to-fuchsia-950/10"
          />
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <ProductCarousel
            products={relatedProducts}
            title="Complete Your Home"
            subtitle="Smart Home & Accessories to complement your furniture"
            icon={<Sparkles className="w-6 h-6 text-fuchsia-500" />}
            badge="Trending"
            badgeVariant="trending"
            viewAllLink="/products"
            gradient="from-fuchsia-950/10 to-violet-950/10"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">All Furniture</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our complete collection of modern furniture for every room.
              </p>
            </motion.div>
            
            {furnitureProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ModernProductGrid products={furnitureProducts} />
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Sofa className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No furniture available at the moment.</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-violet-600 to-purple-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-violet-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Home className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Create Your Dream Space</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Free design consultation and room planning available with our expert team.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-violet-600 hover:bg-white/90">
                Start Designing
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

export default FurniturePage;
