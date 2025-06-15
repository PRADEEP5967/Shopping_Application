
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tv } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const tvImg =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80";

const TvPage: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-slate-50 to-white">
    <Header />
    <CartFlyout />
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-100/80 to-slate-100/80 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-200 text-blue-900 border-none text-lg shadow animate-fade-in flex items-center justify-center">
              <Tv className="w-5 h-5 mr-2" />
              TV & Home Entertainment
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 via-blue-400 to-slate-600 bg-clip-text text-transparent animate-fade-in">
              Watch, Stream & Enjoy
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
              Browse the latest smart TVs with ultra-clear displays and advanced features for immersive home entertainment.
            </p>
            <Button size="lg" className="bg-blue-700 text-white font-bold hover:bg-blue-800 shadow">
              Shop TV Collection
            </Button>
            <div className="flex justify-center mt-12 animate-fade-in">
              <img
                src={tvImg}
                alt="TV"
                className="rounded-2xl shadow-md w-full max-w-md object-cover border border-blue-100"
                loading="lazy"
                style={{ maxHeight: 270 }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-semibold mb-2 text-blue-700">Why Choose Our TVs?</h2>
          <p className="mb-4 text-gray-500">
            From smart to 4K displays, our range of TVs blends crisp visuals, rich sound, and seamless connectivity.
          </p>
          <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
            <li className="flex-1 bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
              <span className="text-blue-700 font-bold">📺 Smart Features</span>
              <div className="text-gray-600 mt-2 text-sm">App integration, Wi-Fi, voice control—you name it.</div>
            </li>
            <li className="flex-1 bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-100">
              <span className="text-blue-700 font-bold">🔊 Superior Sound</span>
              <div className="text-gray-600 mt-2 text-sm">Enjoy clear audio and immersive surround sound.</div>
            </li>
            <li className="flex-1 bg-neutral-50 p-6 rounded-xl shadow-sm border border-neutral-100">
              <span className="text-blue-700 font-bold">🌟 Ultra HD Quality</span>
              <div className="text-gray-600 mt-2 text-sm">Stunning visuals in 4K and HDR.</div>
            </li>
          </ul>
        </div>
      </section>
      {/* Related Categories */}
      <div className="container mx-auto px-4">
        <RelatedCategoriesGrid currentCategorySlug="tv" />
      </div>
    </main>
    <Footer />
  </div>
);

export default TvPage;
