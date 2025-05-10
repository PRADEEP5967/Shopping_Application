
import React from 'react';
import { Link } from 'react-router-dom';
import { getProductCategories } from '@/data/products';

const categoryImages: Record<string, string> = {
  'Electronics': 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2301&auto=format&fit=crop',
  'Wearables': 'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=2076&auto=format&fit=crop',
  'Computers': 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop',
  'Smart Home': 'https://images.unsplash.com/photo-1558002038-1055e2dae1e7?q=80&w=2070&auto=format&fit=crop',
  'Photography': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070&auto=format&fit=crop',
  'Furniture': 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=2062&auto=format&fit=crop',
  'Gaming': 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2070&auto=format&fit=crop',
};

const FeaturedCategories = () => {
  const categories = getProductCategories();
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="mt-2 text-gray-600">Browse our wide selection of premium products</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              to={`/categories/${category.toLowerCase().replace(' ', '-')}`}
              key={category} 
              className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={categoryImages[category] || 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?q=80&w=2070&auto=format&fit=crop'} 
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{category}</h3>
                    <p className="text-sm text-white/80 mt-1 group-hover:underline">View products</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
