import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'back';
  disabled?: boolean;
  type?: 'button' | 'submit';
  icon?: 'right' | 'left' | 'none';
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  icon = 'right',
  className = '',
}) => {
  if (variant === 'back' || icon === 'left') {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 text-slate-400 hover:text-neutral-800 text-sm font-medium py-2 px-1 transition-colors cursor-pointer select-none group ${className}`}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] active:scale-[0.98] disabled:opacity-35 disabled:pointer-events-none text-[var(--brand-accent-text)] text-sm font-bold tracking-tight transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer select-none ${className}`}
    >
      <span>{label}</span>
      {icon === 'right' && (
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </button>
  );
};
