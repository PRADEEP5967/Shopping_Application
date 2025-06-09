
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    quote: "NextCommerce has completely transformed our procurement process. The platform's efficiency and user experience are unmatched.",
    rating: 5,
    metrics: { efficiency: "+300%", satisfaction: "98%" }
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager, InnovateLabs",
    company: "InnovateLabs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    quote: "The quality of products and customer service exceeds expectations. Our team productivity has increased significantly.",
    rating: 5,
    metrics: { productivity: "+250%", quality: "99%" }
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Operations Director, Global Solutions",
    company: "Global Solutions",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
    quote: "Outstanding performance and reliability. NextCommerce delivers on all fronts - speed, quality, and customer satisfaction.",
    rating: 5,
    metrics: { performance: "+400%", reliability: "99.9%" }
  },
  {
    id: 4,
    name: "David Kumar",
    role: "CTO, Digital Dynamics",
    company: "Digital Dynamics",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    quote: "The platform's technical excellence and innovative features have revolutionized how we handle our business operations.",
    rating: 5,
    metrics: { innovation: "+350%", excellence: "97%" }
  }
];

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Client Testimonials
          </Badge>
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how businesses worldwide are achieving remarkable results with our platform
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Testimonial Display */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white shadow-2xl border-0 hover:shadow-3xl transition-all duration-300">
                    <CardContent className="p-12">
                      <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Quote Section */}
                        <div className="flex-1 text-center lg:text-left">
                          <Quote className="h-12 w-12 text-primary/30 mb-6 mx-auto lg:mx-0" />
                          
                          <div className="flex justify-center lg:justify-start mb-6">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          
                          <blockquote className="text-2xl text-gray-700 mb-8 leading-relaxed italic">
                            "{testimonial.quote}"
                          </blockquote>
                          
                          {/* Metrics */}
                          <div className="grid grid-cols-2 gap-6 mb-8">
                            {Object.entries(testimonial.metrics).map(([key, value]) => (
                              <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-3xl font-bold text-primary">{value}</div>
                                <div className="text-sm text-gray-500 capitalize">{key}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Client Info */}
                        <div className="flex flex-col items-center text-center">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-32 h-32 rounded-full object-cover mb-6 shadow-lg"
                          />
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-2">
                              {testimonial.name}
                            </h4>
                            <p className="text-lg text-gray-600 mb-2">{testimonial.role}</p>
                            <Badge variant="outline" className="text-sm px-4 py-1">
                              {testimonial.company}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
