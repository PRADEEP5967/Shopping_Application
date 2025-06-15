
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface BehaviorEvent {
  id: string;
  userId?: string;
  sessionId: string;
  event: string;
  data: any;
  timestamp: Date;
  page: string;
}

interface CustomerBehavior {
  viewedProducts: string[];
  searchQueries: string[];
  cartActions: string[];
  purchaseHistory: string[];
  timeSpent: Record<string, number>;
  clickPatterns: Array<{ element: string; timestamp: Date }>;
}

export const useCustomerBehavior = () => {
  const { user } = useAuth();
  const [behavior, setBehavior] = useState<CustomerBehavior>({
    viewedProducts: [],
    searchQueries: [],
    cartActions: [],
    purchaseHistory: [],
    timeSpent: {},
    clickPatterns: []
  });

  const sessionId = sessionStorage.getItem('sessionId') || 
    Math.random().toString(36).substring(7);

  useEffect(() => {
    sessionStorage.setItem('sessionId', sessionId);
    
    // Load existing behavior data
    const savedBehavior = localStorage.getItem('customerBehavior');
    if (savedBehavior) {
      setBehavior(JSON.parse(savedBehavior));
    }
  }, [sessionId]);

  const trackEvent = (event: string, data: any = {}) => {
    const behaviorEvent: BehaviorEvent = {
      id: Math.random().toString(36).substring(7),
      userId: user?.id,
      sessionId,
      event,
      data,
      timestamp: new Date(),
      page: window.location.pathname
    };

    console.log('Tracking behavior event:', behaviorEvent);

    // Update behavior state based on event type
    setBehavior(prev => {
      const updated = { ...prev };
      
      switch (event) {
        case 'product_viewed':
          if (!updated.viewedProducts.includes(data.productId)) {
            updated.viewedProducts.push(data.productId);
          }
          break;
        case 'search_performed':
          updated.searchQueries.push(data.query);
          break;
        case 'cart_action':
          updated.cartActions.push(`${data.action}:${data.productId}`);
          break;
        case 'purchase_completed':
          updated.purchaseHistory.push(data.orderId);
          break;
        case 'page_view':
          updated.timeSpent[data.page] = (updated.timeSpent[data.page] || 0) + 1;
          break;
        case 'click':
          updated.clickPatterns.push({
            element: data.element,
            timestamp: new Date()
          });
          break;
      }

      // Save to localStorage
      localStorage.setItem('customerBehavior', JSON.stringify(updated));
      return updated;
    });

    // Send to analytics service (simulated)
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(behaviorEvent)
    }).catch(() => {
      // Fallback: store locally if API fails
      const events = JSON.parse(localStorage.getItem('behaviorEvents') || '[]');
      events.push(behaviorEvent);
      localStorage.setItem('behaviorEvents', JSON.stringify(events));
    });
  };

  const getPersonalizationData = () => {
    const categories = behavior.viewedProducts.length > 0 
      ? ['electronics', 'clothing'] // Simplified - would analyze actual product categories
      : [];
    
    const interests = behavior.searchQueries.length > 0
      ? behavior.searchQueries.slice(-5) // Last 5 searches
      : [];

    return {
      preferredCategories: categories,
      recentInterests: interests,
      engagementLevel: behavior.clickPatterns.length > 10 ? 'high' : 'medium',
      purchaseBehavior: behavior.purchaseHistory.length > 0 ? 'buyer' : 'browser'
    };
  };

  return {
    behavior,
    trackEvent,
    getPersonalizationData,
    sessionId
  };
};
