import React from 'react';

interface StepNameProps {
  value: string;
  onChange: (val: string) => void;
  onEnter?: () => void;
}

export const StepName: React.FC<StepNameProps> = ({
  value,
  onChange,
  onEnter,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && value.trim().length >= 2) {
      event.preventDefault();
      onEnter?.();
    }
  };

  return (
    <div className="w-full max-w-xl pt-2 sm:pt-4">
      <label
        htmlFor="full-name"
        className="block text-sm sm:text-[15px] font-medium text-slate-700 mb-2 select-none"
      >
        Nome completo
      </label>

      <div className="relative w-full">
        <input
          id="full-name"
          type="text"
          maxLength={120}
          autoComplete="name"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite seu nome completo"
          autoFocus
          className="w-full bg-transparent border-0 border-b-2 border-slate-300 focus:border-neutral-950 focus:ring-0 focus:outline-none text-xl sm:text-2xl lg:text-[28px] text-neutral-900 placeholder:text-slate-400 font-normal pb-3 pt-1 px-0 transition-colors duration-200"
        />
      </div>
    </div>
  );
};
