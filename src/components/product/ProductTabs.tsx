
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types';
import ProductReviews from '@/components/product/ProductReviews';

interface ProductTabsProps {
  product: Product;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                {product.features && product.features.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-gray-700">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <ProductReviews productId={product.id} productName={product.name} />
          </TabsContent>
          
          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Category:</span>
                    <span className="ml-2">{product.category}</span>
                  </div>
                  {product.brand && (
                    <div>
                      <span className="font-medium">Brand:</span>
                      <span className="ml-2">{product.brand}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Product ID:</span>
                    <span className="ml-2">{product.id}</span>
                  </div>
                  <div>
                    <span className="font-medium">Availability:</span>
                    <span className="ml-2">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProductTabs;
