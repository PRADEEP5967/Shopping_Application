
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sofa } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const sofaImg =
  "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80";

const SofaPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-yellow-100/80 to-orange-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-yellow-200 text-orange-700 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Sofa className="w-5 h-5 mr-2" />
                Sofa Collection
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-600 bg-clip-text text-transparent animate-fade-in">
                Relax in Style & Comfort
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Discover a curated range of modern sofas designed for ultimate comfort and a beautiful living space.
              </p>
              <Button size="lg" className="bg-amber-500 text-white font-bold hover:bg-orange-600 shadow">
                Shop Sofa Collection
              </Button>
              <div className="flex justify-center mt-12 animate-fade-in">
                <img
                  src={sofaImg}
                  alt="Sofa"
                  className="rounded-2xl shadow-md w-full max-w-md object-cover border border-orange-100"
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
            <h2 className="text-2xl font-semibold mb-2 text-orange-700">Why Choose Our Sofas?</h2>
            <p className="mb-4 text-gray-500">
              Handpicked for quality and comfort—our sofas make every home welcoming and stylish.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-orange-50 p-6 rounded-xl shadow-sm border border-orange-100">
                <span className="text-amber-600 font-bold">🛋️ Plush Comfort</span>
                <div className="text-gray-600 mt-2 text-sm">Supportive seating, soft fabrics, relaxing lounging.</div>
              </li>
              <li className="flex-1 bg-yellow-50 p-6 rounded-xl shadow-sm border border-yellow-100">
                <span className="text-amber-600 font-bold">🎨 Modern Styles</span>
                <div className="text-gray-600 mt-2 text-sm">Chic designs for every living room aesthetic.</div>
              </li>
              <li className="flex-1 bg-amber-50 p-6 rounded-xl shadow-sm border border-amber-100">
                <span className="text-amber-600 font-bold">🚚 Fast Delivery</span>
                <div className="text-gray-600 mt-2 text-sm">Quick shipping & easy returns across the country.</div>
              </li>
            </ul>
          </div>
        </section>
        {/* Related Categories */}
        <div className="container mx-auto px-4">
          <RelatedCategoriesGrid currentCategorySlug="sofa" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SofaPage;
