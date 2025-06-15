
import React from "react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Monitor,
  Shirt,
  Baby,
  Sofa,
  Dumbbell,
  Heart,
  Headphones,
  Tv,
  User,
  Sparkles,
} from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import CategoryPopoverContent from "./CategoryPopoverContent";

const CATEGORY_INFO = [
  {
    label: "Smartphone",
    icon: Smartphone,
    to: "/category/smartphone",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=80",
    description: "Explore top smartphones and mobile devices with blazing-fast performance and vibrant displays.",
    highlights: ["Latest Android & iOS", "5G Ready", "Long Battery Life", "Stunning Cameras"],
    badge: "Hot",
    trending: true,
  },
  {
    label: "Monitor",
    icon: Monitor,
    to: "/category/monitor",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
    description: "Discover monitors for gaming, creatives, and productivity, all with vivid imagery.",
    highlights: ["4K UHD Quality", "Gaming & Office", "Curved Screens", "Ultra-Slim"],
    badge: "4K",
  },
  {
    label: "Shirt",
    icon: Shirt,
    to: "/category/shirt",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
    description: "Trendy shirts for every occasion – casual, formal, and everything in between.",
    highlights: ["Premium Fabrics", "All Sizes", "Modern Styles", "Easy Returns"],
    badge: "Sale",
  },
  {
    label: "Dress",
    icon: User,
    to: "/category/dress",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=500&q=80",
    description: "Elegant dresses – party, work, or everyday, to elevate your wardrobe.",
    highlights: ["Designer Wear", "Floral & Solid Styles", "Comfort Fabrics", "Great Deals"],
    badge: "New",
    trending: true,
  },
  {
    label: "Baby",
    icon: Baby,
    to: "/category/baby",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Soft and safe essentials for your little ones, from newborns to toddlers.",
    highlights: ["Hygienic Products", "Soft Clothing", "Parent Picks", "Toys & More"],
  },
  {
    label: "Sofa",
    icon: Sofa,
    to: "/category/sofa",
    image: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=500&q=80",
    description: "Relax in style – modern sofas for living rooms, lounges, and cozy corners.",
    highlights: ["Premium Upholstery", "Modern & Classic", "Custom Colors", "Quick Delivery"],
    badge: "Premium",
  },
  {
    label: "Dumbbell",
    icon: Dumbbell,
    to: "/category/dumbbell",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    description: "Best-in-class fitness gear and equipment for a healthy, active lifestyle.",
    highlights: ["All Weights", "Anti-Slip Grip", "Gym & Home Use", "Fitness Accessories"],
  },
  {
    label: "Heart",
    icon: Heart,
    to: "/category/heart",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=80",
    description: "Top personal care and wellness products that you'll love for every day.",
    highlights: ["Skincare", "Haircare", "Wellness", "Self-Care"],
    badge: "Wellness",
  },
  {
    label: "Headphones",
    icon: Headphones,
    to: "/category/headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    description: "Audio gear for music lovers and pros – clear sound, long battery life.",
    highlights: ["Wireless & Wired", "Noise Canceling", "Hi-Res Audio", "Trendy Designs"],
    trending: true,
  },
  {
    label: "TV",
    icon: Tv,
    to: "/category/tv",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=80",
    description: "Upgrade your home entertainment: the latest TVs, all screen sizes and tech.",
    highlights: ["Smart TVs", "Ultra HD", "Streaming Ready", "Wide Viewing Angles"],
    badge: "Smart",
  },
];

const FlipkartCategoryBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50/90 via-sky-50 to-indigo-50/80 border-b border-blue-100 w-full relative">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px] opacity-30" />
      
      {/* Trending badge */}
      <div className="absolute top-2 right-4 hidden lg:flex items-center space-x-2">
        <Sparkles className="h-4 w-4 text-orange-500 animate-pulse" />
        <span className="text-xs font-medium text-orange-600">Trending Categories</span>
      </div>

      <div className="container mx-auto px-2 sm:px-4 flex overflow-x-auto gap-1 sm:gap-3 scrollbar-none py-2 sm:py-3 relative z-10">
        {CATEGORY_INFO.map(({ label, icon: Icon, to, image, description, highlights, badge, trending }) => (
          <Popover key={label}>
            <PopoverTrigger asChild>
              <Link
                to={to}
                className="group flex flex-col items-center justify-center px-3 py-2 sm:py-3 transition-all duration-300 hover:bg-white/70 hover:shadow-lg rounded-xl min-w-[78px] relative outline-none focus:ring-2 focus:ring-blue-300 transform hover:scale-105"
                aria-label={label}
                tabIndex={0}
              >
                {/* Badge */}
                {badge && (
                  <Badge 
                    className={`absolute -top-1 -right-1 text-[0.6rem] px-1 py-0 h-4 z-10 ${
                      badge === 'Hot' ? 'bg-red-500 animate-pulse' :
                      badge === 'New' ? 'bg-green-500' :
                      badge === 'Sale' ? 'bg-orange-500 animate-bounce' :
                      'bg-blue-500'
                    } text-white border-0`}
                    variant="secondary"
                  >
                    {badge}
                  </Badge>
                )}

                {/* Trending indicator */}
                {trending && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping" />
                  </div>
                )}

                {/* Icon container with gradient */}
                <div className="rounded-full bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 flex items-center justify-center w-10 h-10 mb-1 group-hover:border-blue-300 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
                  <Icon className="h-5 w-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                </div>

                {/* Label with enhanced typography */}
                <span className="text-[0.75rem] font-semibold text-gray-700 group-hover:text-blue-700 text-center select-none truncate w-[72px] transition-colors duration-300">
                  {label}
                </span>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            </PopoverTrigger>
            <PopoverContent className="p-0 border-none bg-transparent rounded-xl z-50" align="center">
              <CategoryPopoverContent
                label={label}
                icon={Icon}
                image={image}
                description={description}
                link={to}
                highlights={highlights}
              />
            </PopoverContent>
          </Popover>
        ))}
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
    </div>
  );
};

export default FlipkartCategoryBar;
