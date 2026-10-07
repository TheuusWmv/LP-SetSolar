import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Home,
  Building2,
  Tractor,
  Factory,
  BatteryCharging,
  SunMedium,
} from "lucide-react";
import { useMediaQuery } from "../lib/use-media-query";
import { templateData } from "../data/templateData";
import { BlurReveal, BlurRevealGroup, BlurRevealItem } from "./ui/blur-reveal";

// Icon mapping for each service
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  residencial: Home,
  comercial: Building2,
  rural: Tractor,
  industrial: Factory,
  baterias: BatteryCharging,
};

// Short names for collapsed cards (clean minimalist style matching ref.jpg)
const shortNames: Record<string, string> = {
  residencial: "Residencial",
  comercial: "Comercial",
  rural: "Rural & Agro",
  industrial: "Industrial",
  baterias: "Baterias",
};

export const Services: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { services, company } = templateData;

  const mobile = useMediaQuery("(max-width: 767px)");
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  useEffect(() => () => cancelAnimationFrame(animationRef.current), []);
  const cancelScroll = () => { cancelAnimationFrame(animationRef.current); if (trackRef.current) trackRef.current.style.scrollSnapType = ""; };
  const selectedRef = useRef(activeIndex);
  selectedRef.current = activeIndex;
  const scrollToService = (index: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    cancelScroll();
    const target = card.offsetLeft - (track.children[0] as HTMLElement).offsetLeft;
    if (behavior === "auto" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { track.scrollLeft = target; return; }
    const from = track.scrollLeft, started = performance.now();
    track.style.scrollSnapType = "none";
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / 650);
      const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      track.scrollLeft = from + (target - from) * eased;
      if (progress < 1) animationRef.current = requestAnimationFrame(tick);
      else track.style.scrollSnapType = "";
    };
    animationRef.current = requestAnimationFrame(tick);
  };
  useEffect(() => {
    if (!mobile) return;
    const resize = new ResizeObserver(() => scrollToService(selectedRef.current, "auto"));
    if (trackRef.current) resize.observe(trackRef.current);
    return () => resize.disconnect();
  }, [mobile]);
  const selectService = (index: number) => {
    if (mobile) scrollToService(index);
    else setActiveIndex(index);
  };
  const syncService = () => {
    const track = trackRef.current;
    if (!track) return;
    const start = (track.children[0] as HTMLElement).offsetLeft;
    let nearest = 0;
    Array.from(track.children).forEach((card, index) => {
      if (Math.abs((card as HTMLElement).offsetLeft - start - track.scrollLeft) < Math.abs((track.children[nearest] as HTMLElement).offsetLeft - start - track.scrollLeft)) nearest = index;
    });
    setActiveIndex(nearest);
  };

  const getWhatsappUrl = (serviceTitle: string) => {
    return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
      `Olá! Gostaria de uma simulação gratuita e mais informações sobre o serviço de ${serviceTitle}.`
    )}`;
  };

  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-[#f8f9fa] border-t border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Centered, Clean & Editorial */}
        <BlurRevealGroup
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          amount={0.5}
          margin="-60px 0px -60px 0px"
          delay={0.04}
          stagger={0.12}
        >
          <BlurRevealItem yOffset={14} blur="6px">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-neutral-800 text-xs font-semibold tracking-wide uppercase shadow-2xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)]" />
              <span>Nossas Soluções</span>
            </div>
          </BlurRevealItem>

          <BlurRevealItem yOffset={20} blur="8px" as="h2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-[1.16] block">
              Menos gasto com energia.{" "}
              <span className="text-[var(--solar-blue-primary)]">Mais espaço para seus planos.</span>
            </span>
          </BlurRevealItem>

          <BlurRevealItem yOffset={20} blur="8px">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mt-4">
              Mais folga no orçamento de casa, mais margem na empresa ou menor custo no campo. Escolha seu perfil e veja como a energia solar pode trabalhar a seu favor.
            </p>
          </BlurRevealItem>
        </BlurRevealGroup>

        {/* ========================================================================= */}
        {/* DESKTOP ACCORDION: Expanding Cards Row (Clean, uncluttered design)       */}
        {/* ========================================================================= */}
          <div className="hidden md:flex gap-3.5 lg:gap-4 h-[510px] lg:h-[550px] items-stretch w-full">
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              const Icon = iconMap[service.id] || SunMedium;
              const shortTitle = shortNames[service.id] || service.title;
              const whatsappUrl = getWhatsappUrl(service.title);

              return (
                <BlurReveal
                  key={service.id}
                  delay={0.04 + index * 0.07}
                  yOffset={24}
                  blur="8px"
                  onClick={() => setActiveIndex(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveIndex(index);
                    }
                  }}
                  aria-expanded={isActive}
                  aria-label={`Ver detalhes de ${service.title}`}
                  className={`group relative rounded-[28px] lg:rounded-[32px] overflow-hidden cursor-pointer select-none transition-[flex] duration-280 ease-out-strong ${
                    isActive
                      ? "flex-[3.5] lg:flex-[3.8] shadow-[0_22px_50px_-12px_rgba(15,23,42,0.22)] ring-1 ring-black/10"
                      : "flex-1 shadow-[0_8px_25px_-10px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_35px_-10px_rgba(15,23,42,0.16)]"
                  }`}
                >
                  {/* Background Image with Smooth, Natural Scale & Brightness */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-[transform,filter] duration-300 ease-out-strong ${
                      isActive
                        ? "scale-100 filter-none"
                        : "scale-100 group-hover:scale-105 filter brightness-[0.82] group-hover:brightness-100"
                    }`}
                  />

                  {/* Smooth Gradient Overlays */}
                  <div
                    className={`absolute inset-0 transition-colors duration-280 ease-out-strong ${
                      isActive
                        ? "bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-neutral-950/20"
                        : "bg-neutral-950/50 group-hover:bg-neutral-950/25"
                    }`}
                  />

                  {/* Active Top Gradient */}
                  {isActive && (
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-neutral-950/50 to-transparent pointer-events-none" />
                  )}

                  {/* ----------------------------------------------------------------- */}
                  {/* ACTIVE CARD CONTENT (Clean, minimal, spacious)                   */}
                  {/* ----------------------------------------------------------------- */}
                  {isActive ? (
                    <div className="relative z-10 h-full p-7 lg:p-8 flex flex-col justify-between">
                      {/* Top Row: ONLY the category tag pill */}
                      <div className="flex items-center">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                          <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-pulse-subtle" />
                          <span>{service.category}</span>
                        </span>
                      </div>

                      {/* Bottom Area: Title, Normal Text & Bottom Bar */}
                      <BlurReveal
                        delay={0.04}
                        yOffset={16}
                        blur="8px"
                        margin="0px"
                        className="flex flex-col"
                      >
                        {/* Main Service Title */}
                        <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight leading-[1.18] mb-2.5">
                          {service.title}
                        </h3>

                        {/* Normal concise description (without extra feature cards/tags) */}
                        <p className="text-sm lg:text-base text-slate-200/90 font-normal leading-relaxed max-w-xl mb-6 line-clamp-3">
                          {service.description}
                        </p>

                        {/* Bottom Bar: Glassmorphism Button (Left) & Price in Green (Right) */}
                        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/15">
                          {/* Simular economia button in glassmorphism style at bottom left */}
                          <a
                            href={templateData.company.simulatorUrl || whatsappUrl}
                            target={templateData.company.simulatorUrl ? undefined : "_blank"}
                            rel={templateData.company.simulatorUrl ? undefined : "noopener noreferrer"}
                            onClick={(e) => e.stopPropagation()}
                            className="group/simular inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-[0.97] backdrop-blur-md border border-white/25 text-white font-semibold text-xs sm:text-sm tracking-tight transition-[background-color,transform,box-shadow] duration-160 ease-out-strong shadow-sm hover:shadow-md"
                          >
                            <span>Simular economia</span>
                            <ArrowUpRight className="w-4 h-4 text-[var(--brand-accent)] transition-transform duration-160 group-hover/simular:translate-x-0.5 group-hover/simular:-translate-y-0.5" />
                          </a>

                          {/* Starting price in contrasting gold at bottom right */}
                          {service.startingPrice && (
                            <div className="text-right">
                              <span className="text-sm sm:text-base font-bold text-[var(--brand-accent)] font-mono tracking-tight drop-shadow-sm">
                                {service.startingPrice}
                              </span>
                            </div>
                          )}
                        </div>
                      </BlurReveal>
                    </div>
                  ) : (
                    /* ----------------------------------------------------------------- */
                    /* INACTIVE / COLLAPSED CARD CONTENT (Ref.jpg minimalist style)      */
                    /* ----------------------------------------------------------------- */
                    <div className="relative z-10 h-full py-6 px-2 flex flex-col items-center justify-between pointer-events-none">
                      {/* Top Index Number Badge */}
                      <div className="w-8 h-8 rounded-full bg-neutral-950/60 backdrop-blur-md border border-white/20 text-white font-bold text-xs flex items-center justify-center shadow-sm group-hover:border-[var(--brand-accent)]/70 group-hover:text-[var(--brand-accent)] transition-colors duration-160 ease-out-strong">
                        {service.number}
                      </div>

                      {/* Middle: Clean photographic area (leaves image uncluttered like ref.jpg) */}
                      <div className="flex-1" />

                      {/* Bottom: Icon & Name horizontally stacked */}
                      <div className="flex flex-col items-center gap-2 pb-2 group-hover:-translate-y-1 transition-transform duration-200 ease-out-strong">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-[var(--brand-accent)] group-hover:text-[var(--brand-accent-text)] transition-[background-color,color,transform] duration-200 ease-out-strong group-hover:scale-105 shadow-sm">
                          <Icon className="w-5 h-5 text-current" />
                        </div>
                        <span className="text-xs font-bold text-white tracking-wide uppercase drop-shadow-sm text-center px-1">
                          {shortTitle}
                        </span>
                      </div>
                    </div>
                  )}
                </BlurReveal>
              );
            })}
          </div>

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* MOBILE CAROUSEL: Centered Cards with Peek (< md screens)                  */}
        {/* ========================================================================= */}
        <div className="relative md:hidden -mx-4 sm:-mx-6">
          <div
            ref={trackRef}
            onScroll={syncService}
            onTouchStart={cancelScroll}
            onWheel={cancelScroll}
            aria-label="Soluções de energia solar"
            className="services-track relative flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-[10vw] scroll-px-[10vw] pb-4 pt-1"
          >
            {services.map((service) => {
              const whatsappUrl = getWhatsappUrl(service.title);

              return (
                <div
                  key={service.id}
                  className="w-[80vw] min-h-[410px] shrink-0 snap-center rounded-[2rem] overflow-hidden relative group shadow-lg shadow-neutral-900/10 border border-slate-200/80 flex flex-col justify-between p-5"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/45 to-neutral-950/25 pointer-events-none" />

                  {/* Top Bar: Number & Category */}
                  <div className="relative z-10 flex items-center justify-between mb-20">
                    <span className="w-8 h-8 rounded-full bg-neutral-950/70 backdrop-blur-md border border-white/20 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                      {service.number}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-neutral-950/70 backdrop-blur-md border border-white/20 text-[var(--brand-accent)] font-semibold text-[11px] tracking-wide">
                      {service.category}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white tracking-tight mb-1.5 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-200/90 leading-relaxed mb-4 mt-3">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-3 items-center justify-between pt-3 border-t border-white/15">
                      <a
                        href={templateData.company.simulatorUrl || whatsappUrl}
                        target={templateData.company.simulatorUrl ? undefined : "_blank"}
                        rel={templateData.company.simulatorUrl ? undefined : "noopener noreferrer"}
                        className="inline-flex items-center gap-1.5 px-4 py-2 min-h-11 rounded-full bg-[var(--brand-accent)] text-[var(--brand-accent-text)] font-bold text-xs tracking-tight shadow-sm active:scale-95 transition-transform"
                      >
                        <span>Simular economia</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      {service.startingPrice && (
                        <span className="text-xs font-mono font-bold text-[var(--brand-accent)]">
                          {service.startingPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM NAVIGATION CONTROLS: Clean Category Tabs & Chevrons (Desktop only) */}
        {/* ========================================================================= */}
        <BlurReveal delay={0.14} yOffset={16} blur="6px" className="hidden md:block">
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80">
            {/* Quick Category Selector Pills */}
            <div className="hidden md:flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
              {services.map((service, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveIndex(index)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-[background-color,color,border-color] duration-160 ease-out-strong cursor-pointer ${
                      isActive
                        ? "bg-neutral-950 text-white shadow-xs"
                        : "bg-white text-slate-600 hover:text-neutral-950 border border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {shortNames[service.id] || service.title}
                  </button>
                );
              })}
            </div>

            {/* Previous / Next Arrow Controls */}
            <div className="flex items-center gap-3">
              <span aria-live="polite" aria-atomic="true" className="text-xs text-slate-500 font-medium font-mono">
                0{activeIndex + 1} / 0{services.length}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    selectService(Math.max(0, activeIndex - 1))
                  }
                  disabled={activeIndex === 0}
                  className="w-11 h-11 md:w-9 md:h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-slate-700 transition-[background-color,transform] duration-160 ease-out-strong active:scale-[0.97] shadow-2xs cursor-pointer"
                  aria-label="Serviço anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    selectService(Math.min(services.length - 1, activeIndex + 1))
                  }
                  disabled={activeIndex === services.length - 1}
                  className="w-11 h-11 md:w-9 md:h-9 rounded-full bg-neutral-950 hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-white transition-[background-color,transform] duration-160 ease-out-strong active:scale-[0.97] shadow-2xs cursor-pointer"
                  aria-label="Próximo serviço"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </BlurReveal>

      </div>
    </section>
  );
};
