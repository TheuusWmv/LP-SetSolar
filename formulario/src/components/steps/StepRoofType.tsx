import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RoofType } from '../../types/form';
import { roofDetailsConfig } from '../../config/formConfig';
import { OptionCard } from '../ui/OptionCard';
import { Roof3DPreview } from '../ui/Roof3DPreview';

interface StepRoofTypeProps {
  value?: RoofType;
  onChange: (val: RoofType) => void;
}

const roofList: RoofType[] = ['ceramico', 'metalico', 'fibrocimento', 'laje', 'solo'];

export const StepRoofType: React.FC<StepRoofTypeProps> = ({ value, onChange }) => {
  const [hoveredRoof, setHoveredRoof] = useState<RoofType | null>(null);
  const [viewingIndex, setViewingIndex] = useState(() => value ? Math.max(0, roofList.indexOf(value)) : 0);
  const touchStartX = useRef<number | null>(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    if (value) setViewingIndex(Math.max(0, roofList.indexOf(value)));
  }, [value]);

  const currentRoofKey = roofList[viewingIndex];
  const currentRoof = roofDetailsConfig[currentRoofKey];
  const desktopRoof = roofDetailsConfig[hoveredRoof || value || 'ceramico'];
  const isSelected = value === currentRoofKey;

  const move = (offset: number) => {
    setViewingIndex((index) => (index + offset + roofList.length) % roofList.length);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) > 45) {
      suppressClick.current = true;
      move(distance < 0 ? 1 : -1);
      window.setTimeout(() => { suppressClick.current = false; }, 400);
    }
  };

  const handleSelect = () => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    onChange(currentRoofKey);
  };

  return (
    <>
      <div className="lg:hidden max-w-lg mx-auto w-full" aria-label="Tipos de cobertura">
        <button
          type="button"
          onClick={handleSelect}
          aria-label={`Selecionar ${currentRoof.title}`}
          aria-pressed={isSelected}
          className={`block w-full overflow-hidden rounded-2xl border-2 text-left shadow-sm transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)] ${
            isSelected
              ? 'border-[var(--brand-accent)] bg-[var(--brand-accent-soft)]'
              : 'border-slate-200 bg-white'
          }`}
        >
          <span
            className="relative h-48 sm:h-64 bg-slate-100"
            style={{ display: 'block', touchAction: 'pan-y' }}
            onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }}
            onTouchEnd={handleTouchEnd}
          >
            <img
              key={currentRoof.id}
              src={currentRoof.image3D}
              alt={`Exemplo de instalação: ${currentRoof.title}`}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-neutral-800 shadow-sm">
              {viewingIndex + 1} de {roofList.length}
            </span>
          </span>

          <span className={`block px-4 py-4 border-t ${isSelected ? 'border-[var(--brand-accent)] bg-[var(--brand-accent-soft)]' : 'border-slate-100 bg-white'}`} aria-live="polite">
            <span className={`block text-base ${isSelected ? 'font-bold text-neutral-950' : 'font-semibold text-neutral-900'}`}>
              {currentRoof.title}
            </span>
            <span className={`block text-xs mt-1 ${isSelected ? 'text-slate-600' : 'text-slate-500'}`}>
              {currentRoof.subtitle}
            </span>
          </span>
        </button>

        <div className="flex items-center justify-center gap-2 mt-4" aria-label="Navegação de coberturas">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Ver tipo de cobertura anterior"
            className="w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shadow-2xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1">
            {roofList.map((key, index) => (
              <button
                key={key}
                type="button"
                onClick={() => setViewingIndex(index)}
                aria-label={`Mostrar ${roofDetailsConfig[key].title}`}
                aria-pressed={index === viewingIndex}
                className="w-6 h-11 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-accent)]"
              >
                <span
                  className={`h-2.5 rounded-full transition-all ${
                    index === viewingIndex ? 'w-6 bg-neutral-900' : 'w-2.5 bg-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Ver próximo tipo de cobertura"
            className="w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shadow-2xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start max-w-4xl w-full">
        <div className="lg:col-span-6 space-y-2.5">
          {roofList.map((key) => {
            const item = roofDetailsConfig[key];
            return (
              <div
                key={key}
                onMouseEnter={() => setHoveredRoof(key)}
                onMouseLeave={() => setHoveredRoof(null)}
              >
                <OptionCard
                  shortcut={item.shortcut}
                  title={item.title}
                  selected={value === key}
                  onClick={() => onChange(key)}
                />
              </div>
            );
          })}
        </div>
        <div className="lg:col-span-6 sticky top-20">
          <Roof3DPreview roof={desktopRoof} />
        </div>
      </div>
    </>
  );
};
