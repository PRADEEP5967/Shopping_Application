import { Skeleton } from './skeleton';
import { Card, CardContent, CardFooter } from './card';

// Product Card Skeleton
export const ProductCardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="w-full aspect-square" />
    <CardContent className="p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Skeleton className="h-10 w-full" />
    </CardFooter>
  </Card>
);

// Product Grid Skeleton
export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

// Product Detail Skeleton
export const ProductDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Image Gallery */}
      <div className="space-y-4">
        <Skeleton className="w-full aspect-square rounded-lg" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-20 h-20 rounded-md" />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-20 w-full" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Category Card Skeleton
export const CategoryCardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="w-full aspect-video" />
    <CardContent className="p-4 space-y-2">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </CardContent>
  </Card>
);

// Category Grid Skeleton
export const CategoryGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <CategoryCardSkeleton key={i} />
    ))}
  </div>
);

// Cart Item Skeleton
export const CartItemSkeleton = () => (
  <div className="flex gap-4 p-4 border-b border-border">
    <Skeleton className="w-20 h-20 rounded-md" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  </div>
);

// Order Summary Skeleton
export const OrderSummarySkeleton = () => (
  <div className="space-y-4 p-6">
    <Skeleton className="h-6 w-32" />
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
    <div className="border-t border-border pt-4">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
    <Skeleton className="h-12 w-full" />
  </div>
);

// Hero Skeleton
export const HeroSkeleton = () => (
  <div className="relative w-full h-[60vh] min-h-[400px]">
    <Skeleton className="absolute inset-0" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center space-y-4 max-w-2xl px-4">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <Skeleton className="h-12 w-40 mx-auto" />
      </div>
    </div>
  </div>
);

// Table Row Skeleton
export const TableRowSkeleton = ({ columns = 5 }: { columns?: number }) => (
  <tr className="border-b border-border">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="p-4">
        <Skeleton className="h-4 w-full" />
      </td>
    ))}
  </tr>
);

// Page Header Skeleton
export const PageHeaderSkeleton = () => (
  <div className="space-y-2 mb-8">
    <Skeleton className="h-10 w-1/3" />
    <Skeleton className="h-5 w-1/2" />
  </div>
);
