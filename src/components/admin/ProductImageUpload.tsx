
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, Image, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProductImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export const ProductImageUpload: React.FC<ProductImageUploadProps> = ({
  images,
  onImagesChange
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    // Validate files
    const invalidFiles = fileArray.filter(
      file => !validTypes.includes(file.type) || file.size > maxSize
    );

    if (invalidFiles.length > 0) {
      const oversized = invalidFiles.filter(f => f.size > maxSize);
      const wrongType = invalidFiles.filter(f => !validTypes.includes(f.type));

      if (oversized.length > 0) {
        toast.error('File size too large', {
          description: `${oversized.length} file(s) exceed 10MB limit`
        });
      }
      if (wrongType.length > 0) {
        toast.error('Invalid file type', {
          description: 'Only JPG, PNG, GIF, and WebP files are allowed'
        });
      }
      return;
    }

    setIsUploading(true);

    try {
      const validFiles = fileArray.filter(
        file => validTypes.includes(file.type) && file.size <= maxSize
      );

      const newImages: string[] = [];

      for (const file of validFiles) {
        await new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            newImages.push(result);
            resolve();
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      onImagesChange([...images, ...newImages]);

      toast.success('Images uploaded', {
        description: `${newImages.length} image(s) added successfully`
      });
    } catch (error) {
      toast.error('Upload failed', {
        description: 'Failed to process images. Please try again.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    toast.success('Image removed', {
      description: 'Image has been removed from the list'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          Product Images
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary/50'
          } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {isUploading ? (
            <Loader2 className="h-12 w-12 mx-auto text-primary mb-4 animate-spin" />
          ) : (
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          )}
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {isUploading ? 'Uploading images...' : 'Drop images here or click to upload'}
            </p>
            <p className="text-sm text-gray-500">
              {isUploading ? 'Please wait' : 'Supports JPG, PNG, GIF, WebP up to 10MB'}
            </p>
          </div>
          <Label htmlFor="image-upload" className="cursor-pointer">
            <Input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            <Button type="button" variant="outline" className="mt-4" disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Choose Files'
              )}
            </Button>
          </Label>
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="space-y-3">
            <Label>Uploaded Images ({images.length})</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
