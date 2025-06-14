
import React from "react";
import { Sparkles } from "lucide-react";

export const AnimatedContentSection = () => (
  <section className="py-20 bg-gradient-to-br from-secondary/5 via-white to-accent/10 animate-fade-in">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className="h-6 w-6 text-primary animate-pulse" />
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
          Modern Content Animation
        </h2>
        <Sparkles className="h-6 w-6 text-primary animate-pulse" />
      </div>
      <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10 animate-fade-in">
        Experience next-gen animations and engaging content, designed to capture your attention and provide seamless interaction.
      </p>
      <div className="mx-auto max-w-3xl rounded-3xl shadow-lg p-8 bg-white dark:bg-gray-900 transition-transform animate-scale-in">
        <h3 className="text-2xl font-semibold mb-2 text-primary dark:text-accent">Dynamic Model Content</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enjoy smooth transitions and beautiful content blocks empowered by the latest UI libraries and our creative touch. Elevate your experience!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="rounded-xl p-4 bg-primary/10 hover:scale-105 transition-transform animate-fade-in delay-75">
            ✨ Lightning-fast Animations
          </div>
          <div className="rounded-xl p-4 bg-secondary/10 hover:scale-105 transition-transform animate-fade-in delay-100">
            ⚡ Interactive UI Elements
          </div>
          <div className="rounded-xl p-4 bg-accent/10 hover:scale-105 transition-transform animate-fade-in delay-150">
            🌈 Eye-catching Gradients
          </div>
        </div>
      </div>
    </div>
  </section>
);
