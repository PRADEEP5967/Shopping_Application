
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Weight, Ruler, Truck, MapPin } from 'lucide-react';
import { type PackageDetails as PackageDetailsType } from '@/services/carrierService';

interface PackageDetailsProps {
  packageDetails: PackageDetailsType;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ packageDetails }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Package Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Weight className="w-4 h-4" />
            <div>
              <div className="text-gray-500">Weight</div>
              <div className="font-medium">{packageDetails.weight}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4" />
            <div>
              <div className="text-gray-500">Dimensions</div>
              <div className="font-medium">{packageDetails.dimensions}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <div>
              <div className="text-gray-500">Service</div>
              <div className="font-medium">{packageDetails.service}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <div>
              <div className="text-gray-500">From</div>
              <div className="font-medium">{packageDetails.from}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageDetails;
