import React from 'react';
import { Check } from 'lucide-react';

interface OptionCardProps {
  shortcut: string;
  title: string;
  subtitle?: string;
  selected?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  badge?: string;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  shortcut,
  title,
  subtitle,
  selected = false,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`w-full min-h-[54px] sm:min-h-[58px] py-3 px-4 sm:py-3.5 sm:px-4.5 rounded-2xl border-2 transition-all duration-150 flex items-center justify-between text-left cursor-pointer group select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)] ${
      selected
        ? 'bg-[var(--brand-accent-soft)] border-[var(--brand-accent)] shadow-xs'
        : 'bg-white border-slate-200/90 hover:border-red-300 hover:bg-red-50/30 shadow-2xs'
    }`}
  >
    {/* Keycap Badge on the Left (A, B, C, D...) */}
    <div className="flex items-center gap-3.5 min-w-0">
      <span
        aria-hidden="true"
        className={`w-8 h-8 rounded-xl text-xs sm:text-sm flex items-center justify-center shrink-0 transition-colors ${
          selected
            ? 'bg-[var(--brand-accent)] text-[var(--brand-accent-text)] font-extrabold shadow-xs'
            : 'bg-slate-100 group-hover:bg-slate-200 group-hover:text-neutral-800 text-slate-500 font-semibold'
        }`}
      >
        {shortcut}
      </span>

      {/* Option Title and optional Subtitle */}
      <div className="min-w-0 pr-2">
        <span
          className={`text-[15px] sm:text-base leading-snug block ${
            selected ? 'font-bold text-neutral-950' : 'font-medium text-neutral-800'
          }`}
        >
          {title}
        </span>
        {subtitle ? (
          <span
            className={`text-xs sm:text-[13px] leading-snug block mt-0.5 ${
              selected ? 'text-slate-600 font-normal' : 'text-slate-500 font-normal'
            }`}
          >
            {subtitle}
          </span>
        ) : null}
      </div>
    </div>

    {/* Radio Indicator on the Right */}
    <span
      aria-hidden="true"
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-3 transition-colors ${
        selected
          ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)] text-[var(--brand-accent-text)] shadow-xs'
          : 'border-slate-300 bg-transparent group-hover:border-slate-400'
      }`}
    >
      {selected && <Check className="w-3 h-3 stroke-[3]" />}
    </span>
  </button>
);
