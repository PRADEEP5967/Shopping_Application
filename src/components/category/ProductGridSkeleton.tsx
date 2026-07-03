import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridSkeletonProps {
  count?: number;
  viewMode?: 'grid' | 'list';
}

const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({ count = 10, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-lg bg-card/50 border border-border">
            <Skeleton className="h-24 w-24 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl bg-card/50 border border-border overflow-hidden">
          <Skeleton className="aspect-square w-full rounded-none" />
          <div className="p-3 space-y-2">
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-3 w-2/3" />
            <div className="flex items-center gap-2 pt-1">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-3 w-10" />
            </div>
            <Skeleton className="h-8 w-full mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;