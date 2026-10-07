import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, type PanInfo } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, SunMedium } from "lucide-react";
import { useMediaQuery } from "../lib/use-media-query";
import { templateData } from "../data/templateData";
import { BlurReveal } from "./ui/blur-reveal";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  installationImage: string;
  quote: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: "mariana-vasconcellos",
    name: "Mariana Vasconcellos",
    role: "Residência familiar",
    city: "Cenário ilustrativo",
    avatar:
      "/images/avatar-mariana.jpg",
    installationImage:
      "/images/solar-residencial.jpg",
    quote:
      "Instalamos para alimentar o ar-condicionado na casa toda e o aquecimento da piscina. Não ter que se preocupar com o consumo no fim do mês traz uma tranquilidade indescritível. A equipe da World Place Solar deixou tudo limpo, impecável e homologou antes do prazo prometido.",
  },
  {
    id: "carlos-moreira",
    name: "Carlos Eduardo Moreira",
    role: "Moreira Metalúrgica",
    city: "Cenário ilustrativo",
    avatar:
      "/images/avatar-carlos.jpg",
    installationImage:
      "/images/solar-industrial.jpg",
    quote:
      "Nossa conta de luz era uma das maiores despesas do galpão fabril. A World Place Solar fez um estudo cirúrgico, instalou os módulos sem interromper nossa linha de produção e o suporte técnico em cada etapa da homologação na concessionária foi exemplar.",
  },
  {
    id: "guilherme-sampaio",
    name: "Guilherme Sampaio",
    role: "Granja & Agro Sampaio",
    city: "Cenário ilustrativo",
    avatar:
      "/images/avatar-guilherme.jpg",
    installationImage:
      "/images/solar-rural.jpg",
    quote:
      "No campo a energia oscila muito e as tarifas subiram demais. Com o projeto da World Place Solar, além de cortar o custo operacional, ganhamos segurança total para climatização de aviários e ordenha mecânica. Um investimento que se paga sozinho.",
  },
  {
    id: "roberto-guimaraes",
    name: "Dr. Roberto Guimarães",
    role: "Clínica Integrada Santa Clara",
    city: "Cenário ilustrativo",
    avatar:
      "/images/avatar-roberto.jpg",
    installationImage:
      "/images/solar-comercial.jpg",
    quote:
      "Com o sistema híbrido de painéis e armazenamento por baterias de lítio dimensionado pela World Place Solar, nossa clínica nunca para, mesmo durante oscilações ou apagões na rede elétrica. Confiabilidade e tranquilidade absoluta para nossos procedimentos.",
  },
  {
    id: "fabiana-becker",
    name: "Fabiana Becker",
    role: "Supermercados Becker",
    city: "Cenário ilustrativo",
    avatar:
      "/images/avatar-fabiana.jpg",
    installationImage:
      "/images/solar-comercial.jpg",
    quote:
      "Câmaras frigoríficas e balcões refrigerados ligados 24 horas consumiam uma fortuna. A instalação foi feita em horário planejado sem atrapalhar nossos clientes e o suporte pós-venda da World Place Solar é excepcional.",
  },
  {
    id: "leticia-bruno",
    name: "Letícia & Bruno Albuquerque",
    role: "Residência Jardins",
    city: "Cenário ilustrativo",
    avatar:
      "/images/avatar-leticia.jpg",
    installationImage:
      "/images/solar-baterias.jpg",
    quote:
      "Tínhamos receio de obras demoradas ou problemas de infiltração. A equipe da World Place Solar instalou tudo com extrema agilidade, limpeza e zero furos aparentes. Dá gosto olhar o aplicativo e ver o sol gerando nossa própria energia.",
  },
];

const photoCardClassName = "relative h-full w-full min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/25 bg-neutral-900 group border border-slate-200/50";

const TestimonialPhotoContent: React.FC<{ item: TestimonialItem }> = ({ item }) => (
  <>
    <img
      src={item.installationImage}
      alt="Imagem ilustrativa de projeto solar"
      className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      loading="eager"
      decoding="async"
    />

    {/* Sombra sutil de profundidade apenas na base */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

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
        <p className="text-xs text-white/90 leading-snug font-medium mt-0.5 sm:truncate">
          {item.role} • {item.city}
        </p>
      </div>
    </div>
  </>
);

const quoteCardClassName = "relative h-full w-full rounded-3xl bg-gradient-to-br from-[#E9191B] to-[#872325] text-white p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_-15px_rgba(233,25,27,0.25)] border border-red-500/40 flex flex-col justify-between overflow-hidden";

const TestimonialQuoteContent: React.FC<{ item: TestimonialItem; companyName: string }> = ({ item, companyName }) => (
  <>
    {/* Gradiente de luz interna suave (Shading elegante) */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/[0.12] pointer-events-none" />

    {/* Brilho solar discreto via gradiente radial (zero conflito de filtro com a GPU) */}
    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.25)_0%,transparent_70%)] pointer-events-none" />

    {/* Marca d'água orgânica de fundo */}
    <div
      className="absolute -right-8 -top-8 w-72 h-72 text-white/[0.08] pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="currentColor"
        className="w-full h-full"
      >
        <path d="M45,-76.3C58.3,-69.5,69,-57.1,77.5,-43.3C86,-29.5,92.3,-14.8,91.8,-0.3C91.3,14.2,84,28.4,75.1,41.2C66.2,54,55.7,65.4,42.8,72.7C29.9,80,14.9,83.2,-0.2,83.6C-15.3,83.9,-30.7,81.4,-44.6,74.5C-58.5,67.6,-70.9,56.3,-78.7,42.6C-86.5,28.9,-89.7,12.8,-88.4,-3C-87,-18.8,-81.1,-34.3,-71.7,-46.8C-62.3,-59.3,-49.4,-68.8,-35.5,-75.2C-21.6,-81.6,-6.7,-84.9,7.6,-83.4C21.9,-81.9,31.7,-83.1,45,-76.3Z" transform="translate(100 100)" />
      </svg>
    </div>

    {/* Aspas Estilizadas Superiores */}
    <div className="relative z-10">
      <div
        className="text-white text-5xl sm:text-6xl font-serif font-black leading-none mb-6 select-none opacity-80"
        aria-hidden="true"
      >
        ““
      </div>

      {/* Texto do Feedback */}
      <p className="text-white text-base sm:text-lg lg:text-xl font-medium leading-relaxed tracking-tight max-w-xl">
        {item.quote}
      </p>
    </div>

    {/* Rodapé do Banner: Estrelas de Avaliação + Identidade World Place Solar */}
    <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/20 mt-8">
      {/* Estrelas */}
      <div className="flex items-center gap-1.5 text-white">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-current drop-shadow-xs"
          />
        ))}
      </div>

      {/* Logo / Selo Sutil */}
      <div className="flex items-center gap-2 text-white/90 text-xs font-semibold uppercase tracking-wider font-mono">
        <SunMedium className="w-4 h-4 text-white" />
        <span>{companyName}</span>
      </div>
    </div>
  </>
);

export const Testimonials: React.FC = () => {
  const { company } = templateData;
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
  }, []);

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

  const currentItem = testimonials[currentIndex];

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
                <span>Experiências & Resultados</span>
              </div>
            </BlurReveal>

            <BlurReveal delay={0.08} yOffset={20} blur="8px" as="h2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-[1.12] block">
                Como é gerar com a World Place Solar
              </span>
            </BlurReveal>

            <BlurReveal delay={0.12} yOffset={16} blur="6px">
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-3 max-w-xl">
                Cenários de economia real para residências, empresas e agronegócio em Goiânia e região com a World Place Solar.
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
          <div
            className="relative"
          >
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
                <span aria-live="polite" aria-atomic="true" className="text-xs text-slate-600">Exemplo {currentIndex + 1} de {total} · {showQuote ? "Relato" : "Foto"}</span>
                <div className="flex gap-2">
                  <button onClick={() => moveMobile(-1)} className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center" aria-label="Etapa anterior do depoimento"><ChevronLeft className="w-4 h-4" /></button>
                  <button onClick={() => moveMobile(1)} className="w-11 h-11 rounded-full bg-neutral-950 text-white flex items-center justify-center" aria-label="Próxima etapa do depoimento"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* DESKTOP TESTIMONIALS (2 Cards lado a lado mantidos para >= lg)            */}
            {/* ========================================================================= */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch w-full select-none">
              {/* COLUNA ESQUERDA: Card da Obra (com Blur Reveal perfeitamente sincronizado) */}
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

            {/* COLUNA DIREITA: Card de Texto do Feedback (com Blur Reveal perfeitamente sincronizado) */}
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
          {/* BARRA INFERIOR DE PAGINAÇÃO E CONTROLES MOBILE                            */}
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
                        className="absolute inset-x-0 h-2 rounded-full bg-[#1b1b1b]"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Controles Mobile com feedback tátil */}
            <div className="flex sm:hidden items-center gap-2">
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
