
import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Headphones, 
  Truck, 
  RefreshCw 
} from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Lightning Fast",
    description: "Powered by Next.js and fully optimized with image, font, and code splitting strategies."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Secure Checkout",
    description: "Your payment and personal information is always secure with our advanced encryption."
  },
  {
    icon: <Headphones className="h-10 w-10 text-primary" />,
    title: "24/7 Support",
    description: "Our dedicated support team is ready to assist you anytime, day or night."
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: "Fast Delivery",
    description: "Free expedited shipping on orders over $50. Quick delivery to your doorstep."
  },
  {
    icon: <RefreshCw className="h-10 w-10 text-primary" />,
    title: "Easy Returns",
    description: "30-day easy return policy, hassle-free experience guaranteed."
  }
];

const PromoFeatures = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose NextCommerce?</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best online shopping experience with premium features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:bg-gray-50 transition duration-300">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoFeatures;
