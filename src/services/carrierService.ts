
// Mock carrier integration service (Shippo, EasyPost style)
export interface CarrierTracking {
  trackingNumber: string;
  carrier: string;
  status: string;
  estimatedDelivery: string;
  trackingEvents: TrackingEvent[];
  packageDetails: PackageDetails;
}

export interface TrackingEvent {
  status: string;
  description: string;
  location: string;
  timestamp: string;
  facilityType?: string;
}

export interface PackageDetails {
  weight: string;
  dimensions: string;
  service: string;
  from: string;
  to: string;
}

// Mock carrier APIs
export const CARRIERS = {
  UPS: 'ups',
  FEDEX: 'fedex',
  USPS: 'usps',
  DHL: 'dhl',
} as const;

// Simulate real carrier API calls
export const trackPackage = async (trackingNumber: string): Promise<CarrierTracking> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock tracking data that would come from Shippo/EasyPost
  return {
    trackingNumber,
    carrier: 'UPS',
    status: 'out_for_delivery',
    estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    packageDetails: {
      weight: '2.5 lbs',
      dimensions: '12" x 8" x 4"',
      service: 'UPS Ground',
      from: 'San Francisco, CA',
      to: 'New York, NY'
    },
    trackingEvents: [
      {
        status: 'order_created',
        description: 'Shipping label created',
        location: 'San Francisco, CA',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        facilityType: 'origin_facility'
      },
      {
        status: 'picked_up',
        description: 'Package picked up by carrier',
        location: 'San Francisco, CA',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        facilityType: 'pickup_location'
      },
      {
        status: 'in_transit',
        description: 'Package departed facility',
        location: 'Oakland, CA',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        facilityType: 'sorting_facility'
      },
      {
        status: 'in_transit',
        description: 'Package arrived at facility',
        location: 'Denver, CO',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        facilityType: 'sorting_facility'
      },
      {
        status: 'in_transit',
        description: 'Package departed facility',
        location: 'Chicago, IL',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        facilityType: 'sorting_facility'
      },
      {
        status: 'out_for_delivery',
        description: 'Out for delivery',
        location: 'New York, NY',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        facilityType: 'delivery_facility'
      }
    ]
  };
};

// Get real-time updates (would connect to webhook endpoints in production)
export const subscribeToUpdates = (trackingNumber: string, callback: (update: TrackingEvent) => void) => {
  // Simulate real-time updates
  const interval = setInterval(() => {
    const updates = [
      {
        status: 'out_for_delivery',
        description: 'Package is 5 stops away',
        location: 'New York, NY',
        timestamp: new Date().toISOString(),
      },
      {
        status: 'out_for_delivery',
        description: 'Package is 3 stops away',
        location: 'New York, NY',
        timestamp: new Date().toISOString(),
      },
      {
        status: 'delivered',
        description: 'Package delivered to front door',
        location: 'New York, NY',
        timestamp: new Date().toISOString(),
      }
    ];
    
    if (Math.random() < 0.3) { // 30% chance of update
      const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
      callback(randomUpdate);
    }
  }, 15000); // Check every 15 seconds

  return () => clearInterval(interval);
};

// Notification service for tracking updates
export const sendTrackingNotification = (orderId: string, event: TrackingEvent) => {
  // In production, this would send push notifications, emails, SMS, etc.
  console.log(`Notification for order ${orderId}:`, event);
  
  // Browser notification API
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(`Order ${orderId} Update`, {
      body: event.description,
      icon: '/favicon.ico',
      tag: `order-${orderId}`,
    });
  }
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};
