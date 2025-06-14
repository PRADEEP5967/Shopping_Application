
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    title: "Discover the Latest Tech",
    desc: "Stay ahead with new arrivals in smart gadgets, wearables, and more."
  },
  {
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    title: "Smart Living Essentials",
    desc: "Upgrade your lifestyle with innovative home accessories."
  },
  {
    img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    title: "Modern Workspace Gear",
    desc: "Boost productivity with high-performance laptops and monitors."
  },
  {
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    title: "On-the-Go Power",
    desc: "Portable tech for those who are always moving."
  },
  {
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    title: "Trendy Wearables",
    desc: "Stylish smartwatches and fitness trackers for an active you."
  }
];

const ModernImageSlider: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);

    // On mount, trigger select
    setSelectedIndex(emblaApi?.selectedScrollSnap() || 0);

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const scrollPrev = React.useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="w-full py-6 px-0 sm:px-2 mb-10">
      <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl group">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, idx) => (
              <div
                className="min-w-0 shrink-0 grow-0 basis-full relative transition-transform"
                key={slide.title + idx}
              >
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-64 md:h-96 object-cover rounded-3xl"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none rounded-3xl" />
                <div className="absolute md:left-10 left-5 bottom-8 z-10">
                  <h3 className="text-2xl md:text-4xl font-bold mb-1 text-white drop-shadow">
                    {slide.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/80 drop-shadow">
                    {slide.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Navigation buttons */}
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-primary hover:text-white p-2 rounded-full shadow-lg transition-colors"
          onClick={scrollPrev}
          aria-label="Previous"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-primary hover:text-white p-2 rounded-full shadow-lg transition-colors"
          onClick={scrollNext}
          aria-label="Next"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        {/* Slide indicators */}
        <div className="absolute bottom-5 w-full flex justify-center gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                selectedIndex === idx
                  ? "bg-primary border-primary scale-125"
                  : "bg-white/70 border-white"
              }`}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernImageSlider;
