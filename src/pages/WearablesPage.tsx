import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ModernProductGrid from "@/components/ModernProductGrid";
import { getAllProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Watch, Heart, Activity, Sparkles, Battery, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

const WearablesPage = () => {
  const allProducts = getAllProducts();
  const wearablesProducts = allProducts.filter(product => product.category === 'Wearables');

  const features = [
    {
      icon: Heart,
      title: 'Health Tracking',
      description: 'Monitor your heart rate, sleep patterns, and overall wellness 24/7.',
      gradient: 'from-rose-500 to-pink-500'
    },
    {
      icon: Activity,
      title: 'Fitness Monitoring',
      description: 'Track workouts, steps, calories, and achieve your fitness goals.',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      icon: Wifi,
      title: 'Smart Connectivity',
      description: 'Stay connected with notifications, calls, and messages on your wrist.',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-pink-950/20 via-purple-950/20 to-violet-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-pink-500/20 text-pink-300 border-pink-500/30">
                <Sparkles className="w-3 h-3 mr-1" />
                New Collection
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Wearables Collection
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover the future of personal technology. Smart watches, fitness trackers, and wearable devices that keep you connected and healthy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:scale-105 transition-all border-0">
                  <Watch className="mr-2 w-5 h-5" />
                  Shop Wearables
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-pink-500/30 text-foreground hover:bg-pink-500/10 transition-all">
                  View Smartwatches
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Smart Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Advanced technology designed to enhance your lifestyle and keep you at your best.
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
        <section className="py-12 bg-gradient-to-r from-pink-950/20 to-purple-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: `${wearablesProducts.length}+`, label: 'Products' },
                { value: '7 Days', label: 'Battery Life' },
                { value: '50m', label: 'Water Resistant' },
                { value: '24/7', label: 'Health Tracking' }
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

        {/* Products Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-foreground">Featured Wearables</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our premium selection of smartwatches, fitness trackers, and wearable technology.
              </p>
            </motion.div>
            
            {wearablesProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ModernProductGrid products={wearablesProducts} />
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Watch className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No wearable products available at the moment.</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-pink-600 to-purple-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-pink-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Battery className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Stay Connected, Stay Healthy</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of users who have transformed their health journey with our smart wearables.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-white/90">
                Explore All Wearables
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

export default WearablesPage;
