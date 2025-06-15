
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-orange-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-yellow-100/80 to-orange-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-yellow-200 text-yellow-800 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Baby className="w-4 h-4 mr-2" />
                Baby & Kids
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-700 bg-clip-text text-transparent animate-fade-in">
                Little Ones, Big Dreams
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Everything your baby needs for comfort, safety, and joy. Safe, gentle, and designed with love.
              </p>
              <Button size="lg" className="bg-yellow-600 text-white font-bold hover:bg-yellow-700 shadow">
                Shop Baby Products
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Why Choose Our Baby Products?</h2>
            <p className="mb-4 text-gray-500">
              Safe, certified, and lovingly designed products for your precious little ones.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-yellow-50 p-6 rounded-xl shadow-sm border border-yellow-100">
                <span className="text-gray-700 font-bold">🛡️ Safety First</span>
                <div className="text-gray-600 mt-2 text-sm">All products meet strict safety standards.</div>
              </li>
              <li className="flex-1 bg-orange-50 p-6 rounded-xl shadow-sm border border-orange-100">
                <span className="text-gray-700 font-bold">🌟 Gentle Care</span>
                <div className="text-gray-600 mt-2 text-sm">Soft, hypoallergenic materials for sensitive skin.</div>
              </li>
              <li className="flex-1 bg-red-50 p-6 rounded-xl shadow-sm border border-red-100">
                <span className="text-gray-700 font-bold">💝 Parent Approved</span>
                <div className="text-gray-600 mt-2 text-sm">Trusted by parents worldwide.</div>
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
