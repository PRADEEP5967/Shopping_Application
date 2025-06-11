
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tag, Gift, Percent } from 'lucide-react';
import { toast } from 'sonner';

interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minPurchase?: number;
  maxDiscount?: number;
  expiresAt: string;
  isActive: boolean;
}

const CouponSystem: React.FC = () => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Sample coupons - in a real app, these would come from your backend
  const availableCoupons: Coupon[] = [
    {
      code: 'WELCOME10',
      discount: 10,
      type: 'percentage',
      minPurchase: 50,
      expiresAt: '2024-12-31',
      isActive: true,
    },
    {
      code: 'SAVE20',
      discount: 20,
      type: 'fixed',
      minPurchase: 100,
      expiresAt: '2024-12-31',
      isActive: true,
    },
    {
      code: 'FREESHIP',
      discount: 0,
      type: 'fixed',
      expiresAt: '2024-12-31',
      isActive: true,
    },
  ];

  const applyCoupon = () => {
    const coupon = availableCoupons.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase() && c.isActive
    );

    if (coupon) {
      setAppliedCoupon(coupon);
      toast.success(`Coupon "${coupon.code}" applied successfully!`);
    } else {
      toast.error('Invalid or expired coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.success('Coupon removed');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Discount Codes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!appliedCoupon ? (
          <div className="flex gap-2">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1"
            />
            <Button onClick={applyCoupon} disabled={!couponCode.trim()}>
              Apply
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-green-600" />
              <span className="font-medium">{appliedCoupon.code}</span>
              <Badge variant="secondary">
                {appliedCoupon.type === 'percentage' ? (
                  <>
                    <Percent className="w-3 h-3 mr-1" />
                    {appliedCoupon.discount}% off
                  </>
                ) : (
                  `$${appliedCoupon.discount} off`
                )}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={removeCoupon}>
              Remove
            </Button>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-sm font-medium">Available Coupons:</p>
          {availableCoupons.map((coupon) => (
            <div
              key={coupon.code}
              className="flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setCouponCode(coupon.code);
                applyCoupon();
              }}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">{coupon.code}</span>
                <Badge variant="outline">
                  {coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                Apply
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CouponSystem;
