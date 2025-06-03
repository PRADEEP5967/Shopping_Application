
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  Calendar, 
  FileText 
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { downloadInvoice } from '@/utils/invoiceGenerator';

// Mock order data - in a real app this would come from an API
const MOCK_ORDER = {
  id: 'ORD-5612',
  createdAt: '2023-05-15T08:30:00Z',
  status: 'delivered',
  totalAmount: 1299.98,
  items: [
    { 
      product: { 
        id: '1', 
        name: 'Laptop Pro 13"', 
        price: 1299.98,
        images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853'] 
      }, 
      quantity: 1 
    }
  ],
  shippingAddress: {
    fullName: 'John Doe',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States'
  }
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, you'd fetch the order by ID
  const order = MOCK_ORDER;

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <CartFlyout />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Order not found</h2>
            <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
            <Link to="/order-history">
              <Button>Back to Order History</Button>
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDownloadInvoice = () => {
    downloadInvoice(order);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Order {order.id}</h1>
            <p className="text-gray-600">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
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
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(item.product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Status:</span>
                  {getStatusBadge(order.status)}
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-semibold">{formatCurrency(order.totalAmount)}</span>
                </div>
                <Button 
                  onClick={handleDownloadInvoice}
                  variant="outline" 
                  className="w-full flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Download Invoice
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <p className="font-semibold">{order.shippingAddress.fullName}</p>
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
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderDetail;
