
import React from "react";
import { Smartphone } from "lucide-react";

const smartphoneImg =
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=80";

const SmartphoneCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full">
      <Smartphone className="w-8 h-8 text-blue-500" />
    </div>
    <img
      src={smartphoneImg}
      alt="Smartphone"
      className="w-24 h-24 object-cover rounded-xl mb-2 shadow-md"
      loading="lazy"
    />
    <h3 className="font-bold text-lg mb-1">Smartphone</h3>
    <p className="text-gray-600 text-center text-sm">
      Experience sleek design and fast performance in our latest smartphones.
    </p>
  </div>
);

export default SmartphoneCard;
