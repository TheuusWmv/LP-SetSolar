import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ActionButton } from './ui/ActionButton';

interface StepContainerProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showNextButton?: boolean;
  direction?: number;
  submissionError?: string;
  contentFill?: boolean;
  maxWidth?: 'xl' | '4xl';
}

export const StepContainer: React.FC<StepContainerProps> = ({
  stepNumber,
  totalSteps,
  title,
  subtitle,
  children,
  onNext,
  nextLabel = 'Continuar',
  nextDisabled = false,
  showNextButton = true,
  direction = 1,
  submissionError,
  contentFill = false,
  maxWidth = 'xl',
}) => {
  const reduced = useReducedMotion();
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!document.activeElement?.matches('input, select')) {
      heading.current?.focus({ preventScroll: true });
    }
  }, [stepNumber]);

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: reduced ? 0 : direction * 16,
        filter: reduced ? 'none' : 'blur(12px)',
        scale: reduced ? 1 : 0.99,
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: reduced ? 'none' : 'blur(0px)',
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: reduced ? 0 : direction * -12,
        filter: reduced ? 'none' : 'blur(10px)',
        scale: reduced ? 1 : 0.99,
      }}
      transition={{ duration: reduced ? 0 : 0.42, ease: [0.23, 1, 0.32, 1] }}
      className={`w-full ${maxWidth === '4xl' ? 'max-w-4xl' : 'max-w-xl'} mx-auto px-5 sm:px-6 flex flex-col justify-between min-h-[calc(100dvh-58px)] pt-2 pb-6 sm:pb-8 transform-gpu`}
      aria-labelledby="question-title"
    >
      {/* Bloco Central da Pergunta: perfeitamente centralizado verticalmente */}
      <div className="my-auto py-3 sm:py-6 flex flex-col justify-center w-full">
        {/* Eyebrow: 'Pergunta X de Y' */}
        <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-500 mb-3 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] shadow-xs" />
          <span>Pergunta {stepNumber} de {totalSteps}</span>
        </div>

        {/* Main Question Title: Amplo e imponente como no Tynx */}
        <h1
          id="question-title"
          ref={heading}
          tabIndex={-1}
          className="w-full text-[clamp(1.95rem,7.8vw,2.65rem)] sm:text-4xl lg:text-[42px] font-bold text-neutral-950 tracking-[-0.035em] leading-[1.12] mb-3 outline-none text-balance"
        >
          {title}
        </h1>

        {/* Subtitle / Description (somente se fornecido) */}
        {subtitle && (
          <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed mb-6 max-w-lg">
            {subtitle}
          </p>
        )}

        <div className={contentFill ? 'w-full flex-1 flex flex-col mt-2' : 'w-full mt-2'}>
          {children}
        </div>

        {submissionError && <p role="alert" className="mt-4 text-sm text-red-700">{submissionError}</p>}
      </div>

      {/* Bottom Area: Botão Continuar OU Helper sutil da referência Tynx */}
      <div className="shrink-0 w-full pt-3">
        {showNextButton ? (
          <nav
            className="relative w-full flex items-center justify-end bg-transparent"
            aria-label="Navegação do formulário"
          >
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <ActionButton
                label={nextLabel}
                disabled={nextDisabled}
                onClick={onNext}
                className="w-full min-h-12 sm:w-auto"
              />
            </div>
          </nav>
        ) : (
          <div className="w-full flex justify-center select-none pb-1 sm:pb-3">
            <span className="text-xs sm:text-[13px] text-slate-400 font-normal">
              Selecione uma opção para avançar
            </span>
          </div>
        )}
      </div>
    </motion.section>
  );
};
