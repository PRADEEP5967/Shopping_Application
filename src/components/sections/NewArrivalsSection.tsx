import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllProducts } from '@/data/products';

const NewArrivalsSection = () => {
  // Get all products and sort by newest (using id as proxy for creation order)
  const allProducts = getAllProducts();
  const newArrivals = allProducts
    .slice()
    .sort((a, b) => b.id.localeCompare(a.id))
    .slice(0, 8);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-1.5 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Just Landed
            </Badge>
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Clock className="w-3 h-3 mr-1" />
              Fresh This Week
            </Badge>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
            New Arrivals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the latest additions to our collection. Be the first to explore trending products across all categories.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Link to={`/products/${product.id}`}>
                <div className="relative bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  {/* New Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold px-2.5 py-1 shadow-lg">
                      NEW
                    </Badge>
                  </div>

                  {/* Trending indicator for first 3 items */}
                  {index < 3 && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-orange-500/90 backdrop-blur-sm rounded-full p-1.5">
                        <TrendingUp className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-muted/30">
                    <img
                      src={product.images?.[0] || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Quick view overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        Quick View
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {product.category}
                      </Badge>
                      {product.rating && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          {product.rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {product.originalPrice && (
                        <Badge className="bg-red-500/10 text-red-500 text-xs">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Link to="/new-arrivals" className="flex items-center gap-2">
              View All New Arrivals
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
