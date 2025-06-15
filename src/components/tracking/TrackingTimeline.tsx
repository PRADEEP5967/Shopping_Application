
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Truck, Clock, MapPin } from 'lucide-react';
import { type TrackingEvent } from '@/services/carrierService';

interface TrackingTimelineProps {
  trackingEvents: TrackingEvent[];
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ trackingEvents }) => {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'order_created':
      case 'picked_up':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_transit':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'out_for_delivery':
        return <Truck className="w-5 h-5 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tracking History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trackingEvents.map((event, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                {getStatusIcon(event.status)}
                {index < trackingEvents.length - 1 && (
                  <div className="w-px h-12 bg-gray-300 mt-2"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium capitalize">
                    {event.status.replace('_', ' ')}
                  </h5>
                  <span className="text-sm text-gray-500">
                    {new Date(event.timestamp).toLocaleDateString()} at{' '}
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </span>
                  {event.facilityType && (
                    <span className="capitalize">
                      {event.facilityType.replace('_', ' ')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackingTimeline;
