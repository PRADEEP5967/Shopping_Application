
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const SmallBusinessTestimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      business: 'Johnson & Co. Consulting',
      rating: 5,
      text: 'This platform transformed how we manage our business operations. The tools are intuitive and the support is exceptional.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face'
    },
    {
      name: 'Mike Chen',
      business: 'Tech Startup Solutions',
      rating: 5,
      text: 'As a tech startup, we needed reliable and scalable solutions. This exceeded our expectations in every way.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      business: 'Creative Design Studio',
      rating: 5,
      text: 'The creative tools and business solutions perfectly match our workflow. Highly recommend for creative businesses.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800">
            Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real businesses that have transformed their operations with our solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-gray-200" />
                  <p className="text-gray-700 leading-relaxed pl-6">
                    {testimonial.text}
                  </p>
                </div>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.business}</div>
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

export default SmallBusinessTestimonials;
