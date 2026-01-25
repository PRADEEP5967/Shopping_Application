import React, { memo } from 'react';
import { User, Bot, Check, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

interface ChatMessageProps {
  message: Message;
  onSuggestionClick: (suggestion: string) => void;
  isLatest?: boolean;
}

const ChatMessage = memo(({ message, onSuggestionClick, isLatest }: ChatMessageProps) => {
  const isUser = message.sender === 'user';
  
  return (
    <div
      className={cn(
        "flex gap-3 animate-in slide-in-from-bottom-2 duration-300",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-gradient-to-br from-primary/20 to-accent/20 text-primary"
      )}>
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn("flex flex-col max-w-[75%]", isUser && "items-end")}>
        <div
          className={cn(
            "px-4 py-3 rounded-2xl shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-md"
              : "bg-card border border-border rounded-tl-md"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>

        {/* Timestamp & Status */}
        <div className={cn(
          "flex items-center gap-1 mt-1 text-[10px] text-muted-foreground",
          isUser && "flex-row-reverse"
        )}>
          <span>{format(new Date(message.timestamp), 'HH:mm')}</span>
          {isUser && message.status && (
            <span className="flex items-center">
              {message.status === 'sending' && <span className="w-3 h-3 animate-pulse">○</span>}
              {message.status === 'sent' && <Check className="h-3 w-3" />}
              {(message.status === 'delivered' || message.status === 'read') && (
                <CheckCheck className={cn("h-3 w-3", message.status === 'read' && "text-primary")} />
              )}
            </span>
          )}
        </div>

        {/* Suggestions */}
        {message.suggestions && message.suggestions.length > 0 && isLatest && (
          <div className="flex flex-wrap gap-2 mt-3">
            {message.suggestions.map((suggestion, index) => (
              <button
                key={`${message.id}-suggestion-${index}`}
                onClick={() => onSuggestionClick(suggestion)}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-full border border-primary/30",
                  "bg-primary/5 text-primary hover:bg-primary/10",
                  "transition-all duration-200 hover:scale-105 active:scale-95"
                )}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
