
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck } from 'lucide-react';

const OrdersTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
        <CardDescription>View and track your recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between py-4 border-b">
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">You don't have any orders yet.</p>
            </div>
            <div>
              <Truck className="h-8 w-8 text-gray-300" />
            </div>
          </div>
          <Button asChild variant="outline">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersTab;
