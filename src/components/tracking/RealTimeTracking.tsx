
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, MapPin, Clock, Package, CheckCircle } from 'lucide-react';

interface TrackingUpdate {
  id: string;
  timestamp: Date;
  location: string;
  status: string;
  description: string;
}

interface RealTimeTrackingProps {
  orderId: string;
  onStatusChange?: (status: string) => void;
}

const RealTimeTracking: React.FC<RealTimeTrackingProps> = ({ 
  orderId, 
  onStatusChange 
}) => {
  const [updates, setUpdates] = useState<TrackingUpdate[]>([]);
  const [currentStatus, setCurrentStatus] = useState('processing');
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Initialize with some sample data
    const initialUpdates: TrackingUpdate[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        location: 'San Francisco, CA',
        status: 'picked_up',
        description: 'Package picked up from sender'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        location: 'Oakland, CA',
        status: 'in_transit',
        description: 'Package arrived at sorting facility'
      }
    ];
    setUpdates(initialUpdates);

    if (isLive) {
      // Simulate real-time updates every 2 minutes
      const interval = setInterval(() => {
        const newUpdate: TrackingUpdate = {
          id: Date.now().toString(),
          timestamp: new Date(),
          location: getRandomLocation(),
          status: getNextStatus(currentStatus),
          description: getStatusDescription(getNextStatus(currentStatus))
        };

        setUpdates(prev => [newUpdate, ...prev]);
        const nextStatus = getNextStatus(currentStatus);
        setCurrentStatus(nextStatus);
        onStatusChange?.(nextStatus);
      }, 120000); // 2 minutes

      return () => clearInterval(interval);
    }
  }, [isLive, currentStatus, onStatusChange]);

  const getRandomLocation = () => {
    const locations = [
      'Sacramento, CA', 'Reno, NV', 'Salt Lake City, UT', 
      'Denver, CO', 'Kansas City, MO', 'Chicago, IL'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const getNextStatus = (current: string) => {
    const progression = ['processing', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered'];
    const currentIndex = progression.indexOf(current);
    return currentIndex < progression.length - 1 ? progression[currentIndex + 1] : current;
  };

  const getStatusDescription = (status: string) => {
    const descriptions = {
      'processing': 'Order is being processed',
      'picked_up': 'Package picked up from sender',
      'in_transit': 'Package in transit',
      'out_for_delivery': 'Out for delivery',
      'delivered': 'Package delivered'
    };
    return descriptions[status as keyof typeof descriptions] || 'Status update';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <Package className="h-4 w-4" />;
      case 'picked_up': return <Truck className="h-4 w-4" />;
      case 'in_transit': return <MapPin className="h-4 w-4" />;
      case 'out_for_delivery': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'out_for_delivery': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Real-Time Tracking
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isLive ? "destructive" : "default"}
              size="sm"
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? 'Stop Live' : 'Start Live'}
            </Button>
            {isLive && (
              <Badge variant="default" className="animate-pulse">
                LIVE
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
            {getStatusIcon(currentStatus)}
            <div>
              <p className="font-medium capitalize">{currentStatus.replace('_', ' ')}</p>
              <p className="text-sm text-gray-600">Order #{orderId}</p>
            </div>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {updates.map((update) => (
              <div key={update.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="bg-primary/10 p-2 rounded-full">
                  {getStatusIcon(update.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getStatusColor(update.status)} className="text-xs">
                      {update.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {update.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <p className="font-medium text-sm">{update.description}</p>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {update.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeTracking;
