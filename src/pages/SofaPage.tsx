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
import { ArrowRight, Sofa, Star, TrendingUp, Sparkles, Palette, Truck, Shield, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const SofaPage: React.FC = () => {
  const allProducts = getAllProducts();
  const sofaProducts = allProducts.filter(product => 
    product.category === 'Furniture' || 
    product.name.toLowerCase().includes('sofa') ||
    product.name.toLowerCase().includes('chair') ||
    product.name.toLowerCase().includes('desk')
  );
  
  // Get featured/bestseller products
  const featuredProducts = useMemo(() => {
    return sofaProducts.filter(p => p.rating && p.rating >= 4.5).slice(0, 10);
  }, [sofaProducts]);
  
  const bestsellers = useMemo(() => {
    return [...sofaProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10);
  }, [sofaProducts]);
  
  const relatedProducts = useMemo(() => {
    return allProducts.filter(p => ['Smart Home', 'Electronics'].includes(p.category)).slice(0, 10);
  }, [allProducts]);

  const features = [
    {
      icon: Sofa,
      title: 'Plush Comfort',
      description: 'Supportive seating, soft fabrics, relaxing lounging experience.',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      icon: Palette,
      title: 'Modern Styles',
      description: 'Chic designs for every living room aesthetic.',
      gradient: 'from-rose-500 to-pink-500'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick shipping & easy returns across the country.',
      gradient: 'from-emerald-500 to-teal-500'
    }
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
                <Sofa className="w-3 h-3 mr-1" />
                Sofa Collection
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Relax in Style & Comfort
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover a curated range of modern sofas designed for ultimate comfort and a beautiful living space.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 hover:scale-105 transition-all border-0">
                  <Sofa className="mr-2 w-5 h-5" />
                  Shop Sofa Collection
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-orange-500/30 text-foreground hover:bg-orange-500/10 transition-all">
                  <Home className="mr-2 w-5 h-5" />
                  Living Room Sets
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose Our Sofas?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Handpicked for quality and comfort—our sofas make every home welcoming and stylish.
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
                { value: `${sofaProducts.length}+`, label: 'Products' },
                { value: '4.9', label: 'Avg Rating' },
                { value: '5K+', label: 'Happy Homes' },
                { value: '2 Year', label: 'Warranty' }
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
            title="Top Rated Furniture"
            subtitle="Our highest-rated sofas and chairs"
            icon={<Star className="w-6 h-6 text-orange-500" />}
            badge="Featured"
            badgeVariant="featured"
            viewAllLink="/category/sofa"
            gradient="from-orange-950/10 to-amber-950/10"
          />
        )}

        {/* Bestsellers Carousel */}
        {bestsellers.length > 0 && (
          <ProductCarousel
            products={bestsellers}
            title="Bestselling Furniture"
            subtitle="Most popular picks for your home"
            icon={<TrendingUp className="w-6 h-6 text-amber-500" />}
            badge="Bestseller"
            badgeVariant="bestseller"
            viewAllLink="/category/sofa"
            gradient="from-amber-950/10 to-yellow-950/10"
          />
        )}

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <ProductCarousel
            products={relatedProducts}
            title="Complete Your Home"
            subtitle="Smart Home & Electronics"
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Furniture Collection</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our premium selection of sofas, chairs, and home furniture.
              </p>
            </motion.div>
            
            {sofaProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <ModernProductGrid products={sofaProducts} />
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Sofa className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Furniture products coming soon!</p>
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-orange-600 to-amber-600">View All Products</Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4 py-8">
          <RelatedCategoriesGrid currentCategorySlug="sofa" />
        </div>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-orange-600 to-amber-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Home className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Create Your Dream Space</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Transform your living room with furniture that combines comfort and style.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-white/90">
                Shop All Furniture
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

export default SofaPage;