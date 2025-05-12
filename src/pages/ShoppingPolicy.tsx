
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { ShoppingBag, CreditCard, Truck, Shield, Clock, Wallet } from 'lucide-react';

const ShoppingPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Policy</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600">Free standard shipping on all orders over $50.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">30-Day Returns</h3>
            <p className="text-gray-600">Easy returns within 30 days of purchase.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Shopping</h3>
            <p className="text-gray-600">Your data is always protected with us.</p>
          </div>
        </div>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <ShoppingBag className="mr-2 h-6 w-6" />
              General Shopping Information
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <p>
                We strive to provide a seamless shopping experience for all customers. Our website is designed to be user-friendly, 
                accessible, and secure. Browse our extensive collection of products and shop with confidence.
              </p>
              <p>
                To make a purchase, simply add items to your cart and proceed to checkout. You can review your order before 
                finalizing the purchase. Once your order is confirmed, you will receive an order confirmation via email.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <CreditCard className="mr-2 h-6 w-6" />
              Payment Methods
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <p>
                We accept the following payment methods:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Credit Cards (Visa, MasterCard, American Express, Discover)</li>
                <li>Debit Cards</li>
                <li>PayPal</li>
                <li>Apple Pay</li>
                <li>Google Pay</li>
                <li>Shop Pay</li>
              </ul>
              <p>
                All payments are securely processed. We do not store your full credit card details on our servers. Your payment 
                information is encrypted and securely transmitted to our payment providers.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Truck className="mr-2 h-6 w-6" />
              Shipping Policy
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <p>
                We offer several shipping options to meet your needs:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left border-b">Shipping Method</th>
                      <th className="py-3 px-4 text-left border-b">Estimated Delivery Time</th>
                      <th className="py-3 px-4 text-left border-b">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-4 border-b">Standard Shipping</td>
                      <td className="py-3 px-4 border-b">3-5 Business Days</td>
                      <td className="py-3 px-4 border-b">$5.99 (Free on orders over $50)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">Expedited Shipping</td>
                      <td className="py-3 px-4 border-b">2 Business Days</td>
                      <td className="py-3 px-4 border-b">$12.99</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border-b">Next Day Shipping</td>
                      <td className="py-3 px-4 border-b">Next Business Day</td>
                      <td className="py-3 px-4 border-b">$19.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Shipping times are estimated and begin from the date of shipment, not the date of purchase. Orders placed after 
                2:00 PM EST may not be processed until the following business day. We do not ship on weekends or holidays.
              </p>
              <p>
                We currently ship to the United States, Canada, and select international locations. Additional shipping fees and 
                import duties may apply for international orders.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Wallet className="mr-2 h-6 w-6" />
              Taxes & Fees
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <p>
                Sales tax is applied to orders based on local and state tax laws of the shipping destination. The applicable 
                tax rate will be calculated at checkout based on the shipping address you provide.
              </p>
              <p>
                For international orders, customers are responsible for all duties, import taxes, and customs fees that may be 
                imposed by the destination country.
              </p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShoppingPolicy;
