
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Package, DollarSign, Tag } from 'lucide-react';
import { getAllProducts } from '@/data/products';
import { toast } from 'sonner';

const BulkOperations: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');
  const [bulkPrice, setBulkPrice] = useState<string>('');
  const [bulkCategory, setBulkCategory] = useState<string>('');
  const products = getAllProducts();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  const executeBulkAction = () => {
    if (selectedProducts.length === 0) {
      toast.error('Please select at least one product');
      return;
    }

    if (!bulkAction) {
      toast.error('Please select a bulk action');
      return;
    }

    // Simulate bulk operation
    setTimeout(() => {
      switch (bulkAction) {
        case 'updatePrice':
          toast.success(`Updated price for ${selectedProducts.length} products`);
          break;
        case 'updateCategory':
          toast.success(`Updated category for ${selectedProducts.length} products`);
          break;
        case 'setInStock':
          toast.success(`Set ${selectedProducts.length} products to in stock`);
          break;
        case 'setOutOfStock':
          toast.success(`Set ${selectedProducts.length} products to out of stock`);
          break;
        case 'delete':
          toast.success(`Deleted ${selectedProducts.length} products`);
          break;
        default:
          toast.error('Unknown action');
      }
      setSelectedProducts([]);
    }, 1000);
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <CardHeader className="bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/20 dark:to-purple-950/20">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
            <Package className="w-5 h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Bulk Product Operations
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Bulk Actions Panel */}
        <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-xl space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Select value={bulkAction} onValueChange={setBulkAction}>
              <SelectTrigger className="w-48 border-violet-200 dark:border-violet-800">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updatePrice">Update Price</SelectItem>
                <SelectItem value="updateCategory">Update Category</SelectItem>
                <SelectItem value="setInStock">Set In Stock</SelectItem>
                <SelectItem value="setOutOfStock">Set Out of Stock</SelectItem>
                <SelectItem value="delete">Delete Products</SelectItem>
              </SelectContent>
            </Select>

            {bulkAction === 'updatePrice' && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="New price"
                  value={bulkPrice}
                  onChange={(e) => setBulkPrice(e.target.value)}
                  className="w-32 border-violet-200 dark:border-violet-800"
                />
              </div>
            )}

            {bulkAction === 'updateCategory' && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="New category"
                  value={bulkCategory}
                  onChange={(e) => setBulkCategory(e.target.value)}
                  className="w-48 border-violet-200 dark:border-violet-800"
                />
              </div>
            )}

            <Button 
              onClick={executeBulkAction}
              disabled={selectedProducts.length === 0 || !bulkAction}
              className={`bg-gradient-to-r ${bulkAction === 'delete' ? 'from-rose-500 to-red-600' : 'from-violet-500 to-purple-600'} hover:opacity-90 shadow-lg`}
            >
              Apply to {selectedProducts.length} products
            </Button>
          </div>

          {selectedProducts.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                {selectedProducts.length} products selected
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedProducts([])}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear selection
              </Button>
            </div>
          )}
        </div>

        {/* Products Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedProducts.length === products.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.slice(0, 10).map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkOperations;
