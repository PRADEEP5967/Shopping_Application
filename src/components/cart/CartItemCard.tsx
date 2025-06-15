
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, Heart, Truck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const price = item.variant ? item.variant.price : item.product.price;
  const variantName = item.variant ? item.variant.name : '';
  const totalPrice = price * item.quantity;

  // Calculate delivery estimate (mock logic)
  const getDeliveryEstimate = () => {
    const baseDate = new Date();
    const deliveryDate = new Date(baseDate.getTime() + (3 + Math.floor(Math.random() * 4)) * 24 * 60 * 60 * 1000);
    return deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleQuantityUpdate = async (newQuantity: number) => {
    setIsUpdating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      updateQuantity(item.product.id, newQuantity);
      setIsUpdating(false);
      toast.success('Cart updated');
    }, 300);
  };

  const handleRemove = () => {
    removeItem(item.product.id);
    toast.info('Item removed from cart');
  };

  const handleSaveForLater = () => {
    // This would integrate with wishlist context
    toast.info('Saved for later (feature coming soon)');
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <Link to={`/product/${item.product.id}`}>
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex-grow space-y-3">
            <div>
              <Link 
                to={`/product/${item.product.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors"
              >
                {item.product.name}
              </Link>
              {variantName && (
                <p className="text-sm text-gray-600">{variantName}</p>
              )}
              <p className="text-sm text-gray-500">{item.product.category}</p>
            </div>

            {/* Delivery Estimate */}
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Truck className="h-4 w-4" />
              <span>Delivery by {getDeliveryEstimate()}</span>
            </div>

            {/* Stock Status */}
            <div>
              {item.product.inStock ? (
                <Badge variant="secondary" className="bg-green-50 text-green-700">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex flex-col sm:hidden gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleQuantityUpdate(item.quantity - 1)}
                    disabled={item.quantity <= 1 || isUpdating}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-12 text-center text-sm">
                    {isUpdating ? '...' : item.quantity}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleQuantityUpdate(item.quantity + 1)}
                    disabled={isUpdating}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{formatCurrency(totalPrice)}</p>
                  <p className="text-sm text-gray-500">{formatCurrency(price)} each</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveForLater}
                  className="flex-1"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Save for Later
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRemove}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex flex-col items-end justify-between min-w-[200px]">
            <div className="text-right mb-4">
              <p className="text-xl font-semibold">{formatCurrency(totalPrice)}</p>
              <p className="text-sm text-gray-500">{formatCurrency(price)} each</p>
            </div>

            <div className="space-y-3 w-full">
              {/* Quantity Controls */}
              <div className="flex items-center justify-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10"
                  onClick={() => handleQuantityUpdate(item.quantity - 1)}
                  disabled={item.quantity <= 1 || isUpdating}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center">
                  {isUpdating ? '...' : item.quantity}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10"
                  onClick={() => handleQuantityUpdate(item.quantity + 1)}
                  disabled={isUpdating}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveForLater}
                  className="text-xs"
                >
                  <Heart className="h-3 w-3 mr-1" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRemove}
                  className="text-red-600 hover:text-red-700 text-xs"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
