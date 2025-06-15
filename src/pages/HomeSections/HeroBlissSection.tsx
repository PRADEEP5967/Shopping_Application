
import React from "react";
import { motion } from "framer-motion";

const HeroBlissSection: React.FC = () => (
  <section className="relative py-20 flex flex-col justify-center bg-gradient-to-br from-blue-200 via-white to-blue-50 overflow-hidden animate-fade-in">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-pink-100/30 to-white pointer-events-none" />
    <div className="container mx-auto relative z-10 px-4 text-center flex flex-col items-center">
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5 bg-gradient-to-r from-blue-600 via-violet-500 to-pink-400 bg-clip-text text-transparent animate-scale-in"
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        Modern Shopping, Blissful Living.
      </motion.h1>
      <motion.p
        className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 font-medium animate-fade-in"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.1 }}
      >
        Elevate how you discover, save, and buy. Explore trending essentials, trusted by thousands, with world-class support every step of your journey.
      </motion.p>
      <motion.a
        href="#featured-products"
        className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 hover:from-pink-500 hover:to-indigo-500 transition-all animate-scale-in"
        whileTap={{ scale: 0.96 }}
      >
        Start Shopping Now
      </motion.a>
    </div>
  </section>
);

export default HeroBlissSection;
