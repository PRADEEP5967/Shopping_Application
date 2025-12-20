import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ModernProductGrid from "@/components/ModernProductGrid";
import { getAllProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Monitor, Cpu, HardDrive, Zap, Laptop, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const ComputersPage = () => {
  const allProducts = getAllProducts();
  const computersProducts = allProducts.filter(product => product.category === 'Computers');

  const features = [
    {
      icon: Cpu,
      title: 'Powerful Processors',
      description: 'Latest-gen Intel and AMD processors for blazing-fast performance.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: HardDrive,
      title: 'Fast Storage',
      description: 'Ultra-fast NVMe SSDs for instant boot times and quick file access.',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: Laptop,
      title: 'Premium Design',
      description: 'Sleek, lightweight designs with stunning high-resolution displays.',
      gradient: 'from-red-500 to-rose-500'
    }
  ];

  const categories = [
    { name: 'Laptops', icon: Laptop, count: '15+' },
    { name: 'Desktops', icon: Monitor, count: '8+' },
    { name: 'Workstations', icon: Server, count: '5+' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-orange-950/20 via-red-950/20 to-amber-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-orange-500/20 text-orange-300 border-orange-500/30">
                <Zap className="w-3 h-3 mr-1" />
                High Performance
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                Computers & Laptops
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover powerful computing solutions for work, gaming, and creativity. From ultra-thin laptops to high-performance workstations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 hover:scale-105 transition-all border-0">
                  <Monitor className="mr-2 w-5 h-5" />
                  Shop Computers
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-orange-500/30 text-foreground hover:bg-orange-500/10 transition-all">
                  View Laptops
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Quick Links */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  className="text-center p-4 md:p-6 rounded-xl bg-background border border-border hover:border-orange-500/30 transition-all cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <category.icon className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-orange-500 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground text-sm md:text-base">{category.name}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{category.count} Products</p>
                </motion.div>
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose Our Computers</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We curate only the best computing devices with cutting-edge technology and premium build quality.
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
        <section className="py-12 bg-gradient-to-r from-orange-950/20 to-red-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: `${computersProducts.length}+`, label: 'Products' },
                { value: '4K+', label: 'Display Resolution' },
                { value: '16GB+', label: 'RAM Options' },
                { value: '3 Year', label: 'Warranty' }
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

        {/* Products Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-foreground">Featured Computers</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our premium selection of laptops, desktops, and computing accessories.
              </p>
            </motion.div>
            
            {computersProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ModernProductGrid products={computersProducts} />
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Monitor className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No computer products available at the moment.</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-orange-600 to-red-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-orange-600 to-red-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Cpu className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Power Your Productivity</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Whether you're a professional, gamer, or creative, we have the perfect computer for your needs.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-white/90">
                Explore All Computers
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

export default ComputersPage;
