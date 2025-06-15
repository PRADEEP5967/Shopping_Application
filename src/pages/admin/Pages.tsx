
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, Eye, FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pages = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const pages = [
    {
      id: 1,
      title: 'About Us',
      slug: '/about-us',
      status: 'published',
      lastModified: '2025-01-06',
      author: 'Admin'
    },
    {
      id: 2,
      title: 'Contact Us',
      slug: '/contact-us',
      status: 'published',
      lastModified: '2025-01-05',
      author: 'Admin'
    },
    {
      id: 3,
      title: 'FAQ',
      slug: '/faq',
      status: 'published',
      lastModified: '2025-01-04',
      author: 'Admin'
    },
    {
      id: 4,
      title: 'Return Policy',
      slug: '/return-policy',
      status: 'published',
      lastModified: '2025-01-03',
      author: 'Admin'
    },
    {
      id: 5,
      title: 'Shipping Policy',
      slug: '/shipping-policy',
      status: 'published',
      lastModified: '2025-01-02',
      author: 'Admin'
    },
    {
      id: 6,
      title: 'Terms of Service',
      slug: '/terms-of-service',
      status: 'draft',
      lastModified: '2025-01-01',
      author: 'Admin'
    },
    {
      id: 7,
      title: 'Blog',
      slug: '/blog',
      status: 'published',
      lastModified: '2025-01-15',
      author: 'Content Team'
    },
    {
      id: 8,
      title: 'Buying Guides',
      slug: '/buying-guides',
      status: 'published',
      lastModified: '2025-01-14',
      author: 'Content Team'
    },
    {
      id: 9,
      title: 'Product Comparison',
      slug: '/product-comparison',
      status: 'published',
      lastModified: '2025-01-13',
      author: 'Content Team'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pages.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pages.filter(p => p.status === 'published').length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pages.filter(p => p.status === 'draft').length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Views Today</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Content Pages</h3>
            <p className="text-sm text-gray-600 mb-4">Manage blog posts, guides, and content</p>
            <div className="space-y-2">
              <Link to="/blog">
                <Button variant="outline" size="sm" className="w-full justify-between">
                  View Blog
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
              <Link to="/buying-guides">
                <Button variant="outline" size="sm" className="w-full justify-between">
                  View Buying Guides
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Interactive Tools</h3>
            <p className="text-sm text-gray-600 mb-4">Product comparison and interactive content</p>
            <Link to="/product-comparison">
              <Button variant="outline" size="sm" className="w-full justify-between">
                View Product Comparison
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">SEO Analytics</h3>
            <p className="text-sm text-gray-600 mb-4">Monitor page performance and SEO</p>
            <Button variant="outline" size="sm" className="w-full">
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Page Management</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Page
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pages..."
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
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell className="text-muted-foreground">{page.slug}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(page.status)}>
                        {page.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{page.lastModified}</TableCell>
                    <TableCell>{page.author}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Link to={page.slug}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
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

export default Pages;
