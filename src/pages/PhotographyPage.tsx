
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const PhotographyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-slate-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-gray-100/80 to-slate-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-gray-200 text-gray-800 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Camera className="w-4 h-4 mr-2" />
                Photography Equipment
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-gray-600 via-slate-600 to-zinc-700 bg-clip-text text-transparent animate-fade-in">
                Capture Perfect Moments
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Professional cameras, lenses, and photography accessories to help you capture stunning images and create lasting memories.
              </p>
              <Button size="lg" className="bg-gray-700 text-white font-bold hover:bg-gray-800 shadow">
                Explore Photography Gear
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Why Choose Our Photography Equipment?</h2>
            <p className="mb-4 text-gray-500">
              Professional-grade cameras and accessories trusted by photographers worldwide for exceptional image quality.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                <span className="text-gray-700 font-bold">📷 Pro Cameras</span>
                <div className="text-gray-600 mt-2 text-sm">DSLR and mirrorless cameras for every skill level.</div>
              </li>
              <li className="flex-1 bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-100">
                <span className="text-gray-700 font-bold">🔍 Premium Lenses</span>
                <div className="text-gray-600 mt-2 text-sm">Wide selection of lenses for every shooting scenario.</div>
              </li>
              <li className="flex-1 bg-zinc-50 p-6 rounded-xl shadow-sm border border-zinc-100">
                <span className="text-gray-700 font-bold">⚡ Accessories</span>
                <div className="text-gray-600 mt-2 text-sm">Tripods, lighting, and studio equipment.</div>
              </li>
            </ul>
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4">
          <RelatedCategoriesGrid currentCategorySlug="photography" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PhotographyPage;
