
import React from "react";
import { Zap, Cpu, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Cpu className="w-8 h-8 text-cyan-600 mb-2" />,
    title: "Latest Technology",
    description: "Stay ahead with cutting-edge processors, fast memory, and premium displays.",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-blue-600 mb-2" />,
    title: "Smart Integration",
    description: "Product ecosystem for seamless integration with smart home and mobile devices.",
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-500 mb-2" />,
    title: "Powerful Performance",
    description: "Unmatched speed, superb battery life, and reliable performance for every task.",
  },
];

const BestFeaturesElectronics = () => (
  <section className="py-10 bg-cyan-50">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-cyan-700 text-center mb-6 animate-fade-in">Why Shop Electronics Here?</h2>
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

export default BestFeaturesElectronics;
