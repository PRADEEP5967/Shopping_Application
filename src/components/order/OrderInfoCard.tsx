
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderInfoCardProps {
  orderDate: Date;
  orderId: string;
  itemCount: number;
}

const OrderInfoCard: React.FC<OrderInfoCardProps> = ({ orderDate, orderId, itemCount }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Order Date</span>
          <span>{orderDate.toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Order ID</span>
          <span className="font-mono">{orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Items</span>
          <span>{itemCount}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderInfoCard;
