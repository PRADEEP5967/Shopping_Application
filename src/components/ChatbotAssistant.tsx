
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, User, Bot, ShoppingCart, Package, HelpCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const ChatbotAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your shopping assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ['Find products', 'Track my order', 'Return policy', 'Size guide']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: ShoppingCart, label: 'Find Products', action: 'find-products' },
    { icon: Package, label: 'Track Order', action: 'track-order' },
    { icon: HelpCircle, label: 'Get Help', action: 'get-help' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = {
      id: Date.now().toString(),
      text: '',
      sender: 'bot' as const,
      timestamp: new Date(),
      suggestions: [] as string[]
    };

    if (lowerMessage.includes('find') || lowerMessage.includes('product') || lowerMessage.includes('search')) {
      response.text = 'I can help you find the perfect product! What are you looking for today? You can search by category, brand, or specific features.';
      response.suggestions = ['Electronics', 'Clothing', 'Shoes', 'Accessories'];
    } else if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
      response.text = 'To track your order, please provide your order number. You can find it in your confirmation email or account dashboard.';
      response.suggestions = ['Check order status', 'View order history', 'Cancel order'];
    } else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      response.text = 'Our return policy allows returns within 30 days of purchase. Items must be in original condition. Would you like to start a return?';
      response.suggestions = ['Start return', 'Return policy', 'Refund status'];
    } else if (lowerMessage.includes('size') || lowerMessage.includes('fit')) {
      response.text = 'I can help you find the right size! Check our size guide or tell me what product you\'re interested in for specific sizing information.';
      response.suggestions = ['Size guide', 'Fit recommendations', 'Exchange policy'];
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('card')) {
      response.text = 'We accept all major credit cards, PayPal, and digital wallets. All payments are secured with SSL encryption. Need help with payment?';
      response.suggestions = ['Payment methods', 'Billing issues', 'Security info'];
    } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      response.text = 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days, express delivery 1-2 days. What would you like to know?';
      response.suggestions = ['Shipping rates', 'Delivery time', 'Express shipping'];
    } else {
      response.text = 'I\'m here to help! You can ask me about products, orders, returns, sizing, or any other questions about shopping with us.';
      response.suggestions = ['Browse products', 'Check order', 'Customer support', 'FAQ'];
    }

    return response;
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    sendMessage();
  };

  const handleQuickAction = (action: string) => {
    let message = '';
    switch (action) {
      case 'find-products':
        message = 'I want to find products';
        break;
      case 'track-order':
        message = 'I need to track my order';
        break;
      case 'get-help':
        message = 'I need help';
        break;
    }
    setInputValue(message);
    sendMessage();
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-40"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">Shopping Assistant</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.action}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.action)}
                  className="text-xs"
                >
                  <action.icon className="h-3 w-3 mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left text-xs bg-white border border-gray-200 rounded px-2 py-1 hover:bg-gray-50 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className={`flex items-end ${message.sender === 'user' ? 'order-2 ml-2' : 'order-1 mr-2'}`}>
                    {message.sender === 'user' ? (
                      <User className="h-6 w-6 text-gray-400" />
                    ) : (
                      <Bot className="h-6 w-6 text-blue-500" />
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-6 w-6 text-blue-500" />
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatbotAssistant;
