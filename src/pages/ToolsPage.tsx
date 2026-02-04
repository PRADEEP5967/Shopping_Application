import React, { useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductCarousel from '@/components/product/ProductCarousel';
import CategoryProductsSection from '@/components/category/CategoryProductsSection';
import { getAllProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, TrendingUp, Package, Wrench, Hammer, Drill, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';

const ToolsPage = () => {
  const allProducts = getAllProducts();
  const toolsProducts = allProducts.filter(product => 
    product.category === 'Tools' || product.name?.toLowerCase().includes('tool') || product.name?.toLowerCase().includes('drill')
  );

  const featuredProducts = useMemo(() => toolsProducts.filter(p => p.rating && p.rating >= 4.5).slice(0, 10), [toolsProducts]);
  const bestsellers = useMemo(() => [...toolsProducts].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 10), [toolsProducts]);
  const relatedProducts = useMemo(() => allProducts.filter(p => ['Smart Home', 'Electronics'].includes(p.category)).slice(0, 10), [allProducts]);

  const features = [
    { icon: Wrench, title: 'Professional Tools', description: 'Quality tools for every job.', gradient: 'from-zinc-500 to-gray-600' },
    { icon: Hammer, title: 'Heavy Duty', description: 'Built tough for demanding work.', gradient: 'from-gray-600 to-slate-600' },
    { icon: Drill, title: 'Power Tools', description: 'Electric and cordless options.', gradient: 'from-slate-600 to-zinc-600' }
  ];

  const subcategories = [
    { name: 'Power Tools', icon: Drill, count: '25+' },
    { name: 'Hand Tools', icon: Hammer, count: '30+' },
    { name: 'Measuring', icon: Ruler, count: '15+' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-zinc-950/20 via-gray-950/20 to-slate-950/20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-zinc-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-zinc-500/20 text-zinc-300 border-zinc-500/30"><Wrench className="w-3 h-3 mr-1" />Tools Collection</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-zinc-400 via-gray-400 to-slate-400 bg-clip-text text-transparent">Tools & Hardware</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Get the job done right with our professional-grade tools and hardware.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-gradient-to-r from-zinc-600 to-gray-600 hover:from-zinc-700 hover:to-gray-700 hover:scale-105 transition-all border-0">
                  <Wrench className="mr-2 w-5 h-5" />Shop Now<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-zinc-500/30 text-foreground hover:bg-zinc-500/10 transition-all"><TrendingUp className="mr-2 w-5 h-5" />View Trending</Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subcategories.map((sub, index) => (
                <motion.div key={sub.name} className="group p-6 bg-card rounded-xl border border-border hover:border-zinc-500/50 transition-all duration-300 cursor-pointer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-500/10 group-hover:bg-zinc-500/20 rounded-lg flex items-center justify-center transition-all"><sub.icon className="w-6 h-6 text-zinc-400" /></div>
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
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Choose Our Tools</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Professional quality for every project.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div key={feature.title} className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-zinc-500/30 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}><feature.icon className="w-10 h-10 text-white" /></div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-r from-zinc-950/20 to-gray-950/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[{ value: `${toolsProducts.length || 70}+`, label: 'Tools' }, { value: '4.7', label: 'Avg Rating' }, { value: '8000+', label: 'Happy DIYers' }, { value: 'Lifetime', label: 'Warranty' }].map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <div className="text-3xl font-bold text-zinc-400 mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {featuredProducts.length > 0 && <ProductCarousel products={featuredProducts} title="Top Rated Tools" subtitle="Highest-rated products" icon={<Star className="w-6 h-6 text-zinc-500" />} badge="Featured" badgeVariant="featured" viewAllLink="/category/tools" gradient="from-zinc-950/10 to-gray-950/10" />}
        {bestsellers.length > 0 && <ProductCarousel products={bestsellers} title="Bestselling Tools" subtitle="Most popular picks" icon={<TrendingUp className="w-6 h-6 text-gray-500" />} badge="Bestseller" badgeVariant="bestseller" viewAllLink="/category/tools" gradient="from-gray-950/10 to-zinc-950/10" />}
        {relatedProducts.length > 0 && <ProductCarousel products={relatedProducts} title="Related Products" subtitle="Smart Home & Electronics" icon={<Package className="w-6 h-6 text-slate-500" />} badge="Related" badgeVariant="trending" viewAllLink="/products" gradient="from-slate-950/10 to-zinc-950/10" />}

        <CategoryProductsSection
          products={toolsProducts}
          title="All Tools"
          subtitle="Browse our complete tools collection with filters."
          emptyIcon={Wrench}
          emptyMessage="No tools available yet. Check back soon!"
        />

        <section className="py-16 bg-gradient-to-br from-zinc-600 to-gray-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Hammer className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-4">Build Something Great</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">Get the right tools for your next project.</p>
              <Button size="lg" variant="secondary" className="bg-white text-zinc-600 hover:bg-white/90">Shop All Tools<ArrowRight className="ml-2 w-5 h-5" /></Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolsPage;
