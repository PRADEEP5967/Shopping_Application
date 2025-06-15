
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SocialLogin = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    setIsLoading(provider);
    
    // Simulate social login - in real implementation, this would integrate with OAuth providers
    try {
      // Mock successful social login
      const mockEmail = `user@${provider}.com`;
      const success = await login(mockEmail, 'sociallogin123');
      
      if (success) {
        toast.success(`Successfully signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}!`);
        navigate('/my-account');
      } else {
        // If user doesn't exist, suggest registration
        toast.error(`No account found. Please register first or use a different method.`);
      }
    } catch (error) {
      toast.error(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        onClick={() => handleSocialLogin('google')}
        disabled={isLoading === 'google'}
        className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="#4285f4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34a853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#fbbc05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#ea4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {isLoading === 'google' ? 'Signing in...' : 'Continue with Google'}
      </Button>

      <Button
        variant="outline"
        onClick={() => handleSocialLogin('facebook')}
        disabled={isLoading === 'facebook'}
        className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
      >
        <svg className="h-4 w-4" fill="#1877f2" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        {isLoading === 'facebook' ? 'Signing in...' : 'Continue with Facebook'}
      </Button>

      <Button
        variant="outline"
        onClick={() => handleSocialLogin('apple')}
        disabled={isLoading === 'apple'}
        className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
      >
        <svg className="h-4 w-4" fill="#000" viewBox="0 0 24 24">
          <path d="M12.017 0C8.396 0 8.778.011 8.778.011s3.834 3.805 3.834 8.777c0 4.972-3.834 8.777-3.834 8.777s-.382.011 3.239.011c3.621 0 6.565-2.935 6.565-6.556S15.638 4.464 12.017 4.464c-1.863 0-3.581.746-4.815 1.955-.394.385-.394 1.008 0 1.393.394.385 1.033.385 1.427 0 .947-.928 2.234-1.506 3.682-1.506 2.724 0 4.929 2.205 4.929 4.929s-2.205 4.929-4.929 4.929c-2.724 0-4.929-2.205-4.929-4.929 0-1.448.578-2.735 1.506-3.682.385-.394.385-1.033 0-1.427-.394-.394-1.008-.394-1.393 0C5.281 7.355 4.535 9.073 4.535 10.936c0 4.172 3.379 7.551 7.551 7.551s7.551-3.379 7.551-7.551S16.258 3.385 12.086 3.385z" />
        </svg>
        {isLoading === 'apple' ? 'Signing in...' : 'Continue with Apple'}
      </Button>

      <p className="text-xs text-gray-500 text-center mt-3">
        💡 Demo mode: Social login will create/login with demo accounts
      </p>
    </div>
  );
};

export default SocialLogin;
