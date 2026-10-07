import { OptimizedImage } from "./OptimizedImage";
import React from "react";
import { InfiniteSlider } from "./ui/infinite-slider";

const froniusLogo = "/logos/fronius.svg";
const wegLogo = "/logos/weg.svg";

interface SolarBrandItem {
  id: string;
  name: string;
  category: string;
  logoSrc: string;
  heightClass: string;
}

export const SolarLogoMarquee: React.FC = () => {
  // As 7 marcas parceiras oficiais da Set Solar em Goiás
  const baseBrands: SolarBrandItem[] = [
    {
      id: "weg",
      name: "WEG Solar",
      category: "Engenharia e Tradição Nacional de Alta Confiabilidade",
      logoSrc: wegLogo,
      heightClass: "h-9 sm:h-10 md:h-11",
    },
    {
      id: "deye",
      name: "Deye",
      category: "Líder em Inversores Híbridos e String Inteligentes",
      logoSrc: "/logos/deye.png",
      heightClass: "h-7 sm:h-8 md:h-9",
    },
    {
      id: "canadian",
      name: "Canadian Solar",
      category: "Painéis Fotovoltaicos Tier 1 de Alta Eficiência",
      logoSrc: "/logos/canadian-solar.png",
      heightClass: "h-7 sm:h-8 md:h-9",
    },
    {
      id: "jinko",
      name: "Jinko Solar",
      category: "Tecnologia N-Type TOPCon Líder Global",
      logoSrc: "/logos/jinko-solar.png",
      heightClass: "h-7 sm:h-8 md:h-9",
    },
    {
      id: "growatt",
      name: "Growatt",
      category: "Inversores Digitais com Monitoramento por App",
      logoSrc: "/logos/growatt.png",
      heightClass: "h-7 sm:h-8 md:h-9",
    },
    {
      id: "fronius",
      name: "Fronius",
      category: "Inversores Premium Austríacos de Alta Performance",
      logoSrc: froniusLogo,
      heightClass: "h-8 sm:h-9 md:h-10",
    },
    {
      id: "equatorial",
      name: "Equatorial Goiás",
      category:
        "Concessionária Homologada (Conexão e Injeção de Créditos ANEEL)",
      logoSrc: "/logos/equatorial-goias.svg",
      heightClass: "h-8 sm:h-9 md:h-10",
    },
  ];

  return (
    <section className="relative w-full bg-white pt-2 sm:pt-3 pb-8 sm:pb-10 border-b border-slate-100 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-5 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
          Tecnologia Tier 1 Mundial e Homologação Oficial na Equatorial Goiás
        </p>
      </div>

      <div className="relative h-16 sm:h-20 w-full overflow-hidden flex items-center">
        <InfiniteSlider
          className="flex h-full w-full items-center"
          duration={36}
          gap={64}
        >
          {baseBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="group flex shrink-0 items-center justify-center px-6 sm:px-8 cursor-pointer"
              title={`${brand.name} — ${brand.category}`}
            >
              <div className="flex shrink-0 items-center justify-center grayscale contrast-125 opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200 ease-out-strong">
                <OptimizedImage
                  src={brand.logoSrc}
                  alt={brand.name}
                  className={`w-auto max-w-none shrink-0 object-contain ${brand.heightClass}`}
                />
              </div>
            </div>
          ))}
        </InfiniteSlider>

        {/* Gradiente suave de fade nas bordas esquerda e direita */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
};
