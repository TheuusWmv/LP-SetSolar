import React from "react";
import { SolarFramedHero } from "./components/SolarFramedHero";
import { SolarLogoMarquee } from "./components/SolarLogoMarquee";
import { AboutUs } from "./components/AboutUs";
import { HowItWorks } from "./components/HowItWorks";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-[var(--brand-accent)] selection:text-white font-sans">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--brand-accent)] focus:text-white focus:font-bold focus:rounded-full focus:shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      <main>
        {/* 1. Hero Section (Framed with Notch Navbar) */}
        <div data-island="Hero">
          <SolarFramedHero />
        </div>

        {/* 2. Marquee das Marcas (Tier-1 Solar Brands) */}
        <SolarLogoMarquee />

        {/* 3. Sobre Nós (Bento Grid) */}
        <div data-island="AboutUs">
          <AboutUs />
        </div>

        {/* 4. Como Funciona (Timeline) */}
        <div data-island="HowItWorks">
          <HowItWorks />
        </div>

        {/* 5. Nossas Soluções / Serviços (Modern Carousel/Grid) */}
        <div data-island="Services">
          <Services />
        </div>

        <div data-island="Testimonials">
          <Testimonials />
        </div>

        {/* Perguntas Frequentes (FAQ) */}
        <div data-island="FAQ">
          <FAQ />
        </div>

        {/* 8. CTA (High Impact Simulation Banner) */}
        <div data-island="CTA">
          <CTA />
        </div>
      </main>

      {/* 9. Footer (Institutional Multi-Column Navigation) */}
      <div data-island="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
