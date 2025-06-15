
import React from 'react';
import { Shield, Award, Users, Star, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const TrustSignalsSection: React.FC = () => {
  const trustMetrics = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      value: "50K+",
      label: "Happy Customers",
      description: "Satisfied shoppers worldwide"
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      value: "4.8/5",
      label: "Average Rating",
      description: "Based on 12,000+ reviews"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      value: "100%",
      label: "Secure Payment",
      description: "SSL encrypted transactions"
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      value: "24/7",
      label: "Customer Support",
      description: "Always here to help"
    }
  ];

  const certifications = [
    {
      name: "SSL Secured",
      icon: <Shield className="h-8 w-8 text-green-600" />,
      description: "256-bit encryption"
    },
    {
      name: "Verified Business",
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
      description: "Trusted partner"
    },
    {
      name: "Award Winner",
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      description: "Excellence in service"
    }
  ];

  const testimonialHighlights = [
    {
      text: "Amazing quality and fast delivery!",
      author: "Sarah M.",
      rating: 5,
      verified: true
    },
    {
      text: "Best customer service experience ever.",
      author: "John D.",
      rating: 5,
      verified: true
    },
    {
      text: "Highly recommend this store to everyone.",
      author: "Emily R.",
      rating: 5,
      verified: true
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Trust Metrics */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">
            Trusted by Thousands
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Why Customers Trust Us
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for quality products and exceptional service
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {trustMetrics.map((metric, index) => (
            <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-center mb-3">
                  {metric.icon}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </h3>
                <p className="font-semibold text-gray-700 text-sm sm:text-base mb-1">
                  {metric.label}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center lg:text-left">
              Security & Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex-shrink-0">
                    {cert.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                    <p className="text-sm text-gray-600">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Testimonials */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center lg:text-left">
              Customer Reviews
            </h3>
            <div className="space-y-4">
              {testimonialHighlights.map((testimonial, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {testimonial.verified && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base mb-2">
                    "{testimonial.text}"
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    — {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Trust Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white text-center">
          <div className="flex justify-center gap-6 sm:gap-8 mb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm sm:text-base font-medium">Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span className="text-sm sm:text-base font-medium">Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm sm:text-base font-medium">Trusted</span>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2">
            Shop with Complete Confidence
          </h3>
          <p className="text-sm sm:text-base opacity-90">
            Your satisfaction and security are our top priorities
          </p>
        </div>
      </div>
    </section>
  );
};
