
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { downloadInvoice } from '@/utils/invoiceGenerator';
import { Order } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface InvoiceButtonProps {
  order: Order;
  className?: string;
}

const InvoiceButton: React.FC<InvoiceButtonProps> = ({ order, className }) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      toast({
        title: "Generating invoice...",
        description: "Your invoice PDF is being prepared.",
      });
      
      await downloadInvoice(order);
      
      toast({
        title: "Success!",
        description: "Your invoice has been downloaded.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate invoice. Please try again.",
      });
    }
  };

  return (
    <Button 
      onClick={handleDownload} 
      variant="outline" 
      className={className}
    >
      <FileText className="mr-2 h-4 w-4" /> Download Invoice
    </Button>
  );
};

export default InvoiceButton;
