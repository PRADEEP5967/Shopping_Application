
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  price?: string;
  rating?: number;
  onExplore?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  image,
  features,
  price,
  rating,
  onExplore
}) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {price && (
          <Badge className="absolute top-4 right-4 bg-primary text-white">
            {price}
          </Badge>
        )}
      </div>
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600 leading-relaxed">{description}</p>
        
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={onExplore}
          className="w-full group-hover:bg-primary group-hover:text-white transition-all"
          variant="outline"
        >
          Explore More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
