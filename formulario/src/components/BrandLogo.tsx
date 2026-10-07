import logoImg from '../assets/logo-setsolar.png';
import { SunMedium } from 'lucide-react';
import { brandConfig } from '../config/formConfig';

export function BrandLogo({ large = false }: { large?: boolean }) {
  return (
    <span className="flex items-center min-w-0 select-none">
      {logoImg ? (
        <img
          src={logoImg}
          alt={brandConfig.companyName}
          className={`${large ? 'h-10 max-w-[200px]' : 'h-8 sm:h-9 max-w-[180px]'} w-auto object-contain`}
        />
      ) : (
        <span className="flex items-center gap-2">
          <span className={`${large ? 'w-7 h-7' : 'w-6 h-6'} rounded-full bg-[var(--brand-accent)] text-[var(--brand-accent-text)] flex items-center justify-center shadow-xs`}>
            <SunMedium className={large ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
          </span>
          <span className={`${large ? 'text-base' : 'text-sm'} min-w-0 max-w-[min(50vw,9rem)] truncate font-black tracking-tight text-neutral-950`}>{brandConfig.logoText}</span>
        </span>
      )}
    </span>
  );
}
