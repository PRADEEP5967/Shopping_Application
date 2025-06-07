
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Truck, 
  MapPin, 
  CreditCard, 
  Download,
  ArrowLeft,
  CheckCircle,
  Clock,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import InvoiceButton from '@/components/InvoiceButton';
import { CartItem, Product } from '@/types';

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/orders">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Orders
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Order Details</h1>
              <p className="text-gray-600">Order #{order.id}</p>
            </div>
            <Badge className={`${getStatusColor(order.status)} text-lg px-3 py-1`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Order Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.orderTimeline.map((event, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          event.completed ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {event.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {event.status}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-gray-600">SKU: {item.product.id}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-600">${item.product.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping & Billing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p className="font-medium">{order.shippingAddress.fullName}</p>
                      <p>{order.shippingAddress.addressLine1}</p>
                      {order.shippingAddress.addressLine2 && (
                        <p>{order.shippingAddress.addressLine2}</p>
                      )}
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p className="font-medium">{order.paymentMethod.type}</p>
                      <p>{order.paymentMethod.brand} ending in {order.paymentMethod.last4}</p>
                      <p className="text-gray-600 mt-2">
                        Charged on {order.date.toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Info */}
              {order.trackingNumber && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Tracking Number</p>
                      <p className="font-mono text-sm">{order.trackingNumber}</p>
                    </div>
                    
                    {order.status === 'delivered' ? (
                      <div>
                        <p className="text-sm text-gray-600">Delivered</p>
                        <p className="font-medium text-green-600">
                          {order.actualDelivery?.toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600">Estimated Delivery</p>
                        <p className="font-medium">
                          {order.estimatedDelivery.toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    
                    <Button className="w-full" size="sm">
                      <Truck className="h-4 w-4 mr-2" />
                      Track Package
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <InvoiceButton 
                    order={{
                      id: order.id,
                      date: order.date,
                      items: order.items.map(item => ({
                        name: item.product.name,
                        quantity: item.quantity,
                        price: item.product.price
                      })),
                      subtotal: order.subtotal,
                      shipping: order.shipping,
                      tax: order.tax,
                      total: order.total,
                      shippingAddress: order.shippingAddress
                    }}
                    className="w-full"
                  />
                  
                  <Button variant="outline" className="w-full" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Order Details
                  </Button>
                  
                  {order.status === 'delivered' && (
                    <Button variant="outline" className="w-full" size="sm">
                      Return Items
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>

              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date</span>
                    <span>{order.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID</span>
                    <span className="font-mono">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items</span>
                    <span>{order.items.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderDetail;
