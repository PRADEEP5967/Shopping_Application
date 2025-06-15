
import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/data/products';

interface VisualSearchProps {
  onResult: (products: Product[]) => void;
  className?: string;
}

const VisualSearch: React.FC<VisualSearchProps> = ({ onResult, className }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [results, setResults] = useState<Product[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageUrl = e.target?.result as string;
      setSelectedImage(imageUrl);
      await analyzeImage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (imageUrl: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis - in a real app, this would send to an AI service
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock results based on image analysis
    const allProducts = getAllProducts();
    const mockResults = allProducts
      .filter(product => Math.random() > 0.7) // Simulate AI matching
      .slice(0, 6);
    
    setResults(mockResults);
    onResult(mockResults);
    setIsAnalyzing(false);
  };

  const clearSearch = () => {
    setSelectedImage(null);
    setResults([]);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Visual Search</h3>
              <p className="text-gray-600 text-sm">
                Upload an image to find similar products
              </p>
            </div>
            
            {!selectedImage ? (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Uploaded for search"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {isAnalyzing && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Analyzing image...</span>
                  </div>
                )}
                
                {results.length > 0 && !isAnalyzing && (
                  <div>
                    <Badge className="mb-4">
                      Found {results.length} similar products
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && !isAnalyzing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VisualSearch;
