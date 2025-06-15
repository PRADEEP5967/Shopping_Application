
import React from "react";
import { Heart, Sparkles, Star } from "lucide-react";

const features = [
  {
    icon: <Heart className="w-8 h-8 text-pink-500 mb-2" />,
    title: "Curated Styles",
    description: "Hand-picked selections to keep you trending and true to your style.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-orange-400 mb-2" />,
    title: "High Quality",
    description: "Premium fabrics and expert tailoring for all-day comfort and elegance.",
  },
  {
    icon: <Star className="w-8 h-8 text-yellow-500 mb-2" />,
    title: "Exclusive Collections",
    description: "Find pieces you won't see anywhere else—updated every season.",
  },
];

const BestFeaturesClothing = () => (
  <section className="py-10 bg-pink-50">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-pink-700 text-center mb-6 animate-fade-in">Why Shop Clothing Here?</h2>
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

export default BestFeaturesClothing;
