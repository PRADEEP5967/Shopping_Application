
import React from 'react';
import { Button } from '@/components/ui/button';
import { Package, SearchX, ArrowUpDown, Sliders, Lightbulb } from 'lucide-react';

interface NoProductsFoundProps {
  onClearFilters: () => void;
  onResetSort?: () => void;
  onBroadenPrice?: () => void;
}

const NoProductsFound: React.FC<NoProductsFoundProps> = ({
  onClearFilters,
  onResetSort,
  onBroadenPrice,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-4 text-center rounded-2xl border border-border bg-card/40">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-60 animate-pulse" />
        <div className="relative bg-primary/10 p-8 rounded-full border border-primary/30">
          <SearchX className="h-16 w-16 text-primary" strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-2 text-foreground">
        No products match your filters
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Don't worry — try one of the suggestions below to see more results.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mb-6">
        <button
          onClick={onClearFilters}
          className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
        >
          <Sliders className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Clear all filters</span>
          <span className="text-xs text-muted-foreground">
            Remove brands, ratings & quick filters
          </span>
        </button>

        {onBroadenPrice && (
          <button
            onClick={onBroadenPrice}
            className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
          >
            <Lightbulb className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Broaden price range</span>
            <span className="text-xs text-muted-foreground">
              Reset to $0 – $1000
            </span>
          </button>
        )}

        {onResetSort && (
          <button
            onClick={onResetSort}
            className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
          >
            <ArrowUpDown className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Change sort order</span>
            <span className="text-xs text-muted-foreground">
              Switch back to Featured
            </span>
          </button>
        )}
      </div>

      <Button onClick={onClearFilters} size="lg" className="gap-2">
        <Package className="h-4 w-4" />
        Reset & show all products
      </Button>
    </div>
  );
};

export default NoProductsFound;
