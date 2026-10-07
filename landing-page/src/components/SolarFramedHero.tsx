import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { templateData } from "../data/templateData";
import { BlurReveal } from "./ui/blur-reveal";
import { useMediaQuery } from "../lib/use-media-query";

export const SolarFramedHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mobile = useMediaQuery("(max-width: 767px)");
  useEffect(() => {
    if (!mobile || !contentRef.current) return;
    const update = () => {
      const contentHeight = contentRef.current?.getBoundingClientRect().height ?? 0;
      containerRef.current?.style.setProperty("--hero-height", Math.max(window.innerHeight, contentHeight + 176) + "px");
    };
    const observer = new ResizeObserver(update);
    observer.observe(contentRef.current);
    window.addEventListener("resize", update);
    update();
    return () => { observer.disconnect(); window.removeEventListener("resize", update); };
  }, [mobile]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Ultra-responsive spring physics: tracks mousewheel instantly, eliminating sluggish lag and stutter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    mass: 0.1,
    restDelta: 0.0005,
  });

  // Dynamic scroll transformations:
  // Starts with NO border (0px padding, 0px radius - full bleed edge-to-edge).
  // As user scrolls down, the border smoothly appears (0 to 16px padding, 0 to 32px radius).
  const framePadding = useTransform(smoothProgress, [0, 0.6], [0, 16]);
  const borderRadius = useTransform(smoothProgress, [0, 0.6], [0, mobile ? 20 : 32]);
  const borderOpacity = useTransform(smoothProgress, [0.08, 0.55], [0, 1]);

  // Inverse fillet ears scale up on the GPU synchronously as the border appears
  const earScale = useTransform(smoothProgress, [0.08, 0.55], [0, 1]);
  const earOpacity = useTransform(smoothProgress, [0.1, 0.45], [0, 1]);

  const { company } = templateData;
  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    company.whatsappDefaultMessage
  )}`;

  const navLinks = [
    { label: "Sobre Nós", href: "#about" },
    { label: "Como Funciona", href: "#how-it-works" },
    { label: "Soluções", href: "#services" },
    { label: "Feedbacks", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    // Outer scroll container: 135vh provides a snappy, fluid travel distance without scroll drag
    <section ref={containerRef} className="solar-hero relative w-full h-[135vh] bg-white">
      {/* Sticky viewport frame: remains strictly bounded to 100dvh while the frame expands */}
      <div className="solar-hero-viewport sticky top-0 w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-white">
        <motion.div
          style={{
            padding: shouldReduceMotion ? 0 : framePadding,
          }}
          className="solar-hero-frame w-full h-full box-border flex items-center justify-center transform-gpu will-change-[padding]"
        >
          {/* Main Hero Canvas (Contracts into a framed card as user scrolls down) */}
          <motion.div
            style={{
              borderRadius: shouldReduceMotion ? 0 : borderRadius,
            }}
            className="solar-hero-canvas relative w-full h-full overflow-hidden flex flex-col justify-between bg-neutral-950 transform-gpu"
          >
            {/* 1px subtle frame border that fades in as the hero border appears */}
            <motion.div
              style={{
                opacity: shouldReduceMotion ? 0 : borderOpacity,
              }}
              className="absolute inset-0 border border-white/30 pointer-events-none z-20 rounded-[inherit]"
            />

            {/* Background Image: Casa Moderna com Energia Solar */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
              <img
                src="/images/energia-solar-1920.webp"
                srcSet="/images/energia-solar-640.webp 640w, /images/energia-solar-1280.webp 1280w, /images/energia-solar-1920.webp 1920w"
                sizes="100vw"
                // @ts-ignore
                fetchpriority="high"
                alt="Casa moderna sustentável com painéis solares fotovoltaicos"
                decoding="async"
                loading="eager"
                className="w-full h-full object-cover object-[center_35%] lg:object-[center_30%] scale-[1.02] transform-gpu pointer-events-none select-none"
              />

              {/* Directional Vignette & Legibility Gradients */}
              {/* Left-to-right gradient: Protects typography contrast while keeping house and solar roof clear */}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/35 to-transparent pointer-events-none" />

              {/* Bottom-up gradient: Anchors the bottom content */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/15 to-transparent pointer-events-none" />

              {/* Subtle top shade for notch shadow depth */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neutral-900/25 to-transparent pointer-events-none" />
            </div>

            {/* ========================================================================= */}
            {/* SLIM, ELONGATED & ELEGANT WHITE NOTCH (100% Mathematically Centered) */}
            {/* ========================================================================= */}
            <div className="absolute top-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
              <div className="hero-notch relative pointer-events-auto w-[84%] max-w-[360px] md:w-[92%] lg:w-[88%] md:max-w-5xl">
                {/* Notch Body in Solid Pure White: Slim height (py-2), delicate border & soft shadow */}
                <div className="relative bg-white border-b border-x border-slate-200/90 rounded-b-[1.5rem] md:rounded-b-[1.75rem] px-5 md:px-8 py-0 md:py-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.18)] flex items-center justify-between text-neutral-900">
                  {/* Left Ear / Inverse Fillet Wing (GPU scale & fade) */}
                  <motion.div
                    style={{
                      scale: earScale,
                      opacity: earOpacity,
                      transformOrigin: "top right",
                    }}
                    className="absolute top-0 -left-[12px] w-[12px] h-[12px] md:-left-[18px] md:w-[18px] md:h-[18px] pointer-events-none overflow-hidden transform-gpu"
                  >
                    <svg viewBox="0 0 18 18" className="w-full h-full text-white fill-current">
                      <path d="M0 0 H18 V18 C18 8.059 9.941 0 0 0 Z" />
                      <path
                        d="M0 0 C9.941 0 18 8.059 18 18"
                        fill="none"
                        stroke="rgba(226, 232, 240, 0.95)"
                        strokeWidth="1"
                      />
                    </svg>
                  </motion.div>

                  {/* Right Ear / Inverse Fillet Wing (GPU scale & fade) */}
                  <motion.div
                    style={{
                      scale: earScale,
                      opacity: earOpacity,
                      transformOrigin: "top left",
                    }}
                    className="absolute top-0 -right-[12px] w-[12px] h-[12px] md:-right-[18px] md:w-[18px] md:h-[18px] pointer-events-none overflow-hidden transform-gpu"
                  >
                    <svg viewBox="0 0 18 18" className="w-full h-full text-white fill-current">
                      <path d="M18 0 H0 V18 C0 8.059 8.059 0 18 0 Z" />
                      <path
                        d="M18 0 C8.059 0 0 8.059 0 18"
                        fill="none"
                        stroke="rgba(226, 232, 240, 0.95)"
                        strokeWidth="1"
                      />
                    </svg>
                  </motion.div>

                  {/* Brand Logo in Notch */}
                  <a
                    href="#"
                    className="flex items-center group transition-transform active:scale-[0.97] shrink-0"
                    aria-label="World Place Solar - Início"
                  >
                    <img src="/logo-worldplace.svg" alt="World Place Solar" className="h-8 md:h-9 w-auto object-contain" />
                  </a>

                  {/* Center Desktop Navigation Links (Single line, spacious, elegant) */}
                  <div className="hidden md:flex items-center gap-1 md:gap-2">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="whitespace-nowrap px-3.5 py-1 text-xs font-semibold text-slate-600 hover:text-neutral-950 rounded-full hover:bg-slate-100 transition-colors duration-160"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  {/* Right Desktop CTA Action */}
                  <div className="hidden md:flex items-center shrink-0">
                    <a
                      href={company.simulatorUrl || whatsappUrl}
                      target={company.simulatorUrl ? undefined : "_blank"}
                      rel={company.simulatorUrl ? undefined : "noopener noreferrer"}
                      className="whitespace-nowrap inline-flex items-center gap-1.5 px-4 md:px-5 py-1.5 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-[var(--brand-accent-text)] font-bold text-xs tracking-tight transition-[background-color,transform,box-shadow] duration-160 ease-out-strong shadow-sm hover:scale-[1.02] active:scale-[0.97]"
                    >
                      <span>Simular Economia</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Mobile Menu Toggle Button */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-expanded={mobileMenuOpen}
                    aria-controls="hero-mobile-menu"
                    className="md:hidden min-w-11 min-h-11 flex items-center justify-center p-1 rounded-full text-neutral-900 hover:bg-slate-100 transition-colors duration-160"
                    aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>

                {/* Mobile Dropdown Drawer below the white notch with Fluid GPU Scale & Opacity */}
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    id="hero-mobile-menu"
                    style={{ transformOrigin: "top center" }}
                    className="md:hidden mt-2 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-5 shadow-2xl space-y-3"
                  >
                    <div className="flex flex-col space-y-1">
                      {navLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-neutral-950 hover:bg-slate-100 rounded-xl transition-colors duration-160"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <a
                        href={company.simulatorUrl || whatsappUrl}
                        target={company.simulatorUrl ? undefined : "_blank"}
                        rel={company.simulatorUrl ? undefined : "noopener noreferrer"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[var(--brand-accent)] text-[var(--brand-accent-text)] font-bold text-xs shadow-md active:scale-[0.97] transition-transform duration-160 ease-out-strong"
                      >
                        <span>Fazer Simulação Gratuita</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* HERO CONTENT: ANCHORED IN LOWER-LEFT CORNER (Clean left alignment) */}
            {/* ========================================================================= */}
            <div className="relative z-10 w-full flex-1 flex flex-col justify-end px-5 md:px-10 lg:px-14 xl:px-16 pb-8 md:pb-12 lg:pb-16 pt-20 md:pt-24">
              <div ref={contentRef} className="max-w-2xl lg:max-w-3xl text-left">
                {/* Pill Eyebrow Tag */}
                <BlurReveal className="hidden md:block" delay={0.08} yOffset={14} blur="6px">
                  <div className="inline-flex items-center gap-2 px-3 md:px-3.5 py-1 md:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] md:text-xs font-medium tracking-wide mb-3 md:mb-5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] animate-pulse-subtle" />
                    <span className="md:hidden">World Place Solar</span>
                    <span className="hidden md:inline">Projetos & Instalação em Goiânia e Região</span>
                    <span className="hidden md:inline text-white/40">•</span>
                    <span className="hidden md:inline text-[var(--brand-accent)] font-semibold">Até 95% de Economia</span>
                  </div>
                </BlurReveal>

                {/* Headline: Editorial Responsive Layout */}
                <BlurReveal delay={0.16} yOffset={22} blur="8px" as="h1">
                  <span className="text-[2.15rem] leading-[1.08] md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tight mb-3 md:mb-5 block">
                    <span className="md:hidden font-extrabold">
                      Reduza em até 95% a sua conta de luz com{" "}
                      <span className="text-[var(--brand-accent)]">energia solar.</span>
                    </span>
                    <span className="hidden md:inline">
                      <span className="italic font-serif font-normal text-white/95 pr-2 md:pr-3">
                        Energia
                      </span>
                      <span className="font-extrabold text-white">solar.</span>
                      <br />
                      <span className="font-extrabold text-white">Reduza até</span>{" "}
                      <span className="font-extrabold text-[var(--brand-accent)]">95% da sua conta.</span>
                    </span>
                  </span>
                </BlurReveal>

                {/* Subtitle / Description: Responsive length */}
                <BlurReveal delay={0.24} yOffset={20} blur="8px">
                  <p className="text-sm md:text-base lg:text-lg text-slate-200/90 font-normal leading-relaxed mb-6 md:mb-8 max-w-xl text-pretty">
                    <span className="md:hidden">
                      Projetos e instalação de energia solar. Residencial | Comercial | Agronegócio em Goiânia e região.
                    </span>
                    <span className="hidden md:inline">
                      Projetos e instalação de energia solar fotovoltaica para residências, empresas e agronegócio em Goiânia e em todo o estado de Goiás. Descubra a sua economia estimada com uma simulação gratuita e sem compromisso.
                    </span>
                  </p>
                </BlurReveal>

                {/* Dual Pill Buttons */}
                <BlurReveal delay={0.32} yOffset={18} blur="6px">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 mb-0 md:mb-8">
                    <a
                      href={company.simulatorUrl || whatsappUrl}
                      target={company.simulatorUrl ? undefined : "_blank"}
                      rel={company.simulatorUrl ? undefined : "noopener noreferrer"}
                      className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-3 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-[var(--brand-accent-text)] font-bold text-sm md:text-sm tracking-tight transition-[background-color,transform,box-shadow] duration-160 ease-out-strong shadow-xl shadow-black/25 active:scale-[0.97]"
                    >
                      <span className="md:hidden">Simular minha economia</span>
                      <span className="hidden md:inline">Faça uma simulação gratuita</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <a
                      href="#services"
                      className="inline-flex items-center justify-center px-6 md:px-7 py-3 md:py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 font-semibold text-sm md:text-sm transition-[background-color,border-color,transform] duration-160 ease-out-strong hover:border-white/40 active:scale-[0.97] shadow-sm text-center"
                    >
                      <span className="md:hidden">Conheça as soluções</span>
                      <span className="hidden md:inline">Conheça as soluções</span>
                    </a>
                  </div>
                </BlurReveal>

                {/* Trust Features Bar & Mobile Scroll Indicator */}
                <BlurReveal className="hidden md:block" delay={0.38} yOffset={14} blur="6px">
                  <div className="pt-1">
                    {/* Mobile bottom indicator */}
                    <div className="md:hidden flex items-center justify-between text-xs text-white/70 font-medium">
                      <span className="text-[11px] tracking-tight">
                        Residencial • Comercial • Agronegócio
                      </span>
                      <a
                        href="#about"
                        className="w-7 h-7 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/90"
                        aria-label="Rolar para a seção sobre nós"
                      >
                        <span className="text-xs">↓</span>
                      </a>
                    </div>

                    {/* Desktop trust badges */}
                    <div className="hidden md:flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70 font-medium">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                        Simulação 100% gratuita
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                        Sem compromisso de contratar
                      </span>
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                        Residencial, Comercial e Agro
                      </span>
                    </div>
                  </div>
                </BlurReveal>
              </div>
            </div>

            {/* Giant Brand Watermark on Mobile */}
            <div className="hidden absolute bottom-1 inset-x-0 flex justify-center pointer-events-none select-none z-0 opacity-15 overflow-hidden">
              <span className="text-[20vw] font-black text-white tracking-tighter leading-none">
                {company.shortName}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
