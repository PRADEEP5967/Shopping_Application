
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Grid3X3, 
  Sparkles, 
  Zap, 
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

const CategoriesPage = () => {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 animate-fade-in">
                <Grid3X3 className="w-3 h-3 mr-1" />
                All Categories
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
                Shop by Category
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
                Discover our complete range of products across different categories. Find exactly what you're looking for with ease.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
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
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">Why Shop by Category?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
                Browse our organized categories to find products that match your specific needs and preferences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Grid3X3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Organized Shopping</h3>
                <p className="text-gray-600">Find products easily with our well-organized category structure.</p>
              </div>
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Discovery</h3>
                <p className="text-gray-600">Discover new products and brands within your favorite categories.</p>
              </div>
              <div className="text-center animate-fade-in">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
                <p className="text-gray-600">Every category features hand-picked, high-quality products.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;

