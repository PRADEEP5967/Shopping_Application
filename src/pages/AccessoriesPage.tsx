
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Watch } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const AccessoriesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-violet-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-purple-100/80 to-violet-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-purple-200 text-purple-800 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Watch className="w-4 h-4 mr-2" />
                Accessories & More
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 bg-clip-text text-transparent animate-fade-in">
                Complete Your Look
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Discover the perfect accessories to complement your style and enhance your everyday essentials.
              </p>
              <Button size="lg" className="bg-purple-600 text-white font-bold hover:bg-purple-700 shadow">
                Shop Accessories
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Why Choose Our Accessories?</h2>
            <p className="mb-4 text-gray-500">
              Carefully curated accessories that blend style, functionality, and quality craftsmanship.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-100">
                <span className="text-gray-700 font-bold">✨ Style Perfect</span>
                <div className="text-gray-600 mt-2 text-sm">Accessories that elevate any outfit or setup.</div>
              </li>
              <li className="flex-1 bg-violet-50 p-6 rounded-xl shadow-sm border border-violet-100">
                <span className="text-gray-700 font-bold">🎯 Functional</span>
                <div className="text-gray-600 mt-2 text-sm">Beauty meets utility in every piece.</div>
              </li>
              <li className="flex-1 bg-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-100">
                <span className="text-gray-700 font-bold">💎 Premium Quality</span>
                <div className="text-gray-600 mt-2 text-sm">Durable materials built to last.</div>
              </li>
            </ul>
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4">
          <RelatedCategoriesGrid currentCategorySlug="accessories" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccessoriesPage;
