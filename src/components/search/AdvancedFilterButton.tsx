
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdvancedFilterButtonProps {
  onFilterClick: () => void;
}

const AdvancedFilterButton: React.FC<AdvancedFilterButtonProps> = ({ onFilterClick }) => {
  return (
    <div className="pt-2 border-t">
      <Button
        variant="outline"
        size="sm"
        onClick={onFilterClick}
        className="w-full justify-start"
      >
        <Filter className="h-4 w-4 mr-2" />
        Advanced Filters
      </Button>
    </div>
  );
};

export default AdvancedFilterButton;
