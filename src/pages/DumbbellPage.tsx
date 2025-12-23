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
import { ArrowRight, Dumbbell, Star, TrendingUp, Sparkles, Target, Zap, Shield, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const DumbbellPage: React.FC = () => {
  const allProducts = getAllProducts();
  const fitnessProducts = allProducts.filter(product => 
    product.category.toLowerCase().includes('fitness') || 
    product.name.toLowerCase().includes('dumbbell') ||
    product.name.toLowerCase().includes('weight') ||
    product.name.toLowerCase().includes('gym')
  );
  
  // Get featured/bestseller products (use wearables if no fitness specific)
  const featuredProducts = useMemo(() => {
    const products = fitnessProducts.length > 0 ? fitnessProducts : allProducts.filter(p => p.category === 'Wearables');
    return products.filter(p => p.rating && p.rating >= 4.5).slice(0, 10);
  }, [fitnessProducts, allProducts]);
  
  const bestsellers = useMemo(() => {
    const products = fitnessProducts.length > 0 ? fitnessProducts : allProducts.filter(p => p.category === 'Wearables');
    return [...products].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10);
  }, [fitnessProducts, allProducts]);
  
  const relatedProducts = useMemo(() => {
    return allProducts.filter(p => ['Wearables', 'Electronics'].includes(p.category)).slice(0, 10);
  }, [allProducts]);

  const features = [
    {
      icon: Dumbbell,
      title: 'Versatile Sets',
      description: 'Weights from beginner to advanced for every fitness level.',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Shield,
      title: 'Durable Build',
      description: 'Premium materials for everyday workouts that last.',
      gradient: 'from-slate-500 to-zinc-500'
    },
    {
      icon: Zap,
      title: 'Easy Delivery',
      description: 'Safe home delivery throughout the country.',
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-950/20 via-slate-950/20 to-zinc-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Dumbbell className="w-3 h-3 mr-1" />
                Dumbbells & Fitness Gear
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-slate-400 to-zinc-400 bg-clip-text text-transparent">
                Build Strength at Home
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Shop high-quality dumbbells and fitness accessories for every workout style—durable, comfortable, and built for results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 hover:scale-105 transition-all border-0">
                  <Dumbbell className="mr-2 w-5 h-5" />
                  Shop Fitness Gear
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-blue-500/30 text-foreground hover:bg-blue-500/10 transition-all">
                  <Target className="mr-2 w-5 h-5" />
                  Workout Sets
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose Our Fitness Range?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our dumbbells and accessories are chosen for performance and convenience, helping you unlock your fitness goals.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-blue-500/30 transition-all duration-300"
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
        <section className="py-12 bg-gradient-to-r from-blue-950/20 to-slate-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '100+', label: 'Products' },
                { value: '4.8', label: 'Avg Rating' },
                { value: '8K+', label: 'Athletes' },
                { value: 'Pro', label: 'Quality' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
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
            title="Top Rated Fitness Gear"
            subtitle="Our highest-rated workout equipment"
            icon={<Star className="w-6 h-6 text-blue-500" />}
            badge="Featured"
            badgeVariant="featured"
            viewAllLink="/category/dumbbell"
            gradient="from-blue-950/10 to-slate-950/10"
          />
        )}

        {/* Bestsellers Carousel */}
        {bestsellers.length > 0 && (
          <ProductCarousel
            products={bestsellers}
            title="Bestselling Equipment"
            subtitle="Most popular with fitness enthusiasts"
            icon={<TrendingUp className="w-6 h-6 text-slate-500" />}
            badge="Bestseller"
            badgeVariant="bestseller"
            viewAllLink="/category/dumbbell"
            gradient="from-slate-950/10 to-zinc-950/10"
          />
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <ProductCarousel
            products={relatedProducts}
            title="Complete Your Training"
            subtitle="Wearables & Tech for tracking progress"
            icon={<Sparkles className="w-6 h-6 text-zinc-500" />}
            badge="Trending"
            badgeVariant="trending"
            viewAllLink="/products"
            gradient="from-zinc-950/10 to-gray-950/10"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Fitness Equipment</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional-grade equipment for your home gym.
              </p>
            </motion.div>
            
            {fitnessProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ModernProductGrid products={fitnessProducts} />
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Dumbbell className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Fitness equipment coming soon!</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-blue-600 to-slate-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4 py-8">
          <RelatedCategoriesGrid currentCategorySlug="dumbbell" />
        </div>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-slate-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Activity className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Start Your Fitness Journey</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Get the gear you need to achieve your fitness goals from home.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-white/90">
                Shop Fitness Equipment
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

export default DumbbellPage;