import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, type PanInfo } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, SunMedium } from "lucide-react";
import { useMediaQuery } from "../lib/use-media-query";
import { templateData, type TestimonialItem } from "../data/templateData";
import { BlurReveal } from "./ui/blur-reveal";

const photoCardClassName = "relative h-full w-full min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/25 bg-neutral-900 group border border-slate-200/50";

const TestimonialPhotoContent: React.FC<{ item: TestimonialItem }> = ({ item }) => (
  <>
    <img
      src={item.installationImage}
      alt={`Projeto de energia solar para ${item.name}`}
      className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      loading="eager"
      decoding="async"
    />

    {/* Sombra sutil de profundidade apenas na base */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

    {/* ========================================================================= */}
    {/* CARD DE PERFIL EM GLASSMORPHISM OTIMIZADO (SEM CONFLITO DE GPU)          */}
    {/* ========================================================================= */}
    <div className="absolute bottom-4 inset-x-4 sm:bottom-5 sm:inset-x-5 p-3 sm:p-4 rounded-2xl bg-neutral-950/80 border border-white/25 shadow-2xl backdrop-blur-sm flex items-center gap-3.5 overflow-hidden">
      {/* Reflexo especular de vidro translúcido */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/[0.04] to-transparent pointer-events-none" />

      <div className="relative shrink-0 z-10">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-[var(--brand-accent)] shadow-md"
          loading="eager"
          decoding="async"
        />
        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[var(--brand-accent)] border-2 border-neutral-950 flex items-center justify-center shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
        </span>
      </div>

      <div className="overflow-hidden relative z-10">
        <h4 className="font-bold text-white text-sm sm:text-base tracking-tight truncate drop-shadow-sm">
          {item.name}
        </h4>
        <p className="text-xs text-slate-300 leading-snug font-medium mt-0.5 sm:truncate">
          {item.role} • {item.city}
        </p>
      </div>
    </div>
  </>
);

const quoteCardClassName = "relative h-full w-full rounded-3xl bg-gradient-to-br from-[#1B3A5C] to-[#0D1E30] text-white p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_-15px_rgba(27,58,92,0.35)] border border-amber-500/40 flex flex-col justify-between overflow-hidden";

const TestimonialQuoteContent: React.FC<{ item: TestimonialItem; companyName: string }> = ({ item, companyName }) => (
  <>
    {/* Gradiente de luz interna suave */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/[0.2] pointer-events-none" />

    {/* Brilho solar discreto via gradiente radial */}
    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(212,148,42,0.25)_0%,transparent_70%)] pointer-events-none" />

    {/* Aspas e Destaque */}
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div
          className="text-[var(--brand-accent)] text-5xl sm:text-6xl font-serif font-black leading-none select-none opacity-90"
          aria-hidden="true"
        >
          ““
        </div>
        {item.highlight && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-semibold">
            {item.highlight}
          </span>
        )}
      </div>

      {/* Texto do Feedback */}
      <p className="text-white text-base sm:text-lg lg:text-xl font-medium leading-relaxed tracking-tight max-w-xl">
        "{item.quote}"
      </p>
    </div>

    {/* Rodapé do Banner: Estrelas de Avaliação + Identidade Set Solar */}
    <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 sm:pt-8 border-t border-white/15 mt-6 sm:mt-8">
      {/* Estrelas */}
      <div className="flex items-center gap-1.5 text-amber-400">
        {[...Array(item.rating || 5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-current drop-shadow-xs"
          />
        ))}
        <span className="text-xs font-bold text-slate-200 ml-1.5">5.0 no Google Maps</span>
      </div>

      {/* Logo / Selo Sutil */}
      <div className="flex items-center gap-2 text-white/90 text-xs font-semibold uppercase tracking-wider font-mono">
        <SunMedium className="w-4 h-4 text-[var(--brand-accent)]" />
        <span>{companyName}</span>
      </div>
    </div>
  </>
);

export const Testimonials: React.FC = () => {
  const { testimonials, company } = templateData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const total = testimonials.length;
  const mobile = useMediaQuery("(max-width: 1023px)");
  const [showQuote, setShowQuote] = useState(false);
  useEffect(() => { setShowQuote(false); }, [mobile]);
  const moveMobile = (direction: number) => {
    const step = (currentIndex * 2 + Number(showQuote) + direction + total * 2) % (total * 2);
    setCurrentIndex(Math.floor(step / 2));
    setShowQuote(step % 2 === 1);
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Pré-carregamento e pré-decodificação imediata de todas as imagens da obra e avatares
  useEffect(() => {
    testimonials.forEach((item) => {
      const img = new Image();
      img.src = item.installationImage;
      if ("decode" in img) {
        img.decode().catch(() => {});
      }
      const avatar = new Image();
      avatar.src = item.avatar;
      if ("decode" in avatar) {
        avatar.decode().catch(() => {});
      }
    });
  }, [testimonials]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 40;
    const velocityThreshold = 280;
    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      nextSlide();
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      prevSlide();
    }
  };

  const currentItem = testimonials[currentIndex] || testimonials[0];

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 bg-[#fafaf9] border-t border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* HEADER DA SEÇÃO COM BLUR REVEAL                                           */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <BlurReveal delay={0.04} yOffset={14} blur="6px">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
                <span>Avaliações Reais • Google Maps 5.0 ★</span>
              </div>
            </BlurReveal>

            <BlurReveal delay={0.08} yOffset={20} blur="8px" as="h2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-[1.12] block">
                O que nossos clientes dizem sobre a Set Solar
              </span>
            </BlurReveal>

            <BlurReveal delay={0.12} yOffset={16} blur="6px">
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-3 max-w-xl">
                Mais de 600 famílias, comerciantes e produtores rurais em Goiás que trocaram contas altas por economia definitiva.
              </p>
            </BlurReveal>
          </div>

          {/* Controles de Navegação Desktop com feedback tátil */}
          <BlurReveal delay={0.16} yOffset={16} blur="6px" className="hidden lg:flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono font-bold text-slate-500 mr-2 select-none">
              0{currentIndex + 1} / 0{total}
            </span>
            <button
              onClick={prevSlide}
              className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-neutral-800 flex items-center justify-center transition-[background-color,border-color,box-shadow] duration-160 ease-out-strong shadow-xs hover:shadow cursor-pointer"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-neutral-800 flex items-center justify-center transition-[background-color,border-color,box-shadow] duration-160 ease-out-strong shadow-xs hover:shadow cursor-pointer"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </BlurReveal>
        </div>

        {/* ========================================================================= */}
        {/* CARROSSEL COM TRANSIÇÃO EM ESTILO BLUR REVEAL UNIFICADO E SUAVE           */}
        {/* ========================================================================= */}
        <BlurReveal delay={0.18} yOffset={24} blur="10px">
          <div className="relative">
            {/* ========================================================================= */}
            {/* MOBILE UNIFIED EDITORIAL TESTIMONIAL CARD (< lg screens)                 */}
            {/* ========================================================================= */}
            <div className="lg:hidden flex flex-col gap-4" aria-roledescription="carrossel" aria-label="Depoimentos de clientes">
              <div className="grid min-w-0">
                {testimonials.flatMap((item, index) => [false, true].map(quote => {
                  const selected = currentIndex === index && showQuote === quote;
                  return (
                    <motion.div
                      key={item.id + (quote ? "-quote" : "-photo")}
                      aria-hidden={!selected}
                      drag={selected ? "x" : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12}
                      style={{ touchAction: "pan-y", gridArea: "1 / 1", pointerEvents: selected ? "auto" : "none", zIndex: selected ? 1 : 0 }}
                      onDragEnd={(_, info) => {
                        if (Math.abs(info.offset.x) > 40 || Math.abs(info.velocity.x) > 280) moveMobile(info.offset.x < -40 || info.velocity.x < -280 ? 1 : -1);
                      }}
                      initial={false} animate={{ opacity: selected ? 1 : 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.12 : 0.24, ease: [0.77, 0, 0.175, 1] }}
                      className={(selected ? "testimonial-step " : "") + (quote ? quoteCardClassName : photoCardClassName)}
                    >
                      {quote ? (
                        <TestimonialQuoteContent item={item} companyName={company.name} />
                      ) : (
                        <TestimonialPhotoContent item={item} />
                      )}
                    </motion.div>
                  );
                }))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span aria-live="polite" aria-atomic="true" className="text-xs text-slate-600">
                  Avaliação {currentIndex + 1} de {total} · {showQuote ? "Depoimento" : "Projeto Real"}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => moveMobile(-1)} className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center cursor-pointer" aria-label="Etapa anterior do depoimento"><ChevronLeft className="w-4 h-4" /></button>
                  <button onClick={() => moveMobile(1)} className="w-11 h-11 rounded-full bg-neutral-950 text-white flex items-center justify-center cursor-pointer" aria-label="Próxima etapa do depoimento"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* DESKTOP TESTIMONIALS (2 Cards lado a lado mantidos para >= lg)            */}
            {/* ========================================================================= */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch w-full select-none">
              {/* COLUNA ESQUERDA: Card da Obra */}
              <div className="lg:col-span-5 min-h-[380px] sm:min-h-[440px] grid">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={`card-img-${currentItem.id}`}
                    style={{ gridArea: "1 / 1" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={handleDragEnd}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: shouldReduceMotion ? 0.12 : 0.24,
                        ease: [0.77, 0, 0.175, 1],
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: shouldReduceMotion ? 0.12 : 0.2,
                        ease: [0.23, 1, 0.32, 1],
                      },
                    }}
                    className={photoCardClassName}
                  >
                    <TestimonialPhotoContent item={currentItem} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* COLUNA DIREITA: Card de Texto do Feedback */}
              <div className="lg:col-span-7 grid">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={`card-text-${currentItem.id}`}
                    style={{ gridArea: "1 / 1" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={handleDragEnd}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: shouldReduceMotion ? 0.12 : 0.24,
                        ease: [0.77, 0, 0.175, 1],
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: shouldReduceMotion ? 0.12 : 0.2,
                        ease: [0.23, 1, 0.32, 1],
                      },
                    }}
                    className={quoteCardClassName}
                  >
                    <TestimonialQuoteContent item={currentItem} companyName={company.name} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* BARRA INFERIOR DE PAGINAÇÃO E CONTROLES DESKTOP                           */}
            {/* ========================================================================= */}
            <div className="hidden lg:flex items-center justify-between mt-8 pt-2">
              {/* Indicador de Bolinhas com Mola Compartilhada (Layout Spring) */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className="relative h-2 rounded-full cursor-pointer focus:outline-none py-1 flex items-center"
                      style={{ width: isActive ? "2rem" : "0.5rem" }}
                      aria-label={`Ir para depoimento ${idx + 1}`}
                    >
                      <span className="absolute inset-x-0 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-colors" />
                      {isActive && (
                        <motion.span
                          layoutId="active-testimonial-dot"
                          className="absolute inset-x-0 h-2 rounded-full bg-[var(--brand-accent)]"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Controles Desktop */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-neutral-800 flex items-center justify-center transition-[background-color,border-color,transform] duration-160 ease-out-strong shadow-xs active:scale-[0.96] cursor-pointer"
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-neutral-800 flex items-center justify-center transition-[background-color,border-color,transform] duration-160 ease-out-strong shadow-xs active:scale-[0.96] cursor-pointer"
                  aria-label="Próximo depoimento"
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
