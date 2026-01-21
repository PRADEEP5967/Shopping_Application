import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Map, 
  Home, 
  ShoppingBag, 
  Grid3X3, 
  Gift, 
  BookOpen, 
  User, 
  HelpCircle,
  Building2,
  FileText,
  Search,
  Heart,
  ShoppingCart,
  Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Sitemap = () => {
  const sections = [
    {
      title: 'Main Pages',
      icon: Home,
      links: [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Categories', path: '/categories' },
        { name: 'New Arrivals', path: '/new-arrivals' },
        { name: 'Deals & Discounts', path: '/deals-discounts' },
        { name: 'Special Offers', path: '/special-offers' },
        { name: 'API Showcase', path: '/api-showcase' },
      ]
    },
    {
      title: 'Shop by Category',
      icon: Grid3X3,
      links: [
        { name: 'Electronics', path: '/category/electronics' },
        { name: 'Clothing', path: '/category/clothing' },
        { name: 'Accessories', path: '/category/accessories' },
        { name: 'Baby Products', path: '/category/baby' },
        { name: 'Smart Home', path: '/category/smart-home' },
        { name: 'Gaming', path: '/category/gaming' },
        { name: 'Fitness', path: '/category/fitness' },
        { name: 'Audio', path: '/category/audio' },
        { name: 'Computers', path: '/category/computers' },
        { name: 'Photography', path: '/category/photography' },
        { name: 'Wearables', path: '/category/wearables' },
        { name: 'Furniture', path: '/category/furniture' },
        { name: 'Shoes', path: '/category/shoes' },
        { name: 'Health', path: '/category/health' },
        { name: 'TV & Entertainment', path: '/category/tv' },
      ]
    },
    {
      title: 'Shopping',
      icon: ShoppingCart,
      links: [
        { name: 'Shopping Cart', path: '/cart' },
        { name: 'Wishlist', path: '/wishlist' },
        { name: 'Checkout', path: '/checkout' },
        { name: 'Order Tracking', path: '/order-tracking' },
        { name: 'Order History', path: '/order-history' },
        { name: 'Subscriptions', path: '/subscriptions' },
      ]
    },
    {
      title: 'Search & Discovery',
      icon: Search,
      links: [
        { name: 'Search', path: '/search' },
        { name: 'Visual Search', path: '/visual-search' },
        { name: 'Product Comparison', path: '/product-comparison' },
        { name: 'Personalized Offers', path: '/offers' },
      ]
    },
    {
      title: 'Content & Blog',
      icon: BookOpen,
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'Buying Guides', path: '/buying-guides' },
      ]
    },
    {
      title: 'Account',
      icon: User,
      links: [
        { name: 'My Account', path: '/my-account' },
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
        { name: 'Orders', path: '/orders' },
      ]
    },
    {
      title: 'Company',
      icon: Building2,
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Team', path: '/team' },
        { name: 'Services', path: '/services' },
        { name: 'Careers', path: '/careers' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Small Business', path: '/small-business' },
      ]
    },
    {
      title: 'Features',
      icon: Package,
      links: [
        { name: 'Performance', path: '/performance' },
        { name: 'Efficiency', path: '/efficiency' },
        { name: 'Quality', path: '/quality' },
      ]
    },
    {
      title: 'Help & Support',
      icon: HelpCircle,
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQ', path: '/faq' },
      ]
    },
    {
      title: 'Policies',
      icon: FileText,
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Return Policy', path: '/return-policy' },
        { name: 'Shipping Policy', path: '/shipping-policy' },
        { name: 'Shopping Policy', path: '/shopping-policy' },
        { name: 'Returns & Exchanges', path: '/returns' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/20 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Map className="h-4 w-4" />
              <span className="text-sm font-medium">Site Navigation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Sitemap
            </h1>
            <p className="text-lg text-muted-foreground">
              Find everything you're looking for. Browse all pages and sections of our website.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full border-border/50 hover:border-primary/30 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.links.map((link) => (
                          <li key={link.path}>
                            <Link
                              to={link.path}
                              className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                            >
                              <span className="h-1 w-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sitemap;
