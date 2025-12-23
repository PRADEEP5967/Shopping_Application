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
import { ArrowRight, Star, TrendingUp, Package, Heart, Shield, Sparkles, Gem, Watch } from 'lucide-react';
import { motion } from 'framer-motion';

const AccessoriesPage = () => {
  const allProducts = getAllProducts();
  const accessoriesProducts = allProducts.filter(product => product.category === 'Accessories');

  // Get featured/bestseller products
  const featuredProducts = useMemo(() => {
    return accessoriesProducts.filter(p => p.rating && p.rating >= 4.5).slice(0, 10);
  }, [accessoriesProducts]);
  
  const bestsellers = useMemo(() => {
    return [...accessoriesProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10);
  }, [accessoriesProducts]);
  
  const relatedProducts = useMemo(() => {
    return allProducts.filter(p => ['Clothing', 'Wearables'].includes(p.category)).slice(0, 10);
  }, [allProducts]);

  const features = [
    {
      icon: Gem,
      title: 'Premium Craftsmanship',
      description: 'Meticulously designed accessories made with attention to every detail.',
      gradient: 'from-amber-500 to-yellow-500'
    },
    {
      icon: Shield,
      title: 'Durable Materials',
      description: 'Built to last with high-quality materials that withstand daily use.',
      gradient: 'from-slate-500 to-zinc-500'
    },
    {
      icon: Package,
      title: 'Lifestyle Ready',
      description: 'Functional accessories that seamlessly fit your everyday lifestyle.',
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  const subcategories = [
    { name: 'Bags & Backpacks', icon: Package, count: '15+' },
    { name: 'Wallets & Cases', icon: Shield, count: '8+' },
    { name: 'Lifestyle', icon: Heart, count: '12+' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-amber-950/20 via-yellow-950/20 to-orange-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-amber-500/20 text-amber-300 border-amber-500/30">
                <Star className="w-3 h-3 mr-1" />
                Premium Collection
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Accessories Collection
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover our curated selection of premium accessories designed to complement your style and elevate your everyday look.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 hover:scale-105 transition-all border-0">
                  <Gem className="mr-2 w-5 h-5" />
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-amber-500/30 text-foreground hover:bg-amber-500/10 transition-all">
                  <TrendingUp className="mr-2 w-5 h-5" />
                  View Trending
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Subcategories */}
        <section className="py-12 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subcategories.map((sub, index) => {
                const IconComponent = sub.icon;
                return (
                  <motion.div
                    key={sub.name}
                    className="group p-6 bg-card rounded-xl border border-border hover:border-amber-500/50 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-500/10 group-hover:bg-amber-500/20 rounded-lg flex items-center justify-center transition-all">
                        <IconComponent className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{sub.name}</h3>
                        <p className="text-sm text-muted-foreground">{sub.count} products</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose Our Accessories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Premium accessories that combine style with functionality.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-amber-500/30 transition-all duration-300"
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
        <section className="py-12 bg-gradient-to-r from-amber-950/20 to-yellow-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: `${accessoriesProducts.length}+`, label: 'Products' },
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
                  <div className="text-3xl font-bold text-amber-400 mb-2">{stat.value}</div>
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
            title="Top Rated Accessories"
            subtitle="Our highest-rated bags, wallets, and more"
            icon={<Star className="w-6 h-6 text-amber-500" />}
            badge="Featured"
            badgeVariant="featured"
            viewAllLink="/category/accessories"
            gradient="from-amber-950/10 to-yellow-950/10"
          />
        )}

        {/* Bestsellers Carousel */}
        {bestsellers.length > 0 && (
          <ProductCarousel
            products={bestsellers}
            title="Bestselling Accessories"
            subtitle="Most popular picks from our customers"
            icon={<TrendingUp className="w-6 h-6 text-orange-500" />}
            badge="Bestseller"
            badgeVariant="bestseller"
            viewAllLink="/category/accessories"
            gradient="from-orange-950/10 to-amber-950/10"
          />
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <ProductCarousel
            products={relatedProducts}
            title="Complete Your Style"
            subtitle="Clothing & Wearables to match"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Featured Accessories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From premium backpacks to elegant wallets, discover accessories that combine style with functionality.
              </p>
            </motion.div>
            
            {accessoriesProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ModernProductGrid products={accessoriesProducts} />
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No accessories products available at the moment.</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-amber-600 to-yellow-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-amber-600 to-yellow-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Gem className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Elevate Your Style</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Find the perfect accessories to complete your look and express your unique style.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-amber-600 hover:bg-white/90">
                Shop All Accessories
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

export default AccessoriesPage;