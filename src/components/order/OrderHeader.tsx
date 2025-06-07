
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface OrderHeaderProps {
  orderId: string;
  status: string;
  getStatusColor: (status: string) => string;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({ orderId, status, getStatusColor }) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Link to="/orders">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Button>
      </Link>
      <div className="flex-1">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <p className="text-gray-600">Order #{orderId}</p>
      </div>
      <Badge className={`${getStatusColor(status)} text-lg px-3 py-1`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    </div>
  );
};

export default OrderHeader;
