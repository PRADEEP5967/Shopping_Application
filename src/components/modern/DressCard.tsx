
import React from "react";
import { Shirt } from "lucide-react";

// There is no direct "dress" icon in lucide-react, so we'll use the "Shirt" icon.
// Image is a lifestyle shot representing a dress.
const dressImg =
  "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80";

const DressCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-gradient-to-tr from-red-100 to-pink-100 rounded-full">
      <Shirt className="w-8 h-8 text-red-400" />
    </div>
    <img
      src={dressImg}
      alt="Dress"
      className="w-24 h-24 object-cover rounded-xl mb-2 shadow-md"
      loading="lazy"
    />
    <h3 className="font-bold text-lg mb-1">Dress</h3>
    <p className="text-gray-600 text-center text-sm">
      Elegant dresses to elevate your look for any occasion.
    </p>
  </div>
);

export default DressCard;
