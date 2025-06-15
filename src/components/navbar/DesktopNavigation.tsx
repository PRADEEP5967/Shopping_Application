
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

/**
 * Define the main navigation links with organized menu structure
 */
const NAV_STRUCTURE = [
  {
    label: "About",
    type: "dropdown",
    items: [
      { label: "About Us", href: "/about-us", description: "Learn about our company" },
      { label: "Team", href: "/team", description: "Meet our team members" },
      { label: "Careers", href: "/careers", description: "Join our team" },
    ]
  },
  {
    label: "Shop",
    type: "dropdown",
    items: [
      { label: "All Products", href: "/products", description: "Browse all products" },
      { label: "Categories", href: "/categories", description: "Shop by category" },
      { label: "New Arrivals", href: "/new-arrivals", description: "Latest products" },
      { label: "Special Offers", href: "/special-offers", description: "Deals and discounts" },
    ]
  },
  {
    label: "Services",
    type: "single",
    href: "/services"
  },
  {
    label: "Portfolio",
    type: "single",
    href: "/portfolio"
  },
  {
    label: "Support",
    type: "dropdown",
    items: [
      { label: "Contact Us", href: "/contact-us", description: "Get in touch" },
      { label: "FAQ", href: "/faq", description: "Frequently asked questions" },
      { label: "Returns", href: "/returns-exchanges", description: "Return policy" },
    ]
  },
];

const DesktopNavigation: React.FC = () => {
  const location = useLocation();

  const isActiveLink = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const isActiveDropdown = (items: any[]) => {
    return items.some(item => isActiveLink(item.href));
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-2">
        {NAV_STRUCTURE.map((navItem) => (
          <NavigationMenuItem key={navItem.label}>
            {navItem.type === "single" ? (
              <Link to={navItem.href!}>
                <NavigationMenuLink
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                    isActiveLink(navItem.href!) && "bg-accent text-accent-foreground"
                  )}
                >
                  {navItem.label}
                </NavigationMenuLink>
              </Link>
            ) : (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    "text-sm font-medium",
                    isActiveDropdown(navItem.items!) && "bg-accent text-accent-foreground"
                  )}
                >
                  {navItem.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {navItem.items!.map((item) => (
                      <Link key={item.href} to={item.href}>
                        <NavigationMenuLink
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            isActiveLink(item.href) && "bg-accent text-accent-foreground"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">{item.label}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {item.description}
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
