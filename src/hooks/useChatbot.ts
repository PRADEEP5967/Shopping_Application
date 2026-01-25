import { useState, useCallback, useEffect } from 'react';
import { Message } from '@/components/chat/ChatMessage';

const STORAGE_KEY = 'ps_chatbot_messages';
const SOUND_KEY = 'ps_chatbot_sound';

// Enhanced response generator with more context-aware responses
const generateBotResponse = (userMessage: string): Omit<Message, 'id' | 'timestamp'> => {
  const lowerMessage = userMessage.toLowerCase();

  // Product-related queries
  if (lowerMessage.includes('find') || lowerMessage.includes('product') || lowerMessage.includes('search') || lowerMessage.includes('looking for')) {
    return {
      text: "I'd love to help you find the perfect product! 🛍️ What category are you interested in? I can help you with electronics, clothing, shoes, accessories, and much more.",
      sender: 'bot',
      suggestions: ['Electronics', 'Clothing', 'Shoes', 'Furniture', 'View All Categories'],
      status: 'delivered'
    };
  }

  // Order tracking
  if (lowerMessage.includes('order') || lowerMessage.includes('track') || lowerMessage.includes('delivery') || lowerMessage.includes('shipping status')) {
    return {
      text: "I can help you track your order! 📦 Please provide your order number (found in your confirmation email) or visit your account dashboard to see all orders.",
      sender: 'bot',
      suggestions: ['View Order History', 'Track Order', 'Contact Support'],
      status: 'delivered'
    };
  }

  // Returns and refunds
  if (lowerMessage.includes('return') || lowerMessage.includes('refund') || lowerMessage.includes('exchange')) {
    return {
      text: "Our hassle-free return policy allows returns within 30 days of purchase. Items must be in original condition with tags attached. Would you like to start a return?",
      sender: 'bot',
      suggestions: ['Start Return', 'Return Policy Details', 'Exchange Item', 'Check Refund Status'],
      status: 'delivered'
    };
  }

  // Sizing
  if (lowerMessage.includes('size') || lowerMessage.includes('fit') || lowerMessage.includes('measurement')) {
    return {
      text: "Finding the right size is important! 📏 Each product has a detailed size guide. Tell me what product you're interested in, and I'll provide specific sizing recommendations.",
      sender: 'bot',
      suggestions: ['Size Guide', 'Fit Recommendations', 'Measurement Help'],
      status: 'delivered'
    };
  }

  // Payment
  if (lowerMessage.includes('payment') || lowerMessage.includes('card') || lowerMessage.includes('pay') || lowerMessage.includes('checkout')) {
    return {
      text: "We accept all major payment methods! 💳 Credit/debit cards, PayPal, Apple Pay, Google Pay, and more. All transactions are secured with 256-bit SSL encryption.",
      sender: 'bot',
      suggestions: ['Payment Methods', 'Billing Issue', 'Apply Coupon', 'Security Info'],
      status: 'delivered'
    };
  }

  // Shipping
  if (lowerMessage.includes('shipping') || lowerMessage.includes('deliver')) {
    return {
      text: "Great news - we offer FREE shipping on orders over $50! 🚚\n\n• Standard: 3-5 business days\n• Express: 1-2 business days\n• Same Day: Available in select areas",
      sender: 'bot',
      suggestions: ['Shipping Rates', 'Delivery Times', 'Express Shipping', 'International Shipping'],
      status: 'delivered'
    };
  }

  // Deals and offers
  if (lowerMessage.includes('deal') || lowerMessage.includes('discount') || lowerMessage.includes('offer') || lowerMessage.includes('sale') || lowerMessage.includes('coupon')) {
    return {
      text: "Looking for great deals? 🎉 Check out our current promotions! We have flash sales, clearance items, and exclusive member discounts available.",
      sender: 'bot',
      suggestions: ['Flash Sales', 'Clearance Items', 'Apply Coupon', 'Member Deals'],
      status: 'delivered'
    };
  }

  // Account
  if (lowerMessage.includes('account') || lowerMessage.includes('login') || lowerMessage.includes('sign up') || lowerMessage.includes('password')) {
    return {
      text: "I can help with your account! 👤 You can manage your profile, view order history, save favorites, and more from your account dashboard.",
      sender: 'bot',
      suggestions: ['Login', 'Create Account', 'Reset Password', 'Account Settings'],
      status: 'delivered'
    };
  }

  // Contact/Help
  if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('contact') || lowerMessage.includes('speak')) {
    return {
      text: "I'm here to help! 🤝 If you need additional assistance, you can:\n\n• Chat with me anytime\n• Email: support@example.com\n• Call: 1-800-XXX-XXXX\n• Live agent (9 AM - 9 PM)",
      sender: 'bot',
      suggestions: ['Contact Support', 'FAQ', 'Live Agent', 'Email Us'],
      status: 'delivered'
    };
  }

  // Greetings
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
    return {
      text: "Hello! 👋 Welcome to our store! I'm your shopping assistant. How can I help you today?",
      sender: 'bot',
      suggestions: ['Browse Products', 'Track Order', 'Get Deals', 'Help Center'],
      status: 'delivered'
    };
  }

  // Thanks
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return {
      text: "You're welcome! 😊 Is there anything else I can help you with?",
      sender: 'bot',
      suggestions: ['Browse Products', 'Continue Shopping', 'That\'s All'],
      status: 'delivered'
    };
  }

  // Default response
  return {
    text: "I'm your shopping assistant and I'm here to help! 🛒 I can assist you with:\n\n• Finding products\n• Tracking orders\n• Returns & refunds\n• Sizing help\n• Payment questions\n• And much more!",
    sender: 'bot',
    suggestions: ['Find Products', 'Track Order', 'Returns', 'Size Guide', 'Contact Support'],
    status: 'delivered'
  };
};

const getActionMessage = (action: string): string => {
  const actionMessages: Record<string, string> = {
    'find-products': 'I want to find products',
    'track-order': 'I need to track my order',
    'shipping-info': 'Tell me about shipping options',
    'returns': 'I have a question about returns',
    'payment': 'I need help with payment',
    'get-help': 'I need help'
  };
  return actionMessages[action] || 'I need help';
};

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const saved = localStorage.getItem(SOUND_KEY);
    return saved !== 'false';
  });

  // Load messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
      }
    }

    // Add welcome message if no messages
    if (!saved || JSON.parse(saved).length === 0) {
      setMessages([{
        id: '1',
        text: "Hi! 👋 I'm your shopping assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ['Find Products', 'Track Order', 'Today\'s Deals', 'Help Center'],
        status: 'delivered'
      }]);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Save sound preference
  useEffect(() => {
    localStorage.setItem(SOUND_KEY, String(isSoundEnabled));
  }, [isSoundEnabled]);

  const playSound = useCallback(() => {
    if (isSoundEnabled) {
      // Simple notification sound (could be replaced with actual audio)
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch {
        // Audio not supported
      }
    }
  }, [isSoundEnabled]);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay (500-1500ms based on response length)
    const delay = 500 + Math.random() * 1000;
    
    await new Promise(resolve => setTimeout(resolve, delay));

    const botResponse = generateBotResponse(text);
    const botMessage: Message = {
      ...botResponse,
      id: (Date.now() + 1).toString(),
      timestamp: new Date()
    };

    setMessages(prev => 
      prev.map(m => m.id === userMessage.id ? { ...m, status: 'delivered' as const } : m)
        .concat(botMessage)
    );
    setIsTyping(false);
    playSound();
  }, [playSound]);

  const handleQuickAction = useCallback((action: string) => {
    const message = getActionMessage(action);
    sendMessage(message);
  }, [sendMessage]);

  const clearMessages = useCallback(() => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: "Chat cleared! 🧹 How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ['Find Products', 'Track Order', 'Today\'s Deals', 'Help Center'],
      status: 'delivered'
    };
    setMessages([welcomeMessage]);
  }, []);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => !prev);
  }, []);

  return {
    messages,
    isTyping,
    isSoundEnabled,
    sendMessage,
    handleQuickAction,
    clearMessages,
    toggleSound
  };
}
