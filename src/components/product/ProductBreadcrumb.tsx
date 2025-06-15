
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';

interface ProductBreadcrumbProps {
  product: Product;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ product }) => {
  return (
    <div className="bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <nav className="text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-gray-700">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>
    </div>
  );
};

export default ProductBreadcrumb;
