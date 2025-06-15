
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Truck, Shield, CreditCard, Tag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const OrderSummaryCard = () => {
  const { items, subtotal, totalItems } = useCart();
  
  // Calculate shipping (free over $50)
  const shippingCost = subtotal >= 50 ? 0 : 8.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;

  return (
    <div className="space-y-4">
      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Items ({totalItems})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div 
              key={`${item.product.id}-${item.variant?.id || 'default'}`}
              className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                {item.variant && (
                  <p className="text-xs text-gray-600">{item.variant.name}</p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                  <Badge variant="secondary" className="text-xs">
                    {formatCurrency(item.variant ? item.variant.price : item.product.price)}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">
                  {formatCurrency((item.variant ? item.variant.price : item.product.price) * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>
              {shippingCost === 0 ? (
                <span className="text-green-600 font-medium">FREE</span>
              ) : (
                formatCurrency(shippingCost)
              )}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          {/* Free Shipping Progress */}
          {subtotal < 50 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <p className="text-sm text-blue-700 mb-2">
                Add {formatCurrency(50 - subtotal)} more for FREE shipping!
              </p>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security & Trust */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <div>
                <p className="font-medium text-sm">Secure Checkout</p>
                <p className="text-xs text-gray-600">256-bit SSL encryption</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-600" />
              <div>
                <p className="font-medium text-sm">Fast Delivery</p>
                <p className="text-xs text-gray-600">3-7 business days</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-purple-600" />
              <div>
                <p className="font-medium text-sm">Best Price Guarantee</p>
                <p className="text-xs text-gray-600">30-day price match</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummaryCard;
