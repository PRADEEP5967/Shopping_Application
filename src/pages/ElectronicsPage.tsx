
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const ElectronicsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-200 text-blue-800 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Zap className="w-4 h-4 mr-2" />
                Electronics & Tech
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent animate-fade-in">
                Power Your Future
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Discover cutting-edge electronics and technology that enhance your digital lifestyle and productivity.
              </p>
              <Button size="lg" className="bg-blue-600 text-white font-bold hover:bg-blue-700 shadow">
                Explore Tech
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Why Choose Our Electronics?</h2>
            <p className="mb-4 text-gray-500">
              Latest technology from trusted brands with warranty and expert support.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
                <span className="text-gray-700 font-bold">⚡ Latest Tech</span>
                <div className="text-gray-600 mt-2 text-sm">Cutting-edge devices with the newest features.</div>
              </li>
              <li className="flex-1 bg-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-100">
                <span className="text-gray-700 font-bold">🛡️ Warranty</span>
                <div className="text-gray-600 mt-2 text-sm">Full manufacturer warranty and support.</div>
              </li>
              <li className="flex-1 bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-100">
                <span className="text-gray-700 font-bold">🚚 Fast Delivery</span>
                <div className="text-gray-600 mt-2 text-sm">Quick shipping on all electronics orders.</div>
              </li>
            </ul>
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4">
          <RelatedCategoriesGrid currentCategorySlug="electronics" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ElectronicsPage;
