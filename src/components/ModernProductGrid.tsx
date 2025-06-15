
import React from "react";
import ModernProductCard from "./ModernProductCard";
import { Product } from "@/types";

interface ModernProductGridProps {
  products: Product[];
}

const ModernProductGrid: React.FC<ModernProductGridProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          We're working hard to bring you amazing products. Check back soon for updates!
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, idx) => (
        <ModernProductCard key={product.id} product={product} className="animate-fade-in" />
      ))}
    </div>
  );
};

export default ModernProductGrid;
