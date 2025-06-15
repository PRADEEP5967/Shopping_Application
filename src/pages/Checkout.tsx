import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartFlyout from '@/components/CartFlyout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, Lock, MapPin, CreditCard, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { items, clearCart, subtotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a successful checkout process
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      toast({
        title: "Order placed!",
        description: "Your order has been successfully processed.",
      });
      navigate('/order-confirmation'); // Redirect to a confirmation page
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartFlyout />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <Card>
                <CardContent className="p-6">
                  <ul>
                    {items.map(item => (
                      <li key={item.product.id + (item.variant?.id || '')} className="flex items-center justify-between py-3 border-b">
                        <div className="flex items-center">
                          <img src={item.product.images?.[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded mr-4" />
                          <div>
                            <h3 className="font-medium">{item.product.name}</h3>
                            {item.variant && (
                              <p className="text-gray-600 text-sm">{item.variant.name}</p>
                            )}
                            <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="font-semibold">${(item.variant ? item.variant.price : item.product.price).toFixed(2)}</div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Checkout Form */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <Input
                        id="address"
                        placeholder="Your street address"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <Input
                          id="city"
                          placeholder="Your city"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                          ZIP Code
                        </label>
                        <Input
                          id="zip"
                          placeholder="Your ZIP code"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <Input
                        id="country"
                        placeholder="Your country"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={isSubmitting}>
                      {isSubmitting && <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24"></svg>}
                      <Lock className="h-4 w-4" />
                      Secure Checkout
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
