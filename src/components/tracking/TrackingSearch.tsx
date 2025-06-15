
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RefreshCw, Bell, BellOff } from 'lucide-react';

interface TrackingSearchProps {
  orderId: string;
  onOrderIdChange: (value: string) => void;
  onTrackOrder: () => void;
  onRefresh: () => void;
  onToggleNotifications: () => void;
  isLoading: boolean;
  isRefreshing: boolean;
  notificationsEnabled: boolean;
  hasTrackingData: boolean;
  lastUpdate: Date | null;
}

const TrackingSearch: React.FC<TrackingSearchProps> = ({
  orderId,
  onOrderIdChange,
  onTrackOrder,
  onRefresh,
  onToggleNotifications,
  isLoading,
  isRefreshing,
  notificationsEnabled,
  hasTrackingData,
  lastUpdate,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="orderId">Order ID</Label>
          <Input
            id="orderId"
            placeholder="Enter order ID (e.g., ORD-12345)"
            value={orderId}
            onChange={(e) => onOrderIdChange(e.target.value)}
          />
        </div>
        <div className="flex items-end gap-2">
          <Button onClick={onTrackOrder} disabled={isLoading}>
            {isLoading ? 'Tracking...' : 'Track Order'}
          </Button>
        </div>
      </div>

      {/* Controls */}
      {hasTrackingData && (
        <div className="flex items-center gap-4 text-sm">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleNotifications}
            className="flex items-center gap-1"
          >
            {notificationsEnabled ? (
              <>
                <Bell className="w-3 h-3" />
                Notifications On
              </>
            ) : (
              <>
                <BellOff className="w-3 h-3" />
                Enable Notifications
              </>
            )}
          </Button>

          {lastUpdate && (
            <span className="text-gray-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackingSearch;
