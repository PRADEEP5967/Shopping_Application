
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight,
  Package
} from 'lucide-react';
import { getProductCategories, getAllProducts } from '@/data/products';

const categoryDetails: Record<string, any> = {
  'Electronics': {
    description: 'Gadgets, audio & smart devices',
    borderColor: 'border-blue-400',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    bgColor: 'from-blue-50 to-cyan-50',
  },
  'Wearables': {
    description: 'Smartwatches and fitness trackers.',
    borderColor: 'border-pink-400',
    image: 'https://images.unsplash.com/photo-1536304993881-53d3c6d83f07?auto=format&fit=crop&w=400&q=80',
    bgColor: 'from-red-50 to-yellow-50',
  },
  'Computers': {
    description: 'Laptops, desktops, and accessories.',
    borderColor: 'border-violet-500',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    bgColor: 'from-indigo-50 to-violet-50',
  },
  'Smart Home': {
    description: 'Automate your home with our devices.',
    borderColor: 'border-sky-400',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    bgColor: 'from-sky-50 to-blue-50',
  },
  'Photography': {
    description: 'Cameras, lenses, and photo gear.',
    borderColor: 'border-gray-500',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=80',
    bgColor: 'from-gray-50 to-gray-100',
  },
  'Furniture': {
    description: 'Stylish furniture for every room.',
    borderColor: 'border-lime-500',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    bgColor: 'from-lime-50 to-green-50',
  },
  'Gaming': {
    description: 'Consoles, games, and accessories.',
    borderColor: 'border-rose-400',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    bgColor: 'from-rose-50 to-fuchsia-50',
  },
  'default': {
    description: 'Browse our collection of products.',
    borderColor: 'border-gray-400',
    image: 'https://images.unsplash.com/photo-1611095564984-729c8d48a2bc?auto=format&fit=crop&w=400&q=80',
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
      borderColor: details.borderColor,
      bgColor: details.bgColor,
      image: details.image,
      link: `/category/${slugify(name)}`,
      count: `${productCount} ${productCount === 1 ? 'item' : 'items'}`
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map((category, index) => {
        return (
          <Link 
            key={category.name} 
            to={category.link}
            className="group block animate-fade-in hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`relative p-0 rounded-2xl overflow-hidden bg-gradient-to-br ${category.bgColor} border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-300`}>
              {/* Circle image with border */}
              <div className={`flex justify-center -mt-8 mb-2`}>
                <div className={`w-20 h-20 rounded-full overflow-hidden border-4 ${category.borderColor} bg-white shadow transition-all group-hover:scale-110`}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="relative z-10 p-8 pt-4">
                <h3 className="text-xl font-bold mb-2 text-gray-900 text-center">{category.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed text-center">{category.description}</p>
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
