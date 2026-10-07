import React from 'react';
import { templateData } from '../data/templateData';

export const LogoLoop: React.FC = () => {
  const brands = [...templateData.partnerBrands, ...templateData.partnerBrands];

  return (
    <section className="relative py-8 bg-white border-b border-gray-100 overflow-hidden">
      {/* Soft gradient masks on sides */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div className="flex overflow-hidden select-none group">
        <div className="flex shrink-0 items-center gap-8 sm:gap-14 animate-marquee group-hover:[animation-play-state:paused]">
          {brands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex items-center gap-3 py-2 px-4 rounded-xl hover:bg-gray-50 transition-colors cursor-default shrink-0"
            >
              <div className="w-2 h-2 rounded-full bg-[#e5c900]"></div>
              <span className="font-bold text-sm tracking-tight text-slate-700">
                {brand.name}
              </span>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                • {brand.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
