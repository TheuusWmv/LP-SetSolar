import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface SuccessScreenProps {
  fullName: string;
  protocol: string;
  onRedirectNow: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  fullName,
  protocol,
  onRedirectNow,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(8);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onRedirectNow();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onRedirectNow]);

  const firstName = fullName.trim().split(' ')[0] || 'amigo(a)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
      className="w-full max-w-xl mx-auto px-5 sm:px-6 flex flex-col justify-between min-h-[calc(100dvh-58px)] pt-2 pb-6 sm:pb-8 transform-gpu"
    >
      {/* Centered content block */}
      <div className="my-auto py-3 sm:py-6 flex flex-col justify-center w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-500 mb-3 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] shadow-xs" />
          <span>Diagnóstico Concluído</span>
        </div>

        {/* Title */}
        <h1 className="w-full text-[clamp(1.95rem,7.8vw,2.65rem)] sm:text-4xl font-bold text-neutral-950 tracking-[-0.035em] leading-[1.12] mb-3 text-balance">
          Prazer em te conhecer, {firstName}!
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed mb-6 max-w-lg">
          Recebemos suas respostas com sucesso. Nosso time de especialistas preparará seu estudo personalizado com a estimativa de economia e entrará em contato.
        </p>

        {/* Protocol Card */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--brand-accent)] text-neutral-950 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Número do Protocolo</span>
              <span className="text-sm sm:text-[15px] font-mono font-bold text-neutral-900 tracking-tight block">
                {protocol}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Confirmado
          </span>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-start gap-2.5 w-full">
          <button
            type="button"
            onClick={onRedirectNow}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 min-h-12 py-3 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-[var(--brand-accent-text)] font-bold text-sm tracking-tight transition-all shadow-xs hover:shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <span>Voltar ao site da World Place Solar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-400 font-normal select-none">
            Redirecionando automaticamente em {secondsLeft}s...
          </span>
        </div>
      </div>
    </motion.div>
  );
};
