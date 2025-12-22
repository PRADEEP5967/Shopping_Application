import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gamepad2, Zap, Trophy, Cpu, Target, Monitor, Headphones, Sparkles, ArrowRight } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";
import ProductCarousel from "@/components/product/ProductCarousel";
import { products } from "@/data/products/productsData";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const GamingPage: React.FC = () => {
  const gamingProducts = useMemo(() => 
    products.filter(p => p.category?.toLowerCase() === 'gaming' || p.category?.toLowerCase() === 'electronics'),
    []
  );

  const featuredProducts = useMemo(() => gamingProducts.slice(0, 10), [gamingProducts]);
  const bestsellers = useMemo(() => [...gamingProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10), [gamingProducts]);
  const relatedProducts = useMemo(() => gamingProducts.slice(5, 15), [gamingProducts]);

  const features = [
    { icon: Zap, title: "Ultra-Low Latency", desc: "Sub-millisecond response times for competitive edge" },
    { icon: Trophy, title: "Pro-Grade Equipment", desc: "Used by esports professionals worldwide" },
    { icon: Cpu, title: "High Performance", desc: "Cutting-edge technology for maximum FPS" },
    { icon: Target, title: "Precision Control", desc: "Ergonomic designs for accurate gameplay" }
  ];

  const stats = [
    { value: "1M+", label: "Pro Gamers Trust Us" },
    { value: "4.9★", label: "Customer Rating" },
    { value: "50+", label: "Esports Partners" },
    { value: "24/7", label: "Gaming Support" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-purple-950 via-background to-indigo-950">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30 text-sm px-4 py-2">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Gaming Excellence
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent leading-tight"
              >
                Level Up Your Gaming
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                Premium gaming gear engineered for victory. From high-refresh monitors to mechanical keyboards, dominate every match.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-8 shadow-lg shadow-purple-500/25">
                  <Gamepad2 className="mr-2 h-5 w-5" />
                  Shop Gaming Gear
                </Button>
                <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10">
                  View Pro Setup
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-purple-900/50 via-indigo-900/50 to-purple-900/50 border-y border-purple-500/20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-black text-purple-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Why Gamers Choose Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional-grade gaming equipment trusted by millions of players worldwide
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-purple-950/50 to-indigo-950/50 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Product Carousels */}
        <ProductCarousel 
          products={featuredProducts}
          title="Top Rated Gaming Gear"
          subtitle="The highest-rated equipment from pro gamers"
          icon={<Sparkles className="h-6 w-6 text-purple-400" />}
          badge="Top Picks"
          badgeVariant="featured"
          gradient="from-purple-600 to-indigo-600"
        />

        <ProductCarousel 
          products={bestsellers}
          title="Bestselling Equipment"
          subtitle="Most popular gaming gear this season"
          icon={<Trophy className="h-6 w-6 text-amber-400" />}
          badge="Bestsellers"
          badgeVariant="bestseller"
          gradient="from-amber-600 to-orange-600"
        />

        {/* Category Highlights */}
        <section className="py-16 bg-gradient-to-br from-purple-950/30 to-indigo-950/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-3 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { icon: Monitor, title: "Gaming Monitors", desc: "High refresh rate displays", color: "from-purple-600 to-pink-600" },
                { icon: Headphones, title: "Gaming Audio", desc: "Immersive surround sound", color: "from-indigo-600 to-blue-600" },
                { icon: Gamepad2, title: "Controllers", desc: "Precision gaming controls", color: "from-violet-600 to-purple-600" }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 cursor-pointer group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <category.icon className="h-12 w-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.desc}</p>
                  <Button variant="ghost" className="text-purple-400 hover:text-purple-300 p-0">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <ProductCarousel 
          products={relatedProducts}
          title="You May Also Like"
          subtitle="Recommended based on gaming trends"
          icon={<Target className="h-6 w-6 text-indigo-400" />}
          badge="Recommended"
          badgeVariant="trending"
          gradient="from-indigo-600 to-violet-600"
        />

        {/* Related Categories */}
        <div className="container mx-auto px-4 py-12">
          <RelatedCategoriesGrid currentCategorySlug="gaming" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GamingPage;
