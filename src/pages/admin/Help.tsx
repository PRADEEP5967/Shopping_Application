import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Book, MessageCircle, Mail, Phone, FileText, Video, Users, ExternalLink, Play, Clock, ChevronRight, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      category: 'Getting Started',
      items: [
        {
          question: "How do I add a new product?",
          answer: "Navigate to Products > Add Product in the sidebar. Fill in the required information including name, price, description, and upload images. You can also set inventory levels, add variants, and configure shipping options."
        },
        {
          question: "How do I manage inventory?",
          answer: "Go to Inventory Management in the sidebar. Here you can track stock levels, set low stock alerts, update quantities, and manage product variants. Enable automatic stock updates when orders are placed."
        },
        {
          question: "How do I set up categories?",
          answer: "Navigate to Categories in the sidebar. Click 'Add Category' to create new categories. You can create hierarchical structures with parent and child categories, add descriptions, and feature specific categories on your homepage."
        }
      ]
    },
    {
      category: 'Orders & Shipping',
      items: [
        {
          question: "How do I process orders?",
          answer: "Go to the Orders section to view all orders. Click on an order to see details, update status (processing, shipped, delivered), add tracking information, and manage returns or refunds."
        },
        {
          question: "How do I set up shipping rates?",
          answer: "Navigate to Settings > Shipping. You can set flat rates, weight-based rates, or free shipping thresholds. Add shipping zones for different regions and configure carrier integrations."
        },
        {
          question: "How do I handle returns?",
          answer: "In the Orders section, find the order and click 'Process Return'. You can issue full or partial refunds, request the item back, and update inventory accordingly."
        }
      ]
    },
    {
      category: 'Payments & Discounts',
      items: [
        {
          question: "How do I configure payment methods?",
          answer: "In Settings > Payment, you can enable/disable payment methods like Stripe, PayPal, and Cash on Delivery. Connect your payment gateway accounts and configure checkout options."
        },
        {
          question: "How do I create discount codes?",
          answer: "Go to Discounts in the sidebar. Click 'Create Discount' and set the code, discount type (percentage or fixed), validity period, usage limits, and minimum purchase requirements."
        }
      ]
    },
    {
      category: 'Analytics & Reports',
      items: [
        {
          question: "How do I view sales reports?",
          answer: "Navigate to Analytics in the sidebar. You can view sales by day, week, month, or custom date ranges. Export reports in CSV format and track key metrics like revenue, orders, and average order value."
        },
        {
          question: "How do I track customer behavior?",
          answer: "Use the Customer Analytics section to view customer segments, purchase patterns, lifetime value, and retention rates. Set up customer journeys to understand the path to purchase."
        }
      ]
    }
  ];

  const guides = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of setting up and managing your e-commerce store",
      icon: Book,
      duration: "10 min read",
      level: "Beginner",
      topics: ['Dashboard overview', 'First product', 'Store settings']
    },
    {
      title: "Product Management",
      description: "How to add, edit, organize, and optimize your products",
      icon: FileText,
      duration: "15 min read",
      level: "Beginner",
      topics: ['Adding products', 'Variants', 'Categories', 'SEO']
    },
    {
      title: "Order Processing",
      description: "Complete guide to handling customer orders efficiently",
      icon: FileText,
      duration: "12 min read",
      level: "Intermediate",
      topics: ['Order workflow', 'Shipping', 'Returns', 'Notifications']
    },
    {
      title: "Analytics Deep Dive",
      description: "Understanding your store's performance metrics",
      icon: FileText,
      duration: "20 min read",
      level: "Advanced",
      topics: ['Sales reports', 'Customer insights', 'Conversion optimization']
    },
    {
      title: "Marketing & Promotions",
      description: "Create effective campaigns and discount strategies",
      icon: FileText,
      duration: "18 min read",
      level: "Intermediate",
      topics: ['Discount codes', 'Email campaigns', 'A/B testing']
    },
    {
      title: "Security Best Practices",
      description: "Keep your store and customer data secure",
      icon: FileText,
      duration: "8 min read",
      level: "Advanced",
      topics: ['2FA setup', 'SSL', 'PCI compliance', 'Access control']
    }
  ];

  const videos = [
    {
      title: "Admin Panel Overview",
      description: "A complete walkthrough of the admin interface",
      duration: "5:30",
      thumbnail: "/placeholder.svg",
      views: "2.3k"
    },
    {
      title: "Adding Your First Product",
      description: "Step-by-step guide to create your first product listing",
      duration: "8:45",
      thumbnail: "/placeholder.svg",
      views: "1.8k"
    },
    {
      title: "Managing Customer Orders",
      description: "How to process, track, and fulfill customer orders",
      duration: "6:20",
      thumbnail: "/placeholder.svg",
      views: "1.5k"
    },
    {
      title: "Setting Up Discount Codes",
      description: "Create and manage promotional discount codes",
      duration: "4:15",
      thumbnail: "/placeholder.svg",
      views: "980"
    },
    {
      title: "Understanding Analytics",
      description: "How to read and use your store analytics effectively",
      duration: "10:30",
      thumbnail: "/placeholder.svg",
      views: "1.2k"
    }
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success('Your message has been sent! We\'ll respond within 24 hours.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const getLevelBadge = (level: string) => {
    const styles: Record<string, string> = {
      Beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      Intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      Advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    };
    return styles[level] || '';
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documentation</CardTitle>
              <Book className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{guides.length}</div>
              <p className="text-xs text-muted-foreground">Help articles & guides</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Video Tutorials</CardTitle>
              <Video className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{videos.length}</div>
              <p className="text-xs text-muted-foreground">Tutorial videos available</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">FAQ Topics</CardTitle>
              <MessageCircle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{faqs.reduce((sum, cat) => sum + cat.items.length, 0)}</div>
              <p className="text-xs text-muted-foreground">Common questions answered</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-[600px]">
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
                <Input 
                  placeholder="Search FAQ..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              {filteredFaqs.map((category, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Badge variant="outline">{category.category}</Badge>
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((faq, faqIdx) => (
                      <AccordionItem key={faqIdx} value={`${idx}-${faqIdx}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
              {filteredFaqs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No results found for "{searchTerm}"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Guides & Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.map((guide, index) => {
                  const Icon = guide.icon;
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <Badge className={getLevelBadge(guide.level)}>{guide.level}</Badge>
                      </div>
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {guide.duration}
                        </span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {guide.topics.map((topic, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{topic}</Badge>
                        ))}
                      </div>
                    </motion.div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="relative aspect-video bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                      <p className="text-xs text-muted-foreground">{video.views} views</p>
                    </div>
                  </motion.div>
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
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="What's this about?"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    support@store.com
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Live Chat (Online)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    +1 (555) 123-4567
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
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                  <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Average response: 2-4 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Help;
