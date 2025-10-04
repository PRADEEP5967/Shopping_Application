import { supabase } from '@/lib/supabase';
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
  try {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
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
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.userId,
        total_amount: orderData.totalAmount,
        shipping_address: orderData.shippingAddress,
        billing_address: orderData.billingAddress || null,
        payment_method: orderData.paymentMethod,
        notes: orderData.notes || null,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.variant ? item.variant.price : item.product.price,
      variant_id: item.variant?.id || null,
    }));

    const { data: createdItems, error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();

    if (itemsError) throw itemsError;

    const formattedOrder: Order = {
      id: order.id,
      userId: order.user_id,
      status: order.status,
      totalAmount: order.total_amount,
      shippingAddress: order.shipping_address,
      billingAddress: order.billing_address,
      paymentMethod: order.payment_method || '',
      paymentStatus: order.payment_status,
      trackingNumber: order.tracking_number || undefined,
      notes: order.notes || undefined,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      items: createdItems.map(item => ({
        id: item.id,
        productId: item.product_id,
        productName: orderData.items.find(i => i.product.id === item.product_id)?.product.name || '',
        quantity: item.quantity,
        price: item.price,
        variantId: item.variant_id || undefined,
      })),
    };

    return formattedOrder;
  } catch (error) {
    console.error('Error creating order:', error);

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
  }
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      return orders.filter((order: Order) => order.userId === userId);
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const formattedOrders: Order[] = await Promise.all(
      orders.map(async (order) => {
        const items = await Promise.all(
          (order.order_items as any[]).map(async (item) => {
            const { data: product } = await supabase
              .from('products')
              .select('name')
              .eq('id', item.product_id)
              .maybeSingle();

            return {
              id: item.id,
              productId: item.product_id,
              productName: product?.name || 'Unknown Product',
              quantity: item.quantity,
              price: item.price,
              variantId: item.variant_id || undefined,
            };
          })
        );

        return {
          id: order.id,
          userId: order.user_id,
          status: order.status,
          totalAmount: order.total_amount,
          shippingAddress: order.shipping_address,
          billingAddress: order.billing_address,
          paymentMethod: order.payment_method || '',
          paymentStatus: order.payment_status,
          trackingNumber: order.tracking_number || undefined,
          notes: order.notes || undefined,
          createdAt: order.created_at,
          updatedAt: order.updated_at,
          items,
        };
      })
    );

    return formattedOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.filter((order: Order) => order.userId === userId);
  }
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      return orders.find((order: Order) => order.id === orderId) || null;
    }

    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *
        )
      `)
      .eq('id', orderId)
      .maybeSingle();

    if (error) throw error;
    if (!order) return null;

    const items = await Promise.all(
      (order.order_items as any[]).map(async (item) => {
        const { data: product } = await supabase
          .from('products')
          .select('name')
          .eq('id', item.product_id)
          .maybeSingle();

        return {
          id: item.id,
          productId: item.product_id,
          productName: product?.name || 'Unknown Product',
          quantity: item.quantity,
          price: item.price,
          variantId: item.variant_id || undefined,
        };
      })
    );

    return {
      id: order.id,
      userId: order.user_id,
      status: order.status,
      totalAmount: order.total_amount,
      shippingAddress: order.shipping_address,
      billingAddress: order.billing_address,
      paymentMethod: order.payment_method || '',
      paymentStatus: order.payment_status,
      trackingNumber: order.tracking_number || undefined,
      notes: order.notes || undefined,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
      items,
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.find((order: Order) => order.id === orderId) || null;
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: Order['status']
): Promise<boolean> => {
  try {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = orders.map((order: Order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      );
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return true;
    }

    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
};
