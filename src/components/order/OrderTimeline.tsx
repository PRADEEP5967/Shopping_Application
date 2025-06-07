
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle } from 'lucide-react';

interface TimelineEvent {
  status: string;
  date: Date;
  completed: boolean;
}

interface OrderTimelineProps {
  timeline: TimelineEvent[];
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ timeline }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Order Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((event, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                event.completed ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {event.completed ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Clock className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                  {event.status}
                </h4>
                <p className="text-sm text-gray-500">
                  {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTimeline;
