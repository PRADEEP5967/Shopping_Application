import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Search, Edit, Trash2, Percent, Calendar, Copy, Tag, DollarSign, Users, TrendingUp, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Discount {
  id: string;
  code: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  status: 'active' | 'expired' | 'scheduled' | 'paused';
  startDate: string;
  endDate: string;
  usageCount: number;
  usageLimit: number | null;
  minPurchase: number;
  maxDiscount: number | null;
  applicableTo: 'all' | 'category' | 'product';
}

const Discounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [discounts, setDiscounts] = useState<Discount[]>([
    { 
      id: '1', code: 'SUMMER20', name: 'Summer Sale', type: 'percentage', value: 20, 
      status: 'active', startDate: '2024-06-01', endDate: '2024-08-31',
      usageCount: 145, usageLimit: 1000, minPurchase: 50, maxDiscount: 100, applicableTo: 'all'
    },
    { 
      id: '2', code: 'NEWUSER', name: 'New User Discount', type: 'fixed', value: 10, 
      status: 'active', startDate: '2024-01-01', endDate: '2024-12-31',
      usageCount: 89, usageLimit: null, minPurchase: 25, maxDiscount: null, applicableTo: 'all'
    },
    { 
      id: '3', code: 'FLASH50', name: 'Flash Sale', type: 'percentage', value: 50, 
      status: 'expired', startDate: '2024-05-01', endDate: '2024-05-07',
      usageCount: 500, usageLimit: 500, minPurchase: 100, maxDiscount: 200, applicableTo: 'category'
    },
    { 
      id: '4', code: 'VIP25', name: 'VIP Members', type: 'percentage', value: 25, 
      status: 'active', startDate: '2024-01-01', endDate: '2024-12-31',
      usageCount: 78, usageLimit: null, minPurchase: 0, maxDiscount: null, applicableTo: 'all'
    },
    { 
      id: '5', code: 'HOLIDAY30', name: 'Holiday Special', type: 'percentage', value: 30, 
      status: 'scheduled', startDate: '2024-12-20', endDate: '2024-12-31',
      usageCount: 0, usageLimit: 2000, minPurchase: 75, maxDiscount: 150, applicableTo: 'all'
    },
  ]);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 0,
    startDate: '',
    endDate: '',
    usageLimit: '',
    minPurchase: 0,
    maxDiscount: '',
    applicableTo: 'all' as 'all' | 'category' | 'product',
  });

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      type: 'percentage',
      value: 0,
      startDate: '',
      endDate: '',
      usageLimit: '',
      minPurchase: 0,
      maxDiscount: '',
      applicableTo: 'all',
    });
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code });
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Code "${code}" copied to clipboard`);
  };

  const handleAdd = () => {
    if (!formData.code.trim() || !formData.name.trim()) {
      toast.error('Code and name are required');
      return;
    }

    if (discounts.some(d => d.code.toLowerCase() === formData.code.toLowerCase())) {
      toast.error('Discount code already exists');
      return;
    }

    const newDiscount: Discount = {
      id: Date.now().toString(),
      code: formData.code.toUpperCase(),
      name: formData.name,
      type: formData.type,
      value: formData.value,
      status: new Date(formData.startDate) > new Date() ? 'scheduled' : 'active',
      startDate: formData.startDate,
      endDate: formData.endDate,
      usageCount: 0,
      usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
      minPurchase: formData.minPurchase,
      maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : null,
      applicableTo: formData.applicableTo,
    };

    setDiscounts([...discounts, newDiscount]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success('Discount created successfully');
  };

  const handleEdit = () => {
    if (!selectedDiscount) return;

    setDiscounts(discounts.map(d => 
      d.id === selectedDiscount.id 
        ? { 
            ...d, 
            code: formData.code.toUpperCase(),
            name: formData.name,
            type: formData.type,
            value: formData.value,
            startDate: formData.startDate,
            endDate: formData.endDate,
            usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
            minPurchase: formData.minPurchase,
            maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : null,
            applicableTo: formData.applicableTo,
          }
        : d
    ));
    setIsEditDialogOpen(false);
    setSelectedDiscount(null);
    resetForm();
    toast.success('Discount updated successfully');
  };

  const handleDelete = () => {
    if (!selectedDiscount) return;
    setDiscounts(discounts.filter(d => d.id !== selectedDiscount.id));
    setIsDeleteDialogOpen(false);
    setSelectedDiscount(null);
    toast.success('Discount deleted successfully');
  };

  const toggleStatus = (discountId: string) => {
    setDiscounts(discounts.map(d => 
      d.id === discountId 
        ? { ...d, status: d.status === 'active' ? 'paused' : 'active' }
        : d
    ));
    toast.success('Status updated');
  };

  const openEditDialog = (discount: Discount) => {
    setSelectedDiscount(discount);
    setFormData({
      code: discount.code,
      name: discount.name,
      type: discount.type,
      value: discount.value,
      startDate: discount.startDate,
      endDate: discount.endDate,
      usageLimit: discount.usageLimit?.toString() || '',
      minPurchase: discount.minPurchase,
      maxDiscount: discount.maxDiscount?.toString() || '',
      applicableTo: discount.applicableTo,
    });
    setIsEditDialogOpen(true);
  };

  const filteredDiscounts = useMemo(() => {
    return discounts.filter(discount => {
      const matchesSearch = discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discount.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || discount.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [discounts, searchTerm, filterStatus]);

  const stats = useMemo(() => ({
    total: discounts.length,
    active: discounts.filter(d => d.status === 'active').length,
    totalSavings: discounts.reduce((sum, d) => sum + (d.usageCount * (d.type === 'fixed' ? d.value : d.value * 5)), 0),
    totalUsage: discounts.reduce((sum, d) => sum + d.usageCount, 0),
  }), [discounts]);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      expired: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    };
    return styles[status] || '';
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Discounts</CardTitle>
              <Tag className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All discount codes</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Percent className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsage}</div>
              <p className="text-xs text-muted-foreground">Times redeemed</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
              <DollarSign className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalSavings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Customer savings</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                Discount Management
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Create and manage discount codes and promotions
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Discount
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Discount</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Code *</Label>
                      <div className="flex gap-2">
                        <Input
                          value={formData.code}
                          onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                          placeholder="DISCOUNT10"
                          className="font-mono"
                        />
                        <Button variant="outline" size="icon" onClick={generateCode} title="Generate">
                          <TrendingUp className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Name *</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Summer Sale"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Type</Label>
                      <Select value={formData.type} onValueChange={(val: 'percentage' | 'fixed') => setFormData({ ...formData, type: val })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (%)</SelectItem>
                          <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Value</Label>
                      <Input
                        type="number"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                        placeholder={formData.type === 'percentage' ? '20' : '10'}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Usage Limit</Label>
                      <Input
                        type="number"
                        value={formData.usageLimit}
                        onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                        placeholder="Unlimited"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Min. Purchase ($)</Label>
                      <Input
                        type="number"
                        value={formData.minPurchase}
                        onChange={(e) => setFormData({ ...formData, minPurchase: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Applicable To</Label>
                    <Select value={formData.applicableTo} onValueChange={(val: 'all' | 'category' | 'product') => setFormData({ ...formData, applicableTo: val })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Products</SelectItem>
                        <SelectItem value="category">Specific Categories</SelectItem>
                        <SelectItem value="product">Specific Products</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAdd}>Create Discount</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDiscounts.map((discount) => (
                  <TableRow key={discount.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold">{discount.code}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyCode(discount.code)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{discount.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-semibold">
                        {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(discount.startDate).toLocaleDateString()} - {new Date(discount.endDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {discount.usageCount} / {discount.usageLimit || '∞'}
                      </div>
                      {discount.usageLimit && (
                        <div className="w-24 h-1.5 bg-muted rounded-full mt-1">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${Math.min((discount.usageCount / discount.usageLimit) * 100, 100)}%` }}
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(discount.status)}>
                        {discount.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => copyCode(discount.code)}>
                            <Copy className="h-4 w-4 mr-2" /> Copy Code
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(discount)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          {(discount.status === 'active' || discount.status === 'paused') && (
                            <DropdownMenuItem onClick={() => toggleStatus(discount.id)}>
                              {discount.status === 'active' ? 'Pause' : 'Activate'}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => { setSelectedDiscount(discount); setIsDeleteDialogOpen(true); }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Discount</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Code</Label>
                <Input value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })} className="font-mono" />
              </div>
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={(val: 'percentage' | 'fixed') => setFormData({ ...formData, type: val })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Value</Label>
                <Input type="number" value={formData.value} onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Start Date</Label>
                <Input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>End Date</Label>
                <Input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Discount</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete the discount code "{selectedDiscount?.code}"? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Discounts;
