
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap, Users, Star, TrendingUp, PlayCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdvancedHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const heroSlides = [
    {
      title: "Premium Shopping Experience",
      subtitle: "Discover Amazing Products",
      description: "Shop the latest trends with confidence. Premium quality, fast delivery, and exceptional customer service.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80",
      cta: "Shop Now",
      link: "/products"
    },
    {
      title: "Smart Technology Collection",
      subtitle: "Innovation at Your Fingertips",
      description: "Explore cutting-edge electronics and smart devices that transform your daily life.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80",
      cta: "Explore Tech",
      link: "/category/electronics"
    },
    {
      title: "Exclusive Deals & Offers",
      subtitle: "Limited Time Only",
      description: "Don't miss out on incredible savings across all categories. Premium products at unbeatable prices.",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=2000&q=80",
      cta: "View Deals",
      link: "/deals-discounts"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section 
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
      style={{ y, opacity }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Background image slider */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 0.3 : 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/60 to-indigo-900/80" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                {heroSlides[currentSlide].subtitle}
              </Badge>
            </motion.div>

            {/* Title */}
            <motion.h1
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>

            {/* Description */}
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl text-blue-100 leading-relaxed max-w-lg"
            >
              {heroSlides[currentSlide].description}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-6 max-w-md"
            >
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-2 backdrop-blur-sm">
                  <Users className="w-6 h-6 text-blue-300" />
                </div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-blue-200">Customers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-2 backdrop-blur-sm">
                  <Star className="w-6 h-6 text-yellow-300" />
                </div>
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-sm text-blue-200">Rating</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-2 backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6 text-green-300" />
                </div>
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-blue-200">Products</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group px-8 py-6 text-lg"
              >
                <Link to={heroSlides[currentSlide].link}>
                  <Zap className="w-5 h-5 mr-2" />
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg"
              >
                <Link to="/about-us">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Learn More
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Interactive 3D Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-96 flex items-center justify-center">
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                  rotateX: [0, 10, 0],
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
                className="w-80 h-80 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="w-60 h-60 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center"
                >
                  <Sparkles className="w-20 h-20 text-white/60" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white shadow-lg scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default AdvancedHeroSection;
