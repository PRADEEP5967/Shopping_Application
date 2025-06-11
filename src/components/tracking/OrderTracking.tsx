
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface TrackingStatus {
  status: string;
  description: string;
  timestamp: string;
  location?: string;
}

interface OrderTrackingProps {
  orderId?: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId: initialOrderId }) => {
  const [orderId, setOrderId] = useState(initialOrderId || '');
  const [trackingData, setTrackingData] = useState<TrackingStatus[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample tracking data
  const sampleTrackingData: TrackingStatus[] = [
    {
      status: 'Order Placed',
      description: 'Your order has been received and is being processed',
      timestamp: '2024-01-15T10:00:00Z',
      location: 'Our Warehouse'
    },
    {
      status: 'Processing',
      description: 'Items are being picked and packed',
      timestamp: '2024-01-15T14:30:00Z',
      location: 'Our Warehouse'
    },
    {
      status: 'Shipped',
      description: 'Package has been dispatched and is on its way',
      timestamp: '2024-01-16T09:15:00Z',
      location: 'Distribution Center'
    },
    {
      status: 'Out for Delivery',
      description: 'Package is out for delivery and will arrive today',
      timestamp: '2024-01-17T08:00:00Z',
      location: 'Local Delivery Hub'
    }
  ];

  const trackOrder = async () => {
    if (!orderId.trim()) {
      toast.error('Please enter an order ID');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingData(sampleTrackingData);
      setIsLoading(false);
      toast.success('Order tracking information loaded');
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order placed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-orange-600" />;
      case 'out for delivery':
        return <Truck className="w-5 h-5 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order placed':
      case 'delivered':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'shipped':
      case 'out for delivery':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Section */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter order ID (e.g., ORD-12345)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-1"
          />
          <Button onClick={trackOrder} disabled={isLoading}>
            {isLoading ? 'Tracking...' : 'Track Order'}
          </Button>
        </div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Order #{orderId}</h3>
                <Badge variant={getStatusColor(trackingData[trackingData.length - 1].status)}>
                  {trackingData[trackingData.length - 1].status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                Estimated delivery: Today by 6:00 PM
              </p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Tracking to: Noida, India</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>Contact: 8130885013</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h4 className="font-medium">Tracking Timeline</h4>
              <div className="space-y-4">
                {trackingData.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      {getStatusIcon(item.status)}
                      {index < trackingData.length - 1 && (
                        <div className="w-px h-12 bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">{item.status}</h5>
                        <span className="text-sm text-gray-500">
                          {new Date(item.timestamp).toLocaleDateString()} at{' '}
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      {item.location && (
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
              <Button variant="outline" size="sm">
                Report Issue
              </Button>
              <Button variant="outline" size="sm">
                Share Tracking
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderTracking;
