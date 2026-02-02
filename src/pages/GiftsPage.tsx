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
import { ArrowRight, Star, TrendingUp, Package, Gift, Heart, Sparkles, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

const GiftsPage = () => {
  const allProducts = getAllProducts();
  const giftsProducts = allProducts.filter(product => 
    product.category === 'Gifts' || product.name?.toLowerCase().includes('gift')
  );

  const featuredProducts = useMemo(() => giftsProducts.filter(p => p.rating && p.rating >= 4.5).slice(0, 10), [giftsProducts]);
  const bestsellers = useMemo(() => [...giftsProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10), [giftsProducts]);
  const relatedProducts = useMemo(() => allProducts.filter(p => ['Accessories', 'Jewelry'].includes(p.category)).slice(0, 10), [allProducts]);

  const features = [
    { icon: Gift, title: 'Perfect Gifts', description: 'Thoughtfully curated gifts for every occasion.', gradient: 'from-fuchsia-500 to-pink-500' },
    { icon: Heart, title: 'Made with Love', description: 'Special items that show you care.', gradient: 'from-pink-500 to-rose-500' },
    { icon: Sparkles, title: 'Gift Wrapping', description: 'Beautiful presentation for every gift.', gradient: 'from-purple-500 to-fuchsia-500' }
  ];

  const subcategories = [
    { name: 'For Him', icon: Gift, count: '20+' },
    { name: 'For Her', icon: Heart, count: '25+' },
    { name: 'Special Occasions', icon: PartyPopper, count: '15+' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-fuchsia-950/20 via-pink-950/20 to-purple-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30"><Gift className="w-3 h-3 mr-1" />Gift Collection</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Gifts & Presents</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Find the perfect gift for every occasion and make someone's day special.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 hover:scale-105 transition-all border-0">
                  <Gift className="mr-2 w-5 h-5" />Shop Now<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-fuchsia-500/30 text-foreground hover:bg-fuchsia-500/10 transition-all"><TrendingUp className="mr-2 w-5 h-5" />View Trending</Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subcategories.map((sub, index) => (
                <motion.div key={sub.name} className="group p-6 bg-card rounded-xl border border-border hover:border-fuchsia-500/50 transition-all duration-300 cursor-pointer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-fuchsia-500/10 group-hover:bg-fuchsia-500/20 rounded-lg flex items-center justify-center transition-all"><sub.icon className="w-6 h-6 text-fuchsia-400" /></div>
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose Our Gifts</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Perfect presents for every occasion.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div key={feature.title} className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-fuchsia-500/30 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}><feature.icon className="w-10 h-10 text-white" /></div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-r from-fuchsia-950/20 to-pink-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[{ value: `${giftsProducts.length || 60}+`, label: 'Gift Ideas' }, { value: '4.9', label: 'Avg Rating' }, { value: '2500+', label: 'Happy Recipients' }, { value: 'Free', label: 'Gift Wrapping' }].map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="text-3xl font-bold text-fuchsia-400 mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {featuredProducts.length > 0 && <ProductCarousel products={featuredProducts} title="Top Rated Gifts" subtitle="Highest-rated gift ideas" icon={<Star className="w-6 h-6 text-fuchsia-500" />} badge="Featured" badgeVariant="featured" viewAllLink="/category/gifts" gradient="from-fuchsia-950/10 to-pink-950/10" />}
        {bestsellers.length > 0 && <ProductCarousel products={bestsellers} title="Bestselling Gifts" subtitle="Most popular picks" icon={<TrendingUp className="w-6 h-6 text-pink-500" />} badge="Bestseller" badgeVariant="bestseller" viewAllLink="/category/gifts" gradient="from-pink-950/10 to-fuchsia-950/10" />}
        {relatedProducts.length > 0 && <ProductCarousel products={relatedProducts} title="Related Products" subtitle="Accessories & Jewelry" icon={<Package className="w-6 h-6 text-purple-500" />} badge="Related" badgeVariant="trending" viewAllLink="/products" gradient="from-purple-950/10 to-fuchsia-950/10" />}

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-4 text-foreground">All Gifts</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Browse our complete gift collection.</p>
            </motion.div>
            {giftsProducts.length > 0 ? (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><ModernProductGrid products={giftsProducts} /></motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Gift className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No gifts available yet. Check back soon!</p>
                <Link to="/products"><Button className="bg-gradient-to-r from-fuchsia-600 to-pink-600">View All Products</Button></Link>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-fuchsia-600 to-pink-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Gift className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Make Someone's Day Special</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">Find the perfect gift that shows how much you care.</p>
              <Button size="lg" variant="secondary" className="bg-white text-fuchsia-600 hover:bg-white/90">Shop All Gifts<ArrowRight className="ml-2 w-5 h-5" /></Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GiftsPage;
