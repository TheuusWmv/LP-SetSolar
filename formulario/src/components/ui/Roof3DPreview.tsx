import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { RoofDetail } from '../../types/form';

export const Roof3DPreview: React.FC<{ roof: RoofDetail }> = ({ roof }) => {
  const reduced = useReducedMotion();

  return (
    <figure className="w-full rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-2xs">
      {/* Spacious 3D Image Container - No badges or stickers covering the image */}
      <div className="relative w-full h-[260px] sm:h-[320px] bg-slate-100 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={roof.id}
            src={roof.image3D}
            alt={`Montagem solar: ${roof.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>
      </div>

      {/* Clean Bottom Caption Bar */}
      <figcaption className="p-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 select-none">
        <span className="text-sm font-semibold text-neutral-900">
          {roof.title}
        </span>
        <span className="text-xs text-slate-500 font-normal">
          {roof.idealAngle} · {roof.fixingType}
        </span>
      </figcaption>
    </figure>
  );
};
