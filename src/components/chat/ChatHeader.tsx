import React from 'react';
import { Button } from '@/components/ui/button';
import { Bot, X, Minimize2, Trash2, Volume2, VolumeX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize?: () => void;
  onClear: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  isOnline?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onClose, 
  onMinimize, 
  onClear,
  isSoundEnabled,
  onToggleSound,
  isOnline = true
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-card to-card/80">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${isOnline ? 'bg-green-500' : 'bg-muted'}`} />
        </div>
        <div>
          <h3 className="font-semibold text-sm">Shopping Assistant</h3>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
            <span className="text-[10px] text-muted-foreground">Typically replies instantly</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSound}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
        >
          {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          aria-label="Clear chat"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        {onMinimize && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMinimize}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            aria-label="Minimize"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
