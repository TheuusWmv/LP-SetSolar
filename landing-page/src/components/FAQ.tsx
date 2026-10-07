import React from "react";
import { Plus, ArrowUpRight } from "lucide-react";
import { templateData } from "../data/templateData";
import { BlurReveal, BlurRevealGroup, BlurRevealItem } from "./ui/blur-reveal";

export const FAQ: React.FC = () => {
  const { faqs, company } = templateData;

  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    "Olá! Estava navegando no site e gostaria de tirar uma dúvida sobre energia solar com um engenheiro."
  )}`;

  return (
    <section id="faq" className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Coluna Esquerda: Eyebrow, Título, Subtítulo e Botão Minimalista Compacto */}
          <BlurRevealGroup
            className="lg:col-span-5 space-y-4 lg:sticky lg:top-24"
            amount={0.5}
            margin="-60px 0px -60px 0px"
            delay={0.04}
            stagger={0.12}
          >
            {/* Eyebrow Pill alinhado com a identidade da World Place Solar */}
            <BlurRevealItem yOffset={14} blur="6px">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
                <span className="sm:hidden">FAQ</span>
                <span className="hidden sm:inline">Dúvidas</span>
              </div>
            </BlurRevealItem>

            <BlurRevealItem yOffset={20} blur="8px" as="h2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight leading-[1.15] block">
                <span className="sm:hidden">Dúvidas frequentes</span>
                <span className="hidden sm:inline">Antes de investir,<br className="hidden sm:inline" /> tire suas dúvidas.</span>
              </span>
            </BlurRevealItem>

            <BlurRevealItem yOffset={20} blur="8px">
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm pt-0.5 pb-1">
                <span className="sm:hidden">
                  Prefere conversar com a gente? Nossa equipe ajuda você a dar o primeiro passo.
                </span>
                <span className="hidden sm:inline">
                  Quanto custa? Quando começa a economia? Veja o que considerar para decidir com segurança. Se a dúvida for sobre o seu imóvel, fale com um engenheiro da World Place Solar.
                </span>
              </p>
            </BlurRevealItem>

            <BlurRevealItem yOffset={16} blur="6px">
              {/* Mobile Button: Solid Black Pill matching mobile-redesign */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-neutral-950 text-white font-bold text-xs tracking-tight shadow-sm active:scale-95 transition-transform"
              >
                <span>Fale com a gente</span>
              </a>

              {/* Desktop Button: Glass Pill with Circle Arrow */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-3.5 pl-4 pr-1.5 py-1.5 rounded-full border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-[border-color,background-color] duration-160 ease-out-strong text-xs sm:text-sm font-semibold text-neutral-800 shadow-xs group"
              >
                <span>Falar com um engenheiro</span>
                <span className="w-7 h-7 rounded-full bg-neutral-950 group-hover:bg-[var(--brand-accent)] group-hover:text-[var(--brand-accent-text)] text-white flex items-center justify-center transition-colors duration-160">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </BlurRevealItem>
          </BlurRevealGroup>

          {/* Coluna Direita: Accordion Compacto Minimalista com Animação de Texto */}
          <div className="lg:col-span-7">
            <div className="w-full border-t border-slate-200/80">
                {faqs.map((faq, index) => {
                  const itemId = `item-${index}`;

                  return (
                    <BlurReveal key={itemId} delay={0.05 + index * 0.07} yOffset={20} blur="8px">
                      <details
                        id={`faq-${index + 1}`}
                        open={index === 0}
                        className="faq-item border-b border-slate-200/80"
                      >
                        <summary
                          className="faq-summary w-full py-4 sm:py-4.5 flex items-center justify-between text-left cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)]"
                        >
                          <span className="text-sm sm:text-base font-semibold text-neutral-900 group-hover:text-neutral-950 transition-colors pr-4 leading-snug">
                            {faq.question}
                          </span>

                          {/* Botão de Toggle com Rotação Física de 45° do Plus para fechar */}
                          <div className="faq-icon w-7 h-7 rounded-full border border-slate-200 bg-slate-50 group-hover:border-slate-300 flex items-center justify-center shrink-0 transition-colors duration-200 text-slate-500 shadow-xs">
                            <Plus className="faq-toggle w-3.5 h-3.5 stroke-[2] transition-transform duration-200 ease-out-strong" />
                          </div>
                        </summary>

                        <div className="pb-5 pt-0 text-slate-600 max-w-xl">
                          <BlurReveal as="p" yOffset={12} blur="6px" margin="0px" className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {faq.answer}
                          </BlurReveal>
                        </div>
                      </details>
                    </BlurReveal>
                  );
                })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
