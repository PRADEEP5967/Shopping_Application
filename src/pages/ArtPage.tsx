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
import { ArrowRight, Star, TrendingUp, Package, Palette, Brush, Frame, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';

const ArtPage = () => {
  const allProducts = getAllProducts();
  const artProducts = allProducts.filter(product => 
    product.category === 'Art' || product.name?.toLowerCase().includes('art') || product.name?.toLowerCase().includes('paint')
  );

  const featuredProducts = useMemo(() => artProducts.filter(p => p.rating && p.rating >= 4.5).slice(0, 10), [artProducts]);
  const bestsellers = useMemo(() => [...artProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10), [artProducts]);
  const relatedProducts = useMemo(() => allProducts.filter(p => ['Accessories', 'Furniture'].includes(p.category)).slice(0, 10), [allProducts]);

  const features = [
    { icon: Palette, title: 'Art Supplies', description: 'Professional-grade paints, brushes, and more.', gradient: 'from-pink-500 to-rose-500' },
    { icon: Frame, title: 'Wall Art', description: 'Beautiful prints and frames for your space.', gradient: 'from-rose-500 to-red-500' },
    { icon: Brush, title: 'Creative Tools', description: 'Everything artists need to create masterpieces.', gradient: 'from-red-500 to-orange-500' }
  ];

  const subcategories = [
    { name: 'Paintings', icon: Palette, count: '15+' },
    { name: 'Art Supplies', icon: Brush, count: '25+' },
    { name: 'Frames', icon: Frame, count: '12+' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-pink-950/20 via-rose-950/20 to-red-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-pink-500/20 text-pink-300 border-pink-500/30"><Palette className="w-3 h-3 mr-1" />Art Collection</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent">Art & Crafts</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Unleash your creativity with our collection of art supplies, wall art, and creative tools.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 hover:scale-105 transition-all border-0">
                  <Palette className="mr-2 w-5 h-5" />Shop Now<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-pink-500/30 text-foreground hover:bg-pink-500/10 transition-all"><TrendingUp className="mr-2 w-5 h-5" />View Trending</Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subcategories.map((sub, index) => (
                <motion.div key={sub.name} className="group p-6 bg-card rounded-xl border border-border hover:border-pink-500/50 transition-all duration-300 cursor-pointer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-500/10 group-hover:bg-pink-500/20 rounded-lg flex items-center justify-center transition-all"><sub.icon className="w-6 h-6 text-pink-400" /></div>
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose Our Art Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Quality materials for every artist.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div key={feature.title} className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-pink-500/30 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}><feature.icon className="w-10 h-10 text-white" /></div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-r from-pink-950/20 to-rose-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[{ value: `${artProducts.length || 52}+`, label: 'Products' }, { value: '4.8', label: 'Avg Rating' }, { value: '2000+', label: 'Happy Artists' }, { value: 'Pro', label: 'Quality' }].map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="text-3xl font-bold text-pink-400 mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {featuredProducts.length > 0 && <ProductCarousel products={featuredProducts} title="Top Rated Art" subtitle="Highest-rated products" icon={<Star className="w-6 h-6 text-pink-500" />} badge="Featured" badgeVariant="featured" viewAllLink="/category/art" gradient="from-pink-950/10 to-rose-950/10" />}
        {bestsellers.length > 0 && <ProductCarousel products={bestsellers} title="Bestselling Art" subtitle="Most popular picks" icon={<TrendingUp className="w-6 h-6 text-rose-500" />} badge="Bestseller" badgeVariant="bestseller" viewAllLink="/category/art" gradient="from-rose-950/10 to-pink-950/10" />}
        {relatedProducts.length > 0 && <ProductCarousel products={relatedProducts} title="Related Products" subtitle="Accessories & Furniture" icon={<Package className="w-6 h-6 text-red-500" />} badge="Related" badgeVariant="trending" viewAllLink="/products" gradient="from-red-950/10 to-pink-950/10" />}

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-4 text-foreground">All Art Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Browse our complete art collection.</p>
            </motion.div>
            {artProducts.length > 0 ? (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}><ModernProductGrid products={artProducts} /></motion.div>
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <Palette className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No art products available yet. Check back soon!</p>
                <Link to="/products"><Button className="bg-gradient-to-r from-pink-600 to-rose-600">View All Products</Button></Link>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-pink-600 to-rose-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Brush className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Unleash Your Creativity</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">Find everything you need to create beautiful art.</p>
              <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-white/90">Shop All Art<ArrowRight className="ml-2 w-5 h-5" /></Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArtPage;
