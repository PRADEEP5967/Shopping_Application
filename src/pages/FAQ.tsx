
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Truck, 
  RefreshCw, 
  CreditCard, 
  User, 
  Settings, 
  Search, 
  ArrowRight 
} from 'lucide-react';

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  questions: {
    id: string;
    question: string;
    answer: string | React.ReactNode;
  }[];
}

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const faqCategories: FAQCategory[] = [
    {
      id: 'orders',
      name: 'Orders & Payments',
      icon: <ShoppingBag className="h-5 w-5" />,
      questions: [
        {
          id: 'track-order',
          question: 'How do I track my order?',
          answer: 'You can track your order by logging into your account and visiting the "Order History" section. There, you\'ll find all your orders with their current status and tracking information for shipped items.'
        },
        {
          id: 'order-cancel',
          question: 'Can I cancel my order?',
          answer: 'Yes, you can cancel your order if it hasn\'t shipped yet. Go to "Order History" in your account, find the order, and click on the "Cancel Order" button. If the order has already shipped, you\'ll need to follow our return process instead.'
        },
        {
          id: 'payment-methods',
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. We ensure all transactions are secure and encrypted.'
        },
        {
          id: 'order-confirmation',
          question: 'Why haven\'t I received an order confirmation?',
          answer: 'Order confirmations are sent immediately after purchase. If you haven\'t received yours, please check your spam/junk folder. If it\'s not there, log into your account to verify the order was placed successfully, or contact our customer support team.'
        }
      ]
    },
    {
      id: 'shipping',
      name: 'Shipping & Delivery',
      icon: <Truck className="h-5 w-5" />,
      questions: [
        {
          id: 'shipping-time',
          question: 'How long does shipping take?',
          answer: 'Standard shipping typically takes 3-5 business days. Express shipping takes 1-2 business days. Please note that these times are for domestic orders only and begin from when the order is shipped, not when it\'s placed.'
        },
        {
          id: 'international-shipping',
          question: 'Do you offer international shipping?',
          answer: 'Yes, we ship to many international destinations. During checkout, you can see if your country is eligible for shipping. International orders may take 7-14 business days to arrive and may be subject to customs duties and taxes.'
        },
        {
          id: 'free-shipping',
          question: 'When is shipping free?',
          answer: 'We offer free standard shipping on all domestic orders over $50. Some promotional periods may offer free shipping with no minimum purchase requirement.'
        },
        {
          id: 'order-status',
          question: 'What do the different order statuses mean?',
          answer: (
            <div>
              <p className="mb-2">Your order will go through several statuses:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Processing:</strong> Your order has been received and payment verified.</li>
                <li><strong>Packed:</strong> Your items have been gathered and packaged.</li>
                <li><strong>Shipped:</strong> Your order is on the way with a carrier.</li>
                <li><strong>Delivered:</strong> Your order has been delivered.</li>
                <li><strong>Cancelled:</strong> Your order has been cancelled.</li>
              </ul>
            </div>
          )
        }
      ]
    },
    {
      id: 'returns',
      name: 'Returns & Refunds',
      icon: <RefreshCw className="h-5 w-5" />,
      questions: [
        {
          id: 'return-policy',
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most items. Products must be in their original condition with tags attached and original packaging. Some items, such as personalized products and hygiene products, cannot be returned.'
        },
        {
          id: 'start-return',
          question: 'How do I start a return?',
          answer: 'To start a return, log into your account, go to "Order History," find the order, and select "Return Items." Follow the instructions to complete the return request and get your return shipping label.'
        },
        {
          id: 'refund-time',
          question: 'How long do refunds take?',
          answer: 'Once we receive your return, it takes 1-2 business days to inspect and process. After processing, refunds typically take 3-5 business days to appear on your original payment method, depending on your bank or credit card company.'
        },
        {
          id: 'exchange',
          question: 'Can I exchange an item instead of returning it?',
          answer: 'Yes, we offer exchanges for different sizes, colors, or variations of the same product. During the return process, select "Exchange" instead of "Return" and specify the item you want in exchange.'
        }
      ]
    },
    {
      id: 'account',
      name: 'Account & Security',
      icon: <User className="h-5 w-5" />,
      questions: [
        {
          id: 'create-account',
          question: 'How do I create an account?',
          answer: 'To create an account, click on the "Account" icon in the top right corner of our website and select "Sign Up." Fill in your details, create a password, and you\'re all set!'
        },
        {
          id: 'forgot-password',
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click on the "Account" icon, select "Login," and then click "Forgot Password." Enter your email address, and we\'ll send you instructions to reset your password.'
        },
        {
          id: 'update-info',
          question: 'How do I update my account information?',
          answer: 'Log into your account, go to "My Account," and select "Account Settings." Here, you can update your personal information, change your password, and manage your communication preferences.'
        },
        {
          id: 'data-security',
          question: 'How do you protect my personal information?',
          answer: 'We use industry-standard encryption and security measures to protect your information. We never share your personal data with third parties without your consent. For more details, please review our Privacy Policy.'
        }
      ]
    },
    {
      id: 'products',
      name: 'Products & Services',
      icon: <Settings className="h-5 w-5" />,
      questions: [
        {
          id: 'product-warranty',
          question: 'Do your products have warranties?',
          answer: 'Most of our electronics and appliances come with manufacturer warranties. The warranty period varies by product and is specified on the product page. Some products may also be eligible for extended warranty options.'
        },
        {
          id: 'product-compatibility',
          question: 'How do I know if a product is compatible with my device?',
          answer: 'Product pages include compatibility information in the specifications section. If you\'re unsure, please contact our support team with your device details, and we\'ll assist you in determining compatibility.'
        },
        {
          id: 'product-authenticity',
          question: 'Are all your products authentic?',
          answer: 'Yes, all our products are 100% authentic and sourced directly from manufacturers or authorized distributors. We stand behind the quality and authenticity of every item we sell.'
        },
        {
          id: 'out-of-stock',
          question: 'What if the product I want is out of stock?',
          answer: 'For out-of-stock items, you can sign up for stock notifications on the product page. We\'ll email you when the item becomes available again. Most products are restocked regularly.'
        }
      ]
    },
    {
      id: 'promotions',
      name: 'Promotions & Discounts',
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          id: 'coupon-code',
          question: 'How do I use a coupon code?',
          answer: 'During checkout, look for the "Apply Coupon" field. Enter your code and click "Apply" to see the discount reflected in your order summary.'
        },
        {
          id: 'coupon-not-working',
          question: 'Why isn\'t my coupon code working?',
          answer: 'Coupon codes may have restrictions, such as minimum purchase amounts, specific product categories, or expiration dates. Double-check the terms of the coupon and ensure it\'s entered exactly as provided, including any uppercase letters.'
        },
        {
          id: 'student-discount',
          question: 'Do you offer student or military discounts?',
          answer: 'Yes, we offer special discounts for students, educators, and military personnel. Visit our "Discounts" page or contact customer service to verify your status and receive your special discount code.'
        },
        {
          id: 'newsletter-promo',
          question: 'How do I stay informed about promotions?',
          answer: 'Subscribe to our newsletter for exclusive deals and early access to sales. You can also follow us on social media and enable notifications for our app to stay updated on our latest promotions.'
        }
      ]
    }
  ];
  
  // Filter questions based on search query and active category
  const filteredQuestions = faqCategories.flatMap(category => {
    // If category filter is active and doesn't match, return empty array
    if (activeCategory !== 'all' && activeCategory !== category.id) {
      return [];
    }
    
    // Filter by search query
    return category.questions.filter(q => 
      searchQuery === '' || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof q.answer === 'string' && q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    ).map(q => ({ ...q, category: category.name }));
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-gray-700 mb-8">
                Find answers to the most common questions about our products, services, and policies.
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  type="text"
                  placeholder="Search for answers..."
                  className="pl-10 pr-4 py-6 text-lg rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Categories */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                activeCategory === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-white hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>All</span>
            </button>
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                  activeCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'bg-white hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <div className="mb-1">{category.icon}</div>
                <span className="text-xs md:text-sm text-center">{category.name}</span>
              </button>
            ))}
          </div>
          
          {/* FAQ Accordion */}
          {filteredQuestions.length > 0 ? (
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {filteredQuestions.map((question) => (
                  <AccordionItem key={question.id} value={question.id}>
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left">
                      {question.question}
                      {activeCategory === 'all' && (
                        <span className="text-xs text-gray-500 ml-2">({question.category})</span>
                      )}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      {question.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl font-medium mb-2">No results found</p>
              <p className="text-gray-600 mb-4">
                We couldn't find any FAQ matching your search.
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
          
          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Can't find the answer you're looking for? Our customer support team is ready to help.
            </p>
            <Link to="/contact">
              <Button size="lg" className="flex items-center gap-2">
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
