
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { RefreshCw, Package, AlertTriangle, HelpCircle, ArrowLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="text-primary hover:underline inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Return & Exchange Policy</h1>
            <p className="text-gray-600">
              We want you to be completely satisfied with your purchase. If you're not, we're here to help.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Return Policy Overview</h2>
            <p className="mb-4">
              Most items can be returned within 30 days of receipt for a full refund. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.
            </p>
            <p>
              Some items cannot be returned, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Gift cards</li>
              <li>Downloadable software products</li>
              <li>Personal care items that have been opened or used</li>
              <li>Custom-made or personalized items</li>
              <li>Items marked as "Final Sale" or "Non-Returnable"</li>
            </ul>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">
                Start your return online and we'll guide you through the process with simple steps.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <RefreshCw className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Free Exchanges</h3>
              <p className="text-sm text-gray-600">
                Need a different size or color? We cover return shipping for exchanges.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">
                Our customer service team is available to help with any return questions.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">How to Return an Item</h2>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>Initiate a Return</strong>
                <p className="text-gray-600 mt-1">
                  Log in to your account, go to your order history, and select the item(s) you wish to return. 
                  Follow the prompts to complete the return request.
                </p>
              </li>
              <li>
                <strong>Package Your Return</strong>
                <p className="text-gray-600 mt-1">
                  Pack the item(s) in the original packaging if possible. Include all parts, accessories, 
                  and documentation that came with the product.
                </p>
              </li>
              <li>
                <strong>Print Your Return Label</strong>
                <p className="text-gray-600 mt-1">
                  Once your return is approved, you'll receive a return shipping label via email. 
                  Print the label and attach it to your package.
                </p>
              </li>
              <li>
                <strong>Ship Your Return</strong>
                <p className="text-gray-600 mt-1">
                  Drop off your package at the carrier specified on your return label. Keep the tracking number for reference.
                </p>
              </li>
              <li>
                <strong>Receive Your Refund</strong>
                <p className="text-gray-600 mt-1">
                  Once your return is received and inspected, we'll process your refund to the original payment method. 
                  This typically takes 3-5 business days, depending on your bank.
                </p>
              </li>
            </ol>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    All returns must be initiated within 30 days of delivery. Returns initiated after 
                    this period may not be eligible for a full refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-6 py-4">
                  Can I return a gift?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Yes, you can return a gift. If you received a gift, you will need the order number or gift receipt.
                  The refund will be issued as store credit to the gift recipient.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="px-6 py-4">
                  How long does it take to process my refund?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Once your return is received, it typically takes 1-2 business days to inspect and process.
                  After processing, refunds to your original payment method can take an additional 3-5 business
                  days to appear on your statement, depending on your financial institution.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="px-6 py-4">
                  What if I received a damaged or defective item?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  If you received a damaged or defective item, please contact our customer service team
                  immediately. We'll provide a prepaid return label and expedite your replacement or refund.
                  Please take photos of the damaged items as these may be required during the return process.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="px-6 py-4">
                  Can I exchange an item instead of returning it?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Yes, we offer exchanges for size, color, or other variations of the same product.
                  To request an exchange, follow the same process as a return but select "Exchange"
                  instead of "Return" when initiating the process through your account.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Need More Help?</h2>
            <p className="text-gray-600 mb-6">
              Our customer service team is here to assist you with any questions or concerns.
            </p>
            <Link to="/contact">
              <Button>Contact Support</Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
