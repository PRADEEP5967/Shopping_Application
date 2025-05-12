
import React from 'react';

interface CategoryHeaderProps {
  categoryName: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ categoryName }) => {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-blue-100 rounded-lg p-6 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src={`https://images.unsplash.com/photo-1581591524425-c7e0978865fc?q=80&w=2070&auto=format&fit=crop`}
          alt={categoryName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{categoryName}</h1>
        <p className="mt-2 text-gray-700 max-w-2xl">
          Explore our selection of premium {categoryName.toLowerCase()} products. 
          From top brands to exclusive deals, find exactly what you're looking for.
        </p>
      </div>
    </div>
  );
};

export default CategoryHeader;
