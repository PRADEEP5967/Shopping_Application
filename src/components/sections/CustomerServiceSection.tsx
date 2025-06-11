
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Star, Users, Gift, ArrowRight, HelpCircle } from 'lucide-react';

export const CustomerServiceSection: React.FC = () => {
  const customerServiceLinks = [
    { title: "My Account", href: "/my-account", icon: <Users className="h-5 w-5" /> },
    { title: "Order History", href: "/order-history", icon: <ShoppingBag className="h-5 w-5" /> },
    { title: "Wishlist", href: "/wishlist", icon: <Star className="h-5 w-5" /> },
    { title: "Shipping Policy", href: "/shipping-policy", icon: <Gift className="h-5 w-5" /> },
    { title: "Returns & Exchanges", href: "/returns-exchanges", icon: <ArrowRight className="h-5 w-5" /> },
    { title: "FAQs", href: "/faq", icon: <HelpCircle className="h-5 w-5" /> },
    { title: "Contact Us", href: "/contact-us", icon: <Users className="h-5 w-5" /> }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 via-blue-50 to-purple-50 dark:from-primary/10 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Customer Service</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're here to help you every step of the way. Access your account, track orders, and get support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerServiceLinks.map((link, index) => (
            <Link key={index} to={link.href} className="group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    {link.icon}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{link.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
