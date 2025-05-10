
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '@/data/products';
import InvoiceButton from '@/components/InvoiceButton';
import { Order } from '@/types';
import { formatCurrency } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const Orders = () => {
  const orders = getAllOrders();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Your Orders</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Table>
          <TableCaption>A list of your recent orders</TableCaption>
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
            {orders.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
                    ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                    ${order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : ''}
                    ${order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${order.status === 'pending' ? 'bg-gray-100 text-gray-800' : ''}
                    ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                <TableCell className="text-right">
                  <InvoiceButton order={order} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
