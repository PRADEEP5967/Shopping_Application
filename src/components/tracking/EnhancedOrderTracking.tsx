
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { useOrderTracking } from '@/hooks/useOrderTracking';
import TrackingSearch from './TrackingSearch';
import TrackingStatus from './TrackingStatus';
import PackageDetails from './PackageDetails';
import TrackingTimeline from './TrackingTimeline';
import TrackingActions from './TrackingActions';

interface EnhancedOrderTrackingProps {
  orderId?: string;
}

const EnhancedOrderTracking: React.FC<EnhancedOrderTrackingProps> = ({ orderId: initialOrderId }) => {
  const {
    orderId,
    setOrderId,
    trackingData,
    isLoading,
    isRefreshing,
    notificationsEnabled,
    lastUpdate,
    trackOrder,
    refreshTracking,
    toggleNotifications,
  } = useOrderTracking(initialOrderId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Enhanced Order Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <TrackingSearch
            orderId={orderId}
            onOrderIdChange={setOrderId}
            onTrackOrder={trackOrder}
            onRefresh={refreshTracking}
            onToggleNotifications={toggleNotifications}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            notificationsEnabled={notificationsEnabled}
            hasTrackingData={!!trackingData}
            lastUpdate={lastUpdate}
          />

          {trackingData && (
            <div className="space-y-6">
              <TrackingStatus trackingData={trackingData} />
              <PackageDetails packageDetails={trackingData.packageDetails} />
              <TrackingTimeline trackingEvents={trackingData.trackingEvents} />
              <TrackingActions carrier={trackingData.carrier} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedOrderTracking;
