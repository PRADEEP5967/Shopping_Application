
import React from "react";
import { Sofa } from "lucide-react";

const sofaImg =
  "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80";

const SofaCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-gradient-to-tr from-amber-100 to-orange-100 rounded-full">
      <Sofa className="w-8 h-8 text-amber-700" />
    </div>
    <img
      src={sofaImg}
      alt="Sofa"
      className="w-24 h-24 object-cover rounded-xl mb-2 shadow-md"
      loading="lazy"
    />
    <h3 className="font-bold text-lg mb-1">Sofa</h3>
    <p className="text-gray-600 text-center text-sm">
      Relax in comfort and style with our premium sofas for every home.
    </p>
  </div>
);

export default SofaCard;
