
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';

const PasswordlessLogin = () => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending OTP/Magic link
    const contact = method === 'email' ? email : phone;
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (method === 'email') {
        toast.success(`Magic link sent to ${email}! Check your inbox.`);
      } else {
        toast.success(`OTP sent to ${phone}! Check your messages.`);
        setStep('verify');
      }
      
      if (method === 'phone') {
        setStep('verify');
      }
    } catch (error) {
      toast.error('Failed to send verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock OTP verification
      if (otp === '123456' || otp === '000000') {
        const contact = method === 'email' ? email : phone;
        const success = await login(contact, 'passwordless123');
        
        if (success) {
          toast.success('Successfully verified and signed in!');
          navigate('/my-account');
        } else {
          toast.error('Account not found. Please register first.');
        }
      } else {
        toast.error('Invalid OTP. Try 123456 or 000000 for demo.');
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async () => {
    setIsLoading(true);
    
    try {
      // Simulate magic link click
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const success = await login(email, 'magiclink123');
      if (success) {
        toast.success('Magic link verified! Welcome back.');
        navigate('/my-account');
      } else {
        toast.error('Account not found. Please register first.');
      }
    } catch (error) {
      toast.error('Magic link verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'verify' && method === 'phone') {
    return (
      <div className="space-y-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-green-800">
              OTP sent to {phone}
            </p>
          </CardContent>
        </Card>

        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />
            <p className="text-xs text-gray-500">
              Demo: Use 123456 or 000000
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep('input')}
            className="w-full"
          >
            Back to login methods
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Choose passwordless method</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={method === 'email' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMethod('email')}
            className="flex-1"
          >
            <Mail className="h-4 w-4 mr-2" />
            Magic Link
          </Button>
          <Button
            type="button"
            variant={method === 'phone' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMethod('phone')}
            className="flex-1"
          >
            <Phone className="h-4 w-4 mr-2" />
            SMS OTP
          </Button>
        </div>
      </div>

      <form onSubmit={handleSendOTP} className="space-y-4">
        {method === 'email' ? (
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              We'll send you a magic link to sign in instantly
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              We'll send you a 6-digit code via SMS
            </p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          <Send className="h-4 w-4 mr-2" />
          {isLoading ? (
            method === 'email' ? 'Sending Magic Link...' : 'Sending OTP...'
          ) : (
            method === 'email' ? 'Send Magic Link' : 'Send OTP'
          )}
        </Button>
      </form>

      {method === 'email' && (
        <div className="mt-4">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-blue-800 mb-2">
                Demo Magic Link
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleMagicLink}
                disabled={isLoading}
                className="text-blue-600 border-blue-300 hover:bg-blue-100"
              >
                Click to simulate magic link
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PasswordlessLogin;
