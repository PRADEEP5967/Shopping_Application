
import React from 'react';
import EnhancedOrderTracking from './EnhancedOrderTracking';

interface OrderTrackingProps {
  orderId?: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId }) => {
  return <EnhancedOrderTracking orderId={orderId} />;
};

export default OrderTracking;
