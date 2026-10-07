import React from 'react';
import { MapPin } from 'lucide-react';

interface StepLocationProps {
  city: string;
  state: string;
  onChangeCity: (c: string) => void;
  onChangeState: (s: string) => void;
  onEnter?: () => void;
}

const statesList = [
  'SP', 'RJ', 'MG', 'PR', 'SC', 'RS', 'GO', 'DF', 'ES', 'BA', 
  'PE', 'CE', 'MT', 'MS', 'PA', 'AM', 'MA', 'PB', 'RN', 'AL', 
  'SE', 'PI', 'TO', 'RO', 'AC', 'AP', 'RR'
];

export const StepLocation: React.FC<StepLocationProps> = ({
  city,
  state,
  onChangeCity,
  onChangeState,
  onEnter,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && city.trim().length >= 2) {
      e.preventDefault();
      onEnter?.();
    }
  };

  return (
    <div className="max-w-2xl w-full">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* City Input */}
        <div className="sm:col-span-3">
          <label htmlFor="location-city" className="form-field-label">
            Cidade
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4 text-slate-400" />
            </div>
            <input
              id="location-city"
              type="text"
              maxLength={100}
              value={city}
              onChange={(e) => onChangeCity(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: Campinas, Curitiba..."
              autoFocus
              className="form-field-control form-field-control--icon"
            />
          </div>
        </div>

        {/* State UF Select */}
        <div className="sm:col-span-1">
          <label htmlFor="location-state" className="form-field-label">
            Estado (UF)
          </label>
          <select
            id="location-state"
            value={state}
            onChange={(e) => onChangeState(e.target.value)}
            className="form-field-control cursor-pointer"
          >
            {statesList.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
