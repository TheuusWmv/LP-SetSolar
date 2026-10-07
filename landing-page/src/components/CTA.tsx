import React from "react";
import { ArrowUpRight, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { templateData } from "../data/templateData";
import { BlurReveal } from "./ui/blur-reveal";

export const CTA: React.FC = () => {
  const { company } = templateData;
  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    company.whatsappDefaultMessage
  )}`;

  return (
    <section id="contact" className="w-full px-4 pt-10 sm:pt-14 pb-8 sm:pb-12 bg-white overflow-hidden">
      {/* 
        Banner de CTA com as mesmas medidas da Hero Section quando emoldurada (com borda):
        - Largura total com margem de 16px (px-4)
        - Bordas arredondadas de 32px (rounded-[32px])
        - Borda sutil de 1px (border border-white/15)
        - Gradiente sofisticado com luz radial no topo (Ref: image copy 7.png)
      */}
      <div className="relative w-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-neutral-950 border border-white/15 shadow-2xl min-h-[430px] sm:min-h-0 flex flex-col justify-center py-16 sm:py-24 lg:py-28 px-6 sm:px-12 text-center text-white">
        {/* Gradiente de luz ambiente radial vindo do topo central (Idêntico à referência Nexiron) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_50%_-10%,rgba(255,255,255,0.32),rgba(255,255,255,0.07)_45%,transparent_80%)] pointer-events-none" />

        {/* Brilho solar sutil de profundidade */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_110%,rgba(212,246,88,0.12),transparent_75%)] pointer-events-none" />

        {/* Borda refinada interna que acompanha a curvatura */}
        <div className="absolute inset-0 rounded-[inherit] border border-white/10 pointer-events-none" />

        {/* Conteúdo Centralizado */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center justify-center">
          {/* Eyebrow Pill Badge (Desktop Only) */}
          <BlurReveal delay={0.05} yOffset={14} blur="6px" className="hidden sm:block">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold mb-4 sm:mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)] animate-pulse-subtle" />
              <span>Simulação 100% Gratuita & Sem Compromisso</span>
            </div>
          </BlurReveal>

          {/* Headline de Alto Impacto */}
          <BlurReveal delay={0.12} yOffset={22} blur="8px" as="h2">
            <span className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.18] block max-w-sm sm:max-w-none">
              <span className="sm:hidden">
                Reduza em até 95% a sua{" "}
                <span className="text-[var(--brand-accent)]">conta de luz.</span>
              </span>
              <span className="hidden sm:inline">
                Reduza em até 95% o custo{" "}
                <span className="text-[var(--brand-accent)]">da sua conta de luz.</span>
              </span>
            </span>
          </BlurReveal>

          {/* Subtítulo Descritivo */}
          <BlurReveal delay={0.18} yOffset={20} blur="8px">
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-xs sm:max-w-xl mx-auto text-pretty mt-4 sm:mt-5 mb-8 sm:mb-8">
              <span className="sm:hidden">
                Projetos e instalação de energia solar. Residencial | Comercial | Agronegócio. Faça uma simulação gratuita.
              </span>
              <span className="hidden sm:inline">
                O primeiro passo é descobrir quanto você pode economizar.
                Preencha o simulador gratuito para que a equipe da World Place Solar prepare um estudo personalizado para o seu imóvel ou agronegócio.
              </span>
            </p>
          </BlurReveal>

          {/* Botões de Ação */}
          <BlurReveal delay={0.24} yOffset={18} blur="6px" className="w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-xs mx-auto sm:max-w-none">
              <a
                href={company.simulatorUrl || whatsappUrl}
                target={company.simulatorUrl ? undefined : "_blank"}
                rel={company.simulatorUrl ? undefined : "noopener noreferrer"}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-[var(--brand-accent-text)] font-bold text-sm tracking-tight transition-[background-color,transform,box-shadow] duration-160 ease-out-strong shadow-xl shadow-black/30 hover:scale-[1.02] active:scale-[0.97] group w-full sm:w-auto"
              >
                <span className="sm:hidden">Quero minha simulação</span>
                <span className="hidden sm:inline">Faça uma simulação gratuita</span>
                <ArrowUpRight className="w-4 h-4 text-[var(--brand-accent-text)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </BlurReveal>

          {/* Texto de Apoio (Desktop Only) */}
          <BlurReveal delay={0.27} yOffset={12} blur="6px" className="hidden sm:block">
            <p className="mt-4 text-xs sm:text-sm text-slate-300">
              Tenha em mãos o valor médio da sua conta de luz para preencher o simulador.
            </p>
          </BlurReveal>

          {/* Badges de Confiança (Desktop Only) */}
          <BlurReveal delay={0.3} yOffset={16} blur="6px" className="hidden sm:block">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-xs text-white/70 font-medium">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                Contato pelo WhatsApp
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                Sem compromisso de contratar
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                Conheça nossas Soluções
              </span>
            </div>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
};
