
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const HeartPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-pink-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-red-100/80 to-pink-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-red-200 text-red-800 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Heart className="w-4 h-4 mr-2" />
                Health & Wellness
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-red-600 via-pink-600 to-rose-700 bg-clip-text text-transparent animate-fade-in">
                Care for Your Heart
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Discover products that support your health and wellness journey with care and compassion.
              </p>
              <Button size="lg" className="bg-red-600 text-white font-bold hover:bg-red-700 shadow">
                Shop Health Products
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Why Choose Our Health Products?</h2>
            <p className="mb-4 text-gray-500">
              Carefully selected wellness products that prioritize your health and peace of mind.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-red-50 p-6 rounded-xl shadow-sm border border-red-100">
                <span className="text-gray-700 font-bold">❤️ Heart Health</span>
                <div className="text-gray-600 mt-2 text-sm">Products that support cardiovascular wellness.</div>
              </li>
              <li className="flex-1 bg-pink-50 p-6 rounded-xl shadow-sm border border-pink-100">
                <span className="text-gray-700 font-bold">🌿 Natural Care</span>
                <div className="text-gray-600 mt-2 text-sm">Gentle, natural ingredients for holistic health.</div>
              </li>
              <li className="flex-1 bg-rose-50 p-6 rounded-xl shadow-sm border border-rose-100">
                <span className="text-gray-700 font-bold">🏥 Trusted Quality</span>
                <div className="text-gray-600 mt-2 text-sm">Medically approved and expert recommended.</div>
              </li>
            </ul>
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4">
          <RelatedCategoriesGrid currentCategorySlug="health" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HeartPage;
