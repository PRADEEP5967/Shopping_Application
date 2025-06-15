import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductActions from '@/components/product/ProductActions';
import ProductTabs from '@/components/product/ProductTabs';
import AIRecommendations from '@/components/AIRecommendations';
import ProductFeatures from '@/components/product/ProductFeatures';
import ProductSubscription from '@/components/ProductSubscription';
import { getAllProducts, getProductById } from '@/data/products';
import { Product } from '@/types';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      setProduct(foundProduct);
    }
  }, [productId]);

  useEffect(() => {
    // Mock reviews - in a real app, this would come from an API
    setReviews([
      {
        id: 1,
        author: 'John Doe',
        rating: 5,
        comment: 'Great product! Highly recommended.'
      },
      {
        id: 2,
        author: 'Jane Smith',
        rating: 4,
        comment: 'Good value for the price.'
      }
    ]);
  }, []);

  const addReview = (productId: string, review: any) => {
    setReviews([...reviews, { ...review, id: reviews.length + 1 }]);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <CartFlyout />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600">Sorry, the product you are looking for does not exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="md:flex md:items-center md:justify-between mb-6">
            <div className="md:w-2/3">
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <ProductInfo product={product} />
            
            {/* Product Actions */}
            <ProductActions product={product} />
            
            {/* Product Subscription */}
            <ProductSubscription 
              product={product} 
              onSubscriptionChange={(subscription) => {
                console.log('Subscription changed:', subscription);
              }}
            />
            
            {/* Product Features */}
            <ProductFeatures features={product.features || []} />
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <ProductTabs 
            product={product}
            reviews={reviews}
            onAddReview={(review) => {
              addReview(product.id, review);
            }}
          />
        </div>

        {/* AI Recommendations */}
        <AIRecommendations currentProduct={product} />

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
