import type { CartItem } from '@/types';

export interface OrderData {
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  billingAddress?: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  notes?: string;
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingAddress: any;
  billingAddress?: any;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items: {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    variantId?: string;
  }[];
}

export const createOrder = async (orderData: OrderData): Promise<Order | null> => {
  const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const localOrder: Order = {
    id: orderId,
    userId: orderData.userId,
    status: 'pending',
    totalAmount: orderData.totalAmount,
    shippingAddress: orderData.shippingAddress,
    billingAddress: orderData.billingAddress,
    paymentMethod: orderData.paymentMethod,
    paymentStatus: 'pending',
    notes: orderData.notes,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: orderData.items.map(item => ({
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.variant ? item.variant.price : item.product.price,
      variantId: item.variant?.id,
    })),
  };

  const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  localStorage.setItem('orders', JSON.stringify([...existingOrders, localOrder]));

  return localOrder;
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  return orders.filter((order: Order) => order.userId === userId);
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  return orders.find((order: Order) => order.id === orderId) || null;
};

export const updateOrderStatus = async (
  orderId: string,
  status: Order['status']
): Promise<boolean> => {
  try {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = orders.map((order: Order) =>
      order.id === orderId
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    );
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
};
