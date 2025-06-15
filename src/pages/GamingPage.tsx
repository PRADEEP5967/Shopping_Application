
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-purple-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-violet-100/80 to-purple-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-violet-200 text-violet-800 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Gaming & Esports
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700 bg-clip-text text-transparent animate-fade-in">
                Level Up Your Game
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Dominate the competition with professional gaming gear and accessories designed for victory.
              </p>
              <Button size="lg" className="bg-violet-600 text-white font-bold hover:bg-violet-700 shadow">
                Shop Gaming Gear
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Why Choose Our Gaming Equipment?</h2>
            <p className="mb-4 text-gray-500">
              Professional-grade gaming gear trusted by esports athletes and enthusiasts worldwide.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-violet-50 p-6 rounded-xl shadow-sm border border-violet-100">
                <span className="text-gray-700 font-bold">🎮 Pro Performance</span>
                <div className="text-gray-600 mt-2 text-sm">Esports-grade equipment for competitive advantage.</div>
              </li>
              <li className="flex-1 bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-100">
                <span className="text-gray-700 font-bold">⚡ Ultra Responsive</span>
                <div className="text-gray-600 mt-2 text-sm">Lightning-fast response times and precision.</div>
              </li>
              <li className="flex-1 bg-fuchsia-50 p-6 rounded-xl shadow-sm border border-fuchsia-100">
                <span className="text-gray-700 font-bold">🎯 Customizable</span>
                <div className="text-gray-600 mt-2 text-sm">Personalize your setup for optimal performance.</div>
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
