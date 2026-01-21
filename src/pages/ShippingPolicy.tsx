import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, MapPin, Package, CreditCard, AlertCircle, Globe, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ShippingPolicy = () => {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      time: '5-7 Business Days',
      price: 'Free on orders over $50',
      details: '$4.99 for orders under $50',
      icon: Package,
      popular: false
    },
    {
      name: 'Express Shipping',
      time: '2-3 Business Days',
      price: '$9.99',
      details: 'Available for most locations',
      icon: Truck,
      popular: true
    },
    {
      name: 'Next Day Delivery',
      time: '1 Business Day',
      price: '$19.99',
      details: 'Order by 2 PM for same-day dispatch',
      icon: Clock,
      popular: false
    }
  ];

  const policies = [
    {
      icon: MapPin,
      title: 'Delivery Areas',
      content: 'We currently ship to all 50 US states, Canada, UK, Australia, and select European countries. International shipping rates and delivery times vary by destination.'
    },
    {
      icon: Package,
      title: 'Order Processing',
      content: 'Orders are processed within 1-2 business days. You will receive a confirmation email with tracking information once your order ships. Orders placed on weekends or holidays will be processed on the next business day.'
    },
    {
      icon: CreditCard,
      title: 'Shipping Charges',
      content: 'Shipping costs are calculated at checkout based on your location, shipping method, and order weight. Free standard shipping is available on orders over $50 within the continental US.'
    },
    {
      icon: AlertCircle,
      title: 'Delivery Issues',
      content: 'If your package is lost, damaged, or significantly delayed, please contact our customer support team within 48 hours of the expected delivery date. We will work with the carrier to resolve the issue or provide a replacement/refund.'
    },
    {
      icon: Globe,
      title: 'International Orders',
      content: 'International customers are responsible for any customs duties, taxes, or import fees. Delivery times for international orders typically range from 7-21 business days depending on the destination and customs processing.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/20 via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Truck className="h-4 w-4" />
              <span className="text-sm font-medium">Fast & Reliable Delivery</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Shipping Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              We strive to deliver your orders quickly and safely. Learn about our shipping options, 
              delivery times, and policies below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-center mb-12"
          >
            Shipping Options
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {shippingOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`relative h-full ${option.popular ? 'border-primary shadow-lg shadow-primary/10' : 'border-border/50'}`}>
                    {option.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                        Most Popular
                      </Badge>
                    )}
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex p-4 rounded-full mb-4 ${option.popular ? 'bg-primary/20' : 'bg-muted'}`}>
                        <Icon className={`h-8 w-8 ${option.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{option.name}</h3>
                      <p className="text-2xl font-bold text-primary mb-1">{option.time}</p>
                      <p className="text-lg font-medium mb-2">{option.price}</p>
                      <p className="text-sm text-muted-foreground">{option.details}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Separator />

      {/* Policy Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {policies.map((policy, index) => {
              const Icon = policy.icon;
              return (
                <motion.div
                  key={policy.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 hover:border-primary/30 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        {policy.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{policy.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Need Help With Shipping?</h3>
            <p className="text-muted-foreground mb-6">
              Our customer support team is available to assist you with any shipping questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Card className="p-4">
                <p className="font-medium">Email Support</p>
                <p className="text-primary">pradeepsahani8130s@gmail.com</p>
              </Card>
              <Card className="p-4">
                <p className="font-medium">Phone Support</p>
                <p className="text-primary">+91 8130885013</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShippingPolicy;
