
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
  User, // Used for 'Dress/Women'
} from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import CategoryPopoverContent from "./CategoryPopoverContent";

const CATEGORY_INFO = [
  {
    label: "Smartphone",
    icon: Smartphone,
    to: "/category/smartphone",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=80",
    description: "Explore top smartphones and mobile devices with blazing-fast performance and vibrant displays.",
    highlights: ["Latest Android & iOS", "5G Ready", "Long Battery Life", "Stunning Cameras"],
  },
  {
    label: "Monitor",
    icon: Monitor,
    to: "/category/monitor",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
    description: "Discover monitors for gaming, creatives, and productivity, all with vivid imagery.",
    highlights: ["4K UHD Quality", "Gaming & Office", "Curved Screens", "Ultra-Slim"],
  },
  {
    label: "Shirt",
    icon: Shirt,
    to: "/category/shirt",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
    description: "Trendy shirts for every occasion – casual, formal, and everything in between.",
    highlights: ["Premium Fabrics", "All Sizes", "Modern Styles", "Easy Returns"],
  },
  {
    label: "Dress",
    icon: User,
    to: "/category/dress",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=500&q=80",
    description: "Elegant dresses – party, work, or everyday, to elevate your wardrobe.",
    highlights: ["Designer Wear", "Floral & Solid Styles", "Comfort Fabrics", "Great Deals"],
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
  },
  {
    label: "Headphones",
    icon: Headphones,
    to: "/category/headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    description: "Audio gear for music lovers and pros – clear sound, long battery life.",
    highlights: ["Wireless & Wired", "Noise Canceling", "Hi-Res Audio", "Trendy Designs"],
  },
  {
    label: "TV",
    icon: Tv,
    to: "/category/tv",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=80",
    description: "Upgrade your home entertainment: the latest TVs, all screen sizes and tech.",
    highlights: ["Smart TVs", "Ultra HD", "Streaming Ready", "Wide Viewing Angles"],
  },
];

const FlipkartCategoryBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50/90 via-sky-50 to-white border-b border-blue-100 w-full sticky top-16 z-30 shadow transition-all">
      <div className="container mx-auto px-2 sm:px-4 flex overflow-x-auto gap-1 sm:gap-3 scrollbar-none">
        {CATEGORY_INFO.map(({ label, icon: Icon, to, image, description, highlights }) => (
          <Popover key={label}>
            <PopoverTrigger asChild>
              <Link
                to={to}
                className="group flex flex-col items-center justify-center px-3 py-2 sm:py-3 transition-all hover:bg-primary/10 hover:shadow rounded-xl min-w-[78px] relative outline-none focus:ring-2 focus:ring-blue-200"
                aria-label={label}
                tabIndex={0}
              >
                <div className="rounded-full bg-white border border-blue-200 flex items-center justify-center w-10 h-10 mb-1 group-hover:bg-primary/10 group-hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6 text-blue-600 group-hover:text-primary" />
                </div>
                <span className="text-[0.8rem] font-medium text-gray-700 group-hover:text-primary text-center select-none truncate w-[72px]">
                  {label}
                </span>
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
    </div>
  );
};

export default FlipkartCategoryBar;
