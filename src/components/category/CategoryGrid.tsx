
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight,
  Package,
  Laptop,
  Watch,
  Monitor,
  Sofa,
  Camera,
  Gamepad,
  Home as HomeIcon
} from 'lucide-react';
import { getProductCategories, getAllProducts } from '@/data/products';

const categoryDetails: Record<string, any> = {
  'Electronics': {
    description: 'Gadgets, audio & smart devices',
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
  },
  'Wearables': {
    description: 'Smartwatches and fitness trackers.',
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1536304993881-53d3c6d83f07?auto=format&fit=crop&w=400&q=80',
    color: 'from-red-500 to-yellow-500',
    bgColor: 'from-red-50 to-yellow-50',
  },
  'Computers': {
    description: 'Laptops, desktops, and accessories.',
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'from-indigo-50 to-violet-50',
  },
  'Smart Home': {
    description: 'Automate your home with our devices.',
    icon: HomeIcon,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    color: 'from-sky-500 to-blue-500',
    bgColor: 'from-sky-50 to-blue-50',
  },
  'Photography': {
    description: 'Cameras, lenses, and photo gear.',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=80',
    color: 'from-gray-700 to-gray-900',
    bgColor: 'from-gray-50 to-gray-100',
  },
  'Furniture': {
    description: 'Stylish furniture for every room.',
    icon: Sofa,
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    color: 'from-lime-500 to-green-500',
    bgColor: 'from-lime-50 to-green-50',
  },
  'Gaming': {
    description: 'Consoles, games, and accessories.',
    icon: Gamepad,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    color: 'from-rose-500 to-fuchsia-500',
    bgColor: 'from-rose-50 to-fuchsia-50',
  },
  'default': {
    description: 'Browse our collection of products.',
    icon: Package,
    image: 'https://images.unsplash.com/photo-1611095564984-729c8d48a2bc?auto=format&fit=crop&w=400&q=80',
    color: 'from-gray-500 to-gray-700',
    bgColor: 'from-gray-50 to-gray-100',
  }
};

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

const CategoryGrid = () => {
  const allProducts = getAllProducts();
  const categoryNames = getProductCategories();

  const categories = categoryNames.map(name => {
    const details = categoryDetails[name] || categoryDetails.default;
    const productCount = allProducts.filter(p => p.category === name).length;

    return {
      name,
      description: details.description,
      icon: details.icon,
      color: details.color,
      bgColor: details.bgColor,
      link: `/category/${slugify(name)}`,
      count: `${productCount} ${productCount === 1 ? 'item' : 'items'}`
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map((category, index) => {
        const IconComponent = category.icon;
        const image = categoryDetails[category.name]?.image || categoryDetails.default.image;
        return (
          <Link 
            key={category.name} 
            to={category.link}
            className="group block animate-fade-in hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`relative p-0 rounded-2xl overflow-hidden bg-gradient-to-br ${category.bgColor} border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-300`}>
              <img
                src={image}
                alt={category.name}
                className="w-full h-40 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
                style={{ borderRadius: '16px 16px 0 0' }}
              />
              <div className="relative z-10 p-8">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{category.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{category.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryGrid;
