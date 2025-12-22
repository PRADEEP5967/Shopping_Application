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
      className="xl:hidden p-1.5 sm:p-2 min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] hover:bg-muted text-foreground"
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={isMenuOpen}
    >
      {isMenuOpen ? (
        <X className="h-5 w-5" />
      ) : (
        <Menu className="h-5 w-5" />
      )}
    </Button>
  );
};

export default MobileMenuButton;
