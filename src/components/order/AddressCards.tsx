
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, CreditCard } from 'lucide-react';

interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface PaymentMethod {
  type: string;
  last4: string;
  brand: string;
}

interface AddressCardsProps {
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  orderDate: Date;
}

const AddressCards: React.FC<AddressCardsProps> = ({ shippingAddress, paymentMethod, orderDate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <p className="font-medium">{shippingAddress.fullName}</p>
            <p>{shippingAddress.addressLine1}</p>
            {shippingAddress.addressLine2 && (
              <p>{shippingAddress.addressLine2}</p>
            )}
            <p>
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
            </p>
            <p>{shippingAddress.country}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <p className="font-medium">{paymentMethod.type}</p>
            <p>{paymentMethod.brand} ending in {paymentMethod.last4}</p>
            <p className="text-gray-600 mt-2">
              Charged on {orderDate.toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressCards;
