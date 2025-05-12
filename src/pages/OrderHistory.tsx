
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Package, 
  FileText, 
  ExternalLink, 
  ShoppingBag 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { downloadInvoice } from '@/utils/invoiceGenerator';

const MOCK_ORDERS = [
  {
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
  },
  {
    id: 'ORD-4217',
    createdAt: '2023-04-22T10:15:00Z',
    status: 'delivered',
    totalAmount: 249.95,
    items: [
      { 
        product: { 
          id: '2', 
          name: 'Wireless Earbuds', 
          price: 129.99,
          images: ['https://images.unsplash.com/photo-1606741965509-717b9fdd6593'] 
        }, 
        quantity: 1 
      },
      { 
        product: { 
          id: '3', 
          name: 'Smartwatch', 
          price: 119.96,
          images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a'] 
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
  },
  {
    id: 'ORD-2897',
    createdAt: '2023-03-10T14:45:00Z',
    status: 'delivered',
    totalAmount: 44.99,
    items: [
      { 
        product: { 
          id: '4', 
          name: 'Wireless Mouse', 
          price: 44.99,
          images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7'] 
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
  }
];

const OrderHistory = () => {
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

  const handleDownloadInvoice = (order: any) => {
    downloadInvoice(order);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Order History</h1>
          <Link to="/products">
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
        
        {MOCK_ORDERS.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableCaption>Your order history</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_ORDERS.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleDownloadInvoice(order)}
                        >
                          <FileText className="h-4 w-4" />
                          <span className="hidden sm:inline">Invoice</span>
                        </Button>
                        <Link to={`/orders/${order.id}`}>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="hidden sm:inline">Details</span>
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderHistory;
