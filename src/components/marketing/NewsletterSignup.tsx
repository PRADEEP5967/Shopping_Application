
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Gift, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    newProducts: true,
    deals: true,
    personalizedOffers: false,
  });
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      toast.success('Successfully subscribed to our newsletter!');
      localStorage.setItem('newsletterSubscribed', 'true');
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">Welcome aboard!</h3>
          <p className="text-green-700">You'll receive our best deals and updates at {email}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Newsletter Signup
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Gift className="w-4 h-4" />
          Get 10% off your first order
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubscribe} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="space-y-3">
            <p className="text-sm font-medium">Email preferences:</p>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newProducts"
                checked={preferences.newProducts}
                onCheckedChange={(checked) =>
                  setPreferences(prev => ({ ...prev, newProducts: checked as boolean }))
                }
              />
              <label htmlFor="newProducts" className="text-sm">
                New product announcements
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="deals"
                checked={preferences.deals}
                onCheckedChange={(checked) =>
                  setPreferences(prev => ({ ...prev, deals: checked as boolean }))
                }
              />
              <label htmlFor="deals" className="text-sm">
                Exclusive deals and discounts
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="personalizedOffers"
                checked={preferences.personalizedOffers}
                onCheckedChange={(checked) =>
                  setPreferences(prev => ({ ...prev, personalizedOffers: checked as boolean }))
                }
              />
              <label htmlFor="personalizedOffers" className="text-sm">
                Personalized recommendations
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Sparkles className="w-4 h-4 mr-2" />
            Subscribe & Save 10%
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By subscribing, you agree to our privacy policy. Unsubscribe anytime.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsletterSignup;
