
import React from "react";
import { Heart } from "lucide-react";

const heartImg =
  "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=400&q=80";

const HeartCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-gradient-to-tr from-pink-100 to-red-100 rounded-full">
      <Heart className="w-8 h-8 text-red-500" />
    </div>
    <img
      src={heartImg}
      alt="Heart"
      className="w-24 h-24 object-cover rounded-xl mb-2 shadow-md"
      loading="lazy"
    />
    <h3 className="font-bold text-lg mb-1">Heart</h3>
    <p className="text-gray-600 text-center text-sm">
      Gifts and products made with love—spread happiness to your loved ones!
    </p>
  </div>
);

export default HeartCard;
