
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Shield, 
  Truck, 
  Star, 
  Users, 
  Clock, 
  Award, 
  Heart,
  Smartphone,
  Headphones
} from 'lucide-react';
import { motion } from 'framer-motion';

const ModernFeaturesShowcase = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for seamless shopping experience",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Bank-level security for all your transactions",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Fast and free shipping on orders over $50",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Carefully curated products from trusted brands",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Expert customer service whenever you need help",
      color: "from-indigo-400 to-blue-500",
      bgColor: "bg-indigo-50",
    },
    {
      icon: Clock,
      title: "Quick Processing",
      description: "Orders processed and shipped within 24 hours",
      color: "from-red-400 to-pink-500",
      bgColor: "bg-red-50",
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Award, value: "99%", label: "Satisfaction Rate" },
    { icon: Truck, value: "24h", label: "Fast Delivery" },
    { icon: Star, value: "4.9", label: "Average Rating" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
            <Heart className="w-4 h-4 mr-2" />
            Why Choose Us
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Exceptional Shopping Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're committed to providing you with the best products, service, and experience in online shopping
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    {/* Icon with animated background */}
                    <div className="relative mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full text-white shadow-lg mb-4 relative z-10`}
                      >
                        <Icon className="w-10 h-10" />
                      </motion.div>
                      
                      {/* Animated background circle */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className={`absolute inset-0 w-20 h-20 ${feature.bgColor} rounded-full opacity-20 blur-sm mx-auto`}
                      />
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed flex-grow">
                      {feature.description}
                    </p>

                    {/* Hover indicator */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "60px" }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`h-1 bg-gradient-to-r ${feature.color} rounded-full mx-auto mt-6 group-hover:w-20 transition-all duration-300`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Technology showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6">Built with Modern Technology</h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Our platform leverages cutting-edge technology to deliver exceptional performance and user experience
              </p>
              
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-3 bg-white/10 rounded-full px-6 py-3 backdrop-blur-sm"
                >
                  <Zap className="w-6 h-6" />
                  <span className="font-medium">React 18</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-3 bg-white/10 rounded-full px-6 py-3 backdrop-blur-sm"
                >
                  <Smartphone className="w-6 h-6" />
                  <span className="font-medium">Mobile First</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-3 bg-white/10 rounded-full px-6 py-3 backdrop-blur-sm"
                >
                  <Headphones className="w-6 h-6" />
                  <span className="font-medium">PWA Ready</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernFeaturesShowcase;
