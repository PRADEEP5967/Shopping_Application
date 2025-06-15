
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const DumbbellPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-emerald-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-green-100/80 to-emerald-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-green-200 text-green-800 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Dumbbell className="w-4 h-4 mr-2" />
                Fitness & Sports
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent animate-fade-in">
                Strength & Fitness
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Achieve your fitness goals with professional-grade equipment designed for every workout.
              </p>
              <Button size="lg" className="bg-green-600 text-white font-bold hover:bg-green-700 shadow">
                Shop Fitness
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Why Choose Our Fitness Equipment?</h2>
            <p className="mb-4 text-gray-500">
              Professional-grade equipment trusted by athletes and fitness enthusiasts worldwide.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-green-50 p-6 rounded-xl shadow-sm border border-green-100">
                <span className="text-gray-700 font-bold">💪 Pro Quality</span>
                <div className="text-gray-600 mt-2 text-sm">Commercial-grade equipment for serious training.</div>
              </li>
              <li className="flex-1 bg-emerald-50 p-6 rounded-xl shadow-sm border border-emerald-100">
                <span className="text-gray-700 font-bold">🎯 All Levels</span>
                <div className="text-gray-600 mt-2 text-sm">Perfect for beginners to professional athletes.</div>
              </li>
              <li className="flex-1 bg-teal-50 p-6 rounded-xl shadow-sm border border-teal-100">
                <span className="text-gray-700 font-bold">🏠 Home Gym</span>
                <div className="text-gray-600 mt-2 text-sm">Space-efficient designs for home workouts.</div>
              </li>
            </ul>
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4">
          <RelatedCategoriesGrid currentCategorySlug="fitness" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DumbbellPage;
