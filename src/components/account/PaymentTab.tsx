
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

const PaymentTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your payment options</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-b">
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">You don't have any saved payment methods.</p>
            </div>
            <div>
              <CreditCard className="h-8 w-8 text-gray-300" />
            </div>
          </div>
          <Button>Add New Payment Method</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentTab;
