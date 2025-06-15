
import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Product, ProductVariant } from '@/types';

interface ProductInfoProps {
  product: Product;
  selectedVariant: ProductVariant | null;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, selectedVariant }) => {
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const originalPrice = product.originalPrice;
  const discount = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
  const isInStock = selectedVariant ? selectedVariant.inStock : product.inStock;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{product.category}</Badge>
          {product.brand && <Badge variant="secondary">{product.brand}</Badge>}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-primary">${currentPrice}</span>
        {originalPrice && originalPrice > currentPrice && (
          <>
            <span className="text-xl text-gray-400 line-through">${originalPrice}</span>
            <Badge className="bg-red-500">{discount}% OFF</Badge>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isInStock ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className={`text-sm font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
          {isInStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
