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
  { name: 'Mobiles', icon: Smartphone, path: '/category/electronics' },
  { name: 'Fashion', icon: Shirt, path: '/category/clothing' },
  { name: 'Electronics', icon: Laptop, path: '/category/computers' },
  { name: 'Furniture', icon: Sofa, path: '/category/furniture' },
  { name: 'Watches', icon: Watch, path: '/category/wearables' },
  { name: 'Audio', icon: Headphones, path: '/category/audio' },
  { name: 'Cameras', icon: Camera, path: '/category/photography' },
  { name: 'Baby', icon: Baby, path: '/category/baby' },
  { name: 'Fitness', icon: Dumbbell, path: '/category/fitness' },
  { name: 'Health', icon: Heart, path: '/category/health' },
  { name: 'TVs', icon: Tv, path: '/category/tv' },
  { name: 'Gaming', icon: Gamepad, path: '/category/gaming' },
  { name: 'Smart Home', icon: Home, path: '/category/smart-home' },
  { name: 'Accessories', icon: ShoppingBag, path: '/category/accessories' },
  { name: 'Shoes', icon: Footprints, path: '/category/shoes' },
  { name: 'Automotive', icon: Car, path: '/category/automotive' },
  { name: 'Books', icon: Book, path: '/category/books' },
  { name: 'Gifts', icon: Gift, path: '/category/gifts' },
  { name: 'Kitchen', icon: Utensils, path: '/category/kitchen' },
  { name: 'Jewelry', icon: Gem, path: '/category/jewelry' },
  { name: 'Art', icon: Palette, path: '/category/art' },
  { name: 'Office', icon: Briefcase, path: '/category/office' },
  { name: 'Travel', icon: Plane, path: '/category/travel' },
  { name: 'Pets', icon: PawPrint, path: '/category/pets' },
  { name: 'Beauty', icon: Sun, path: '/category/beauty' },
  { name: 'Eyewear', icon: Glasses, path: '/category/eyewear' },
  { name: 'Sports', icon: Bike, path: '/category/sports' },
  { name: 'Musical', icon: Music, path: '/category/musical' },
  { name: 'Tools', icon: Wrench, path: '/category/tools' },
];

const FlipkartCategoryGrid: React.FC = () => {
  return (
    <div className="border-y border-border bg-card/40 backdrop-blur-md py-10 px-2 sm:px-4">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-8 px-2">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-primary/80 mb-2">Departments</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Explore the Marketplace</h3>
          </div>
          <span className="hidden sm:block text-xs font-mono text-muted-foreground">{categories.length} categories</span>
        </div>
        {[categories.slice(0,15), categories.slice(15)].map((row, ri) => (
          <div key={ri} className={`flex overflow-x-auto gap-3 sm:gap-4 scrollbar-none pb-3 sm:grid sm:grid-cols-8 lg:grid-cols-15 ${ri === 1 ? 'mt-2' : ''}`}>
            {row.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="flex flex-col items-center min-w-[76px] sm:min-w-0 group"
              >
                <div className="relative w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full flex items-center justify-center mb-3 border border-border bg-card group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300 group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.35)]">
                  <category.icon className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground text-center group-hover:text-foreground transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlipkartCategoryGrid;
