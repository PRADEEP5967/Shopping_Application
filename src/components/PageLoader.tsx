import React from 'react';
import { Loader2 } from 'lucide-react';

interface PageLoaderProps {
  message?: string;
  className?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  message = 'Loading...', 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[50vh] py-16 ${className}`}>
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 animate-pulse" />
        </div>
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-primary animate-spin" style={{ animationDirection: 'reverse' }} />
        </div>
      </div>
      
      <p className="mt-6 text-muted-foreground font-medium text-sm animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default PageLoader;
