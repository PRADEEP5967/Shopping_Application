import React from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Shirt,
  Sofa,
  ShoppingBag,
  Watch,
  Headphones,
  Laptop,
  Camera,
  Baby,
  Dumbbell,
  Heart,
  Tv,
  Gamepad,
  Home,
} from 'lucide-react';

const categories = [
  { name: 'Mobiles', icon: Smartphone, path: '/category/electronics', color: 'bg-blue-100 text-blue-600' },
  { name: 'Fashion', icon: Shirt, path: '/category/clothing', color: 'bg-pink-100 text-pink-600' },
  { name: 'Electronics', icon: Laptop, path: '/category/computers', color: 'bg-purple-100 text-purple-600' },
  { name: 'Furniture', icon: Sofa, path: '/category/furniture', color: 'bg-amber-100 text-amber-600' },
  { name: 'Watches', icon: Watch, path: '/category/wearables', color: 'bg-cyan-100 text-cyan-600' },
  { name: 'Audio', icon: Headphones, path: '/category/audio', color: 'bg-indigo-100 text-indigo-600' },
  { name: 'Cameras', icon: Camera, path: '/category/photography', color: 'bg-orange-100 text-orange-600' },
  { name: 'Baby', icon: Baby, path: '/category/baby', color: 'bg-sky-100 text-sky-600' },
  { name: 'Fitness', icon: Dumbbell, path: '/category/fitness', color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Health', icon: Heart, path: '/category/health', color: 'bg-red-100 text-red-600' },
  { name: 'TVs', icon: Tv, path: '/category/tv', color: 'bg-slate-100 text-slate-600' },
  { name: 'Gaming', icon: Gamepad, path: '/category/gaming', color: 'bg-rose-100 text-rose-600' },
  { name: 'Smart Home', icon: Home, path: '/category/smart-home', color: 'bg-teal-100 text-teal-600' },
  { name: 'Accessories', icon: ShoppingBag, path: '/category/accessories', color: 'bg-yellow-100 text-yellow-600' },
];

const FlipkartCategoryGrid: React.FC = () => {
  return (
    <div className="bg-white py-4 px-2 sm:px-4 shadow-sm">
      <div className="container mx-auto">
        <div className="flex overflow-x-auto gap-2 sm:gap-4 scrollbar-none pb-2 sm:grid sm:grid-cols-7 lg:grid-cols-14">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="flex flex-col items-center min-w-[70px] sm:min-w-0 group"
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${category.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-sm`}>
                <category.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlipkartCategoryGrid;
