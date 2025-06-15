
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { LucideIcon, ArrowRight, Star, X } from "lucide-react";

interface CategoryPopoverContentProps {
  label: string;
  icon: LucideIcon;
  image: string;
  description: string;
  link: string;
  highlights: string[];
}

const CategoryPopoverContent: React.FC<CategoryPopoverContentProps> = ({
  label,
  icon: Icon,
  image,
  description,
  link,
  highlights,
}) => (
  <div className="w-80 max-w-sm rounded-2xl shadow-2xl bg-white border border-gray-200 overflow-hidden transform transition-all duration-300 hover:scale-105">
    {/* Header with gradient */}
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-4">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative flex items-center gap-3 text-white">
        <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{label}</h3>
          <Badge className="bg-white/20 text-white border-white/30 text-xs">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        </div>
      </div>
    </div>

    {/* Image with overlay and remove icon */}
    <div className="relative h-32 overflow-hidden group">
      <img
        src={image}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      {/* Remove image icon */}
      <button className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 hover:scale-100">
        <X className="w-3 h-3" />
      </button>
    </div>

    {/* Content */}
    <div className="p-5 space-y-4">
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      
      {/* Highlights with modern styling */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wide">Key Features</h4>
        <div className="grid grid-cols-2 gap-2">
          {highlights.map((highlight, index) => (
            <div key={highlight} className="flex items-center space-x-2 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-gray-700">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
        <Link to={link} className="flex items-center justify-center">
          <span>Explore {label}</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  </div>
);

export default CategoryPopoverContent;
