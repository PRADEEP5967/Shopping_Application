
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

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
  <div className="w-72 max-w-xs rounded-2xl shadow-xl bg-gradient-to-tr from-white via-blue-50 to-blue-100 border border-blue-200 p-5 space-y-2">
    <div className="flex items-center gap-2 mb-1">
      <Icon className="w-6 h-6 text-blue-600" />
      <Badge variant="outline" className="ml-1">{label}</Badge>
    </div>
    <img
      src={image}
      alt={label}
      className="w-full h-28 object-cover rounded-xl mb-2 border border-blue-100"
      loading="lazy"
    />
    <p className="text-sm text-gray-700 mb-2">{description}</p>
    <ul className="list-disc list-inside text-xs text-blue-800/80 space-y-1 mb-2">
      {highlights.map((h) => (
        <li key={h}>{h}</li>
      ))}
    </ul>
    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg mt-1">
      <Link to={link}>
        View {label}
      </Link>
    </Button>
  </div>
);

export default CategoryPopoverContent;
