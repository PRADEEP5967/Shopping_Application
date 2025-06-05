
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Grid, Image } from 'lucide-react';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock category data
  const categories = [
    { id: '1', name: 'Electronics', description: 'Gadgets and electronic devices', productCount: 125, status: 'active', image: '/placeholder.svg' },
    { id: '2', name: 'Clothing', description: 'Fashion and apparel', productCount: 89, status: 'active', image: '/placeholder.svg' },
    { id: '3', name: 'Home & Garden', description: 'Home improvement and gardening', productCount: 67, status: 'active', image: '/placeholder.svg' },
    { id: '4', name: 'Books', description: 'Books and educational materials', productCount: 234, status: 'active', image: '/placeholder.svg' },
    { id: '5', name: 'Sports', description: 'Sports and outdoor equipment', productCount: 45, status: 'inactive', image: '/placeholder.svg' }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Grid className="h-5 w-5" />
                Category Management
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Organize your products into categories
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
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
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                          <Image className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="font-medium">{category.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{category.productCount} products</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={category.status === 'active' ? 'default' : 'secondary'}>
                        {category.status}
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

export default Categories;
