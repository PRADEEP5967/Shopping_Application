import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, CreditCard as Edit, Trash2, Eye, Upload, Filter, ArrowDownAZ, ArrowUpDown, Loader as Loader2, Package, Star, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '@/data/products';
import { Product } from '@/types';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut"
    }
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
};

export const ModernProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(getAllProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  const categories = [...new Set(products.map(p => p.category))];

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
        return sortOrder === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      }
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
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
      await new Promise(resolve => setTimeout(resolve, 500));
      const productName = products.find(p => p.id === productId)?.name;
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast.success('Product deleted', { description: `${productName} has been removed from your catalog` });
    } catch (error) {
      toast.error('Failed to delete product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedProducts.length) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
      toast.success('Products deleted', { description: `${selectedProducts.length} products have been removed` });
      setSelectedProducts([]);
    } catch (error) {
      toast.error('Failed to delete products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStock = async (productId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, inStock: !p.inStock } : p));
      const product = products.find(p => p.id === productId);
      toast.success('Stock status updated', { description: `${product?.name} is now ${!product?.inStock ? 'in stock' : 'out of stock'}` });
    } catch (error) {
      toast.error('Failed to update stock status');
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) setSelectedProducts(prev => [...prev, productId]);
    else setSelectedProducts(prev => prev.filter(id => id !== productId));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) setSelectedProducts(filteredProducts.map(p => p.id));
    else setSelectedProducts([]);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Electronics': 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
      'Clothing': 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300',
      'Accessories': 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
      'Furniture': 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
      'Gaming': 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
        {/* Decorative header gradient */}
        <div className="h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
        
        <CardHeader className="bg-gradient-to-r from-violet-50/50 to-indigo-50/50 dark:from-violet-950/20 dark:to-indigo-950/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Package className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Product Management
                </CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Manage all your products with full CRUD operations
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Link to="/admin/add-product">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-lg shadow-violet-500/25">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </motion.div>
              </Link>
              <Button variant="outline" className="border-violet-200 hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-950/50">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              
              <AnimatePresence>
                {selectedProducts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Button
                      variant="destructive"
                      onClick={handleBulkDelete}
                      disabled={isLoading}
                      className="shadow-lg shadow-red-500/25"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                      )}
                      Delete ({selectedProducts.length})
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-violet-200 focus:border-violet-400 focus:ring-violet-400/20 dark:border-violet-800"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-violet-200 dark:border-violet-800">
                    <Filter className="h-4 w-4 mr-2" />
                    {currentCategory || "All Categories"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setCurrentCategory(null)}>
                    All Categories
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {categories.map(category => (
                    <DropdownMenuItem key={category} onClick={() => setCurrentCategory(category)}>
                      <Badge className={`${getCategoryColor(category)} mr-2`}>{category}</Badge>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-violet-200 dark:border-violet-800">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleSort('name')}>
                    <ArrowDownAZ className="h-4 w-4 mr-2" />
                    Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort('price')}>
                    <ArrowDownAZ className="h-4 w-4 mr-2" />
                    Price {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Badge variant="secondary" className="bg-gradient-to-r from-violet-100 to-indigo-100 text-violet-700 dark:from-violet-900/50 dark:to-indigo-900/50 dark:text-violet-300 font-semibold">
                {filteredProducts.length} Products
              </Badge>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-violet-100 dark:border-violet-900/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/50 dark:to-indigo-950/50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={filteredProducts.length > 0 && selectedProducts.length === filteredProducts.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="font-semibold">Product</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Price</TableHead>
                  <TableHead className="font-semibold">Stock</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Package className="h-8 w-8 text-muted-foreground" />
                          <p>No products found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((product, index) => (
                        <motion.tr
                          key={product.id}
                          custom={index}
                          variants={tableRowVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={`border-b border-violet-50 dark:border-violet-900/30 hover:bg-violet-50/50 dark:hover:bg-violet-950/30 transition-colors ${
                            selectedProducts.includes(product.id) ? "bg-violet-100/50 dark:bg-violet-900/20" : ""
                          }`}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={(checked) => handleSelectProduct(product.id, checked === true)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <motion.div 
                                className="relative"
                                whileHover={{ scale: 1.1 }}
                              >
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="h-12 w-12 rounded-xl object-cover shadow-md"
                                />
                                {product.rating && product.rating >= 4.5 && (
                                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-yellow-400 text-yellow-900">
                                    <Star className="h-3 w-3 fill-current" />
                                  </Badge>
                                )}
                              </motion.div>
                              <div>
                                <div className="font-semibold">{product.name}</div>
                                <div className="text-xs text-muted-foreground">ID: {product.id.substring(0, 8)}...</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getCategoryColor(product.category)}>
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              ${product.price}
                            </span>
                          </TableCell>
                          <TableCell>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleStock(product.id)}
                                className="p-0"
                              >
                                <Badge 
                                  className={product.inStock 
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" 
                                    : "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300"
                                  }
                                >
                                  {product.inStock ? "In Stock" : "Out of Stock"}
                                </Badge>
                              </Button>
                            </motion.div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={product.price > 100 
                                ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 dark:from-amber-900/50 dark:to-yellow-900/50 dark:text-amber-300" 
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                              }
                            >
                              {product.price > 100 ? (
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" /> Premium
                                </span>
                              ) : "Active"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Link to={`/product/${product.id}`}>
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              </Link>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-amber-100 hover:text-amber-600">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-rose-100 hover:text-rose-600"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredProducts.length > 0 && (() => {
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);

            return (
              <motion.div 
                className="flex items-center justify-between py-4 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-sm text-muted-foreground">
                  Showing <strong className="text-violet-600">{startIndex + 1}-{endIndex}</strong> of <strong className="text-violet-600">{filteredProducts.length}</strong> products
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="border-violet-200 dark:border-violet-800"
                  >
                    Previous
                  </Button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                    return (
                      <motion.div key={pageNum} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          className={currentPage === pageNum 
                            ? "bg-gradient-to-r from-violet-500 to-indigo-600 text-white border-0" 
                            : "border-violet-200 dark:border-violet-800"
                          }
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      </motion.div>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="border-violet-200 dark:border-violet-800"
                  >
                    Next
                  </Button>
                </div>
              </motion.div>
            );
          })()}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ModernProductManagement;
