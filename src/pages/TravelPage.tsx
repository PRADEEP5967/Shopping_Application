import React, { useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductCarousel from '@/components/product/ProductCarousel';
import CategoryProductsSection from '@/components/category/CategoryProductsSection';
import { getAllProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, TrendingUp, Package, Plane, Luggage, Map, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const TravelPage = () => {
  const allProducts = getAllProducts();
  const travelProducts = allProducts.filter(product => 
    product.category === 'Travel' || product.name?.toLowerCase().includes('travel') || product.name?.toLowerCase().includes('luggage')
  );

  const featuredProducts = useMemo(() => travelProducts.filter(p => p.rating && p.rating >= 4.5).slice(0, 10), [travelProducts]);
  const bestsellers = useMemo(() => [...travelProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10), [travelProducts]);
  const relatedProducts = useMemo(() => allProducts.filter(p => ['Accessories', 'Electronics'].includes(p.category)).slice(0, 10), [allProducts]);

  const features = [
    { icon: Luggage, title: 'Premium Luggage', description: 'Durable suitcases and travel bags.', gradient: 'from-sky-500 to-blue-500' },
    { icon: Compass, title: 'Travel Essentials', description: 'Everything you need on the go.', gradient: 'from-blue-500 to-indigo-500' },
    { icon: Map, title: 'Adventure Ready', description: 'Gear up for your next adventure.', gradient: 'from-indigo-500 to-violet-500' }
  ];

  const subcategories = [
    { name: 'Luggage', icon: Luggage, count: '20+' },
    { name: 'Backpacks', icon: Package, count: '15+' },
    { name: 'Accessories', icon: Compass, count: '25+' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-sky-950/20 via-blue-950/20 to-indigo-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-sky-500/20 text-sky-300 border-sky-500/30"><Plane className="w-3 h-3 mr-1" />Travel Collection</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Travel & Luggage</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Pack smart and travel in style with our premium travel essentials and luggage.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 hover:scale-105 transition-all border-0">
                  <Plane className="mr-2 w-5 h-5" />Shop Now<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-sky-500/30 text-foreground hover:bg-sky-500/10 transition-all"><TrendingUp className="mr-2 w-5 h-5" />View Trending</Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subcategories.map((sub, index) => (
                <motion.div key={sub.name} className="group p-6 bg-card rounded-xl border border-border hover:border-sky-500/50 transition-all duration-300 cursor-pointer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-500/10 group-hover:bg-sky-500/20 rounded-lg flex items-center justify-center transition-all"><sub.icon className="w-6 h-6 text-sky-400" /></div>
                    <div><h3 className="font-semibold text-foreground">{sub.name}</h3><p className="text-sm text-muted-foreground">{sub.count} products</p></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose Our Travel Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Quality gear for every adventure.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div key={feature.title} className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-sky-500/30 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}><feature.icon className="w-10 h-10 text-white" /></div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-r from-sky-950/20 to-blue-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[{ value: `${travelProducts.length || 60}+`, label: 'Products' }, { value: '4.8', label: 'Avg Rating' }, { value: '5000+', label: 'Happy Travelers' }, { value: '10 Year', label: 'Warranty' }].map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="text-3xl font-bold text-sky-400 mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {featuredProducts.length > 0 && <ProductCarousel products={featuredProducts} title="Top Rated Travel" subtitle="Highest-rated travel gear" icon={<Star className="w-6 h-6 text-sky-500" />} badge="Featured" badgeVariant="featured" viewAllLink="/category/travel" gradient="from-sky-950/10 to-blue-950/10" />}
        {bestsellers.length > 0 && <ProductCarousel products={bestsellers} title="Bestselling Travel" subtitle="Most popular picks" icon={<TrendingUp className="w-6 h-6 text-blue-500" />} badge="Bestseller" badgeVariant="bestseller" viewAllLink="/category/travel" gradient="from-blue-950/10 to-sky-950/10" />}
        {relatedProducts.length > 0 && <ProductCarousel products={relatedProducts} title="Related Products" subtitle="Accessories & Electronics" icon={<Package className="w-6 h-6 text-indigo-500" />} badge="Related" badgeVariant="trending" viewAllLink="/products" gradient="from-indigo-950/10 to-sky-950/10" />}

        <CategoryProductsSection
          products={travelProducts}
          title="All Travel Products"
          subtitle="Browse our complete travel collection with filters."
          emptyIcon={Luggage}
          emptyMessage="No travel products available yet. Check back soon!"
        />

        <section className="py-16 bg-gradient-to-br from-sky-600 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Plane className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Adventure Awaits</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">Get ready for your next journey with premium travel essentials.</p>
              <Button size="lg" variant="secondary" className="bg-white text-sky-600 hover:bg-white/90">Shop All Travel<ArrowRight className="ml-2 w-5 h-5" /></Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TravelPage;
