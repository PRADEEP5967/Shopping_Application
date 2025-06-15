
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Wifi, Shield } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const SmartHomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-indigo-100/80 to-blue-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-indigo-200 text-indigo-800 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Home className="w-4 h-4 mr-2" />
                Smart Home Solutions
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-fade-in">
                Connected Living Made Simple
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Transform your home with intelligent automation, security systems, and connected devices that make life easier and more efficient.
              </p>
              <Button size="lg" className="bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow">
                Explore Smart Home
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2 text-indigo-700">Why Choose Smart Home Technology?</h2>
            <p className="mb-4 text-gray-500">
              Create a connected ecosystem that learns your preferences and adapts to your lifestyle.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-100">
                <span className="text-indigo-600 font-bold">🏠 Home Automation</span>
                <div className="text-gray-600 mt-2 text-sm">Control lights, temperature, and appliances remotely.</div>
              </li>
              <li className="flex-1 bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
                <span className="text-indigo-600 font-bold">🔒 Security Systems</span>
                <div className="text-gray-600 mt-2 text-sm">Advanced monitoring and protection for your family.</div>
              </li>
              <li className="flex-1 bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-100">
                <span className="text-indigo-600 font-bold">⚡ Energy Efficient</span>
                <div className="text-gray-600 mt-2 text-sm">Smart systems that save energy and reduce costs.</div>
              </li>
            </ul>
          </div>
        </section>

        {/* Related Categories */}
        <div className="container mx-auto px-4">
          <RelatedCategoriesGrid currentCategorySlug="smart-home" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmartHomePage;
