
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import ContactForm from '@/components/contact/ContactForm';
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team',
      primary: '8130885013',
      secondary: 'Support: 8130885013',
      action: 'Call Now',
      color: 'bg-blue-500'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us a detailed message',
      primary: 'info@example.com',
      secondary: 'support@example.com',
      action: 'Send Email',
      color: 'bg-green-500'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant assistance',
      primary: 'Available 24/7',
      secondary: 'Average response: 2 min',
      action: 'Start Chat',
      color: 'bg-purple-500'
    },
    {
      icon: Calendar,
      title: 'Schedule Meeting',
      description: 'Book a consultation',
      primary: 'Free 30-min consultation',
      secondary: 'Available slots daily',
      action: 'Book Now',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Enhanced Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Have questions, feedback, or need assistance? We're here to help.
              Reach out to our friendly team using any of the methods below.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">&lt;2hr</div>
                <div className="text-gray-600">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">99%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-gray-600">Team Members</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Methods Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Preferred Contact Method</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer multiple ways to get in touch. Pick the one that works best for you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${method.color} text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                      <div className="space-y-1 mb-4">
                        <div className="font-medium text-sm">{method.primary}</div>
                        <div className="text-gray-500 text-xs">{method.secondary}</div>
                      </div>
                      <Button size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        {method.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Information */}
            <div className="lg:w-1/3">
              <div className="sticky top-8">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
                      <MapPin className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Our Location</h3>
                      <p className="text-gray-600">
                        123 Tech Avenue<br />
                        Noida<br />
                        India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Clock className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                  <h3 className="font-bold mb-4">Why Choose Us?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Average response time: 2 hours
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      99% customer satisfaction rate
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      24/7 support availability
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Contact Form */}
            <div className="lg:w-2/3">
              <ContactForm />
            </div>
          </div>
        </div>
        
        {/* Enhanced Map Section */}
        <div className="w-full h-96 bg-gray-200 mt-12 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.48127602546!2d77.04417840000001!3d28.5272803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1620942834995!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Our location in Noida, India"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <h3 className="font-bold mb-2">Visit Our Office</h3>
            <p className="text-sm text-gray-600">123 Tech Avenue, Noida, India</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
