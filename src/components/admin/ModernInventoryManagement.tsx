import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Search, Package, AlertTriangle, Plus, Minus, TrendingUp, TrendingDown, BarChart3, Boxes, Sparkles, RefreshCw, Edit, Save } from 'lucide-react';
import { getAllProducts } from '@/data/products';
import BulkOperations from '@/components/admin/BulkOperations';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface ProductWithStock {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  inStock: boolean;
  stockLevel: number;
  lowStockThreshold: number;
}

export const ModernInventoryManagement = () => {
  const initialProducts = getAllProducts().map(p => ({
    ...p,
    stockLevel: p.inStock ? Math.floor(Math.random() * 100) + 1 : 0,
    lowStockThreshold: 20
  }));
  
  const [products, setProducts] = useState<ProductWithStock[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithStock | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ stockLevel: 0, lowStockThreshold: 20 });

  const getStockStatus = (product: ProductWithStock) => {
    if (product.stockLevel === 0) return { label: 'Out of Stock', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300' };
    if (product.stockLevel <= product.lowStockThreshold) return { label: 'Low Stock', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' };
    return { label: 'In Stock', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' };
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const inventoryStats = {
    total: products.length,
    inStock: products.filter(p => p.stockLevel > p.lowStockThreshold).length,
    lowStock: products.filter(p => p.stockLevel > 0 && p.stockLevel <= p.lowStockThreshold).length,
    outOfStock: products.filter(p => p.stockLevel === 0).length,
  };

  const stockPercentage = ((inventoryStats.inStock + inventoryStats.lowStock) / inventoryStats.total) * 100;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Inventory refreshed', { description: 'Stock levels have been updated' });
    setIsRefreshing(false);
  };

  const handleAdjustStock = (productId: string, adjustment: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newStockLevel = Math.max(0, p.stockLevel + adjustment);
        toast.success('Stock updated', { description: `${p.name} stock ${adjustment > 0 ? 'increased' : 'decreased'} by ${Math.abs(adjustment)}` });
        return { ...p, stockLevel: newStockLevel, inStock: newStockLevel > 0 };
      }
      return p;
    }));
  };

  const handleEditStock = (product: ProductWithStock) => {
    setSelectedProduct(product);
    setEditFormData({ stockLevel: product.stockLevel, lowStockThreshold: product.lowStockThreshold });
    setIsEditDialogOpen(true);
  };

  const handleSaveStock = () => {
    if (!selectedProduct) return;
    
    setProducts(prev => prev.map(p => 
      p.id === selectedProduct.id 
        ? { ...p, stockLevel: editFormData.stockLevel, lowStockThreshold: editFormData.lowStockThreshold, inStock: editFormData.stockLevel > 0 }
        : p
    ));
    
    toast.success('Stock updated', { description: `${selectedProduct.name} stock has been updated` });
    setIsEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleRestockAll = () => {
    setProducts(prev => prev.map(p => ({
      ...p,
      stockLevel: p.stockLevel < p.lowStockThreshold ? p.lowStockThreshold + 30 : p.stockLevel,
      inStock: true
    })));
    toast.success('Restock complete', { description: 'All low stock items have been restocked' });
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            title: 'Total Products', 
            value: inventoryStats.total, 
            icon: Package, 
            gradient: 'from-violet-500 to-purple-600',
            bgGradient: 'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
            tag: 'Inventory',
            tagColor: 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
          },
          { 
            title: 'In Stock', 
            value: inventoryStats.inStock, 
            icon: TrendingUp, 
            gradient: 'from-emerald-500 to-green-600',
            bgGradient: 'from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
            tag: 'Available',
            tagColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
          },
          { 
            title: 'Low Stock', 
            value: inventoryStats.lowStock, 
            icon: AlertTriangle, 
            gradient: 'from-amber-500 to-orange-600',
            bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
            tag: 'Warning',
            tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
          },
          { 
            title: 'Out of Stock', 
            value: inventoryStats.outOfStock, 
            icon: TrendingDown, 
            gradient: 'from-rose-500 to-red-600',
            bgGradient: 'from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30',
            tag: 'Needs Restock',
            tagColor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} variants={cardVariants}>
              <Card className={`border-0 shadow-lg bg-gradient-to-br ${stat.bgGradient} overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Badge className={`${stat.tagColor} text-xs`}>{stat.tag}</Badge>
                  <motion.div 
                    className={`p-2 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <motion.div 
                    className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                </CardContent>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Stock Health Overview */}
      <motion.div variants={cardVariants}>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <BarChart3 className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <CardTitle className="text-lg">Stock Health Overview</CardTitle>
                  <p className="text-sm text-muted-foreground">Current inventory status</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleRestockAll} className="border-amber-200 text-amber-700 hover:bg-amber-50">
                  <Package className="h-4 w-4 mr-2" />
                  Restock Low Items
                </Button>
                <Badge className={stockPercentage > 80 ? 'bg-emerald-100 text-emerald-700' : stockPercentage > 50 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}>
                  {stockPercentage.toFixed(0)}% Healthy
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Stocked Items</span>
                <span className="font-semibold">{inventoryStats.inStock + inventoryStats.lowStock} / {inventoryStats.total}</span>
              </div>
              <Progress value={stockPercentage} className="h-3 bg-gray-200 dark:bg-gray-800" />
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" /> In Stock ({inventoryStats.inStock})
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-amber-500" /> Low Stock ({inventoryStats.lowStock})
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-rose-500" /> Out of Stock ({inventoryStats.outOfStock})
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bulk Operations */}
      <BulkOperations />

      {/* Main Inventory Table */}
      <motion.div variants={cardVariants}>
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" />
          
          <CardHeader className="bg-gradient-to-r from-cyan-50/50 to-blue-50/50 dark:from-cyan-950/20 dark:to-blue-950/20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <Boxes className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    Inventory Tracking
                  </CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Monitor and manage stock levels
                  </p>
                </div>
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="border-cyan-200 dark:border-cyan-800"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </motion.div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-cyan-200 focus:border-cyan-400 dark:border-cyan-800"
                />
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 dark:from-cyan-900/50 dark:to-blue-900/50 dark:text-cyan-300">
                {filteredProducts.length} Items
              </Badge>
            </div>

            <div className="rounded-xl border border-cyan-100 dark:border-cyan-900/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/50 dark:to-blue-950/50">
                    <TableHead className="font-semibold">Product</TableHead>
                    <TableHead className="font-semibold">SKU</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Stock Status</TableHead>
                    <TableHead className="font-semibold">Stock Level</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product, index) => {
                      const stockStatus = getStockStatus(product);
                      const stockColor = product.stockLevel > product.lowStockThreshold ? 'text-emerald-600' : product.stockLevel > 0 ? 'text-amber-600' : 'text-rose-600';
                      
                      return (
                        <motion.tr
                          key={product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="border-b border-cyan-50 dark:border-cyan-900/30 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/30 transition-colors"
                        >
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <motion.div whileHover={{ scale: 1.1 }}>
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="h-12 w-12 rounded-xl object-cover shadow-md"
                                />
                              </motion.div>
                              <div>
                                <div className="font-semibold">{product.name}</div>
                                <div className="text-sm text-muted-foreground">${product.price}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {product.id.substring(0, 8).toUpperCase()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-cyan-200 dark:border-cyan-800">
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge className={stockStatus.color}>
                                {stockStatus.label}
                              </Badge>
                            </motion.div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16">
                                <Progress 
                                  value={Math.min((product.stockLevel / (product.lowStockThreshold * 3)) * 100, 100)} 
                                  className="h-2"
                                />
                              </div>
                              <span className={`font-semibold ${stockColor}`}>
                                {product.stockLevel} units
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                                  onClick={() => handleAdjustStock(product.id, -1)}
                                  disabled={product.stockLevel === 0}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                                  onClick={() => handleAdjustStock(product.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                                  onClick={() => handleEditStock(product)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </motion.div>
                            </div>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Edit Stock Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Stock - {selectedProduct?.name}
            </DialogTitle>
            <DialogDescription>Update stock level and threshold</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Stock Level</Label>
              <Input 
                type="number"
                min="0"
                value={editFormData.stockLevel}
                onChange={(e) => setEditFormData(prev => ({ ...prev, stockLevel: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Low Stock Threshold</Label>
              <Input 
                type="number"
                min="1"
                value={editFormData.lowStockThreshold}
                onChange={(e) => setEditFormData(prev => ({ ...prev, lowStockThreshold: parseInt(e.target.value) || 1 }))}
              />
              <p className="text-xs text-muted-foreground">Alert when stock falls below this number</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveStock} className="bg-gradient-to-r from-cyan-500 to-blue-600">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ModernInventoryManagement;
