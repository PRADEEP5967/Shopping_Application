
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleMenu}
      className="xl:hidden p-2 sm:p-2.5 touch-target min-h-[44px] min-w-[44px]"
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={isMenuOpen}
    >
      {isMenuOpen ? (
        <X className="h-5 w-5 sm:h-6 sm:w-6" />
      ) : (
        <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
      )}
    </Button>
  );
};

export default MobileMenuButton;
