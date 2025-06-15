
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const HeartPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-red-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-pink-100/80 to-red-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-pink-200 text-rose-600 border-none text-lg shadow animate-fade-in">
                <Heart className="w-4 h-4 mr-1" />
                Personal Care & Wellness
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 via-rose-500 to-red-500 bg-clip-text text-transparent animate-fade-in">
                Love Yourself: Wellness & Care
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Discover top personal care and wellness products that make self-care simple, joyful, and effective. Because every day is worth loving yourself!
              </p>
              <Button size="lg" className="bg-rose-500 text-white font-bold hover:bg-rose-600 shadow">
                Explore Wellness Products
              </Button>
            </div>
          </div>
        </section>

        {/* Informative Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2 text-rose-700">Why Choose Our Care Collection?</h2>
            <p className="mb-4 text-gray-500">
              Handpicked wellness, skincare, and personal products – focused on comfort, safety, and a touch of self-love. Whether you want to pamper yourself or find the perfect thoughtful gift, our Heart collection is here for you.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-rose-50 p-6 rounded-xl shadow-sm border border-pink-100">
                <span className="text-rose-500 font-bold">💆‍♀️ Self-Care Essentials</span>
                <div className="text-gray-600 mt-2 text-sm">Face & body care, wellness kits, soothing aids.</div>
              </li>
              <li className="flex-1 bg-pink-50 p-6 rounded-xl shadow-sm border border-pink-100">
                <span className="text-rose-500 font-bold">💖 Thoughtful Gifting</span>
                <div className="text-gray-600 mt-2 text-sm">Curated for birthdays, health milestones, just-because treats.</div>
              </li>
              <li className="flex-1 bg-red-50 p-6 rounded-xl shadow-sm border border-red-100">
                <span className="text-rose-500 font-bold">🌟 Trusted Brands</span>
                <div className="text-gray-600 mt-2 text-sm">Leaders in personal care, wellness, and natural beauty.</div>
              </li>
            </ul>
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4">
          <RelatedCategoriesGrid currentCategorySlug="heart" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HeartPage;
