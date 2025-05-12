
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryItem {
  name: string;
  image: string;
  discount: string;
}

const DealCategories: React.FC = () => {
  const categories: CategoryItem[] = [
    { name: "Electronics", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2301&auto=format&fit=crop", discount: "Up to 25% Off" },
    { name: "Wearables", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop", discount: "From $49.99" },
    { name: "Smart Home", image: "https://images.unsplash.com/photo-1558002038-1055e2dae1e7?q=80&w=2070&auto=format&fit=crop", discount: "Save 30%" },
    { name: "Computers", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop", discount: "Clearance" },
  ];
  
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Shop Deals By Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={`/category/${category.name.toLowerCase().replace(' ', '-')}`} 
              className="group"
            >
              <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
                <div className="relative">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white mb-1">{category.name}</h3>
                      <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                        {category.discount}
                      </span>
                    </div>
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

export default DealCategories;
