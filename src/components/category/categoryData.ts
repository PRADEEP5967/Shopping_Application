
import {
  Smartphone,
  Watch,
  Monitor,
  Home as HomeIcon,
  Camera,
  Sofa,
  Gamepad,
  Package,
  ShoppingBag,
} from 'lucide-react';

export const categoryDetails: Record<string, any> = {
  'Electronics': {
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    badge: 'Hot',
    color: 'from-blue-500 to-cyan-500',
    trending: true,
    description: 'Latest gadgets & tech'
  },
  'Wearables': {
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1536304993881-53d3c6d83f07?auto=format&fit=crop&w=400&q=80',
    badge: 'New',
    color: 'from-pink-500 to-purple-500',
    description: 'Smart watches & fitness'
  },
  'Computers': {
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    color: 'from-orange-500 to-red-500',
    description: 'Laptops & accessories'
  },
  'Smart Home': {
    icon: HomeIcon,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    color: 'from-green-500 to-teal-500',
    trending: true,
    description: 'Automate your home'
  },
  'Photography': {
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=80',
    color: 'from-amber-500 to-orange-500',
    description: 'Cameras & photo gear'
  },
  'Furniture': {
    icon: Sofa,
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    badge: 'Sale',
    color: 'from-violet-500 to-purple-500',
    description: 'Stylish home furniture'
  },
  'Gaming': {
    icon: Gamepad,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    color: 'from-rose-500 to-pink-500',
    trending: true,
    description: 'Gaming consoles & gear'
  },
  'Accessories': {
    icon: ShoppingBag,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400&auto=format&fit=crop',
    badge: 'New',
    color: 'from-yellow-500 to-orange-400',
    description: 'Fashion & tech accessories'
  },
  'default': {
    icon: Package,
    image: 'https://images.unsplash.com/photo-1611095564984-729c8d48a2bc?auto=format&fit=crop&w=400&q=80',
    color: 'from-gray-500 to-gray-600',
    description: 'Browse our collection'
  }
};

export const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-');
