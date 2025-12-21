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
import { ArrowRight, Heart, Sparkles, TrendingUp, Star, Activity, Shield, Stethoscope, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const HealthPage = () => {
  const allProducts = getAllProducts();
  // Get health-related products (wearables with health features)
  const healthProducts = allProducts.filter(product => 
    product.category === 'Wearables' ||
    (product.features && product.features.some(f => 
      f.toLowerCase().includes('health') || 
      f.toLowerCase().includes('heart') ||
      f.toLowerCase().includes('sleep') ||
      f.toLowerCase().includes('wellness')
    ))
  );
  
  // Get featured/bestseller products
  const featuredProducts = useMemo(() => {
    return healthProducts.filter(p => p.rating && p.rating >= 4.5).slice(0, 10);
  }, [healthProducts]);
  
  const bestsellers = useMemo(() => {
    return [...healthProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10);
  }, [healthProducts]);
  
  // Related categories products
  const relatedProducts = useMemo(() => {
    return allProducts.filter(p => ['Electronics', 'Smart Home'].includes(p.category)).slice(0, 10);
  }, [allProducts]);

  const features = [
    {
      icon: Activity,
      title: 'Vital Monitoring',
      description: 'Track heart rate, blood oxygen, and stress levels in real-time for complete health awareness.',
      gradient: 'from-rose-500 to-red-500'
    },
    {
      icon: Brain,
      title: 'Sleep Analysis',
      description: 'Advanced sleep tracking with insights to improve your rest and recovery.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Health Insights',
      description: 'AI-powered health recommendations based on your personal data and trends.',
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  const healthCategories = [
    { name: 'Heart Health', icon: '❤️', count: 28 },
    { name: 'Sleep', icon: '😴', count: 22 },
    { name: 'Fitness', icon: '💪', count: 35 },
    { name: 'Wellness', icon: '🧘', count: 18 }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-rose-950/20 via-red-950/20 to-pink-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Heartbeat Animation */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              <Heart className="w-96 h-96 text-rose-400" fill="currentColor" />
            </motion.div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-rose-500/20 text-rose-300 border-rose-500/30">
                <Stethoscope className="w-3 h-3 mr-1" />
                Health & Wellness
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Your Health, Empowered
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Advanced health monitoring devices and wellness technology to help you live your healthiest life, every day.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 hover:scale-105 transition-all border-0">
                  <Heart className="mr-2 w-5 h-5" />
                  Shop Health Tech
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-rose-500/30 text-foreground hover:bg-rose-500/10 transition-all">
                  View Monitors
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Health Category Pills */}
        <section className="py-8 bg-card/50 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {healthCategories.map((cat, index) => (
                <motion.button
                  key={cat.name}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-background border border-border hover:border-rose-500/50 hover:bg-rose-500/10 transition-all"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Know Your Body</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Advanced sensors and AI-powered insights for comprehensive health monitoring.
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
        <section className="py-12 bg-gradient-to-r from-rose-950/20 to-red-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: `${healthProducts.length}+`, label: 'Products' },
                { value: '24/7', label: 'Monitoring' },
                { value: '99.9%', label: 'Accuracy' },
                { value: 'FDA', label: 'Cleared' }
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
            title="Top Health Devices"
            subtitle="Highest-rated health monitoring technology"
            icon={<Star className="w-6 h-6 text-rose-500" />}
            badge="Featured"
            badgeVariant="featured"
            viewAllLink="/category/health"
            gradient="from-rose-950/10 to-red-950/10"
          />
        )}

        {/* Bestsellers Carousel */}
        {bestsellers.length > 0 && (
          <ProductCarousel
            products={bestsellers}
            title="Bestselling Health Tech"
            subtitle="Most trusted by health-conscious users"
            icon={<TrendingUp className="w-6 h-6 text-red-500" />}
            badge="Bestseller"
            badgeVariant="bestseller"
            viewAllLink="/category/health"
            gradient="from-red-950/10 to-pink-950/10"
          />
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <ProductCarousel
            products={relatedProducts}
            title="Complete Your Wellness"
            subtitle="Electronics & Smart Home for holistic health"
            icon={<Sparkles className="w-6 h-6 text-pink-500" />}
            badge="Trending"
            badgeVariant="trending"
            viewAllLink="/products"
            gradient="from-pink-950/10 to-rose-950/10"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">All Health Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our complete collection of health monitoring devices.
              </p>
            </motion.div>
            
            {healthProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ModernProductGrid products={healthProducts} />
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No health products available at the moment.</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-rose-600 to-red-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-rose-600 to-red-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Activity className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Take Control of Your Health</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Start your wellness journey with smart health monitoring technology.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-rose-600 hover:bg-white/90">
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

export default HealthPage;
