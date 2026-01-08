
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { GripVertical, X, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DraggableWidgetProps {
  id: string;
  children: React.ReactNode;
  title?: string;
  isEditMode: boolean;
  onRemove?: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  className?: string;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  id,
  children,
  title,
  isEditMode,
  onRemove,
  isExpanded,
  onToggleExpand,
  className
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group',
        isDragging && 'z-50 opacity-90',
        isExpanded && 'col-span-full',
        className
      )}
    >
      {isEditMode && (
        <div className="absolute -top-2 -right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onToggleExpand && (
            <Button
              size="icon"
              variant="secondary"
              className="h-7 w-7 rounded-full shadow-lg"
              onClick={onToggleExpand}
            >
              {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
            </Button>
          )}
          {onRemove && (
            <Button
              size="icon"
              variant="destructive"
              className="h-7 w-7 rounded-full shadow-lg"
              onClick={onRemove}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
      
      <Card 
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          isEditMode && 'ring-2 ring-dashed ring-primary/30 hover:ring-primary/50',
          isDragging && 'shadow-2xl scale-[1.02] ring-primary'
        )}
      >
        {isEditMode && (
          <div
            {...attributes}
            {...listeners}
            className="absolute top-3 left-3 z-10 cursor-grab active:cursor-grabbing p-1.5 rounded-lg bg-muted/80 hover:bg-muted transition-colors"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        <div className={cn(isEditMode && 'pl-10')}>
          {children}
        </div>
      </Card>
    </div>
  );
};

export default DraggableWidget;
