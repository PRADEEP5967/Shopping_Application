
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, Clock, Users, CheckCircle } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  image: string;
  features: string[];
  price: string;
  rating: number;
  duration?: string;
  teamSize?: string;
  popular?: boolean;
}

interface ServiceCardProps {
  service: Service;
  onExplore: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onExplore }) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 h-full animate-fade-in relative overflow-hidden">
      {service.popular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-orange-500 text-white">
            Most Popular
          </Badge>
        </div>
      )}
      
      <div className="relative overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {service.title}
          </CardTitle>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{service.rating}</span>
          </div>
        </div>
        <p className="text-gray-600">{service.description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Service Meta */}
        <div className="flex gap-4 mb-4 text-sm text-gray-500">
          {service.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {service.duration}
            </div>
          )}
          {service.teamSize && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {service.teamSize}
            </div>
          )}
        </div>
        
        {/* Features */}
        <div className="space-y-2 mb-6">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold text-primary">{service.price}</span>
          </div>
          <Button 
            onClick={onExplore} 
            className="group-hover:bg-primary group-hover:text-white transition-all duration-200"
          >
            Explore <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
