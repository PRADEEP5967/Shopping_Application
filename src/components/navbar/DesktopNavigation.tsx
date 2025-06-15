
import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Define the main navigation links, each with a label, href, image, and border color.
 * You can adjust/add more if desired.
 */
const NAV_LINKS = [
  {
    label: "Smartphone",
    href: "/category/smartphone",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=80",
    borderColor: "border-blue-400"
  },
  {
    label: "Monitor",
    href: "/category/monitor",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
    borderColor: "border-green-400"
  },
  {
    label: "Shirt",
    href: "/category/shirt",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
    borderColor: "border-rose-400"
  },
  // Add more if you like...
];

const DesktopNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center gap-6">
      {NAV_LINKS.map(link => {
        const isActive = location.pathname.startsWith(link.href);
        return (
          <Link
            key={link.label}
            to={link.href}
            className={`flex flex-col items-center group transition cursor-pointer`}
            aria-label={link.label}
          >
            <div 
              className={`w-12 h-12 mb-1 rounded-full overflow-hidden border-2 ${link.borderColor} bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}
            >
              <img 
                src={link.image} 
                alt={link.label} 
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
            <span className={`text-xs font-semibold ${isActive ? "text-primary" : "text-gray-700"} group-hover:text-primary transition`}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default DesktopNavigation;
