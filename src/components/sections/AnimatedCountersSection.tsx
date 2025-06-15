
import React, { useEffect, useRef, useState } from "react";
import { ShoppingBag, ShieldCheck, Smile, Zap } from "lucide-react";

const counters = [
  { label: "Products Sold", value: 83500, icon: ShoppingBag },
  { label: "Happy Customers", value: 47921, icon: Smile },
  { label: "Uptime", value: 99.9, suffix: "%", icon: Zap },
  { label: "Secure Transactions", value: 245312, icon: ShieldCheck }
];

const AnimatedCounter = ({ value, suffix }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const increment = Math.max(1, Math.floor(value / 60));
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [value, increment]);
  return <span>{count.toLocaleString()}{suffix || ""}</span>;
};

const AnimatedCountersSection: React.FC = () => (
  <section className="py-12 bg-white animate-fade-in">
    <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {counters.map(({ label, value, icon: Icon, suffix }, i) => (
        <div key={label} className="flex flex-col items-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="rounded-full bg-blue-100 p-4 mb-4 shadow">
            <Icon className="w-8 h-8 text-blue-600" />
          </div>
          <div className="font-bold text-2xl text-blue-700">
            <AnimatedCounter value={value} suffix={suffix} />
          </div>
          <span className="text-gray-600 text-sm">{label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default AnimatedCountersSection;
