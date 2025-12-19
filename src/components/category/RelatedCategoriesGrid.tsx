import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LucideIcon, 
  Computer, 
  Shirt, 
  Smartphone, 
  Tv, 
  Headphones, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RelatedCategory {
  label: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  itemCount: number;
  trending?: boolean;
  gradient: string;
}

const CATEGORIES: RelatedCategory[] = [
  {
    label: "Computers",
    slug: "monitor",
    icon: Computer,
    description: "Laptops, desktops & accessories",
    itemCount: 156,
    trending: true,
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
  },
  {
    label: "Electronics",
    slug: "smartphone",
    icon: Smartphone,
    description: "Mobile, TV, headphones & more",
    itemCount: 243,
    trending: true,
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },
  {
    label: "Clothing",
    slug: "shirt",
    icon: Shirt,
    description: "Shirts, dresses & apparel",
    itemCount: 189,
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
  },
  {
    label: "TV & Entertainment",
    slug: "tv",
    icon: Tv,
    description: "Smart & LED TVs",
    itemCount: 87,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
  {
    label: "Audio",
    slug: "headphones",
    icon: Headphones,
    description: "Premium audio gear",
    itemCount: 124,
    trending: true,
    gradient: "from-emerald-500/20 via-green-500/10 to-transparent",
  },
];

type Props = {
  currentCategorySlug: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const RelatedCategoriesGrid: React.FC<Props> = ({ currentCategorySlug }) => {
  const categories = CATEGORIES.filter(cat => cat.slug !== currentCategorySlug);

  return (
    <section className="mt-16 mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg" />
            <div className="relative bg-gradient-to-br from-primary to-secondary p-2.5 rounded-lg">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Related Categories
            </h2>
            <p className="text-sm text-muted-foreground">
              Discover more products you might love
            </p>
          </div>
        </div>
        <Link 
          to="/categories"
          className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
        >
          View All
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Categories Grid */}
      <motion.div 
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {categories.map(({ label, slug, icon: Icon, description, itemCount, trending, gradient }) => (
          <motion.div key={slug} variants={itemVariants}>
            <Link
              to={`/category/${slug}`}
              className="group relative flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Glow Effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-primary/0 via-primary/20 to-secondary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10 p-5 flex flex-col h-full">
                {/* Header with Icon and Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    {/* Icon Glow */}
                    <div className="absolute inset-0 bg-primary/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-muted group-hover:bg-primary/10 rounded-xl p-3 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {trending && (
                    <Badge 
                      variant="secondary" 
                      className="bg-success/10 text-success border-success/20 text-xs gap-1"
                    >
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </Badge>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {label}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {description}
                </p>

                {/* Footer Stats */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    <span>{itemCount.toLocaleString()} items</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Hover Indicator Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile View All Link */}
      <div className="sm:hidden mt-6 text-center">
        <Link 
          to="/categories"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View All Categories
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default RelatedCategoriesGrid;
