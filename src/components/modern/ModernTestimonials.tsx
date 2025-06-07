
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

export const ModernTestimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechFlow Inc.',
      company: 'TechFlow',
      avatar: '/placeholder.svg',
      rating: 5,
      content: 'This platform transformed our e-commerce operations completely. The modern UI and performance improvements led to a 300% increase in conversions.',
      metrics: { sales: '+300%', conversion: '+150%' }
    },
    {
      name: 'Michael Chen',
      role: 'Founder, Digital Dynamics',
      company: 'Digital Dynamics',
      avatar: '/placeholder.svg',
      rating: 5,
      content: 'The analytics dashboard and inventory management features are incredibly powerful. We\'ve streamlined our entire workflow.',
      metrics: { efficiency: '+200%', time: '-50%' }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, GrowthCorp',
      company: 'GrowthCorp',
      avatar: '/placeholder.svg',
      rating: 5,
      content: 'Outstanding customer support and features. The modern design has impressed our clients and improved user engagement significantly.',
      metrics: { engagement: '+180%', retention: '+90%' }
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
            Customer Success Stories
          </Badge>
          <h2 className="text-4xl font-bold mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how businesses like yours are achieving remarkable results with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Quote className="h-8 w-8 text-primary/30" />
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  {Object.entries(testimonial.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-primary">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <Badge variant="outline" className="mt-1 text-xs">{testimonial.company}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
