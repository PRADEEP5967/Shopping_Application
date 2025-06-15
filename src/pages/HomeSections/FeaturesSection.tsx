
import React from "react";
import AnimatedFeatureCard from "@/components/modern/AnimatedFeatureCard";
import { Zap, ShieldCheck, Headphones, Truck, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

// Features data previously called HOMEPAGE_FEATURES
const FEATURES = [
  {
    icon: Zap,
    title: "Blazing Performance",
    description: "Instant page loads, smooth shopping—technology should never slow you down.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    description: "Cutting-edge encryption and privacy—shop confidently.",
  },
  {
    icon: Headphones,
    title: "24/7 Real Human Support",
    description: "Our friendly team is always here to help, any time.",
  },
  {
    icon: Truck,
    title: "Express, Tracked Delivery",
    description: "Get your order faster, fully tracked. No more waiting.",
  },
  {
    icon: RefreshCw,
    title: "Effortless Returns",
    description: "Change your mind? No problem—easy, hassle-free returns.",
  },
];

const FeaturesSection: React.FC = () => (
  <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5 animate-fade-in">
    <div className="container mx-auto px-4">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="text-center mb-12"
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Features That Delight
        </motion.h2>
        <motion.p
          className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Lightning-fast experiences, real security, human support—plus seamless delivery and returns.
        </motion.p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {FEATURES.map((feature, i) => (
          <AnimatedFeatureCard key={feature.title} index={i} {...feature} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
