
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck } from 'lucide-react';

interface TrackingCardProps {
  trackingNumber: string;
  status: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
}

const TrackingCard: React.FC<TrackingCardProps> = ({ 
  trackingNumber, 
  status, 
  estimatedDelivery, 
  actualDelivery 
}) => {
  if (!trackingNumber) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-gray-600">Tracking Number</p>
          <p className="font-mono text-sm">{trackingNumber}</p>
        </div>
        
        {status === 'delivered' ? (
          <div>
            <p className="text-sm text-gray-600">Delivered</p>
            <p className="font-medium text-green-600">
              {actualDelivery?.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-600">Estimated Delivery</p>
            <p className="font-medium">
              {estimatedDelivery?.toLocaleDateString()}
            </p>
          </div>
        )}
        
        <Button className="w-full" size="sm">
          <Truck className="h-4 w-4 mr-2" />
          Track Package
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrackingCard;
