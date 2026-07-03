import React, { useState } from 'react';
import { MapPin, Truck, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PincodeCheck: React.FC = () => {
  const [pin, setPin] = useState('');
  const [result, setResult] = useState<null | {
    ok: boolean;
    eta?: string;
    cod?: boolean;
  }>(null);

  const check = () => {
    const clean = pin.trim();
    if (!/^\d{5,6}$/.test(clean)) {
      setResult({ ok: false });
      return;
    }
    // Deterministic pseudo-result from pincode
    const hash = clean.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const days = 2 + (hash % 5);
    const cod = hash % 2 === 0;
    const eta = new Date(Date.now() + days * 86400000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    setResult({ ok: true, eta, cod });
  };

  return (
    <div className="rounded-lg border border-border bg-card/60 p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <MapPin className="w-4 h-4 text-primary" />
        Check delivery availability
      </div>
      <div className="flex gap-2">
        <Input
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="Enter pincode"
          className="max-w-[180px]"
          onKeyDown={(e) => e.key === 'Enter' && check()}
        />
        <Button onClick={check} variant="secondary">
          Check
        </Button>
      </div>
      {result && (
        <div className="text-sm">
          {result.ok ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-primary">
                <Check className="w-4 h-4" />
                <Truck className="w-4 h-4" />
                Delivery by <span className="font-semibold">{result.eta}</span>
              </div>
              <div className="text-muted-foreground text-xs">
                {result.cod ? 'Cash on Delivery available' : 'Prepaid orders only'}
                {' · Free shipping over $50'}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-destructive">
              <X className="w-4 h-4" /> Enter a valid 5–6 digit pincode
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PincodeCheck;