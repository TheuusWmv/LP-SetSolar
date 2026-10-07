import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useMediaQuery } from "../lib/use-media-query";
import { templateData } from "../data/templateData";
import { BlurReveal } from "./ui/blur-reveal";

export const Footer: React.FC = () => {
  const { company, services } = templateData;
  const shouldReduceMotion = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    company.whatsappDefaultMessage
  )}`;

  // =========================================================================
  // FÍSICA DE MOLA AVELUDADA & EFEITO ELÁSTICO (Pull-to-Reveal 100% GPU)
  // =========================================================================
  const rawOverscroll = useMotionValue(0);

  const smoothOverscroll = useSpring(rawOverscroll, {
    stiffness: 140,
    damping: 18,
    mass: 0.5,
    restDelta: 0.001,
  });

  // Interpolações contínuas processadas 100% na GPU (sem reflow de layout)
  const logoOpacity = useTransform(smoothOverscroll, [0, 20, 70], [0, 0.45, 1]);
  const logoScale = useTransform(smoothOverscroll, [0, 130], [0.88, 1]);
  const logoY = useTransform(smoothOverscroll, [0, 130], [24, 0]);
  const cardY = useTransform(smoothOverscroll, (v) => -v * 0.08);

  useEffect(() => {
    if (shouldReduceMotion || mobile) { rawOverscroll.set(0); return; }

    const maxOverscroll = 130;
    let currentRaw = 0;
    let wheelReleaseTimer: ReturnType<typeof setTimeout> | null = null;
    let touchStartY: number | null = null;

    const checkIfAtBottom = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      // Margem generosa de 45px para engate imediato e sem engasgos
      return scrollY + viewportHeight >= docHeight - 45;
    };

    // 1. Desktop: Wheel / Trackpad (com resistência progressiva não-linear)
    const handleWheel = (e: WheelEvent) => {
      const atBottom = checkIfAtBottom();

      if (atBottom && e.deltaY > 0) {
        const remaining = maxOverscroll - currentRaw;
        if (remaining > 0) {
          const resistance = Math.pow(Math.max(0, remaining) / maxOverscroll, 0.9);
          currentRaw = Math.min(
            maxOverscroll,
            currentRaw + e.deltaY * 0.65 * Math.max(0.2, resistance)
          );
          rawOverscroll.set(currentRaw);
        }

        // Auto-recoil suave: ao cessar o movimento, a mola recolhe de volta
        if (wheelReleaseTimer) clearTimeout(wheelReleaseTimer);
        wheelReleaseTimer = setTimeout(() => {
          currentRaw = 0;
          rawOverscroll.set(0);
        }, 130);
      } else if (e.deltaY < 0 && currentRaw > 0) {
        currentRaw = 0;
        rawOverscroll.set(0);
      }
    };

    // 2. Mobile / Touch: Arrastar para cima no limite inferior
    const handleTouchStart = (e: TouchEvent) => {
      if (checkIfAtBottom()) {
        touchStartY = e.touches[0].clientY;
      } else {
        touchStartY = null;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY === null) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY; // Positivo ao arrastar para cima

      if (deltaY > 0 && checkIfAtBottom()) {
        const pull = Math.min(maxOverscroll, deltaY * 0.65);
        currentRaw = pull;
        rawOverscroll.set(pull);
      }
    };

    const handleTouchEnd = () => {
      touchStartY = null;
      currentRaw = 0;
      rawOverscroll.set(0);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (wheelReleaseTimer) clearTimeout(wheelReleaseTimer);
    };
  }, [rawOverscroll, shouldReduceMotion, mobile]);

  return (
    <footer className="w-full px-4 pt-0 pb-6 sm:pb-8 bg-white overflow-hidden relative selection:bg-[var(--solar-lime)] selection:text-[var(--solar-lime-text)]">
      {/* 
        Container do Footer:
        - Segue EXATAMENTE a mesma largura da CTA e da Hero Section com borda (w-full com px-4)
        - Mesma curvatura arredondada (rounded-[32px])
        - Borda sutil de 1px e sombra elegante em relevo
        - Reação física orgânica no eixo Y ao ser puxado
      */}
      <motion.div
        style={{ y: mobile || shouldReduceMotion ? 0 : cardY }}
        className="w-full rounded-[32px] bg-white border border-slate-200/90 shadow-[0_22px_70px_rgba(15,23,42,0.10),0_6px_20px_rgba(15,23,42,0.05)] p-5 md:p-10 lg:p-12 transform-gpu"
      >
        <BlurReveal delay={0.06} yOffset={24} blur="8px">
          {/* Grid Principal com Logo/Sobre à esquerda e Colunas de Links à direita */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Coluna da Marca (Logo + Descrição Institucional) */}
            <div className="lg:col-span-5 space-y-4">
              <a
                href="#"
                className="inline-flex items-center group transition-transform duration-160 ease-out-strong active:scale-[0.97]"
                aria-label="World Place Solar"
              >
                <img src="/logo-worldplace.svg" alt="World Place Solar" className="h-10 sm:h-11 w-auto object-contain" />
              </a>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm text-pretty">
                <span className="md:hidden">
                  Energia solar de alta performance para residências, empresas e agronegócio.
                </span>
                <span className="hidden md:inline">
                  A World Place Solar transforma luz solar em autonomia financeira e sustentabilidade para residências, comércios e agronegócio em Goiânia e em todo o estado de Goiás.
                </span>
              </p>

              <div className="pt-1 text-xs text-slate-500 space-y-1">
                <p className="font-medium text-slate-700">{company.razaoSocial}</p>
                <p>CNPJ: {company.cnpj} • Goiânia - GO</p>
              </div>

              {company.email && <div className="hidden md:block pt-1">
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-neutral-950 transition-colors"
                >
                  <span>{company.email}</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>}
            </div>

            {/* Colunas de Navegação à direita */}
            <div className="lg:col-span-7">
              {/* MOBILE NAVIGATION LAYOUT (< sm screens, matching mobile-redesign) */}
              <div className="mobile-footer md:hidden flex flex-col gap-3">
                <div className="pb-4 border-b border-slate-200 text-sm text-slate-600">
                  <h3 className="font-bold text-neutral-900 mb-2">Vamos conversar?</h3>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Fale pelo WhatsApp ↗</a>
                  <a href={`tel:+55${company.phone.replace(/\D/g, "")}`}>{company.phoneFormatted || company.phone}</a>
                  {company.instagram && (
                    <a href={company.instagram} target="_blank" rel="noopener noreferrer">Instagram @world_placesolar ↗</a>
                  )}
                  {company.email && <a href={`mailto:${company.email}`}>{company.email}</a>}
                  <p className="text-xs leading-relaxed mt-2">{company.address}</p>
                  {company.workingHours && <p className="text-xs leading-relaxed mt-2">{company.workingHours}</p>}
                </div>
                <details className="border-b border-slate-200">
                  <summary className="font-bold text-sm cursor-pointer">Explore</summary>
                  <nav aria-label="Explore">
                    <a href="#about">Sobre nós</a>
                    <a href="#how-it-works">Como funciona</a>
                    <a href="#services">Nossas soluções</a>
                    <a href="#testimonials">Feedbacks</a>
                    <a href="#faq">Dúvidas frequentes</a>
                    <a href={company.simulatorUrl || whatsappUrl} target={company.simulatorUrl ? undefined : "_blank"} rel={company.simulatorUrl ? undefined : "noopener noreferrer"}>Simulador Solar</a>
                  </nav>
                </details>
                <details className="border-b border-slate-200">
                  <summary className="font-bold text-sm cursor-pointer">Soluções</summary>
                  <nav aria-label="Soluções">{services.map(service => <a key={service.id} href="#services">{service.title}</a>)}</nav>
                </details>
              </div>

              {/* DESKTOP NAVIGATION LAYOUT (>= sm screens) */}
              <div className="hidden md:grid md:grid-cols-3 gap-8">
                {/* Coluna 1: Soluções */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Soluções
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-500">
                    {services.slice(0, 5).map((service) => (
                      <li key={service.id}>
                        <a
                          href="#services"
                          className="hover:text-neutral-950 transition-colors block"
                        >
                          {service.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coluna 2: Recursos / Institucional */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Recursos
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-500">
                    <li>
                      <a href="#about" className="hover:text-neutral-950 transition-colors block">
                        Sobre a World Place Solar
                      </a>
                    </li>
                    <li>
                      <a href="#how-it-works" className="hover:text-neutral-950 transition-colors block">
                        Como Funciona
                      </a>
                    </li>
                    <li>
                      <a href="#testimonials" className="hover:text-neutral-950 transition-colors block">
                        Feedbacks
                      </a>
                    </li>
                    <li>
                      <a href="#faq" className="hover:text-neutral-950 transition-colors block">
                        Dúvidas Frequentes
                      </a>
                    </li>
                    <li>
                      <a
                        href={company.simulatorUrl || whatsappUrl}
                        target={company.simulatorUrl ? undefined : "_blank"}
                        rel={company.simulatorUrl ? undefined : "noopener noreferrer"}
                        className="hover:text-neutral-950 transition-colors block font-medium text-slate-700"
                      >
                        Simulador Solar
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Coluna 3: Empresa / Contato */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Atendimento
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-500">
                    <li>
                      <a
                        href={`tel:+55${company.phone.replace(/\D/g, "")}`}
                        className="hover:text-neutral-950 transition-colors block font-medium text-slate-700"
                      >
                        {company.phoneFormatted || company.phone}
                      </a>
                    </li>
                    <li>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-neutral-950 transition-colors block"
                      >
                        WhatsApp Comercial
                      </a>
                    </li>
                    {company.instagram && (
                      <li>
                        <a
                          href={company.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-neutral-950 transition-colors block font-medium text-slate-700"
                        >
                          Instagram @world_placesolar ↗
                        </a>
                      </li>
                    )}
                    {company.email && <li>
                      <a
                        href={`mailto:${company.email}`}
                        className="hover:text-neutral-950 transition-colors block truncate"
                      >
                        {company.email}
                      </a>
                    </li>}
                    <li>
                      <span className="block text-slate-400">
                        {company.city} • {company.state}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Divisor Delicado */}
          <div className="border-t border-slate-100 my-6 sm:my-10" />

          {/* Barra Inferior com Copyright e Links Legais (Conforme referência) */}
          <div className="footer-legal flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} {company.name} ({company.razaoSocial} • CNPJ {company.cnpj}). Todos os direitos reservados.
            </p>

            <div className="flex items-center gap-5 sm:gap-6">
              <a href="/privacidade.html" className="hover:text-slate-700 underline-offset-4 hover:underline transition-colors text-[11px] sm:text-xs">
                Privacidade
              </a>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-neutral-950 transition-colors cursor-pointer text-[11px] sm:text-xs"
                title="Voltar ao topo da página"
              >
                <span className="md:hidden">Topo</span><span className="hidden md:inline">De volta ao topo</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </BlurReveal>
      </motion.div>

      {/* 
        =============================================================================
        EFEITO ELÁSTICO 100% GPU (RUBBER-BAND REVEAL SEM REFLOW DE LAYOUT)
        - Translação no eixo Y e Escala com física de mola
        =============================================================================
      */}
      <motion.div
        style={{
          opacity: shouldReduceMotion ? 0 : logoOpacity,
          scale: shouldReduceMotion ? 1 : logoScale,
          y: shouldReduceMotion ? 0 : logoY,
        }}
        className="hidden md:flex w-full h-24 sm:h-32 overflow-hidden select-none pointer-events-none flex items-center justify-center transform-gpu"
      >
        <div className="w-full flex justify-center items-center py-2 sm:py-3">
          <span className="text-[12vw] sm:text-[13vw] font-bold tracking-tight leading-none bg-gradient-to-b from-slate-500/85 via-slate-400/40 to-transparent bg-clip-text text-transparent select-none">
            {company.shortName}
          </span>
        </div>
      </motion.div>
    </footer>
  );
};
