import React from 'react';
import { templateData } from '../data/templateData';

export const Hero: React.FC = () => {
  const whatsappUrl = `https://wa.me/${templateData.company.whatsapp}?text=${encodeURIComponent(
    templateData.company.whatsappDefaultMessage
  )}`;

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-36 sm:pt-44 pb-0 overflow-hidden">
      {/* High-Resolution Background Image (Clean Sky, Solar & Wind) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2000&q=85"
          alt="Clean Renewable Energy Field"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft overlay gradient matching Ref1.webp */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b4369]/50 via-[#1b4369]/30 to-[#1e1e1e]/70"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Main Title (Ref1.webp typography) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-5">
            Brighter Future Begins with Clean Power
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/90 font-normal leading-relaxed mb-8 max-w-xl">
            {templateData.company.subheadline}
          </p>

          {/* Dual Pill Buttons (Exact Ref1.webp style: Lime Green + Glass) */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white font-semibold text-sm tracking-tight transition-all shadow-lg shadow-black/10 hover:scale-105"
            >
              <span>Explore Programs</span>
            </a>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/30 font-medium text-sm transition-all"
            >
              <span>Book Session</span>
            </a>
          </div>
        </div>
      </div>

      {/* Giant Brand Watermark at Bottom of Hero (Exact Ref1.webp design feature) */}
      <div className="relative z-10 w-full overflow-hidden flex justify-center items-end select-none pointer-events-none -mb-2 sm:-mb-6">
        <div className="watermark-brand text-center font-extrabold tracking-tight">
          {templateData.company.shortName}
        </div>
      </div>
    </section>
  );
};
