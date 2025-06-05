
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar, Package, RefreshCw, Truck } from 'lucide-react';
import { Product } from '@/types';

interface ProductSubscriptionProps {
  product: Product;
  onSubscriptionChange: (subscription: any) => void;
}

const ProductSubscription: React.FC<ProductSubscriptionProps> = ({ product, onSubscriptionChange }) => {
  const [subscription, setSubscription] = useState({
    enabled: false,
    frequency: 'monthly',
    discount: 15,
    nextDelivery: null as Date | null
  });

  const frequencies = [
    { value: 'weekly', label: 'Weekly', discount: 10 },
    { value: 'biweekly', label: 'Every 2 Weeks', discount: 12 },
    { value: 'monthly', label: 'Monthly', discount: 15 },
    { value: 'quarterly', label: 'Every 3 Months', discount: 20 }
  ];

  const handleSubscriptionToggle = (enabled: boolean) => {
    const newSubscription = { 
      ...subscription, 
      enabled,
      nextDelivery: enabled ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null
    };
    setSubscription(newSubscription);
    onSubscriptionChange(newSubscription);
  };

  const handleFrequencyChange = (frequency: string) => {
    const selectedFreq = frequencies.find(f => f.value === frequency);
    const newSubscription = { 
      ...subscription, 
      frequency, 
      discount: selectedFreq?.discount || 15 
    };
    setSubscription(newSubscription);
    onSubscriptionChange(newSubscription);
  };

  const calculateSubscriptionPrice = () => {
    if (!subscription.enabled) return product.price;
    return product.price * (1 - subscription.discount / 100);
  };

  const calculateSavings = () => {
    if (!subscription.enabled) return 0;
    return product.price - calculateSubscriptionPrice();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Subscribe & Save
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="subscription-toggle" className="text-base font-medium">
              Auto-delivery subscription
            </Label>
            <p className="text-sm text-gray-600">
              Never run out of your favorite products
            </p>
          </div>
          <Switch
            id="subscription-toggle"
            checked={subscription.enabled}
            onCheckedChange={handleSubscriptionToggle}
          />
        </div>

        {subscription.enabled && (
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border">
            <div className="space-y-3">
              <Label className="text-base font-medium">Delivery Frequency</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {frequencies.map((freq) => (
                  <button
                    key={freq.value}
                    onClick={() => handleFrequencyChange(freq.value)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      subscription.frequency === freq.value
                        ? 'border-blue-500 bg-blue-100'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{freq.label}</span>
                      <Badge variant="secondary" className="text-xs">
                        -{freq.discount}%
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Regular Price:</span>
                <span className="line-through text-gray-500">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subscription Price:</span>
                <span className="font-bold text-green-600">
                  ${calculateSubscriptionPrice().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">You Save:</span>
                <span className="font-bold text-green-600">
                  ${calculateSavings().toFixed(2)} ({subscription.discount}%)
                </span>
              </div>
            </div>

            {subscription.nextDelivery && (
              <div className="flex items-center gap-2 p-3 bg-white rounded border">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-sm">
                  Next delivery: {subscription.nextDelivery.toLocaleDateString()}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-green-500" />
                <span className="text-sm">Free shipping on subscriptions</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-green-500" />
                <span className="text-sm">Cancel or modify anytime</span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4">
          <Button 
            className="w-full" 
            size="lg"
            disabled={!subscription.enabled}
          >
            {subscription.enabled 
              ? `Subscribe for $${calculateSubscriptionPrice().toFixed(2)}` 
              : 'Add to Cart'
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSubscription;
