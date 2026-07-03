import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ActiveFilterChipsProps {
  priceRange: number[];
  defaultPriceRange?: number[];
  selectedBrands: string[];
  minRating: number;
  quickFilters: { inStock: boolean; onSale: boolean; highRated: boolean };
  onRemoveBrand: (brand: string) => void;
  onResetPrice: () => void;
  onResetRating: () => void;
  onToggleQuick: (key: 'inStock' | 'onSale' | 'highRated') => void;
  onClearAll: () => void;
}

const quickLabels: Record<string, string> = {
  inStock: 'In Stock',
  onSale: 'On Sale',
  highRated: '4★ & Above',
};

const Chip: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
  <Badge
    variant="secondary"
    className="pl-3 pr-1 py-1 gap-1 rounded-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors"
  >
    <span className="text-xs font-medium">{label}</span>
    <button
      onClick={onRemove}
      aria-label={`Remove ${label}`}
      className="ml-1 rounded-full p-0.5 hover:bg-primary/30 transition-colors"
    >
      <X className="h-3 w-3" />
    </button>
  </Badge>
);

const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  priceRange,
  defaultPriceRange = [0, 1000],
  selectedBrands,
  minRating,
  quickFilters,
  onRemoveBrand,
  onResetPrice,
  onResetRating,
  onToggleQuick,
  onClearAll,
}) => {
  const priceActive = priceRange[0] > defaultPriceRange[0] || priceRange[1] < defaultPriceRange[1];
  const anyActive =
    priceActive ||
    selectedBrands.length > 0 ||
    minRating > 0 ||
    Object.values(quickFilters).some(Boolean);

  if (!anyActive) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 p-3 rounded-xl bg-card/50 border border-border">
      <span className="text-xs uppercase tracking-wider text-muted-foreground mr-1">Active:</span>

      {priceActive && (
        <Chip label={`$${priceRange[0]} – $${priceRange[1]}`} onRemove={onResetPrice} />
      )}
      {minRating > 0 && (
        <Chip label={`${minRating}★ & up`} onRemove={onResetRating} />
      )}
      {selectedBrands.map((brand) => (
        <Chip key={brand} label={brand} onRemove={() => onRemoveBrand(brand)} />
      ))}
      {(Object.keys(quickFilters) as Array<keyof typeof quickFilters>).map((key) =>
        quickFilters[key] ? (
          <Chip key={key} label={quickLabels[key]} onRemove={() => onToggleQuick(key)} />
        ) : null,
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="ml-auto text-xs text-muted-foreground hover:text-foreground"
      >
        Clear all
      </Button>
    </div>
  );
};

export default ActiveFilterChips;