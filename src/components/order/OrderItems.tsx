
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { CartItem } from '@/types';

interface OrderItemsProps {
  items: CartItem[];
}

const OrderItems: React.FC<OrderItemsProps> = ({ items }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <img 
                src={item.product.images[0]} 
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-md border"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.product.name}</h4>
                <p className="text-sm text-gray-600">SKU: {item.product.id}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                <p className="text-sm text-gray-600">${item.product.price.toFixed(2)} each</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItems;
