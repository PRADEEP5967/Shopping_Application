import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, HelpCircle, Package, Truck, CreditCard, RotateCcw } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      icon: Package,
      title: "Orders & Products",
      faqs: [
        {
          question: "How do I place an order?",
          answer: "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "You can modify or cancel your order within 1 hour of placing it. After this time, orders enter processing and cannot be changed. Contact our support team for assistance."
        },
        {
          question: "Do you offer product customization?",
          answer: "Yes! Many of our products offer customization options including colors, sizes, and personalization. Look for the 'Customize' option on product pages."
        },
        {
          question: "What if an item is out of stock?",
          answer: "If an item is out of stock, you can sign up for restock notifications. We'll email you when the item becomes available again."
        }
      ]
    },
    {
      icon: Truck,
      title: "Shipping & Delivery",
      faqs: [
        {
          question: "What are your shipping options?",
          answer: "We offer standard shipping (5-7 business days), expedited shipping (2-3 business days), and overnight shipping. Free shipping is available on orders over $50."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order in the 'My Account' section of our website."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we only ship within the United States. We're working on expanding our shipping options to include international destinations."
        },
        {
          question: "What if my package is damaged or lost?",
          answer: "If your package arrives damaged or doesn't arrive at all, please contact our support team immediately. We'll work with the carrier to resolve the issue and send a replacement if needed."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Payment & Billing",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. All payments are processed securely."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers."
        },
        {
          question: "Can I save multiple payment methods?",
          answer: "Yes, you can save multiple payment methods in your account for faster checkout. You can manage these in your account settings."
        },
        {
          question: "Do you offer payment plans?",
          answer: "For orders over $100, we offer installment payment options through our partner services. This option will be available at checkout if eligible."
        }
      ]
    },
    {
      icon: RotateCcw,
      title: "Returns & Exchanges",
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some items like personalized products may not be returnable."
        },
        {
          question: "How do I start a return?",
          answer: "You can initiate a return from your account under 'Order History' or contact our support team. We'll provide you with a prepaid return label."
        },
        {
          question: "How long do refunds take?",
          answer: "Once we receive your returned item, refunds are processed within 3-5 business days. The refund will appear on your original payment method within 5-10 business days."
        },
        {
          question: "Can I exchange an item instead of returning it?",
          answer: "Yes, we offer exchanges for different sizes or colors of the same item. The exchange process is similar to returns, and we'll send the new item once we receive the original."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <HelpCircle className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, returns, and more. 
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search frequently asked questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold">{category.title}</h2>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or browse all categories above.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Support */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Still need help?</h3>
              <p className="text-gray-600 mb-4">
                Our support team is here to help you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/contact-us" className="inline-block">
                  <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Contact Support
                  </button>
                </a>
                <a href="mailto:support@nextcommerce.com" className="inline-block">
                  <button className="border border-primary text-primary px-6 py-2 rounded-md hover:bg-primary/10 transition-colors">
                    Email Us
                  </button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
