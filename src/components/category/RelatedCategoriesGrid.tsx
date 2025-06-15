
import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon, Computer, Shirt, Smartphone, Tv, Headphones, Monitor } from "lucide-react";

interface RelatedCategory {
  label: string;
  slug: string;
  icon: LucideIcon;
  description: string;
}

const CATEGORIES: RelatedCategory[] = [
  {
    label: "Computers",
    slug: "monitor",
    icon: Computer,
    description: "Laptops, desktops & accessories",
  },
  {
    label: "Electronics",
    slug: "smartphone",
    icon: Smartphone,
    description: "Mobile, TV, headphones & more",
  },
  {
    label: "Clothing",
    slug: "shirt",
    icon: Shirt,
    description: "Shirts, dresses & apparel",
  },
  {
    label: "TV",
    slug: "tv",
    icon: Tv,
    description: "Smart & LED TVs",
  },
  {
    label: "Headphones",
    slug: "headphones",
    icon: Headphones,
    description: "Audio gear",
  },
];

type Props = {
  currentCategorySlug: string;
};

const RelatedCategoriesGrid: React.FC<Props> = ({ currentCategorySlug }) => {
  // Hide the current category from suggestions
  const categories = CATEGORIES.filter(cat => cat.slug !== currentCategorySlug);

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Related Categories</h2>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {categories.map(({ label, slug, icon: Icon, description }) => (
          <Link
            to={`/category/${slug}`}
            key={slug}
            className="group flex flex-col items-center bg-white rounded-xl shadow border border-gray-100 p-4 hover:shadow-md hover:bg-primary/5 transition-all"
          >
            <div className="bg-primary/10 rounded-full p-3 mb-2">
              <Icon className="w-7 h-7 text-primary group-hover:text-blue-600" />
            </div>
            <span className="font-bold text-gray-800">{label}</span>
            <span className="text-xs text-gray-500 text-center mt-1">{description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedCategoriesGrid;
