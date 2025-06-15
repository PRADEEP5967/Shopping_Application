
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Truck, Package, Clock, MapPin } from 'lucide-react';
import { type CarrierTracking } from '@/services/carrierService';

interface TrackingStatusProps {
  trackingData: CarrierTracking;
}

const TrackingStatus: React.FC<TrackingStatusProps> = ({ trackingData }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'picked_up':
      case 'order_created':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Package Status</h3>
        <Badge className={getStatusColor(trackingData.status)}>
          {trackingData.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4" />
          <span>Carrier: {trackingData.carrier}</span>
        </div>
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4" />
          <span>Tracking: {trackingData.trackingNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>
            Est. Delivery: {new Date(trackingData.estimatedDelivery).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>To: {trackingData.packageDetails.to}</span>
        </div>
      </div>
    </div>
  );
};

export default TrackingStatus;
