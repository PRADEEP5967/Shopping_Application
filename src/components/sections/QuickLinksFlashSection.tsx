
import React from "react";
import { Flame, TrendingUp, Percent, Star } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    label: "Flash Sale",
    icon: <Flame className="w-6 h-6 text-red-500" />,
    desc: "Up to 60% Off today!",
    to: "/deals-discounts"
  },
  {
    label: "Trending",
    icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
    desc: "This week's favorites",
    to: "/products"
  },
  {
    label: "Best Sellers",
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    desc: "Top-rated products",
    to: "/products"
  },
  {
    label: "Special Offers",
    icon: <Percent className="w-6 h-6 text-green-500" />,
    desc: "Members-only deals",
    to: "/special-offers"
  }
];

const QuickLinksFlashSection: React.FC = () => (
  <section className="py-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-fade-in">
    <div className="container mx-auto px-4 flex flex-wrap gap-4 justify-center">
      {sections.map((sec) => (
        <Link to={sec.to} key={sec.label} className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-90 rounded-xl shadow hover:shadow-lg group hover:scale-105 transition-transform duration-150 border border-gray-100 animate-fade-in">
          <span>{sec.icon}</span>
          <span className="font-semibold">{sec.label}</span>
          <span className="ml-2 text-xs text-gray-500">{sec.desc}</span>
        </Link>
      ))}
    </div>
  </section>
);

export default QuickLinksFlashSection;
