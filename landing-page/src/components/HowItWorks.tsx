import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { templateData } from "../data/templateData";
import { BlurReveal, BlurRevealGroup, BlurRevealItem } from "./ui/blur-reveal";

export const HowItWorks: React.FC = () => {
  const { howItWorks, howItWorksSteps, company } = templateData;
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // activeStep representa qual etapa da timeline foi completada pelo scroll
  // -1: nenhuma etapa verde ainda; 0..5: etapa 1 a 6 ativadas
  const [activeStep, setActiveStep] = useState<number>(shouldReduceMotion ? 5 : -1);
  const timelineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef, offset: ["start 65%", "end 65%"] });
  const timelineFill = useSpring(timelineProgress, { stiffness: 100, damping: 28 });

  // Monitora o progresso de scroll da seção para animar a timeline de forma fluida
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 60%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (shouldReduceMotion) return;

    if (progress < 0.05) {
      setActiveStep(-1);
    } else if (progress < 0.18) {
      setActiveStep(0);
    } else if (progress < 0.35) {
      setActiveStep(1);
    } else if (progress < 0.52) {
      setActiveStep(2);
    } else if (progress < 0.69) {
      setActiveStep(3);
    } else if (progress < 0.85) {
      setActiveStep(4);
    } else {
      setActiveStep(5);
    }
  });

  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    "Olá! Quero simular minha economia com energia solar e entender as etapas do projeto para o meu imóvel."
  )}`;

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#fafaf9] border-y border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Pill */}
        <BlurReveal delay={0.04} yOffset={14} blur="6px">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
            <span>{howItWorks.badge}</span>
          </div>
        </BlurReveal>

        {/* Section Header (Title on left, explanatory text + duration on right) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-20">
          <BlurReveal delay={0.1} yOffset={20} blur="8px" as="h2" className="max-w-xl">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-[1.12] block">
              {howItWorks.title}
            </span>
          </BlurReveal>

          <BlurReveal delay={0.16} yOffset={20} blur="8px" className="max-w-lg">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {howItWorks.subtitle}
            </p>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mt-1.5">
              {howItWorks.highlightDuration}
            </div>
          </BlurReveal>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP TIMELINE (6 Colunas com linha e bolinhas ativadas por scroll)    */}
        {/* ========================================================================= */}
        <BlurRevealGroup
          stagger={0.08}
          delay={0.05}
          className="hidden lg:grid lg:grid-cols-6 gap-6 xl:gap-8 relative"
        >
          {howItWorksSteps.map((step, index) => {
            const isStepActive = activeStep >= index;
            const isLineActive = activeStep > index;

            return (
              <BlurRevealItem
                key={step.number}
                yOffset={24}
                className="relative group flex flex-col items-start"
              >
                {/* Linha horizontal conectando ao próximo passo (passos 0 a 4) - Hardware Accelerated (scaleX) */}
                {index < howItWorksSteps.length - 1 && (
                  <div
                    className="absolute top-[21px] left-[22px] w-[calc(100%+1.5rem)] xl:w-[calc(100%+2rem)] h-[2px] bg-slate-200 z-0 pointer-events-none overflow-hidden rounded-full"
                    aria-hidden="true"
                  >
                    <div
                      className={`w-full h-full bg-[var(--brand-accent)] origin-left transition-transform duration-350 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                        isLineActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>
                )}

                {/* Bolinha do Passo com Transição de Cor via Scroll Timeline */}
                <div
                  className={`w-11 h-11 rounded-full font-mono font-bold text-sm flex items-center justify-center relative z-10 transition-[background-color,color,box-shadow,transform] duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isStepActive
                      ? "bg-[var(--brand-accent)] text-white scale-105 ring-4 ring-red-500/30 shadow-md shadow-red-900/10"
                      : "bg-neutral-950 text-white ring-4 ring-[#fafaf9] group-hover:scale-105 group-hover:bg-[var(--brand-accent)] group-hover:text-white"
                  }`}
                >
                  {step.number}
                </div>

                {/* Título do Passo */}
                <h3
                  className={`font-bold text-base sm:text-lg tracking-tight mt-6 mb-2 transition-colors duration-200 ease-out ${
                    isStepActive ? "text-neutral-950 font-extrabold" : "text-neutral-800 group-hover:text-[#872325]"
                  }`}
                >
                  {step.title}
                </h3>

                {/* Badge de Duração */}
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-3 border transition-[background-color,border-color,color,box-shadow] duration-200 ease-out ${
                    isStepActive
                      ? "bg-red-50 text-red-950 border-red-200 shadow-xs"
                      : "bg-slate-200/70 text-slate-700 border-slate-300/40"
                  }`}
                >
                  {step.duration}
                </span>

                {/* Descrição do Passo */}
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </BlurRevealItem>
            );
          })}
        </BlurRevealGroup>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET TIMELINE (Linha vertical contínua iluminada por scroll)   */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* MOBILE & TABLET INTERACTIVE ACCORDION (Design inspired by mobile-redesign)*/}
        {/* ========================================================================= */}
        <ol ref={timelineRef} className="lg:hidden relative space-y-9">
          <div aria-hidden="true" className="absolute left-[21px] top-5 bottom-5 w-0.5 bg-slate-200 origin-top">
            <motion.div className="w-full h-full bg-[var(--brand-accent)] origin-top" style={{ scaleY: shouldReduceMotion ? 1 : timelineFill }} />
          </div>
          {howItWorksSteps.map((step) => (
            <BlurReveal as="div" key={step.number} yOffset={12} blur="4px" className="relative flex gap-5">
              <motion.span className="relative z-10 shrink-0 w-11 h-11 rounded-full bg-neutral-950 text-white ring-4 ring-[#fafaf9] flex items-center justify-center text-sm font-bold"
                whileInView={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-accent-text)" }} viewport={{ margin: "0px 0px -35% 0px" }}>
                {step.number}
              </motion.span>
              <div className="min-w-0 pb-2 pt-2">
                <h3 className="text-base font-bold text-neutral-950">{step.title}</h3>
                <span className="inline-block my-3 px-3 py-1 rounded-full bg-red-50 text-red-950 border border-red-200 text-xs font-semibold">{step.duration}</span>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </BlurReveal>
          ))}
        </ol>

        {/* ========================================================================= */}
        {/* BOTTOM ACTION CTA (Botão Pill World Place Solar)                                 */}
        {/* ========================================================================= */}
        <BlurReveal delay={0.12} yOffset={20} blur="8px" className="mt-12 sm:mt-16">
          <a
            href={company.simulatorUrl || whatsappUrl}
            target={company.simulatorUrl ? undefined : "_blank"}
            rel={company.simulatorUrl ? undefined : "noopener noreferrer"}
            className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-[var(--brand-accent-text)] font-bold text-sm tracking-tight transition-[background-color,box-shadow,transform] duration-160 ease-out-strong shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.97] group"
          >
            <span>{howItWorks.buttonText}</span>
            <span className="w-8 h-8 rounded-full bg-neutral-950 text-white flex items-center justify-center transition-transform group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </BlurReveal>
      </div>
    </section>
  );
};
