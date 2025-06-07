
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import InvoiceButton from '@/components/InvoiceButton';
import { Order } from '@/types';

interface ActionsCardProps {
  order: Order;
  status: string;
}

const ActionsCard: React.FC<ActionsCardProps> = ({ order, status }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <InvoiceButton 
          order={order}
          className="w-full"
        />
        
        <Button variant="outline" className="w-full" size="sm">
          <Mail className="h-4 w-4 mr-2" />
          Email Order Details
        </Button>
        
        {status === 'delivered' && (
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
  );
};

export default ActionsCard;
