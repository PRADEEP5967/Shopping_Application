
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react';
import { Product } from '@/types';

interface LiveInventoryTrackerProps {
  products: Product[];
  onStockUpdate?: (productId: string, newStock: number) => void;
}

interface StockData {
  productId: string;
  currentStock: number;
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
}

const LiveInventoryTracker: React.FC<LiveInventoryTrackerProps> = ({ 
  products, 
  onStockUpdate 
}) => {
  const [stockData, setStockData] = useState<Record<string, StockData>>({});
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Initialize stock data
    const initialStock: Record<string, StockData> = {};
    products.forEach(product => {
      initialStock[product.id] = {
        productId: product.id,
        currentStock: Math.floor(Math.random() * 100) + 10,
        lastUpdated: new Date(),
        trend: 'stable'
      };
    });
    setStockData(initialStock);

    // Simulate live updates every 30 seconds
    const interval = setInterval(() => {
      setStockData(prevData => {
        const newData = { ...prevData };
        
        // Randomly update some products
        products.forEach(product => {
          if (Math.random() > 0.8) { // 20% chance to update
            const currentStock = newData[product.id]?.currentStock || 50;
            const change = Math.floor(Math.random() * 10) - 5; // -5 to +5
            const newStock = Math.max(0, currentStock + change);
            
            newData[product.id] = {
              ...newData[product.id],
              currentStock: newStock,
              lastUpdated: new Date(),
              trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
            };
            
            onStockUpdate?.(product.id, newStock);
          }
        });
        
        return newData;
      });
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [products, onStockUpdate]);

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'destructive';
    if (stock < 10) return 'secondary';
    return 'default';
  };

  const getStockIcon = (stock: number, trend: string) => {
    if (stock === 0) return <AlertTriangle className="w-3 h-3" />;
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-red-600" />;
    return <Package className="w-3 h-3" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Live Inventory
          <Badge variant="outline" className="text-xs">
            Updated {lastUpdate.toLocaleTimeString()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {products.slice(0, 10).map((product) => {
            const stock = stockData[product.id];
            if (!stock) return null;

            return (
              <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={getStockColor(stock.currentStock)}
                    className="flex items-center gap-1"
                  >
                    {getStockIcon(stock.currentStock, stock.trend)}
                    {stock.currentStock} left
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveInventoryTracker;
