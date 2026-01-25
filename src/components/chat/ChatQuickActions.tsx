import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, HelpCircle, CreditCard, Truck, RotateCcw } from 'lucide-react';

interface QuickAction {
  icon: React.ElementType;
  label: string;
  action: string;
  color?: string;
}

const quickActions: QuickAction[] = [
  { icon: ShoppingCart, label: 'Products', action: 'find-products' },
  { icon: Package, label: 'Track Order', action: 'track-order' },
  { icon: Truck, label: 'Shipping', action: 'shipping-info' },
  { icon: RotateCcw, label: 'Returns', action: 'returns' },
  { icon: CreditCard, label: 'Payment', action: 'payment' },
  { icon: HelpCircle, label: 'Help', action: 'get-help' }
];

interface ChatQuickActionsProps {
  onAction: (action: string) => void;
}

const ChatQuickActions: React.FC<ChatQuickActionsProps> = ({ onAction }) => {
  return (
    <div className="flex gap-1.5 flex-wrap px-1">
      {quickActions.map((action) => (
        <Button
          key={action.action}
          variant="ghost"
          size="sm"
          onClick={() => onAction(action.action)}
          className="h-7 px-2.5 text-xs rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <action.icon className="h-3 w-3 mr-1" />
          {action.label}
        </Button>
      ))}
    </div>
  );
};

export default ChatQuickActions;
