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
  Car,
  Book,
  Gift,
  Utensils,
  Gem,
  Palette,
  Briefcase,
  Plane,
  PawPrint,
  Footprints,
  Sun,
  Glasses,
  Bike,
  Music,
  Wrench,
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
  { name: 'Shoes', icon: Footprints, path: '/category/shoes', color: 'bg-orange-100 text-orange-600' },
  { name: 'Automotive', icon: Car, path: '/category/automotive', color: 'bg-gray-100 text-gray-600' },
  { name: 'Books', icon: Book, path: '/category/books', color: 'bg-lime-100 text-lime-600' },
  { name: 'Gifts', icon: Gift, path: '/category/gifts', color: 'bg-fuchsia-100 text-fuchsia-600' },
  { name: 'Kitchen', icon: Utensils, path: '/category/kitchen', color: 'bg-red-100 text-red-600' },
  { name: 'Jewelry', icon: Gem, path: '/category/jewelry', color: 'bg-violet-100 text-violet-600' },
  { name: 'Art', icon: Palette, path: '/category/art', color: 'bg-pink-100 text-pink-600' },
  { name: 'Office', icon: Briefcase, path: '/category/office', color: 'bg-blue-100 text-blue-600' },
  { name: 'Travel', icon: Plane, path: '/category/travel', color: 'bg-sky-100 text-sky-600' },
  { name: 'Pets', icon: PawPrint, path: '/category/pets', color: 'bg-amber-100 text-amber-600' },
  { name: 'Beauty', icon: Sun, path: '/category/beauty', color: 'bg-rose-100 text-rose-600' },
  { name: 'Eyewear', icon: Glasses, path: '/category/eyewear', color: 'bg-indigo-100 text-indigo-600' },
  { name: 'Sports', icon: Bike, path: '/category/sports', color: 'bg-green-100 text-green-600' },
  { name: 'Musical', icon: Music, path: '/category/musical', color: 'bg-purple-100 text-purple-600' },
  { name: 'Tools', icon: Wrench, path: '/category/tools', color: 'bg-zinc-100 text-zinc-600' },
];

const FlipkartCategoryGrid: React.FC = () => {
  return (
    <div className="bg-white py-4 px-2 sm:px-4 shadow-sm">
      <div className="container mx-auto">
        {/* First row - main categories */}
        <div className="flex overflow-x-auto gap-2 sm:gap-4 scrollbar-none pb-2 sm:grid sm:grid-cols-7 lg:grid-cols-14 mb-4">
          {categories.slice(0, 14).map((category) => (
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
        
        {/* Second row - more categories */}
        <div className="flex overflow-x-auto gap-2 sm:gap-4 scrollbar-none pb-2 sm:grid sm:grid-cols-7 lg:grid-cols-15">
          {categories.slice(14).map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="flex flex-col items-center min-w-[70px] sm:min-w-0 group"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${category.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-sm`}>
                <category.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-600 text-center group-hover:text-blue-600 transition-colors">
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
