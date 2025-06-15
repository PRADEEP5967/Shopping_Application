
import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { MapPin, CreditCard, Smartphone, Gift, Truck, Lock, Mail, User, Phone } from 'lucide-react';
import { toast } from 'sonner';
import AddressAutofill from './AddressAutofill';

interface CheckoutFormProps {
  onOrderComplete: (orderData: any) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onOrderComplete }) => {
  const { items, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGuestCheckout, setIsGuestCheckout] = useState(!isAuthenticated);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [saveAddress, setSaveAddress] = useState(false);
  const [billingDifferent, setBillingDifferent] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    // Guest/Customer info
    email: user?.email || '',
    firstName: '',
    lastName: '',
    phone: '',
    
    // Shipping address
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    shippingCountry: 'US',
    
    // Billing address (if different)
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    billingCountry: 'US',
    
    // Payment info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  // Calculate totals
  const shipping = subtotal >= 50 ? 0 : 8.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressSelect = (address: any, type: 'shipping' | 'billing') => {
    const prefix = type === 'shipping' ? 'shipping' : 'billing';
    setFormData(prev => ({
      ...prev,
      [`${prefix}Address`]: address.address,
      [`${prefix}City`]: address.city,
      [`${prefix}State`]: address.state,
      [`${prefix}Zip`]: address.zip,
      [`${prefix}Country`]: address.country || 'US'
    }));
  };

  const validateForm = () => {
    if (isGuestCheckout && !formData.email) {
      toast.error('Email is required for guest checkout');
      return false;
    }
    if (!formData.firstName || !formData.lastName) {
      toast.error('First and last name are required');
      return false;
    }
    if (!formData.shippingAddress || !formData.shippingCity || !formData.shippingZip) {
      toast.error('Complete shipping address is required');
      return false;
    }
    if (paymentMethod === 'card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      toast.error('Complete payment information is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderData = {
        id: `ORD-${Date.now()}`,
        items,
        customerInfo: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          isGuest: isGuestCheckout
        },
        shippingAddress: {
          address: formData.shippingAddress,
          city: formData.shippingCity,
          state: formData.shippingState,
          zip: formData.shippingZip,
          country: formData.shippingCountry
        },
        paymentMethod,
        totals: { subtotal, shipping, tax, total },
        createdAt: new Date().toISOString()
      };

      clearCart();
      setIsSubmitting(false);
      onOrderComplete(orderData);
      toast.success('Order placed successfully!');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Guest Checkout Option */}
      {!isAuthenticated && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Checkout Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={isGuestCheckout ? 'guest' : 'account'} 
              onValueChange={(value) => setIsGuestCheckout(value === 'guest')}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="guest" id="guest" />
                <Label htmlFor="guest">Continue as Guest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="account" id="account" />
                <Label htmlFor="account">Create Account for Faster Checkout</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!!user?.email}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AddressAutofill
            onAddressSelect={(address) => handleAddressSelect(address, 'shipping')}
            placeholder="Start typing your address..."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shippingCity">City *</Label>
              <Input
                id="shippingCity"
                value={formData.shippingCity}
                onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="shippingState">State *</Label>
              <Input
                id="shippingState"
                value={formData.shippingState}
                onChange={(e) => handleInputChange('shippingState', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shippingZip">ZIP Code *</Label>
              <Input
                id="shippingZip"
                value={formData.shippingZip}
                onChange={(e) => handleInputChange('shippingZip', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="shippingCountry">Country</Label>
              <Input
                id="shippingCountry"
                value={formData.shippingCountry}
                onChange={(e) => handleInputChange('shippingCountry', e.target.value)}
                disabled
              />
            </div>
          </div>

          {isAuthenticated && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="saveAddress"
                checked={saveAddress}
                onCheckedChange={(checked) => setSaveAddress(checked as boolean)}
              />
              <Label htmlFor="saveAddress">Save this address for future orders</Label>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="apple">Apple Pay</TabsTrigger>
              <TabsTrigger value="google">Google Pay</TabsTrigger>
              <TabsTrigger value="bnpl">Buy Now Pay Later</TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="space-y-4 mt-6">
              <div>
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="cardName">Name on Card *</Label>
                <Input
                  id="cardName"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="apple" className="mt-6">
              <div className="text-center py-8">
                <Smartphone className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Apple Pay integration would be implemented here</p>
                <p className="text-sm text-gray-500 mt-2">Requires Apple Pay SDK setup</p>
              </div>
            </TabsContent>

            <TabsContent value="google" className="mt-6">
              <div className="text-center py-8">
                <Smartphone className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Google Pay integration would be implemented here</p>
                <p className="text-sm text-gray-500 mt-2">Requires Google Pay API setup</p>
              </div>
            </TabsContent>

            <TabsContent value="bnpl" className="mt-6">
              <div className="text-center py-8">
                <Gift className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Buy Now Pay Later options</p>
                <p className="text-sm text-gray-500 mt-2">Klarna, Afterpay, or similar integration</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          size="lg"
          className="w-full md:w-auto"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Processing Order...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Complete Order - ${total.toFixed(2)}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
