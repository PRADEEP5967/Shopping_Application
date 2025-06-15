
import React from "react";
import { Shirt } from "lucide-react";

const shirtImg =
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80";

const ShirtCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-full">
      <Shirt className="w-8 h-8 text-pink-500" />
    </div>
    <img
      src={shirtImg}
      alt="Shirt"
      className="w-24 h-24 object-cover rounded-xl mb-2 shadow-md"
      loading="lazy"
    />
    <h3 className="font-bold text-lg mb-1">Shirt</h3>
    <p className="text-gray-600 text-center text-sm">
      Discover our premium shirts—crafted for comfort and style.
    </p>
  </div>
);

export default ShirtCard;
