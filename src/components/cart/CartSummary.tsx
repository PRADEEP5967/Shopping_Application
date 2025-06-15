
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Truck, Shield, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const CartSummary = () => {
  const { items, subtotal, totalItems } = useCart();
  
  // Calculate shipping (free over $50)
  const shippingCost = subtotal >= 50 ? 0 : 8.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;
  
  // Calculate estimated delivery
  const getDeliveryRange = () => {
    const baseDate = new Date();
    const minDate = new Date(baseDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    const maxDate = new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return `${minDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${maxDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  return (
    <div className="space-y-4">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({totalItems} items)</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>
                {shippingCost === 0 ? (
                  <span className="text-green-600">FREE</span>
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
          </div>

          {/* Free Shipping Progress */}
          {subtotal < 50 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-700">
                Add {formatCurrency(50 - subtotal)} more for FREE shipping!
              </p>
              <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          <Link to="/checkout" className="w-full">
            <Button className="w-full" size="lg">
              <CreditCard className="h-4 w-4 mr-2" />
              Proceed to Checkout
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Delivery Information */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-green-600" />
              <div>
                <p className="font-medium text-sm">Estimated Delivery</p>
                <p className="text-sm text-gray-600">{getDeliveryRange()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <div>
                <p className="font-medium text-sm">Secure Checkout</p>
                <p className="text-sm text-gray-600">SSL encrypted payments</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust Badges */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">We Accept</p>
            <div className="flex justify-center gap-2">
              <Badge variant="outline" className="text-xs">VISA</Badge>
              <Badge variant="outline" className="text-xs">MASTERCARD</Badge>
              <Badge variant="outline" className="text-xs">PAYPAL</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartSummary;
