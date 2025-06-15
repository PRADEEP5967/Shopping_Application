
import React from "react";
import { ShoppingBag, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

// Data previously called CATEGORY_ADVANTAGES
const CATEGORY_ADVANTAGES = [
  {
    icon: <ShoppingBag className="w-8 h-8 text-primary" strokeWidth={2.5} />,
    title: "Curated Products",
    desc: "Best-in-class picks by passionate experts. Discover quality, not clutter.",
  },
  {
    icon: <Users className="w-8 h-8 text-secondary" strokeWidth={2.5} />,
    title: "Caring Community",
    desc: "20K+ happy shoppers & growing — you’re part of a buzzing, trusted crowd.",
  },
  {
    icon: <Star className="w-8 h-8 text-yellow-400" strokeWidth={2.5} />,
    title: "Top Reviews",
    desc: "Thousands of five-star reviews from real verified customers.",
  },
];

const CategoryAdvantagesSection: React.FC = () => (
  <section className="py-12 bg-white dark:bg-gray-900 animate-fade-in">
    <div className="container mx-auto px-4">
      <motion.div
        className="grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {CATEGORY_ADVANTAGES.map((adv, i) => (
          <motion.div
            key={adv.title}
            className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-xl p-8 flex flex-col items-center text-center shadow group hover:scale-105 transition-transform duration-200"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
          >
            <span className="mb-4">{adv.icon}</span>
            <span className="font-semibold text-lg text-gray-900 dark:text-white">{adv.title}</span>
            <span className="mt-2 text-md text-gray-600 dark:text-gray-400">{adv.desc}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default CategoryAdvantagesSection;
