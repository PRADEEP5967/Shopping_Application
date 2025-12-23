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
import { ArrowRight, Tv, Wifi, Volume2, Star, TrendingUp, Sparkles, Monitor, Zap, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const TvPage: React.FC = () => {
  const allProducts = getAllProducts();
  const tvProducts = allProducts.filter(product => 
    product.category.toLowerCase().includes('tv') || 
    product.category === 'Electronics' ||
    product.name.toLowerCase().includes('tv') ||
    product.name.toLowerCase().includes('monitor')
  );
  
  // Get featured/bestseller products
  const featuredProducts = useMemo(() => {
    return tvProducts.filter(p => p.rating && p.rating >= 4.5).slice(0, 10);
  }, [tvProducts]);
  
  const bestsellers = useMemo(() => {
    return [...tvProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10);
  }, [tvProducts]);
  
  const relatedProducts = useMemo(() => {
    return allProducts.filter(p => ['Smart Home', 'Gaming'].includes(p.category)).slice(0, 10);
  }, [allProducts]);

  const features = [
    {
      icon: Wifi,
      title: 'Smart Features',
      description: 'App integration, Wi-Fi, voice control—you name it.',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Volume2,
      title: 'Superior Sound',
      description: 'Enjoy clear audio and immersive surround sound.',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: Monitor,
      title: 'Ultra HD Quality',
      description: 'Stunning visuals in 4K and HDR for cinema experience.',
      gradient: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-950/20 via-indigo-950/20 to-violet-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Tv className="w-3 h-3 mr-1" />
                TV & Entertainment
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Watch, Stream & Enjoy
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Browse the latest smart TVs with ultra-clear displays and advanced features for immersive home entertainment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all border-0">
                  <Tv className="mr-2 w-5 h-5" />
                  Shop TV Collection
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-blue-500/30 text-foreground hover:bg-blue-500/10 transition-all">
                  <Play className="mr-2 w-5 h-5" />
                  Compare Models
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose Our TVs?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From smart to 4K displays, our range of TVs blends crisp visuals, rich sound, and seamless connectivity.
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
        <section className="py-12 bg-gradient-to-r from-blue-950/20 to-indigo-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '4K+', label: 'Resolution' },
                { value: '120Hz', label: 'Refresh Rate' },
                { value: 'Dolby', label: 'Atmos Sound' },
                { value: 'Smart', label: 'Features' }
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
            title="Top Rated TVs"
            subtitle="Our highest-rated displays and entertainment systems"
            icon={<Star className="w-6 h-6 text-blue-500" />}
            badge="Featured"
            badgeVariant="featured"
            viewAllLink="/category/tv"
            gradient="from-blue-950/10 to-indigo-950/10"
          />
        )}

        {/* Bestsellers Carousel */}
        {bestsellers.length > 0 && (
          <ProductCarousel
            products={bestsellers}
            title="Bestselling Entertainment"
            subtitle="Most popular picks for your home theater"
            icon={<TrendingUp className="w-6 h-6 text-indigo-500" />}
            badge="Bestseller"
            badgeVariant="bestseller"
            viewAllLink="/category/tv"
            gradient="from-indigo-950/10 to-violet-950/10"
          />
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <ProductCarousel
            products={relatedProducts}
            title="Complete Your Setup"
            subtitle="Smart Home & Gaming accessories"
            icon={<Sparkles className="w-6 h-6 text-violet-500" />}
            badge="Trending"
            badgeVariant="trending"
            viewAllLink="/products"
            gradient="from-violet-950/10 to-purple-950/10"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">TV Collection</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our premium selection of TVs and entertainment systems.
              </p>
            </motion.div>
            
            {tvProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ModernProductGrid products={tvProducts.slice(0, 12)} />
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Tv className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">TV products coming soon!</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4 py-8">
          <RelatedCategoriesGrid currentCategorySlug="tv" />
        </div>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Zap className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Transform Your Entertainment</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Experience cinema-quality entertainment right in your living room.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-white/90">
                Shop All TVs
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

export default TvPage;