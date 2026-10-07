import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Zap, ShieldCheck, Award, ArrowUpRight, Sun, TrendingDown } from "lucide-react";
import { templateData } from "../data/templateData";
import { BlurReveal, BlurRevealGroup, BlurRevealItem } from "./ui/blur-reveal";
import { AnimatedCounter } from "./ui/animated-counter";

export const AboutUs: React.FC = () => {
  const { company } = templateData;
  const shouldReduceMotion = useReducedMotion();

  // Ref e monitor de visibilidade dedicado para o highlight Block Reveal
  const highlightRef = useRef<HTMLSpanElement>(null);
  const isHighlightInView = useInView(highlightRef, { amount: 0.2 });

  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    "Olá! Gostaria de entender qual projeto solar faz sentido para o meu imóvel."
  )}`;

  return (
    <section id="about" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* CABEÇALHO DA SEÇÃO COM BLOCK REVEAL NO HIGHLIGHT "MAIS INTELIGENTE"       */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            {/* Pill Eyebrow */}
            <BlurReveal delay={0.04} yOffset={16} blur="6px">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
                <span>Sobre a World Place Solar</span>
              </div>
            </BlurReveal>

            {/* Título com Animação Block Reveal no Highlight (reexecuta ao rolar de volta) */}
            <BlurReveal delay={0.12} yOffset={22} blur="8px" as="h2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-[1.15] block">
                Invista em energia solar com{" "}
                <span
                  ref={highlightRef}
                  className="relative inline-block align-middle my-1 overflow-hidden rounded-full"
                >
                  {/* Elemento de Highlight com o Texto e o Ícone de Sol */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={
                      isHighlightInView
                        ? { opacity: 1 }
                        : { opacity: shouldReduceMotion ? 1 : 0 }
                    }
                    transition={{
                      duration: 0.05,
                      delay: isHighlightInView && !shouldReduceMotion ? 0.38 : 0,
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[var(--brand-accent)] text-[var(--brand-accent-text)] text-2xl sm:text-3xl lg:text-4xl font-black align-middle shadow-xs"
                  >
                    <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--brand-accent-text)] inline" />
                    <span>clareza</span>
                  </motion.span>

                  {/* Bloco Cortina (Block Reveal) que varre e revela o highlight a cada entrada */}
                  {!shouldReduceMotion && (
                    <motion.span
                      initial={{ x: "-100%" }}
                      animate={
                        isHighlightInView
                          ? { x: ["-100%", "0%", "100%"] }
                          : { x: "-100%" }
                      }
                      transition={
                        isHighlightInView
                          ? {
                            duration: 0.65,
                            delay: 0.18,
                            ease: [0.23, 1, 0.32, 1],
                          }
                          : {
                            duration: 0.01,
                          }
                      }
                      className="absolute inset-0 bg-neutral-950 rounded-full z-20 pointer-events-none"
                      aria-hidden="true"
                    />
                  )}
                </span>{" "}
                em cada etapa.
              </span>
            </BlurReveal>
          </div>

          <BlurReveal delay={0.18} yOffset={20} blur="8px" className="max-w-md">
            <p className="text-base text-slate-600 leading-relaxed lg:pb-1 font-normal">
              Antes de contratar, entenda quanto investir, quanto pode economizar e como o sistema será instalado.
              Depois, conte com a World Place Solar para conduzir o projeto, a engenharia e a aprovação junto à concessionária.
            </p>
          </BlurReveal>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE BENTO LAYOUT (< md screens, matching mobile-redesign.png)          */}
        {/* ========================================================================= */}
        <div className="mobile-bento md:hidden grid grid-cols-2 gap-3 mb-2">
          {/* Card 1: Foto Vertical Principal */}
          <BlurReveal yOffset={20} blur="6px" className="relative rounded-[2rem] overflow-hidden col-span-2 min-h-[240px] border border-slate-200/80 shadow-md flex flex-col justify-end p-5">
            <img
              src="/images/solar-rural.jpg"
              alt="Painéis solares instalados em área aberta"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/25 to-transparent pointer-events-none" />

            <div className="relative z-10 text-white">
              <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 text-white">
                <Sun className="w-4 h-4 text-[var(--brand-accent)]" />
              </div>
              <p className="font-bold text-sm text-white leading-snug">
                Engenharia, cuidado e energia limpa.
              </p>
              <p className="text-xs text-slate-200/90 mt-0.5">
                Um projeto pensado para o seu dia a dia.
              </p>
            </div>
          </BlurReveal>

          {/* Card 2: Foto Horizontal dos Painéis */}
          <BlurReveal yOffset={20} blur="6px" className="relative rounded-[2rem] overflow-hidden col-span-2 order-3 min-h-[152px] border border-slate-200/80 shadow-md flex items-end justify-between p-5">
            <img
              src="/images/solar-residencial.jpg"
              alt="Painéis solares fotovoltaicos sobre gramado sustentável"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-[70%]">
              <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                Bom para você.<br />Melhor para o planeta.
              </h3>
            </div>

            <a
              href={company.simulatorUrl || whatsappUrl}
              target={company.simulatorUrl ? undefined : "_blank"}
              rel={company.simulatorUrl ? undefined : "noopener noreferrer"}
              className="relative z-10 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shrink-0 active:scale-95"
              aria-label="Simular economia com painéis solares"
            >
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
          </BlurReveal>

          {/* Cards 3 & 4: 2 Colunas Lado a Lado (Stats Compactos) */}
          <div className="col-span-2 grid grid-cols-2 gap-3">
            {/* Card 3: Red 95% Card */}
            <BlurReveal yOffset={16} blur="6px" className="min-h-[176px] min-w-0 rounded-[1.75rem] bg-gradient-to-br from-[#E9191B] to-[#872325] p-4 flex flex-col justify-between border border-red-500/40 shadow-sm text-white">
              <div className="flex items-center justify-between mb-2">
                <TrendingDown className="w-5 h-5 text-white" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-white/80">Economia</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-white/90 block">Economia de até</span>
                <div className="text-4xl font-black text-white tracking-tighter leading-none my-1">
                  <AnimatedCounter value={95} suffix="%" duration={1.2} />
                </div>
                <p className="text-xs text-white/90 leading-tight mt-1">
                  na conta de energia, conforme o projeto.
                </p>
              </div>
            </BlurReveal>

            {/* Card 4: Dark Navy Card */}
            <BlurReveal yOffset={16} blur="6px" className="min-h-[176px] min-w-0 rounded-[1.75rem] bg-neutral-950 text-white p-4 flex flex-col justify-between border border-neutral-800 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <Sun className="w-4 h-4 text-[var(--brand-accent)]" />
                <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight leading-snug">
                  Energia que se renova.
                </h4>
                <div className="text-xl font-black text-[var(--brand-accent)] tracking-tight mt-1">
                  Goiânia/GO
                </div>
                <p className="text-xs text-slate-400 leading-tight mt-0.5">
                  Projetos residenciais, comerciais e agro.
                </p>
              </div>
            </BlurReveal>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP BENTO GRID (Original 5 cards mantidos intactos para >= md)        */}
        {/* ========================================================================= */}
        <p className="md:hidden text-xs leading-relaxed text-slate-600 mt-4 mb-6">Solicite uma indicação de equipamentos e garantias para o seu projeto com a World Place Solar.</p>

        <BlurRevealGroup
          stagger={0.08}
          delay={0.05}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6"
        >
          {/* Bento Item 1: Foto Destaque (Col 1-7) */}
          <BlurRevealItem
            yOffset={28}
            className="lg:col-span-7 relative min-h-[360px] sm:min-h-[440px] rounded-[2rem] overflow-hidden group shadow-lg shadow-neutral-900/5 border border-slate-200/80 flex flex-col justify-between p-6 sm:p-8"
          >
            <img
              src="/images/solar-rural.jpg"
              alt="Instalação profissional de painéis solares em telhado"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-240 ease-out-strong group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-transparent pointer-events-none" />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-[var(--brand-accent)]" />
                Projeto solar sob medida
              </span>
              <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-transform duration-200 ease-out-strong group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 max-w-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                A economia começa com um projeto bem feito
              </h3>
              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed">
                Seu consumo, a área disponível e o sombreamento orientam cada escolha.
                É assim que o sistema pode ser dimensionado com máxima precisão para o seu imóvel.
              </p>
            </div>
          </BlurRevealItem>

          {/* Bento Item 2: Card Solar Red (Col 8-12) */}
          <BlurRevealItem
            yOffset={28}
            className="lg:col-span-5 rounded-[2rem] bg-gradient-to-br from-[#E9191B] to-[#872325] p-7 sm:p-8 flex flex-col justify-between shadow-lg shadow-red-950/15 border border-red-500/40 group transition-shadow duration-200 ease-out-strong hover:shadow-xl text-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-white/80">
                Redução de Custos
              </span>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>

            <div className="my-6 sm:my-8">
              <div className="text-5xl sm:text-6xl font-black text-white tracking-tighter leading-none mb-3">
                <AnimatedCounter value={95} suffix="%" duration={1.2} />
              </div>
              <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                Até 95% de redução na conta, conforme o consumo e as condições do projeto.
              </p>
            </div>

            <p className="text-xs text-white/80 leading-relaxed border-t border-white/20 pt-4">
              Uma conta menor abre espaço para os planos da família e para o próximo
              investimento da empresa ou agronegócio. Descubra o potencial de economia do seu imóvel.
            </p>
          </BlurRevealItem>

          {/* Bento Item 3: Dark Navy Authority Card (Col 1-4) */}
          <BlurRevealItem
            yOffset={28}
            className="lg:col-span-4 rounded-[2rem] bg-neutral-950 text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl border border-neutral-800 group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Atendimento local
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-accent)] animate-pulse-subtle" />
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                Goiânia/GO
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                A World Place Solar está sediada em Goiânia e atende Goiânia, região metropolitana e todo o estado de Goiás.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 text-xs font-semibold text-[var(--brand-accent)]">
              Goiânia/GO • Atendimento Regional
            </div>
          </BlurRevealItem>

          {/* Bento Item 4: Cumulative Savings Card (Col 5-8) */}
          <BlurRevealItem
            yOffset={28}
            className="lg:col-span-4 rounded-[2rem] bg-slate-50 p-7 sm:p-8 flex flex-col justify-between border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 ease-out-strong"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Projeto sob medida
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                <Zap className="w-4 h-4" />
              </div>
            </div>

            <div className="my-6">
              <div className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-2">
                Simule sua economia
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Informe seu consumo e receba uma estimativa inicial para sua residência ou empresa.
              </p>
            </div>

            <div className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5 pt-4 border-t border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Geração limpa em tempo real</span>
            </div>
          </BlurRevealItem>

          {/* Bento Item 5: Warranty & Quality Card (Col 9-12) */}
          <BlurRevealItem
            yOffset={28}
            className="lg:col-span-4 rounded-[2rem] bg-[#1e1e1e] text-white p-7 sm:p-8 flex flex-col justify-between shadow-lg border border-neutral-800"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Equipamentos e garantias
              </span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[var(--brand-accent)]">
                <Award className="w-4 h-4" />
              </div>
            </div>

            <div className="my-6">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                Escolha com clareza
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Conheça as opções de módulos, inversores e garantias indicadas para o seu projeto com a World Place Solar.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] flex items-center gap-1 group pt-4 border-t border-white/10 transition-colors duration-160"
            >
              <span>Conversar sobre meu projeto</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-160 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </BlurRevealItem>
        </BlurRevealGroup>
      </div>
    </section>
  );
};
