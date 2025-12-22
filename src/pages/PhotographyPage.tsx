import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Aperture, Focus, Image, Sun, Sparkles, Trophy, ArrowRight, Film, Palette } from "lucide-react";
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

const PhotographyPage: React.FC = () => {
  const photographyProducts = useMemo(() => 
    products.filter(p => p.category?.toLowerCase() === 'photography' || p.category?.toLowerCase() === 'electronics'),
    []
  );

  const featuredProducts = useMemo(() => photographyProducts.slice(0, 10), [photographyProducts]);
  const bestsellers = useMemo(() => [...photographyProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 10), [photographyProducts]);
  const relatedProducts = useMemo(() => photographyProducts.slice(5, 15), [photographyProducts]);

  const features = [
    { icon: Aperture, title: "Pro-Grade Lenses", desc: "Crystal clear optics for stunning shots" },
    { icon: Focus, title: "Advanced AF", desc: "Lightning-fast autofocus technology" },
    { icon: Sun, title: "Low Light Master", desc: "Exceptional performance in any lighting" },
    { icon: Film, title: "Cinema Quality", desc: "8K video recording capabilities" }
  ];

  const stats = [
    { value: "500K+", label: "Photographers Trust Us" },
    { value: "4.9★", label: "Average Rating" },
    { value: "100+", label: "Camera Models" },
    { value: "2yr", label: "Pro Warranty" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-slate-950 via-background to-zinc-950">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-500/5 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-6 bg-amber-500/20 text-amber-300 border-amber-500/30 text-sm px-4 py-2">
                  <Camera className="w-4 h-4 mr-2" />
                  Photography Equipment
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent leading-tight"
              >
                Capture Perfect Moments
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                Professional cameras, premium lenses, and studio equipment for photographers who demand excellence.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold px-8 shadow-lg shadow-amber-500/25">
                  <Camera className="mr-2 h-5 w-5" />
                  Explore Cameras
                </Button>
                <Button size="lg" variant="outline" className="border-amber-500/50 text-amber-300 hover:bg-amber-500/10">
                  View Pro Kits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-amber-900/30 via-orange-900/30 to-amber-900/30 border-y border-amber-500/20">
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
                  <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">{stat.value}</div>
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
                Why Photographers Choose Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional-grade equipment trusted by award-winning photographers globally
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
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-950/50 to-zinc-950/50 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
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
          title="Top Rated Cameras"
          subtitle="The highest-rated photography equipment"
          icon={<Sparkles className="h-6 w-6 text-amber-400" />}
          badge="Top Picks"
          badgeVariant="featured"
          gradient="from-amber-600 to-orange-600"
        />

        <ProductCarousel 
          products={bestsellers}
          title="Bestselling Equipment"
          subtitle="Most popular photography gear this season"
          icon={<Trophy className="h-6 w-6 text-orange-400" />}
          badge="Bestsellers"
          badgeVariant="bestseller"
          gradient="from-orange-600 to-rose-600"
        />

        {/* Category Highlights */}
        <section className="py-16 bg-gradient-to-br from-slate-950/30 to-zinc-950/30">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-3 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { icon: Camera, title: "DSLR & Mirrorless", desc: "Professional camera bodies", color: "from-amber-600 to-orange-600" },
                { icon: Aperture, title: "Premium Lenses", desc: "Wide to telephoto range", color: "from-orange-600 to-rose-600" },
                { icon: Palette, title: "Studio Equipment", desc: "Lighting and accessories", color: "from-rose-600 to-pink-600" }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 cursor-pointer group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <category.icon className="h-12 w-12 text-amber-400 mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.desc}</p>
                  <Button variant="ghost" className="text-amber-400 hover:text-amber-300 p-0">
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
          subtitle="Recommended for photography enthusiasts"
          icon={<Image className="h-6 w-6 text-rose-400" />}
          badge="Recommended"
          badgeVariant="trending"
          gradient="from-rose-600 to-pink-600"
        />

        {/* Related Categories */}
        <div className="container mx-auto px-4 py-12">
          <RelatedCategoriesGrid currentCategorySlug="photography" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PhotographyPage;
