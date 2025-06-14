
import React from "react";
import { Link } from "react-router-dom";
import { 
  Smartphone, 
  Monitor, 
  Shirt, 
  Dress, 
  Baby, 
  Sofa, 
  Dumbbell, 
  Heart, 
  Headphones, 
  Tv, 
  Home as HomeIcon 
} from "lucide-react";

const CATEGORIES = [
  {
    label: "Electronics",
    icon: Smartphone,
    to: "/category/electronics",
  },
  {
    label: "TVs & Appliances",
    icon: Tv,
    to: "/category/tvs-appliances",
  },
  {
    label: "Men",
    icon: Shirt,
    to: "/category/men",
  },
  {
    label: "Women",
    icon: Dress,
    to: "/category/women",
  },
  {
    label: "Baby & Kids",
    icon: Baby,
    to: "/category/baby-kids",
  },
  {
    label: "Home & Furniture",
    icon: Sofa,
    to: "/category/home-furniture",
  },
  {
    label: "Sports",
    icon: Dumbbell,
    to: "/category/sports",
  },
  {
    label: "Beauty & Personal Care",
    icon: Heart,
    to: "/category/beauty-personal-care",
  },
  {
    label: "Audio",
    icon: Headphones,
    to: "/category/audio",
  },
];

const FlipkartCategoryBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50/90 via-sky-50 to-white border-b border-blue-100 w-full sticky top-16 z-30 shadow transition-all">
      <div className="container mx-auto px-2 sm:px-4 flex overflow-x-auto gap-1 sm:gap-3 scrollbar-none">
        {CATEGORIES.map(({ label, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            className="group flex flex-col items-center justify-center px-3 py-2 sm:py-3 transition-all hover:bg-primary/10 hover:shadow rounded-xl min-w-[78px] relative"
            aria-label={label}
          >
            <div className="rounded-full bg-white border border-blue-200 flex items-center justify-center w-10 h-10 mb-1 group-hover:bg-primary/10 group-hover:scale-105 transition-transform">
              <Icon className="h-6 w-6 text-blue-600 group-hover:text-primary" />
            </div>
            <span className="text-[0.8rem] font-medium text-gray-700 group-hover:text-primary text-center select-none truncate w-[72px]">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlipkartCategoryBar;
