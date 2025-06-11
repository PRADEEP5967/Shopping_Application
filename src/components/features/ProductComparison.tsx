
import React, { useState } from 'react';
import { X, Star, Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';

interface ProductComparisonProps {
  products: Product[];
  onRemoveProduct: (productId: string) => void;
  onClose: () => void;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({
  products,
  onRemoveProduct,
  onClose,
}) => {
  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">No products to compare</p>
        </CardContent>
      </Card>
    );
  }

  const features = ['Price', 'Rating', 'Brand', 'In Stock', 'Features'];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Product Comparison</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 border-b">Feature</th>
                {products.map((product) => (
                  <th key={product.id} className="text-center p-4 border-b min-w-[200px]">
                    <div className="space-y-2">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg mx-auto"
                      />
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveProduct(product.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature}>
                  <td className="p-4 border-b font-medium">{feature}</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 border-b text-center">
                      {feature === 'Price' && `$${product.price.toFixed(2)}`}
                      {feature === 'Rating' && (
                        <div className="flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      {feature === 'Brand' && (product.brand || 'N/A')}
                      {feature === 'In Stock' && (
                        product.inStock ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <Minus className="w-5 h-5 text-red-500 mx-auto" />
                        )
                      )}
                      {feature === 'Features' && (
                        <div className="space-y-1">
                          {product.features?.slice(0, 3).map((feat, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feat}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductComparison;
