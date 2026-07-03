import React, { useEffect, useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export type AppliedCoupon = { code: string; percent: number; label: string };

const COUPONS: Record<string, AppliedCoupon> = {
  WELCOME10: { code: 'WELCOME10', percent: 10, label: '10% off — welcome offer' },
  SAVE20: { code: 'SAVE20', percent: 20, label: '20% off orders' },
  FLAT30: { code: 'FLAT30', percent: 30, label: '30% off — mega saver' },
};

const KEY = 'applied-coupon';

export const getAppliedCoupon = (): AppliedCoupon | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AppliedCoupon) : null;
  } catch {
    return null;
  }
};

interface Props {
  onChange?: (coupon: AppliedCoupon | null) => void;
}

const CouponSection: React.FC<Props> = ({ onChange }) => {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState<AppliedCoupon | null>(null);

  useEffect(() => {
    const existing = getAppliedCoupon();
    if (existing) {
      setApplied(existing);
      onChange?.(existing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apply = () => {
    const key = code.trim().toUpperCase();
    const found = COUPONS[key];
    if (!found) {
      toast.error('Invalid coupon code');
      return;
    }
    localStorage.setItem(KEY, JSON.stringify(found));
    setApplied(found);
    onChange?.(found);
    toast.success(`Coupon ${found.code} applied`);
  };

  const remove = () => {
    localStorage.removeItem(KEY);
    setApplied(null);
    onChange?.(null);
  };

  return (
    <div className="rounded-lg border border-border p-4 space-y-3 bg-card/60">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Tag className="w-4 h-4 text-primary" />
        Apply Coupon
      </div>
      {applied ? (
        <div className="flex items-center justify-between rounded-md bg-primary/10 border border-primary/30 px-3 py-2">
          <div className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-primary" />
            <span className="font-semibold">{applied.code}</span>
            <span className="text-muted-foreground">— {applied.label}</span>
          </div>
          <Button size="icon" variant="ghost" onClick={remove} aria-label="Remove coupon">
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter code (try WELCOME10)"
            onKeyDown={(e) => e.key === 'Enter' && apply()}
          />
          <Button onClick={apply} variant="secondary">
            Apply
          </Button>
        </div>
      )}
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
        Try: WELCOME10 · SAVE20 · FLAT30
      </div>
    </div>
  );
};

export default CouponSection;