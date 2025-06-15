
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, ExternalLink } from 'lucide-react';

interface TrackingActionsProps {
  carrier: string;
}

const TrackingActions: React.FC<TrackingActionsProps> = ({ carrier }) => {
  return (
    <div className="flex flex-wrap gap-2 pt-4 border-t">
      <Button variant="outline" size="sm">
        <Phone className="w-4 h-4 mr-1" />
        Contact Carrier
      </Button>
      <Button variant="outline" size="sm">
        <ExternalLink className="w-4 h-4 mr-1" />
        Track on {carrier}
      </Button>
      <Button variant="outline" size="sm">
        Report Issue
      </Button>
      <Button variant="outline" size="sm">
        Share Tracking
      </Button>
    </div>
  );
};

export default TrackingActions;
