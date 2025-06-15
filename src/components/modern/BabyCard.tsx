
import React from "react";
import { Baby } from "lucide-react";

// Baby clothing or collection icon. (lucide-react "baby")
// Placeholder image of a baby/kitten for a gentle touch.
const babyImg =
  "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=400&q=80";

const BabyCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-gradient-to-tr from-blue-100 to-emerald-100 rounded-full">
      <Baby className="w-8 h-8 text-blue-400" />
    </div>
    <img
      src={babyImg}
      alt="Baby"
      className="w-24 h-24 object-cover rounded-xl mb-2 shadow-md"
      loading="lazy"
    />
    <h3 className="font-bold text-lg mb-1">Baby</h3>
    <p className="text-gray-600 text-center text-sm">
      Soft, adorable clothing and essentials for your little ones.
    </p>
  </div>
);

export default BabyCard;
