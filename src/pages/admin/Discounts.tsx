
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Percent, Calendar } from 'lucide-react';

const Discounts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock discount data
  const discounts = [
    { 
      id: '1', 
      code: 'SUMMER20', 
      name: 'Summer Sale', 
      type: 'percentage', 
      value: 20, 
      status: 'active',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      usageCount: 145,
      usageLimit: 1000
    },
    { 
      id: '2', 
      code: 'NEWUSER', 
      name: 'New User Discount', 
      type: 'fixed', 
      value: 10, 
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      usageCount: 89,
      usageLimit: null
    },
    { 
      id: '3', 
      code: 'FLASH50', 
      name: 'Flash Sale', 
      type: 'percentage', 
      value: 50, 
      status: 'expired',
      startDate: '2024-05-01',
      endDate: '2024-05-07',
      usageCount: 234,
      usageLimit: 500
    }
  ];

  const filteredDiscounts = discounts.filter(discount =>
    discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
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
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Discount
            </Button>
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
                      <div className="font-mono font-semibold">{discount.code}</div>
                    </TableCell>
                    <TableCell>{discount.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(discount.startDate).toLocaleDateString()} - {new Date(discount.endDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {discount.usageCount} / {discount.usageLimit || '∞'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={discount.status === 'active' ? 'default' : discount.status === 'expired' ? 'destructive' : 'secondary'}>
                        {discount.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
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
    </div>
  );
};

export default Discounts;
