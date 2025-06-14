
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import ModernImageSlider from "@/components/ModernImageSlider";
import { Card, CardContent } from "@/components/ui/card";
import { getFeaturedProducts } from "@/data/products";
import ModernProductCard from "@/components/ModernProductCard";
import { Sparkles } from "lucide-react";

const featuredProducts = getFeaturedProducts(8);

const SpecialOffers = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-primary to-pink-500 text-white py-16 mb-10 animate-fade-in">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block bg-white/10 text-white px-5 py-2 rounded-full text-base font-semibold mb-4 tracking-wider">
              Super Value Sale
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 animate-fade-in">
              Special Offers
            </h1>
            <p className="text-lg max-w-xl mx-auto mb-4 font-medium animate-fade-in">
              Grab unbeatable discounts on top picks. Limited stock—shop now and save big!
            </p>
          </div>
        </section>
        {/* Modern Slider */}
        <div className="max-w-5xl mx-auto animate-fade-in">
          <ModernImageSlider />
        </div>
        {/* Product grid */}
        <section className="container mx-auto px-4 mt-10 mb-16 animate-fade-in">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="h-7 w-7 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Today's Flash Sale Offers</h2>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded-full">HOT</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
            {featuredProducts.map((product) => (
              <ModernProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SpecialOffers;
