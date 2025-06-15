
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFlyout from "@/components/CartFlyout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import RelatedCategoriesGrid from "@/components/category/RelatedCategoriesGrid";

const SmartHomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50 via-sky-50 to-white">
      <Header />
      <CartFlyout />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-cyan-100/80 to-sky-100/80 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:60px_60px] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-6 bg-cyan-200 text-cyan-800 border-none text-lg shadow animate-fade-in flex items-center justify-center">
                <Home className="w-4 h-4 mr-2" />
                Smart Home & IoT
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 bg-clip-text text-transparent animate-fade-in">
                Intelligent Living
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto animate-fade-in">
                Transform your home into a smart, connected space with cutting-edge IoT devices and automation.
              </p>
              <Button size="lg" className="bg-cyan-600 text-white font-bold hover:bg-cyan-700 shadow">
                Explore Smart Home
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Why Choose Our Smart Home Solutions?</h2>
            <p className="mb-4 text-gray-500">
              Connected devices that make your home more comfortable, secure, and energy-efficient.
            </p>
            <ul className="flex flex-col md:flex-row md:justify-center gap-5 mt-8 text-left mx-auto max-w-xl animate-fade-in">
              <li className="flex-1 bg-cyan-50 p-6 rounded-xl shadow-sm border border-cyan-100">
                <span className="text-gray-700 font-bold">🤖 Automation</span>
                <div className="text-gray-600 mt-2 text-sm">Intelligent automation for effortless living.</div>
              </li>
              <li className="flex-1 bg-sky-50 p-6 rounded-xl shadow-sm border border-sky-100">
                <span className="text-gray-700 font-bold">🔒 Security</span>
                <div className="text-gray-600 mt-2 text-sm">Advanced security and monitoring systems.</div>
              </li>
              <li className="flex-1 bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
                <span className="text-gray-700 font-bold">⚡ Efficiency</span>
                <div className="text-gray-600 mt-2 text-sm">Energy-saving smart solutions.</div>
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
