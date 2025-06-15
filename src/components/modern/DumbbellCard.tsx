
import React from "react";
import { Dumbbell } from "lucide-react";

const dumbbellImg =
  "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=400&q=80";

const DumbbellCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-gradient-to-tr from-gray-200 to-blue-100 rounded-full">
      <Dumbbell className="w-8 h-8 text-blue-700" />
    </div>
    <img
      src={dumbbellImg}
      alt="Dumbbell"
      className="w-24 h-24 object-cover rounded-xl mb-2 shadow-md"
      loading="lazy"
    />
    <h3 className="font-bold text-lg mb-1">Dumbbell</h3>
    <p className="text-gray-600 text-center text-sm">
      Get fit at home with quality dumbbells for all workout levels.
    </p>
  </div>
);

export default DumbbellCard;
