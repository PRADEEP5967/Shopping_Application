import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Wifi, Shield, Lightbulb, Thermometer, Lock, Sparkles, Trophy, ArrowRight, Smartphone, Zap } from "lucide-react";
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

const SmartHomePage: React.FC = () => {
  const smartHomeProducts = useMemo(() => 
    products.filter(p => p.category?.toLowerCase() === 'smart home' || p.category?.toLowerCase() === 'electronics'),
    []
  );

  const featuredProducts = useMemo(() => smartHomeProducts.slice(0, 10), [smartHomeProducts]);
  const bestsellers = useMemo(() => [...smartHomeProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10), [smartHomeProducts]);
  const relatedProducts = useMemo(() => smartHomeProducts.slice(5, 15), [smartHomeProducts]);

  const features = [
    { icon: Wifi, title: "Seamless Connectivity", desc: "Works with all major smart platforms" },
    { icon: Shield, title: "Enhanced Security", desc: "24/7 monitoring and protection" },
    { icon: Zap, title: "Energy Efficient", desc: "Reduce bills with smart automation" },
    { icon: Smartphone, title: "Remote Control", desc: "Control everything from anywhere" }
  ];

  const stats = [
    { value: "2M+", label: "Smart Homes Powered" },
    { value: "4.8★", label: "Customer Rating" },
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "50%", label: "Energy Savings" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-blue-950 via-background to-cyan-950">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 text-sm px-4 py-2">
                  <Home className="w-4 h-4 mr-2" />
                  Smart Home Solutions
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent leading-tight"
              >
                Connected Living Made Simple
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                Transform your home with intelligent automation. Control lighting, security, climate, and more from anywhere.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-8 shadow-lg shadow-blue-500/25">
                  <Home className="mr-2 h-5 w-5" />
                  Explore Smart Home
                </Button>
                <Button size="lg" variant="outline" className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10">
                  Build Your Setup
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-blue-900/30 via-cyan-900/30 to-blue-900/30 border-y border-blue-500/20">
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
                  <div className="text-3xl md:text-4xl font-black text-blue-400 mb-1">{stat.value}</div>
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
                Why Go Smart?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience the future of home living with intelligent automation
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
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-950/50 to-cyan-950/50 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
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
          title="Top Rated Smart Devices"
          subtitle="The highest-rated smart home products"
          icon={<Sparkles className="h-6 w-6 text-blue-400" />}
          badge="Top Picks"
          badgeVariant="featured"
          gradient="from-blue-600 to-cyan-600"
        />

        <ProductCarousel 
          products={bestsellers}
          title="Bestselling Smart Home"
          subtitle="Most popular automation products"
          icon={<Trophy className="h-6 w-6 text-cyan-400" />}
          badge="Bestsellers"
          badgeVariant="bestseller"
          gradient="from-cyan-600 to-teal-600"
        />

        {/* Category Highlights */}
        <section className="py-16 bg-gradient-to-br from-blue-950/30 to-cyan-950/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-3 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { icon: Lightbulb, title: "Smart Lighting", desc: "Automated lighting solutions", color: "from-blue-600 to-cyan-600" },
                { icon: Lock, title: "Security Systems", desc: "Protect your home 24/7", color: "from-cyan-600 to-teal-600" },
                { icon: Thermometer, title: "Climate Control", desc: "Smart thermostats & HVAC", color: "from-teal-600 to-emerald-600" }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 cursor-pointer group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <category.icon className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.desc}</p>
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300 p-0">
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
          subtitle="Recommended smart home additions"
          icon={<Wifi className="h-6 w-6 text-teal-400" />}
          badge="Recommended"
          badgeVariant="trending"
          gradient="from-teal-600 to-emerald-600"
        />

        {/* Related Categories */}
        <div className="container mx-auto px-4 py-12">
          <RelatedCategoriesGrid currentCategorySlug="smart-home" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmartHomePage;
