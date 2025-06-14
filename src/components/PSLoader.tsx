
import React from 'react';

const PSLoader: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[200px] py-10 ${className}`}>
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" aria-label="Loading" />
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary select-none pointer-events-none">
          PS
        </span>
      </div>
      <span className="mt-4 text-primary font-semibold text-base tracking-wide animate-pulse">
        Loading...
      </span>
    </div>
  );
};

export default PSLoader;
