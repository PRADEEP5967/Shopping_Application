
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, CreditCard as Edit, Trash2, Eye, Upload, Filter, ArrowDownAZ, ArrowUpDown, Loader as Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '@/data/products';
import { Product } from '@/types';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

export const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(getAllProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category))];

  // Filter products by search term and category
  const filteredProducts = products
    .filter(product =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!currentCategory || product.category === currentCategory)
    )
    .sort((a, b) => {
      if (!sortField || !sortOrder) return 0;
      
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortOrder === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortOrder === 'asc'
          ? fieldA - fieldB
          : fieldB - fieldA;
      }
      
      return 0;
    });

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      if (sortOrder === 'asc') setSortOrder('desc');
      else if (sortOrder === 'desc') {
        setSortField(null);
        setSortOrder(null);
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const productName = products.find(p => p.id === productId)?.name;
      setProducts(prev => prev.filter(p => p.id !== productId));

      toast.success('Product deleted', {
        description: `${productName} has been removed from your catalog`
      });
    } catch (error) {
      toast.error('Failed to delete product', {
        description: 'Please try again'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedProducts.length) return;

    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));

      toast.success('Products deleted', {
        description: `${selectedProducts.length} products have been removed`
      });
      setSelectedProducts([]);
    } catch (error) {
      toast.error('Failed to delete products', {
        description: 'Please try again'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStock = async (productId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      setProducts(prev => prev.map(p =>
        p.id === productId ? { ...p, inStock: !p.inStock } : p
      ));

      const product = products.find(p => p.id === productId);
      toast.success('Stock status updated', {
        description: `${product?.name} is now ${!product?.inStock ? 'in stock' : 'out of stock'}`
      });
    } catch (error) {
      toast.error('Failed to update stock status');
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Product Management</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage all your products with full CRUD operations
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/add-product">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </Link>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            
            {selectedProducts.length > 0 && (
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Delete Selected ({selectedProducts.length})
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {currentCategory ? currentCategory : "All Categories"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem 
                  onClick={() => setCurrentCategory(null)}
                  className={!currentCategory ? "bg-secondary" : ""}
                >
                  All Categories
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {categories.map(category => (
                  <DropdownMenuItem 
                    key={category} 
                    onClick={() => setCurrentCategory(category)}
                    className={currentCategory === category ? "bg-secondary" : ""}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleSort('name')}>
                  <ArrowDownAZ className="h-4 w-4 mr-2" />
                  Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('price')}>
                  <ArrowDownAZ className="h-4 w-4 mr-2" />
                  Price {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('category')}>
                  <ArrowDownAZ className="h-4 w-4 mr-2" />
                  Category {sortField === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Badge variant="outline">{filteredProducts.length} Products</Badge>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      filteredProducts.length > 0 &&
                      selectedProducts.length === filteredProducts.length
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    No products found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((product) => (
                  <TableRow key={product.id} className={selectedProducts.includes(product.id) ? "bg-muted/30" : ""}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) => 
                          handleSelectProduct(product.id, checked === true)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {product.id.substring(0, 8)}...</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStock(product.id)}
                      >
                        <Badge variant={product.inStock ? "default" : "destructive"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.price > 100 ? "secondary" : "outline"}>
                        {product.price > 100 ? "Premium" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link to={`/product/${product.id}`}>
                          <Button variant="ghost" size="sm" title="View Product">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" title="Edit Product">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Delete Product"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {filteredProducts.length > 0 && (() => {
          const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);

          return (
            <div className="flex items-center justify-between py-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{startIndex + 1}-{endIndex}</strong> of <strong>{filteredProducts.length}</strong> products
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1 || isLoading}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  Previous
                </Button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant="outline"
                      size="sm"
                      className={currentPage === pageNum ? "bg-primary text-white" : ""}
                      onClick={() => setCurrentPage(pageNum)}
                      disabled={isLoading}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages || isLoading}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          );
        })()}
      </CardContent>
    </Card>
  );
};
