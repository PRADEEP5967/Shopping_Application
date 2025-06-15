
import React from "react";

const logos = [
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/TechCrunch_T.svg/320px-TechCrunch_T.svg.png"
  },
  {
    name: "Forbes",
    url: "https://forbes.com/",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Forbes_logo.svg"
  },
  {
    name: "Wired",
    url: "https://wired.com/",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Wired_logo.svg"
  },
  // Add more as desired
];

const PartnerLogosSection: React.FC = () => (
  <section className="py-8 bg-gradient-to-r from-gray-50 via-white to-gray-50">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-sm mb-4 font-semibold text-gray-500 tracking-widest uppercase animate-fade-in">
        As seen on
      </h2>
      <div className="flex items-center justify-center flex-wrap gap-6 md:gap-12">
        {logos.map((logo) => (
          <a
            key={logo.name}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-200"
          >
            <img src={logo.img} alt={logo.name} className="h-8 md:h-10 object-contain" />
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default PartnerLogosSection;
