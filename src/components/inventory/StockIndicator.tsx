
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package } from 'lucide-react';

interface StockIndicatorProps {
  inStock: boolean;
  stockLevel?: number;
  lowStockThreshold?: number;
}

const StockIndicator: React.FC<StockIndicatorProps> = ({ 
  inStock, 
  stockLevel = 0, 
  lowStockThreshold = 10 
}) => {
  if (!inStock) {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        Out of Stock
      </Badge>
    );
  }

  if (stockLevel <= lowStockThreshold) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1 bg-orange-100 text-orange-700">
        <AlertTriangle className="w-3 h-3" />
        Low Stock ({stockLevel} left)
      </Badge>
    );
  }

  return (
    <Badge variant="default" className="flex items-center gap-1 bg-green-100 text-green-700">
      <Package className="w-3 h-3" />
      In Stock ({stockLevel} available)
    </Badge>
  );
};

export default StockIndicator;
