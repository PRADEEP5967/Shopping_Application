
import React from "react";
import { Monitor } from "lucide-react";

const monitorImg =
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80";

const MonitorCard = () => (
  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
    <div className="w-20 h-20 mb-3 flex items-center justify-center bg-gradient-to-tr from-gray-100 to-blue-100 rounded-full">
      <Monitor className="w-8 h-8 text-gray-700" />
    </div>
    <img
      src={monitorImg}
      alt="Monitor"
      className="w-24 h-24 object-cover rounded-xl mb-2 shadow-md"
      loading="lazy"
    />
    <h3 className="font-bold text-lg mb-1">Monitor</h3>
    <p className="text-gray-600 text-center text-sm">
      Enjoy crisp visuals and true color accuracy on our modern monitors.
    </p>
  </div>
);

export default MonitorCard;
