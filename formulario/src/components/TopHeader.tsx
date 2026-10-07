import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface TopHeaderProps {
  currentStep: number;
  totalSteps: number;
  onExit: () => void;
  onBack?: () => void;
  showExit?: boolean;
  showBack?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentStep,
  totalSteps,
  onExit,
  onBack,
  showExit = true,
  showBack,
}) => {
  const reduced = useReducedMotion();
  const progress = (currentStep / totalSteps) * 100;
  const canGoBack = showBack !== undefined ? showBack : currentStep > 1;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Canto Superior Esquerdo: Seta de Voltar */}
        <div className="w-12 sm:w-28 shrink-0 flex items-center justify-start">
          {canGoBack && onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Voltar para a etapa anterior"
              className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <div className="w-11 h-11" />
          )}
        </div>

        {/* Centro: Logo */}
        <div className="flex-1 min-w-0 flex items-center justify-center">
          <BrandLogo />
        </div>

        {/* Canto Superior Direito: Botão X (Fechar / Sair) */}
        <div className="w-12 sm:w-28 shrink-0 flex items-center justify-end">
          {showExit && (
            <button
              type="button"
              onClick={onExit}
              className="group flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-neutral-800 transition-colors cursor-pointer"
              aria-label="Sair do formulário"
            >
              <span className="hidden sm:inline">Esc para sair</span>
              <span className="w-11 h-11 rounded-full bg-slate-100 group-hover:bg-slate-200/80 text-slate-600 flex items-center justify-center transition-colors">
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Barra de Progresso Ultra-Slim */}
      <div
        className="w-full h-[2.5px] bg-slate-100 overflow-hidden"
        role="progressbar"
        aria-label="Progresso do formulário"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full bg-neutral-950 relative"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ponta solar iluminada em verde-limão */}
          <span className="absolute right-0 top-0 bottom-0 w-3 bg-[var(--brand-accent)]" />
        </motion.div>
      </div>
    </header>
  );
};
