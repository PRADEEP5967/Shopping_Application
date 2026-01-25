import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

import ChatHeader from './chat/ChatHeader';
import ChatMessage from './chat/ChatMessage';
import ChatInput from './chat/ChatInput';
import ChatQuickActions from './chat/ChatQuickActions';
import ChatTypingIndicator from './chat/ChatTypingIndicator';
import { useChatbot } from '@/hooks/useChatbot';

const ChatbotAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    isTyping,
    isSoundEnabled,
    sendMessage,
    handleQuickAction,
    clearMessages,
    toggleSound
  } = useChatbot();

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Track unread messages when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'bot') {
        setUnreadCount(prev => prev + 1);
      }
    }
  }, [messages, isOpen]);

  // Reset unread count when opening chat
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const renderedMessages = useMemo(() => (
    messages.map((message, index) => (
      <ChatMessage
        key={message.id}
        message={message}
        onSuggestionClick={handleSuggestionClick}
        isLatest={index === messages.length - 1 && message.sender === 'bot'}
      />
    ))
  ), [messages]);

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 rounded-full w-14 h-14 z-40",
          "bg-gradient-to-br from-primary to-accent shadow-lg",
          "hover:shadow-xl hover:scale-105 transition-all duration-300",
          "group"
        )}
        size="icon"
        aria-label="Open Chat Assistant"
      >
        <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs animate-bounce"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          <Card
            className={cn(
              "fixed z-50 flex flex-col overflow-hidden",
              "shadow-2xl border border-border/50",
              // Mobile: full screen from bottom
              "bottom-0 left-0 right-0 h-[85dvh] rounded-t-2xl",
              // Desktop: positioned bottom-right
              "sm:bottom-6 sm:right-6 sm:left-auto sm:h-[600px] sm:w-[400px] sm:rounded-2xl",
              // Animation
              "animate-in slide-in-from-bottom-4 duration-300"
            )}
          >
            {/* Header */}
            <ChatHeader
              onClose={() => setIsOpen(false)}
              onClear={clearMessages}
              isSoundEnabled={isSoundEnabled}
              onToggleSound={toggleSound}
            />

            {/* Quick Actions */}
            <div className="p-3 border-b border-border bg-muted/30">
              <ChatQuickActions onAction={handleQuickAction} />
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/20"
              style={{ minHeight: 0 }}
            >
              {renderedMessages}
              {isTyping && <ChatTypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <ChatInput 
              onSend={sendMessage}
              disabled={isTyping}
              placeholder="Type your message..."
            />
          </Card>
        </>
      )}
    </>
  );
};

export default ChatbotAssistant;
