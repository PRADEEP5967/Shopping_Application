
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Baby } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const BabyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-emerald-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-100/80 to-green-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-200 text-emerald-700 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Baby className="w-4 h-4 mr-2" />
                Baby Essentials
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-sky-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent animate-fade-in">
                Gentle Care for Your Little One
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Explore adorable baby clothing, safe accessories, gentle skincare, and all the must-haves for happy moments and peaceful nights.
              </p>
              <Button size="lg" className="bg-emerald-500 text-white font-bold hover:bg-emerald-600 shadow">
                Shop Baby Collection
              </Button>
            </div>
          </div>
        </section>
        {/* Informative Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2 text-emerald-700">Why Parents Love Our Baby Store</h2>
            <p className="mb-4 text-gray-500">
              Handpicked essentials for newborns and toddlers—safety tested, extra gentle, and always adorable.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-sky-50 p-6 rounded-xl shadow-sm border border-blue-100">
                <span className="text-emerald-600 font-bold">🍼 Trusted Brands</span>
                <div className="text-gray-600 mt-2 text-sm">Shop only the most trusted brands in baby care and essentials.</div>
              </li>
              <li className="flex-1 bg-emerald-50 p-6 rounded-xl shadow-sm border border-emerald-100">
                <span className="text-emerald-600 font-bold">👶 Soft & Gentle</span>
                <div className="text-gray-600 mt-2 text-sm">All products tested for comfort and sensitive baby skin.</div>
              </li>
              <li className="flex-1 bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
                <span className="text-emerald-600 font-bold">⭐ Parent-Approved</span>
                <div className="text-gray-600 mt-2 text-sm">Loved by parents for quality, value, and a touch of cuteness.</div>
              </li>
            </ul>
          </div>
        </section>
        {/* Related Categories */}
        <div className="container mx-auto px-4">
          <RelatedCategoriesGrid currentCategorySlug="baby" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BabyPage;
