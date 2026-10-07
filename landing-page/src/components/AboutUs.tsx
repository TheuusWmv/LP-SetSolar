import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ShieldCheck, Award, ArrowUpRight, Sun, TrendingDown, MapPin } from "lucide-react";
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
    "Olá! Gostaria de conversar com a equipe técnica da Set Solar sobre o meu imóvel."
  )}`;

  return (
    <section id="about" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* CABEÇALHO DA SEÇÃO COM BLOCK REVEAL NO HIGHLIGHT "CLAREZA E SEGURANÇA"    */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            {/* Pill Eyebrow */}
            <BlurReveal delay={0.04} yOffset={16} blur="6px">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
                <span>Sobre a Set Solar</span>
              </div>
            </BlurReveal>

            {/* Título com Animação Block Reveal no Highlight */}
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
                    className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[var(--brand-accent)] text-white text-2xl sm:text-3xl lg:text-4xl font-black align-middle shadow-xs"
                  >
                    <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-white inline" />
                    <span>clareza e segurança</span>
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
              Fundada em Trindade - GO pelo engenheiro Davi Carvalho da Mata Barbosa, a Set Solar combina rigor técnico acadêmico em Engenharia Elétrica, atendimento humanizado e soluções que transformam a conta de luz dos goianos em investimento seguro e sustentável.
            </p>
          </BlurReveal>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE BENTO LAYOUT (< md screens)                                        */}
        {/* ========================================================================= */}
        <div className="mobile-bento md:hidden grid grid-cols-2 gap-3 mb-2">
          {/* Card 1: Foto Vertical Principal */}
          <BlurReveal yOffset={20} blur="6px" className="relative rounded-[2rem] overflow-hidden col-span-2 min-h-[240px] border border-slate-200/80 shadow-md flex flex-col justify-end p-5">
            <img
              src="/images/projetos/residencial-le-jardam.png"
              alt="Projeto Residencial Set Solar instalado com excelência em Goiás"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/25 to-transparent pointer-events-none" />

            <div className="relative z-10 text-white">
              <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 text-white">
                <ShieldCheck className="w-4 h-4 text-[var(--brand-accent)]" />
              </div>
              <p className="font-bold text-sm text-white leading-snug">
                Engenharia Sob Medida com ART
              </p>
              <p className="text-xs text-slate-200/90 mt-0.5">
                Davi Carvalho (Engenheiro IF Goiano) e equipe própria.
              </p>
            </div>
          </BlurReveal>

          {/* Card 2: Foto Horizontal dos Projetos Comerciais */}
          <BlurReveal yOffset={20} blur="6px" className="relative rounded-[2rem] overflow-hidden col-span-2 order-3 min-h-[152px] border border-slate-200/80 shadow-md flex items-end justify-between p-5">
            <img
              src="/images/projetos/posto-mak.jpg"
              alt="Usinas solares comerciais instaladas em Trindade e região pela Set Solar"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-[70%]">
              <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                Mais de 600 Projetos.<br />Trindade, Goiânia e Goiás.
              </h3>
            </div>

            <a
              href={company.simulatorUrl || whatsappUrl}
              target={company.simulatorUrl ? undefined : "_blank"}
              rel={company.simulatorUrl ? undefined : "noopener noreferrer"}
              className="relative z-10 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shrink-0 active:scale-95"
              aria-label="Simular economia com a Set Solar"
            >
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>
          </BlurReveal>

          {/* Cards 3 & 4: 2 Colunas Lado a Lado (Stats Compactos) */}
          <div className="col-span-2 grid grid-cols-2 gap-3">
            {/* Card 3: Deep Navy & Amber 95% Card */}
            <BlurReveal yOffset={16} blur="6px" className="min-h-[176px] min-w-0 rounded-[1.75rem] bg-gradient-to-br from-[#1B3A5C] to-[#0D1E30] p-4 flex flex-col justify-between border border-amber-500/40 shadow-sm text-white">
              <div className="flex items-center justify-between mb-2">
                <TrendingDown className="w-5 h-5 text-[var(--brand-accent)]" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">Economia</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-white/90 block">Redução de até</span>
                <div className="text-4xl font-black text-white tracking-tighter leading-none my-1">
                  <AnimatedCounter value={95} suffix="%" duration={1.2} />
                </div>
                <p className="text-xs text-slate-300 leading-tight mt-1">
                  na conta de luz desde o primeiro mês.
                </p>
              </div>
            </BlurReveal>

            {/* Card 4: Dark Navy Authority Card */}
            <BlurReveal yOffset={16} blur="6px" className="min-h-[176px] min-w-0 rounded-[1.75rem] bg-gradient-to-br from-[#1B3A5C] to-[#0D1E30] border border-amber-500/30 text-white shadow-sm p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <MapPin className="w-4 h-4 text-[var(--brand-accent)]" />
                <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight leading-snug">
                  Sede Própria
                </h4>
                <div className="text-xl font-black text-[var(--brand-accent)] tracking-tight mt-1">
                  Trindade/GO
                </div>
                <p className="text-xs text-slate-400 leading-tight mt-0.5">
                  Av. Manoel Monteiro, 1717.
                </p>
              </div>
            </BlurReveal>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP BENTO GRID (5 cards estratégicos)                                */}
        {/* ========================================================================= */}
        <p className="md:hidden text-xs leading-relaxed text-slate-600 mt-4 mb-6">
          Fundada pelo engenheiro Davi Carvalho (IF Goiano), a Set Solar cuida de todo o seu projeto em Trindade e Goiás.
        </p>

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
              src="/images/projetos/residencial-le-jardam.png"
              alt="Instalação residencial Set Solar no condomínio Le Jardam"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-240 ease-out-strong group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-transparent pointer-events-none" />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-[var(--brand-accent)]" />
                Engenharia Sob Medida com ART
              </span>
              <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-transform duration-200 ease-out-strong group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 max-w-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                A economia real começa com um projeto bem dimensionado
              </h3>
              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed">
                Seu consumo elétrico, tipo de telhado e orientação solar guiam cada decisão técnica. É assim que garantimos a máxima geração e proteção da sua estrutura civil.
              </p>
            </div>
          </BlurRevealItem>

          {/* Bento Item 2: Card Métrico de Destaque (Col 8-12) */}
          <BlurRevealItem
            yOffset={28}
            className="lg:col-span-5 rounded-[2rem] bg-gradient-to-br from-[#1B3A5C] to-[#0D1E30] p-7 sm:p-8 flex flex-col justify-between shadow-lg shadow-sky-950/20 border border-amber-500/40 group transition-shadow duration-200 ease-out-strong hover:shadow-xl text-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300">
                Redução Garantida
              </span>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-[var(--brand-accent)] flex items-center justify-center">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>

            <div className="my-6 sm:my-8">
              <div className="text-5xl sm:text-6xl font-black text-white tracking-tighter leading-none mb-3">
                <AnimatedCounter value={95} suffix="%" duration={1.2} />
              </div>
              <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                de redução na fatura de luz desde o primeiro mês de funcionamento do sistema.
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed border-t border-white/15 pt-4">
              Uma conta menor abre espaço para os planos da sua família e amplia a rentabilidade da sua empresa ou propriedade rural em Goiás.
            </p>
          </BlurRevealItem>

          {/* Bento Item 3: Sede Própria em Trindade (Col 1-4) */}
          <BlurRevealItem
            yOffset={28}
            className="lg:col-span-4 rounded-[2rem] bg-gradient-to-br from-[#1B3A5C] to-[#0D1E30] border border-amber-500/30 text-white shadow-lg shadow-sky-950/20 p-7 sm:p-8 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Sede Própria
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-accent)] animate-pulse-subtle" />
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                Trindade - GO
              </div>
              <p className="text-xs font-medium text-amber-400 mb-2">
                Av. Manoel Monteiro, nº 1717
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Atendimento presencial no Centro / Setor Oeste de Trindade, com suporte ágil para a Região Metropolitana e interior de Goiás.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 text-xs font-semibold text-[var(--brand-accent)] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Trindade/GO • Atendimento Regional</span>
            </div>
          </BlurRevealItem>

          {/* Bento Item 4: Davi Carvalho & IF Goiano (Col 5-8) */}
          <BlurRevealItem
            yOffset={28}
            className="lg:col-span-4 rounded-[2rem] bg-slate-50 p-7 sm:p-8 flex flex-col justify-between border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200 ease-out-strong"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Engenharia IF Goiano
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[var(--solar-blue-primary)]">
                <Award className="w-4 h-4" />
              </div>
            </div>

            <div className="my-6">
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-2">
                Davi Carvalho
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Engenheiro eletricista pelo IF Goiano, à frente de cada estudo técnico com emissão oficial de ART e homologação rigorosa na Equatorial Goiás.
              </p>
            </div>

            <div className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5 pt-4 border-t border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>100% dos projetos com ART e conformidade ANEEL</span>
            </div>
          </BlurRevealItem>

          {/* Bento Item 5: Garantia de 25 Anos e Qualidade Técnica (Col 9-12) */}
          <BlurRevealItem
            yOffset={28}
            className="lg:col-span-4 rounded-[2rem] bg-gradient-to-br from-[#1B3A5C] to-[#0D1E30] border border-amber-500/30 text-white shadow-lg shadow-sky-950/20 p-7 sm:p-8 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Garantia de 25 Anos
              </span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[var(--brand-accent)]">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="my-6">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                Equipamentos Tier 1
              </div>
              <p className="text-xs text-slate-200/90 leading-relaxed">
                Trabalhamos com marcas mundiais como WEG, Deye e Canadian Solar, com garantia linear de 25 anos e suporte direto com a engenharia da Set Solar.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 group pt-4 border-t border-white/10 transition-colors duration-160"
            >
              <span>Conversar com a engenharia</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-160 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </BlurRevealItem>
        </BlurRevealGroup>
      </div>
    </section>
  );
};
