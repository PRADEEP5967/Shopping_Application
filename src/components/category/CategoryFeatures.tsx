
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, Shield, Truck, Award, Zap, Heart } from 'lucide-react';

interface CategoryFeaturesProps {
  categoryName: string;
}

const CategoryFeatures: React.FC<CategoryFeaturesProps> = ({ categoryName }) => {
  const getCategoryFeatures = (category: string) => {
    switch (category.toLowerCase()) {
      case 'electronics':
        return [
          { icon: Zap, title: 'Latest Technology', description: 'Cutting-edge innovations' },
          { icon: Shield, title: 'Warranty Protected', description: '2-year guarantee' },
          { icon: Star, title: 'Top Rated', description: '4.5+ star products' },
          { icon: Truck, title: 'Fast Delivery', description: 'Same day in select cities' }
        ];
      case 'clothing':
        return [
          { icon: Heart, title: 'Fashion Forward', description: 'Latest trends & styles' },
          { icon: Shield, title: 'Quality Fabric', description: 'Premium materials' },
          { icon: Truck, title: 'Easy Returns', description: '30-day return policy' },
          { icon: Award, title: 'Size Guide', description: 'Perfect fit guarantee' }
        ];
      case 'computers':
        return [
          { icon: Zap, title: 'High Performance', description: 'Powerful processing' },
          { icon: Shield, title: 'Extended Warranty', description: '3-year coverage' },
          { icon: Star, title: 'Expert Tested', description: 'Professional reviews' },
          { icon: Truck, title: 'Setup Service', description: 'Free installation' }
        ];
      default:
        return [
          { icon: Star, title: 'Quality Assured', description: 'Premium products only' },
          { icon: Shield, title: 'Secure Shopping', description: 'Protected purchases' },
          { icon: Truck, title: 'Fast Shipping', description: 'Quick delivery' },
          { icon: Award, title: 'Best Value', description: 'Competitive prices' }
        ];
    }
  };

  const features = getCategoryFeatures(categoryName);

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6">
        <div className="text-center mb-6">
          <Badge className="mb-2">{categoryName} Features</Badge>
          <h2 className="text-xl font-semibold text-gray-900">
            Why Choose Our {categoryName} Collection?
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1 text-sm">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFeatures;
