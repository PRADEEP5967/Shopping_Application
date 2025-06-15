
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const GamingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-indigo-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-purple-100/80 to-indigo-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-purple-200 text-purple-800 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Gaming Excellence
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 bg-clip-text text-transparent animate-fade-in">
                Level Up Your Gaming
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Discover premium gaming gear, consoles, and accessories that deliver the ultimate gaming experience for casual and professional gamers.
              </p>
              <Button size="lg" className="bg-purple-600 text-white font-bold hover:bg-purple-700 shadow">
                Shop Gaming Gear
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2 text-purple-700">Why Choose Our Gaming Collection?</h2>
            <p className="mb-4 text-gray-500">
              Professional-grade equipment trusted by gamers worldwide for competitive advantage and immersive experiences.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-100">
                <span className="text-purple-600 font-bold">🎮 High Performance</span>
                <div className="text-gray-600 mt-2 text-sm">Ultra-responsive gear for competitive gaming.</div>
              </li>
              <li className="flex-1 bg-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-100">
                <span className="text-purple-600 font-bold">🏆 Pro Quality</span>
                <div className="text-gray-600 mt-2 text-sm">Equipment used by professional esports players.</div>
              </li>
              <li className="flex-1 bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
                <span className="text-purple-600 font-bold">⚡ Latest Tech</span>
                <div className="text-gray-600 mt-2 text-sm">Cutting-edge technology for the best experience.</div>
              </li>
            </ul>
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4">
          <RelatedCategoriesGrid currentCategorySlug="gaming" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GamingPage;
