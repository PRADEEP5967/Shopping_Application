
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Type, Upload, RotateCcw } from 'lucide-react';
import { Product } from '@/types';

interface ProductCustomizerProps {
  product: Product;
  onCustomizationChange: (customization: any) => void;
}

const ProductCustomizer: React.FC<ProductCustomizerProps> = ({ product, onCustomizationChange }) => {
  const [customization, setCustomization] = useState({
    color: '#000000',
    text: '',
    fontSize: 16,
    fontFamily: 'Arial',
    position: { x: 50, y: 50 },
    image: null as string | null
  });

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
  ];

  const fonts = ['Arial', 'Times New Roman', 'Helvetica', 'Georgia', 'Verdana'];

  const handleCustomizationChange = (key: string, value: any) => {
    const newCustomization = { ...customization, [key]: value };
    setCustomization(newCustomization);
    onCustomizationChange(newCustomization);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleCustomizationChange('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetCustomization = () => {
    const defaultCustomization = {
      color: '#000000',
      text: '',
      fontSize: 16,
      fontFamily: 'Arial',
      position: { x: 50, y: 50 },
      image: null
    };
    setCustomization(defaultCustomization);
    onCustomizationChange(defaultCustomization);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Customize Your {product.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview Area */}
          <div className="space-y-4">
            <h3 className="font-semibold">Live Preview</h3>
            <div className="relative bg-gray-100 rounded-lg p-4 min-h-[400px] flex items-center justify-center overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Custom Text Overlay */}
              {customization.text && (
                <div 
                  className="absolute pointer-events-none"
                  style={{
                    left: `${customization.position.x}%`,
                    top: `${customization.position.y}%`,
                    transform: 'translate(-50%, -50%)',
                    color: customization.color,
                    fontSize: `${customization.fontSize}px`,
                    fontFamily: customization.fontFamily,
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {customization.text}
                </div>
              )}
              
              {/* Custom Image Overlay */}
              {customization.image && (
                <img 
                  src={customization.image}
                  alt="Custom design"
                  className="absolute w-20 h-20 object-contain"
                  style={{
                    left: `${customization.position.x}%`,
                    top: `${customization.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              )}
            </div>
          </div>

          {/* Customization Controls */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Customization Options</h3>
              <Button variant="outline" size="sm" onClick={resetCustomization}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text">Text</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label htmlFor="custom-text">Custom Text</Label>
                  <Input
                    id="custom-text"
                    placeholder="Enter your text..."
                    value={customization.text}
                    onChange={(e) => handleCustomizationChange('text', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="font-size">Font Size</Label>
                  <Input
                    id="font-size"
                    type="range"
                    min="12"
                    max="48"
                    value={customization.fontSize}
                    onChange={(e) => handleCustomizationChange('fontSize', parseInt(e.target.value))}
                  />
                  <span className="text-sm text-gray-500">{customization.fontSize}px</span>
                </div>

                <div>
                  <Label htmlFor="font-family">Font Family</Label>
                  <select
                    id="font-family"
                    className="w-full p-2 border rounded-md"
                    value={customization.fontFamily}
                    onChange={(e) => handleCustomizationChange('fontFamily', e.target.value)}
                  >
                    {fonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
              </TabsContent>

              <TabsContent value="colors" className="space-y-4">
                <div>
                  <Label>Text Color</Label>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded border-2 ${customization.color === color ? 'border-black' : 'border-gray-300'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleCustomizationChange('color', color)}
                      />
                    ))}
                  </div>
                  <Input
                    type="color"
                    value={customization.color}
                    onChange={(e) => handleCustomizationChange('color', e.target.value)}
                    className="mt-2 w-full h-10"
                  />
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-4">
                <div>
                  <Label htmlFor="image-upload">Upload Custom Image</Label>
                  <div className="mt-2">
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label>Position</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="pos-x" className="text-sm">X Position</Label>
                  <Input
                    id="pos-x"
                    type="range"
                    min="10"
                    max="90"
                    value={customization.position.x}
                    onChange={(e) => handleCustomizationChange('position', {
                      ...customization.position,
                      x: parseInt(e.target.value)
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="pos-y" className="text-sm">Y Position</Label>
                  <Input
                    id="pos-y"
                    type="range"
                    min="10"
                    max="90"
                    value={customization.position.y}
                    onChange={(e) => handleCustomizationChange('position', {
                      ...customization.position,
                      y: parseInt(e.target.value)
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCustomizer;
