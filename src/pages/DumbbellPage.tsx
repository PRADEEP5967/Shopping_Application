
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const dumbbellImg =
  "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80";

const DumbbellPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-100/80 to-gray-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-200 text-blue-900 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Dumbbell className="w-5 h-5 mr-2" />
                Dumbbells & Fitness Gear
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-gray-400 to-blue-700 bg-clip-text text-transparent animate-fade-in">
                Build Strength at Home
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Shop high-quality dumbbells and fitness accessories for every workout style—durable, comfortable, and built for results.
              </p>
              <Button size="lg" className="bg-blue-600 text-white font-bold hover:bg-blue-700 shadow">
                Explore Dumbbell Collection
              </Button>
              <div className="flex justify-center mt-12 animate-fade-in">
                <img
                  src={dumbbellImg}
                  alt="Dumbbell"
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
            <h2 className="text-2xl font-semibold mb-2 text-blue-700">Why Choose Our Fitness Range?</h2>
            <p className="mb-4 text-gray-500">
              Our dumbbells and accessories are chosen for performance and convenience, helping you unlock your fitness goals.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
                <span className="text-blue-700 font-bold">🏋️ Versatile Sets</span>
                <div className="text-gray-600 mt-2 text-sm">Weights from beginner to advanced.</div>
              </li>
              <li className="flex-1 bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                <span className="text-blue-700 font-bold">💪 Durable Build</span>
                <div className="text-gray-600 mt-2 text-sm">Premium materials for everyday workouts.</div>
              </li>
              <li className="flex-1 bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-100">
                <span className="text-blue-700 font-bold">🛒 Easy Delivery</span>
                <div className="text-gray-600 mt-2 text-sm">Safe home delivery throughout the country.</div>
              </li>
            </ul>
          </div>
        </section>
        {/* Related Categories */}
        <div className="container mx-auto px-4">
          <RelatedCategoriesGrid currentCategorySlug="dumbbell" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DumbbellPage;
