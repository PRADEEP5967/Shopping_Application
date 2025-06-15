
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Heart, TrendingUp } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardContent className="p-8 text-center space-y-6">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="h-10 w-10 text-gray-400" />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600">
              Looks like you haven't added anything to your cart yet.
            </p>
          </div>

          <div className="space-y-3">
            <Link to="/products" className="w-full">
              <Button className="w-full" size="lg">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
            
            <div className="grid grid-cols-2 gap-2">
              <Link to="/wishlist" className="w-full">
                <Button variant="outline" className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
              </Link>
              
              <Link to="/products?sort=trending" className="w-full">
                <Button variant="outline" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 mb-3">Popular Categories</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/category/electronics">
                <Button variant="ghost" size="sm" className="text-xs">
                  Electronics
                </Button>
              </Link>
              <Link to="/category/clothing">
                <Button variant="ghost" size="sm" className="text-xs">
                  Clothing
                </Button>
              </Link>
              <Link to="/category/accessories">
                <Button variant="ghost" size="sm" className="text-xs">
                  Accessories
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyCart;
