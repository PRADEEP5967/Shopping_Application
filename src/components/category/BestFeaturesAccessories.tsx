
import React from "react";
import { Shield, Package, Heart } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-8 h-8 text-indigo-600 mb-2" />,
    title: "Premium Quality",
    description: "Accessories crafted with attention to durability and style, built to last.",
  },
  {
    icon: <Package className="w-8 h-8 text-green-500 mb-2" />,
    title: "Functional Design",
    description: "Chic and handy—form meets function in every piece we offer.",
  },
  {
    icon: <Heart className="w-8 h-8 text-pink-500 mb-2" />,
    title: "Perfect Gift Options",
    description: "Unique and thoughtful choices for everyone on your list.",
  },
];

const BestFeaturesAccessories = () => (
  <section className="py-10 bg-indigo-50">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6 animate-fade-in">Why Shop Accessories Here?</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:scale-105 transition-all animate-fade-in">
            {f.icon}
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BestFeaturesAccessories;
