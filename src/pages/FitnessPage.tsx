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
import { ArrowRight, Dumbbell, Sparkles, TrendingUp, Star, Heart, Zap, Target, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

const FitnessPage = () => {
  const allProducts = getAllProducts();
  // Get fitness related products (wearables with fitness features + accessories)
  const fitnessProducts = allProducts.filter(product => 
    product.category === 'Wearables' || 
    (product.category === 'Accessories' && product.name.toLowerCase().includes('fitness'))
  );
  
  // Get featured/bestseller products
  const featuredProducts = useMemo(() => {
    return fitnessProducts.filter(p => p.rating && p.rating >= 4.5).slice(0, 10);
  }, [fitnessProducts]);
  
  const bestsellers = useMemo(() => {
    return [...fitnessProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10);
  }, [fitnessProducts]);
  
  // Related categories products
  const relatedProducts = useMemo(() => {
    return allProducts.filter(p => ['Shoes', 'Electronics'].includes(p.category)).slice(0, 10);
  }, [allProducts]);

  const features = [
    {
      icon: Heart,
      title: 'Health Monitoring',
      description: '24/7 heart rate, sleep tracking, and wellness insights for optimal health.',
      gradient: 'from-rose-500 to-red-500'
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set and achieve fitness goals with personalized workout recommendations.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Timer,
      title: 'Performance Analytics',
      description: 'Advanced metrics for running, cycling, swimming, and strength training.',
      gradient: 'from-blue-500 to-indigo-500'
    }
  ];

  const workoutTypes = [
    { name: 'Running', icon: '🏃', count: 28 },
    { name: 'Strength', icon: '💪', count: 35 },
    { name: 'Yoga', icon: '🧘', count: 18 },
    { name: 'Cycling', icon: '🚴', count: 22 }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-green-950/20 via-emerald-950/20 to-teal-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30">
                <Zap className="w-3 h-3 mr-1" />
                Power Your Fitness
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Fitness & Wellness Hub
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Achieve your fitness goals with smart trackers, workout gear, and wellness technology designed for athletes of all levels.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:scale-105 transition-all border-0">
                  <Dumbbell className="mr-2 w-5 h-5" />
                  Shop Fitness
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-green-500/30 text-foreground hover:bg-green-500/10 transition-all">
                  View Trackers
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Workout Type Pills */}
        <section className="py-8 bg-card/50 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {workoutTypes.map((cat, index) => (
                <motion.button
                  key={cat.name}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-background border border-border hover:border-green-500/50 hover:bg-green-500/10 transition-all"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Train Smarter</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Technology that adapts to your training style and helps you reach peak performance.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-green-500/30 transition-all duration-300"
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
        <section className="py-12 bg-gradient-to-r from-green-950/20 to-emerald-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: `${fitnessProducts.length}+`, label: 'Products' },
                { value: '100+', label: 'Workout Modes' },
                { value: '1M+', label: 'Active Users' },
                { value: '5★', label: 'App Rating' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-green-400 mb-2">{stat.value}</div>
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
            title="Top Fitness Gear"
            subtitle="Highest-rated fitness trackers and equipment"
            icon={<Star className="w-6 h-6 text-green-500" />}
            badge="Featured"
            badgeVariant="featured"
            viewAllLink="/category/fitness"
            gradient="from-green-950/10 to-emerald-950/10"
          />
        )}

        {/* Bestsellers Carousel */}
        {bestsellers.length > 0 && (
          <ProductCarousel
            products={bestsellers}
            title="Bestselling Fitness"
            subtitle="Most loved by athletes worldwide"
            icon={<TrendingUp className="w-6 h-6 text-emerald-500" />}
            badge="Bestseller"
            badgeVariant="bestseller"
            viewAllLink="/category/fitness"
            gradient="from-emerald-950/10 to-teal-950/10"
          />
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <ProductCarousel
            products={relatedProducts}
            title="Complete Your Setup"
            subtitle="Shoes & Electronics to enhance your training"
            icon={<Sparkles className="w-6 h-6 text-teal-500" />}
            badge="Trending"
            badgeVariant="trending"
            viewAllLink="/products"
            gradient="from-teal-950/10 to-green-950/10"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">All Fitness Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our complete fitness collection for every workout style.
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
                <p className="text-muted-foreground mb-4">No fitness products available at the moment.</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 to-emerald-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Zap className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Start your fitness journey today with premium gear and smart tracking technology.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-white/90">
                Get Started
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

export default FitnessPage;
