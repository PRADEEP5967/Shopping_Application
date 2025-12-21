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
import { ArrowRight, Headphones, Sparkles, TrendingUp, Star, Volume2, Mic, Radio, Music } from 'lucide-react';
import { motion } from 'framer-motion';

const AudioPage = () => {
  const allProducts = getAllProducts();
  // Get audio-related products from Electronics (headphones, speakers, etc.)
  const audioProducts = allProducts.filter(product => 
    product.category === 'Electronics' && 
    (product.name.toLowerCase().includes('headphone') || 
     product.name.toLowerCase().includes('speaker') ||
     product.name.toLowerCase().includes('audio') ||
     product.name.toLowerCase().includes('earbuds') ||
     product.name.toLowerCase().includes('sound'))
  );

  // If no specific audio products, show all electronics
  const displayProducts = audioProducts.length > 0 ? audioProducts : allProducts.filter(p => p.category === 'Electronics').slice(0, 12);
  
  // Get featured/bestseller products
  const featuredProducts = useMemo(() => {
    return displayProducts.filter(p => p.rating && p.rating >= 4.5).slice(0, 10);
  }, [displayProducts]);
  
  const bestsellers = useMemo(() => {
    return [...displayProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10);
  }, [displayProducts]);
  
  // Related categories products
  const relatedProducts = useMemo(() => {
    return allProducts.filter(p => ['Wearables', 'Smart Home'].includes(p.category)).slice(0, 10);
  }, [allProducts]);

  const features = [
    {
      icon: Volume2,
      title: 'Hi-Fi Sound',
      description: 'Studio-quality audio with deep bass, crystal highs, and immersive soundscapes.',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Mic,
      title: 'Active Noise Cancellation',
      description: 'Block out the world with advanced ANC technology for pure listening.',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Radio,
      title: 'Wireless Freedom',
      description: 'Seamless Bluetooth connectivity with long battery life and fast charging.',
      gradient: 'from-rose-500 to-pink-500'
    }
  ];

  const audioCategories = [
    { name: 'Headphones', icon: '🎧', count: 42 },
    { name: 'Earbuds', icon: '🎵', count: 38 },
    { name: 'Speakers', icon: '🔊', count: 25 },
    { name: 'Soundbars', icon: '📺', count: 18 }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-cyan-950/20 via-blue-950/20 to-indigo-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Sound Wave Animation */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 bg-cyan-400 rounded-full mx-1"
                animate={{
                  height: ['20px', '60px', '20px'],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                <Music className="w-3 h-3 mr-1" />
                Premium Audio
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Immersive Sound Experience
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover premium headphones, speakers, and audio equipment that deliver studio-quality sound for music lovers and audiophiles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 hover:scale-105 transition-all border-0">
                  <Headphones className="mr-2 w-5 h-5" />
                  Shop Audio
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-cyan-500/30 text-foreground hover:bg-cyan-500/10 transition-all">
                  View Headphones
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Audio Category Pills */}
        <section className="py-8 bg-card/50 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {audioCategories.map((cat, index) => (
                <motion.button
                  key={cat.name}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-background border border-border hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Audio Excellence</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience sound like never before with cutting-edge audio technology.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-cyan-500/30 transition-all duration-300"
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
        <section className="py-12 bg-gradient-to-r from-cyan-950/20 to-blue-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: `${displayProducts.length}+`, label: 'Products' },
                { value: '40hr', label: 'Battery Life' },
                { value: '45dB', label: 'Noise Reduction' },
                { value: 'Hi-Res', label: 'Audio Certified' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
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
            title="Top Rated Audio"
            subtitle="Highest-rated headphones and speakers"
            icon={<Star className="w-6 h-6 text-cyan-500" />}
            badge="Featured"
            badgeVariant="featured"
            viewAllLink="/category/audio"
            gradient="from-cyan-950/10 to-blue-950/10"
          />
        )}

        {/* Bestsellers Carousel */}
        {bestsellers.length > 0 && (
          <ProductCarousel
            products={bestsellers}
            title="Bestselling Audio"
            subtitle="Most loved by music enthusiasts"
            icon={<TrendingUp className="w-6 h-6 text-blue-500" />}
            badge="Bestseller"
            badgeVariant="bestseller"
            viewAllLink="/category/audio"
            gradient="from-blue-950/10 to-indigo-950/10"
          />
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <ProductCarousel
            products={relatedProducts}
            title="Complete Your Setup"
            subtitle="Wearables & Smart Home for the full experience"
            icon={<Sparkles className="w-6 h-6 text-indigo-500" />}
            badge="Trending"
            badgeVariant="trending"
            viewAllLink="/products"
            gradient="from-indigo-950/10 to-cyan-950/10"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">All Audio Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our complete collection of premium audio equipment.
              </p>
            </motion.div>
            
            {displayProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ModernProductGrid products={displayProducts} />
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Headphones className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No audio products available at the moment.</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-cyan-600 to-blue-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-cyan-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Music className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Hear the Difference</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Upgrade your listening experience with premium audio that brings music to life.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-cyan-600 hover:bg-white/90">
                Explore Collection
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

export default AudioPage;
