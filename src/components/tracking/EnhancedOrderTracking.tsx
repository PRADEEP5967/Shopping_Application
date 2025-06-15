
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Bell,
  BellOff,
  Refresh,
  ExternalLink,
  Weight,
  Ruler
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  trackPackage, 
  subscribeToUpdates, 
  requestNotificationPermission,
  sendTrackingNotification,
  type CarrierTracking,
  type TrackingEvent
} from '@/services/carrierService';

interface EnhancedOrderTrackingProps {
  orderId?: string;
}

const EnhancedOrderTracking: React.FC<EnhancedOrderTrackingProps> = ({ orderId: initialOrderId }) => {
  const [orderId, setOrderId] = useState(initialOrderId || '');
  const [trackingData, setTrackingData] = useState<CarrierTracking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Check notification permission on mount
  useEffect(() => {
    const checkPermission = async () => {
      const hasPermission = await requestNotificationPermission();
      setNotificationsEnabled(hasPermission);
    };
    checkPermission();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!trackingData) return;

    const unsubscribe = subscribeToUpdates(trackingData.trackingNumber, (update: TrackingEvent) => {
      console.log('Real-time update received:', update);
      
      // Update tracking data
      setTrackingData(prev => prev ? {
        ...prev,
        status: update.status,
        trackingEvents: [update, ...prev.trackingEvents]
      } : null);
      
      // Send notification
      if (notificationsEnabled && orderId) {
        sendTrackingNotification(orderId, update);
        toast.success(`Order Update: ${update.description}`, {
          description: `Location: ${update.location}`,
          duration: 6000,
        });
      }
      
      setLastUpdate(new Date());
    });

    return unsubscribe;
  }, [trackingData, notificationsEnabled, orderId]);

  const trackOrder = async () => {
    if (!orderId.trim()) {
      toast.error('Please enter an order ID');
      return;
    }

    setIsLoading(true);
    
    try {
      const data = await trackPackage(orderId);
      setTrackingData(data);
      setLastUpdate(new Date());
      toast.success('Order tracking information loaded successfully');
    } catch (error) {
      console.error('Error tracking order:', error);
      toast.error('Failed to load tracking information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTracking = async () => {
    if (!trackingData) return;
    
    setIsRefreshing(true);
    try {
      const data = await trackPackage(trackingData.trackingNumber);
      setTrackingData(data);
      setLastUpdate(new Date());
      toast.success('Tracking information updated');
    } catch (error) {
      toast.error('Failed to refresh tracking information');
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const permission = await requestNotificationPermission();
      setNotificationsEnabled(permission);
      if (permission) {
        toast.success('Notifications enabled for order updates');
      } else {
        toast.error('Please enable notifications in your browser settings');
      }
    } else {
      setNotificationsEnabled(false);
      toast.info('Notifications disabled for order updates');
    }
  };

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Enhanced Order Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Section */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  placeholder="Enter order ID (e.g., ORD-12345)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>
              <div className="flex items-end gap-2">
                <Button onClick={trackOrder} disabled={isLoading}>
                  {isLoading ? 'Tracking...' : 'Track Order'}
                </Button>
              </div>
            </div>

            {/* Controls */}
            {trackingData && (
              <div className="flex items-center gap-4 text-sm">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshTracking}
                  disabled={isRefreshing}
                  className="flex items-center gap-1"
                >
                  <Refresh className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleNotifications}
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

          {/* Tracking Results */}
          {trackingData && (
            <div className="space-y-6">
              {/* Current Status */}
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

              {/* Package Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Package Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Weight className="w-4 h-4" />
                      <div>
                        <div className="text-gray-500">Weight</div>
                        <div className="font-medium">{trackingData.packageDetails.weight}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4" />
                      <div>
                        <div className="text-gray-500">Dimensions</div>
                        <div className="font-medium">{trackingData.packageDetails.dimensions}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      <div>
                        <div className="text-gray-500">Service</div>
                        <div className="font-medium">{trackingData.packageDetails.service}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <div>
                        <div className="text-gray-500">From</div>
                        <div className="font-medium">{trackingData.packageDetails.from}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tracking History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingData.trackingEvents.map((event, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          {getStatusIcon(event.status)}
                          {index < trackingData.trackingEvents.length - 1 && (
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

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-1" />
                  Contact Carrier
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Track on {trackingData.carrier}
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
    </div>
  );
};

export default EnhancedOrderTracking;
