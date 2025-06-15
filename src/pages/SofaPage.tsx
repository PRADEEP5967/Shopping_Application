
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Armchair } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const SofaPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-amber-100/80 to-yellow-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-amber-200 text-amber-800 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Armchair className="w-4 h-4 mr-2" />
                Furniture & Home
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent animate-fade-in">
                Comfort Meets Style
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Transform your home with beautiful, comfortable furniture designed for modern living.
              </p>
              <Button size="lg" className="bg-amber-600 text-white font-bold hover:bg-amber-700 shadow">
                Shop Furniture
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Why Choose Our Furniture?</h2>
            <p className="mb-4 text-gray-500">
              Premium furniture crafted with attention to detail and built to last for years of comfort.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-amber-50 p-6 rounded-xl shadow-sm border border-amber-100">
                <span className="text-gray-700 font-bold">🛋️ Premium Comfort</span>
                <div className="text-gray-600 mt-2 text-sm">Designed for maximum comfort and relaxation.</div>
              </li>
              <li className="flex-1 bg-yellow-50 p-6 rounded-xl shadow-sm border border-yellow-100">
                <span className="text-gray-700 font-bold">🎨 Stylish Design</span>
                <div className="text-gray-600 mt-2 text-sm">Modern aesthetics that enhance any space.</div>
              </li>
              <li className="flex-1 bg-orange-50 p-6 rounded-xl shadow-sm border border-orange-100">
                <span className="text-gray-700 font-bold">🔨 Built to Last</span>
                <div className="text-gray-600 mt-2 text-sm">Durable construction with quality materials.</div>
              </li>
            </ul>
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4">
          <RelatedCategoriesGrid currentCategorySlug="furniture" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SofaPage;
