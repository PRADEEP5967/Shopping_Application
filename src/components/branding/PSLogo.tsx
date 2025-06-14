
import React from 'react';

/**
 * Modern PS logo: circular badge, "PS" initials, gradient + accent.
 * Easily resizable, suitable for Navbar, Sidebar, etc.
 */
const PSLogo: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = '' }) => {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full shadow-md bg-gradient-to-tr from-primary to-cyan-500 ${className}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      aria-label="Pradeep Sahani Mart Logo"
    >
      <span className="text-white text-xl font-bold tracking-tight drop-shadow-md select-none">
        PS
      </span>
      {/* Accent circle */}
      <span className="absolute bottom-1 right-1 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
    </div>
  );
};

export default PSLogo;
