
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductImageUpload } from './ProductImageUpload';
import { Plus, Loader as Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const AddProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!name.trim()) {
      toast.error('Product name is required');
      return false;
    }
    if (name.trim().length < 3) {
      toast.error('Product name must be at least 3 characters');
      return false;
    }
    if (!description.trim()) {
      toast.error('Product description is required');
      return false;
    }
    if (description.trim().length < 10) {
      toast.error('Description must be at least 10 characters');
      return false;
    }
    if (!price || isNaN(parseFloat(price))) {
      toast.error('Valid price is required');
      return false;
    }
    if (parseFloat(price) <= 0) {
      toast.error('Price must be greater than 0');
      return false;
    }
    if (parseFloat(price) > 999999) {
      toast.error('Price cannot exceed $999,999');
      return false;
    }
    if (!category) {
      toast.error('Please select a category');
      return false;
    }
    if (images.length === 0) {
      toast.error('At least one product image is required');
      return false;
    }
    if (brand && brand.trim().length > 0 && brand.trim().length < 2) {
      toast.error('Brand name must be at least 2 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Mock product creation - in a real app this would call an API
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      price: parseFloat(price),
      category,
      brand,
      images,
      rating: 0,
      reviewCount: 0,
      inStock: true
    };

    // Simulate API call
    try {
      // In a real app, this would be an API call to Supabase
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('New product created:', newProduct);
      toast.success('Product created successfully!', {
        description: `${name} has been added to your catalog`
      });

      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setBrand('');
      setImages([]);
    } catch (error) {
      toast.error('Failed to create product', {
        description: 'Please try again or contact support'
      });
      console.error('Error creating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0.01"
                max="999999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="toys">Toys</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter brand name"
              />
            </div>
          </div>

          <ProductImageUpload images={images} onImagesChange={setImages} />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Product...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Product
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
