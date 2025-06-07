
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartItem, Product } from '@/types';
import OrderHeader from '@/components/order/OrderHeader';
import OrderTimeline from '@/components/order/OrderTimeline';
import OrderItems from '@/components/order/OrderItems';
import AddressCards from '@/components/order/AddressCards';
import OrderSummary from '@/components/order/OrderSummary';
import TrackingCard from '@/components/order/TrackingCard';
import ActionsCard from '@/components/order/ActionsCard';
import OrderInfoCard from '@/components/order/OrderInfoCard';

const OrderDetail = () => {
  const { orderId } = useParams();

  // Create proper mock products that match the Product type
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones',
      price: 79.99,
      category: 'Electronics',
      images: ['/placeholder.svg'],
      rating: 4.5,
      reviewCount: 120,
      inStock: true,
      brand: 'AudioTech'
    },
    {
      id: '2',
      name: 'Premium Phone Case',
      description: 'Protective phone case',
      price: 25.00,
      category: 'Accessories',
      images: ['/placeholder.svg'],
      rating: 4.0,
      reviewCount: 85,
      inStock: true,
      brand: 'ProtectPro'
    }
  ];

  // Mock order data with proper types
  const order = {
    id: orderId || 'ORD-2024-001',
    date: new Date('2024-01-15'),
    status: 'delivered',
    total: 129.99,
    subtotal: 104.99,
    shipping: 9.99,
    tax: 15.01,
    trackingNumber: 'TRK-789456123',
    estimatedDelivery: new Date('2024-01-20'),
    actualDelivery: new Date('2024-01-19'),
    items: [
      {
        product: mockProducts[0],
        quantity: 1
      },
      {
        product: mockProducts[1],
        quantity: 2
      }
    ] as CartItem[],
    shippingAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main Street',
      addressLine2: '',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States'
    },
    billingAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main Street',
      addressLine2: '',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States'
    },
    paymentMethod: {
      type: 'Credit Card',
      last4: '4242',
      brand: 'Visa'
    },
    orderTimeline: [
      {
        status: 'Order Placed',
        date: new Date('2024-01-15T10:30:00'),
        completed: true
      },
      {
        status: 'Payment Confirmed',
        date: new Date('2024-01-15T10:32:00'),
        completed: true
      },
      {
        status: 'Processing',
        date: new Date('2024-01-15T14:00:00'),
        completed: true
      },
      {
        status: 'Shipped',
        date: new Date('2024-01-16T09:15:00'),
        completed: true
      },
      {
        status: 'Out for Delivery',
        date: new Date('2024-01-19T08:00:00'),
        completed: true
      },
      {
        status: 'Delivered',
        date: new Date('2024-01-19T14:30:00'),
        completed: true
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
      case 'out for delivery':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Create order object for InvoiceButton
  const invoiceOrder = {
    id: order.id,
    createdAt: order.date.toISOString(),
    items: order.items,
    totalAmount: order.total,
    status: order.status as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
    shippingAddress: order.shippingAddress
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <OrderHeader 
            orderId={order.id}
            status={order.status}
            getStatusColor={getStatusColor}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <OrderTimeline timeline={order.orderTimeline} />
              <OrderItems items={order.items} />
              <AddressCards 
                shippingAddress={order.shippingAddress}
                paymentMethod={order.paymentMethod}
                orderDate={order.date}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <OrderSummary 
                subtotal={order.subtotal}
                shipping={order.shipping}
                tax={order.tax}
                total={order.total}
              />

              <TrackingCard 
                trackingNumber={order.trackingNumber}
                status={order.status}
                estimatedDelivery={order.estimatedDelivery}
                actualDelivery={order.actualDelivery}
              />

              <ActionsCard 
                order={invoiceOrder}
                status={order.status}
              />

              <OrderInfoCard 
                orderDate={order.date}
                orderId={order.id}
                itemCount={order.items.length}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderDetail;
