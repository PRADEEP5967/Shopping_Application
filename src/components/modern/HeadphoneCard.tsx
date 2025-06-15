
import React from "react";
import { Headphones } from "lucide-react";

const headphoneImg =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80";

const HeadphoneCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-gradient-to-tr from-indigo-100 to-violet-100 rounded-full">
      <Headphones className="w-8 h-8 text-indigo-500" />
    </div>
    <img
      src={headphoneImg}
      alt="Headphone"
      className="w-24 h-24 object-cover rounded-xl mb-2 shadow-md"
      loading="lazy"
    />
    <h3 className="font-bold text-lg mb-1">Headphone</h3>
    <p className="text-gray-600 text-center text-sm">
      Enjoy immersive sound with our top-rated headphones for music lovers.
    </p>
  </div>
);

export default HeadphoneCard;

