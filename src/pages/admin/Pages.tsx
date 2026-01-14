import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Search, Plus, Edit, Trash2, Eye, FileText, ExternalLink, MoreHorizontal, Globe, Copy, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PageItem {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  author: string;
  views: number;
  seoTitle: string;
  seoDescription: string;
  template: string;
}

const Pages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageItem | null>(null);

  const [pages, setPages] = useState<PageItem[]>([
    { id: '1', title: 'About Us', slug: '/about', status: 'published', lastModified: '2025-01-06', author: 'Admin', views: 1250, seoTitle: 'About Us - Our Story', seoDescription: 'Learn about our company', template: 'default' },
    { id: '2', title: 'Contact Us', slug: '/contact', status: 'published', lastModified: '2025-01-05', author: 'Admin', views: 890, seoTitle: 'Contact Us', seoDescription: 'Get in touch with us', template: 'contact' },
    { id: '3', title: 'FAQ', slug: '/faq', status: 'published', lastModified: '2025-01-04', author: 'Admin', views: 2100, seoTitle: 'Frequently Asked Questions', seoDescription: 'Common questions answered', template: 'faq' },
    { id: '4', title: 'Return Policy', slug: '/return-policy', status: 'published', lastModified: '2025-01-03', author: 'Admin', views: 560, seoTitle: 'Return Policy', seoDescription: 'Our return and refund policy', template: 'policy' },
    { id: '5', title: 'Shipping Policy', slug: '/shopping-policy', status: 'published', lastModified: '2025-01-02', author: 'Admin', views: 430, seoTitle: 'Shipping Policy', seoDescription: 'Shipping information and rates', template: 'policy' },
    { id: '6', title: 'Terms of Service', slug: '/terms-of-service', status: 'draft', lastModified: '2025-01-01', author: 'Admin', views: 0, seoTitle: 'Terms of Service', seoDescription: 'Our terms and conditions', template: 'policy' },
    { id: '7', title: 'Blog', slug: '/blog', status: 'published', lastModified: '2025-01-15', author: 'Content Team', views: 3400, seoTitle: 'Our Blog', seoDescription: 'Latest news and updates', template: 'blog' },
    { id: '8', title: 'Buying Guides', slug: '/buying-guides', status: 'published', lastModified: '2025-01-14', author: 'Content Team', views: 1800, seoTitle: 'Buying Guides', seoDescription: 'Expert buying advice', template: 'guide' },
    { id: '9', title: 'Product Comparison', slug: '/product-comparison', status: 'published', lastModified: '2025-01-13', author: 'Content Team', views: 2200, seoTitle: 'Product Comparison', seoDescription: 'Compare products side by side', template: 'comparison' },
  ]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    status: 'draft' as 'published' | 'draft' | 'archived',
    seoTitle: '',
    seoDescription: '',
    template: 'default',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      status: 'draft',
      seoTitle: '',
      seoDescription: '',
      template: 'default',
    });
  };

  const handleAdd = () => {
    if (!formData.title.trim()) {
      toast.error('Page title is required');
      return;
    }

    const newPage: PageItem = {
      id: Date.now().toString(),
      title: formData.title,
      slug: formData.slug || `/${formData.title.toLowerCase().replace(/\s+/g, '-')}`,
      status: formData.status,
      lastModified: new Date().toISOString().split('T')[0],
      author: 'Admin',
      views: 0,
      seoTitle: formData.seoTitle || formData.title,
      seoDescription: formData.seoDescription,
      template: formData.template,
    };

    setPages([...pages, newPage]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success('Page created successfully');
  };

  const handleEdit = () => {
    if (!selectedPage) return;

    setPages(pages.map(p => 
      p.id === selectedPage.id 
        ? { 
            ...p, 
            title: formData.title,
            slug: formData.slug,
            status: formData.status,
            seoTitle: formData.seoTitle,
            seoDescription: formData.seoDescription,
            template: formData.template,
            lastModified: new Date().toISOString().split('T')[0],
          }
        : p
    ));
    setIsEditDialogOpen(false);
    setSelectedPage(null);
    resetForm();
    toast.success('Page updated successfully');
  };

  const handleDelete = () => {
    if (!selectedPage) return;
    setPages(pages.filter(p => p.id !== selectedPage.id));
    setIsDeleteDialogOpen(false);
    setSelectedPage(null);
    toast.success('Page deleted successfully');
  };

  const duplicatePage = (page: PageItem) => {
    const newPage: PageItem = {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: 'draft',
      views: 0,
      lastModified: new Date().toISOString().split('T')[0],
    };
    setPages([...pages, newPage]);
    toast.success('Page duplicated successfully');
  };

  const togglePublish = (pageId: string) => {
    setPages(pages.map(p => 
      p.id === pageId 
        ? { ...p, status: p.status === 'published' ? 'draft' : 'published' }
        : p
    ));
    toast.success('Status updated');
  };

  const openEditDialog = (page: PageItem) => {
    setSelectedPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      status: page.status,
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
      template: page.template,
    });
    setIsEditDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return '';
    }
  };

  const filteredPages = useMemo(() => {
    return pages.filter(page => {
      const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || page.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [pages, searchTerm, filterStatus]);

  const stats = useMemo(() => ({
    total: pages.length,
    published: pages.filter(p => p.status === 'published').length,
    drafts: pages.filter(p => p.status === 'draft').length,
    totalViews: pages.reduce((sum, p) => sum + p.views, 0),
  }), [pages]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Globe className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.published}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Edit className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.drafts}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Content Pages</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage blog posts, guides, and content</p>
            <div className="space-y-2">
              <Link to="/blog">
                <Button variant="outline" size="sm" className="w-full justify-between">
                  View Blog <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
              <Link to="/buying-guides">
                <Button variant="outline" size="sm" className="w-full justify-between">
                  View Buying Guides <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Interactive Tools</h3>
            <p className="text-sm text-muted-foreground mb-4">Product comparison and interactive content</p>
            <Link to="/product-comparison">
              <Button variant="outline" size="sm" className="w-full justify-between">
                View Product Comparison <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">SEO Tools</h3>
            <p className="text-sm text-muted-foreground mb-4">Optimize page metadata and performance</p>
            <Button variant="outline" size="sm" className="w-full">
              Open SEO Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Page Management</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Page
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Page</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Page title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Slug</Label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="/page-url"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Template</Label>
                      <Select value={formData.template} onValueChange={(val) => setFormData({ ...formData, template: val })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                          <SelectItem value="contact">Contact</SelectItem>
                          <SelectItem value="faq">FAQ</SelectItem>
                          <SelectItem value="policy">Policy</SelectItem>
                          <SelectItem value="guide">Guide</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Status</Label>
                      <Select value={formData.status} onValueChange={(val: 'published' | 'draft' | 'archived') => setFormData({ ...formData, status: val })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>SEO Title</Label>
                    <Input
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      placeholder="SEO optimized title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>SEO Description</Label>
                    <Textarea
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      placeholder="Meta description for search engines"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAdd}>Create Page</Button>
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
                placeholder="Search pages..."
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
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{page.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-sm">{page.slug}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{page.template}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(page.status)}>
                        {page.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{page.views.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {page.lastModified}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={page.slug}>
                              <Eye className="h-4 w-4 mr-2" /> View Page
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(page)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => duplicatePage(page)}>
                            <Copy className="h-4 w-4 mr-2" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => togglePublish(page.id)}>
                            {page.status === 'published' ? 'Unpublish' : 'Publish'}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => { setSelectedPage(page); setIsDeleteDialogOpen(true); }}
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
            <DialogTitle>Edit Page</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Template</Label>
                <Select value={formData.template} onValueChange={(val) => setFormData({ ...formData, template: val })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                    <SelectItem value="policy">Policy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(val: 'published' | 'draft' | 'archived') => setFormData({ ...formData, status: val })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>SEO Title</Label>
              <Input value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>SEO Description</Label>
              <Textarea value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} rows={3} />
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
            <DialogTitle>Delete Page</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete "{selectedPage?.title}"? This action cannot be undone.
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

export default Pages;
