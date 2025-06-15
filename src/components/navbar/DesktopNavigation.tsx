
import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Define the main navigation links, each with a label and href.
 * Color for text is handled by isActive state.
 */
const NAV_LINKS = [
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
  {
    label: "Careers",
    href: "/careers",
  },
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
            className="group transition cursor-pointer"
            aria-label={link.label}
          >
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
