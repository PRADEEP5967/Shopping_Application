
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  trackPackage, 
  subscribeToUpdates, 
  requestNotificationPermission,
  sendTrackingNotification,
  type CarrierTracking,
  type TrackingEvent
} from '@/services/carrierService';

export const useOrderTracking = (initialOrderId?: string) => {
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

  return {
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
  };
};
