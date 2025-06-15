
import React from "react";
import { Tv } from "lucide-react";

const tvImg =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80";

const TVCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-gradient-to-tr from-slate-100 to-blue-200 rounded-full">
      <Tv className="w-8 h-8 text-blue-900" />
    </div>
    <img
      src={tvImg}
      alt="TV"
      className="w-24 h-24 object-cover rounded-xl mb-2 shadow-md"
      loading="lazy"
    />
    <h3 className="font-bold text-lg mb-1">TV</h3>
    <p className="text-gray-600 text-center text-sm">
      Smart TVs with crisp displays and smart features for your living room.
    </p>
  </div>
);

export default TVCard;
