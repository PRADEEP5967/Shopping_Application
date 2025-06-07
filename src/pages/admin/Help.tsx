
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Book, MessageCircle, Mail, Phone, FileText, Video, Users } from 'lucide-react';

const Help = () => {
  const faqs = [
    {
      question: "How do I add a new product?",
      answer: "Navigate to the Products section and click 'Add Product'. Fill in the required information including name, price, description, and upload images."
    },
    {
      question: "How do I manage inventory?",
      answer: "Use the Inventory Management section to track stock levels, set low stock alerts, and update quantities."
    },
    {
      question: "How do I process orders?",
      answer: "Go to the Orders section to view, update order status, and manage customer orders."
    },
    {
      question: "How do I configure payment methods?",
      answer: "In Settings > Payment, you can enable/disable payment methods like PayPal, Stripe, and Cash on Delivery."
    }
  ];

  const guides = [
    {
      title: "Getting Started",
      description: "Learn the basics of managing your e-commerce store",
      icon: Book,
      duration: "10 min read"
    },
    {
      title: "Product Management",
      description: "How to add, edit, and organize your products",
      icon: FileText,
      duration: "15 min read"
    },
    {
      title: "Order Processing",
      description: "Complete guide to handling customer orders",
      icon: FileText,
      duration: "12 min read"
    },
    {
      title: "Analytics Dashboard",
      description: "Understanding your store's performance metrics",
      icon: FileText,
      duration: "8 min read"
    }
  ];

  const videos = [
    {
      title: "Admin Panel Overview",
      description: "A complete walkthrough of the admin interface",
      duration: "5:30"
    },
    {
      title: "Adding Your First Product",
      description: "Step-by-step guide to create your first product listing",
      duration: "8:45"
    },
    {
      title: "Managing Customer Orders",
      description: "How to process and fulfill customer orders",
      duration: "6:20"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentation</CardTitle>
            <Book className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Help articles</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video Tutorials</CardTitle>
            <Video className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Tutorial videos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2k</div>
            <p className="text-xs text-muted-foreground">Active users</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search FAQ..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guides.map((guide, index) => {
                  const Icon = guide.icon;
                  return (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <Icon className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-medium">{guide.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{guide.description}</p>
                          <p className="text-xs text-gray-400 mt-2">{guide.duration}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {videos.map((video, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <Video className="h-6 w-6 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-medium">{video.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                        <p className="text-xs text-gray-400 mt-2">Duration: {video.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Live Chat
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Phone Support
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Support Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Response time: Usually within 2-4 hours during business hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Help;
