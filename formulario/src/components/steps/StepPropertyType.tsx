import React from 'react';
import { PropertyType } from '../../types/form';
import { propertyTypesConfig } from '../../config/formConfig';
import { OptionCard } from '../ui/OptionCard';

interface StepPropertyTypeProps {
  value?: PropertyType;
  onChange: (val: PropertyType) => void;
  onAutoAdvance: () => void;
}

export const StepPropertyType: React.FC<StepPropertyTypeProps> = ({
  value,
  onChange,
  onAutoAdvance,
}) => {
  const handleSelect = (id: PropertyType) => {
    onChange(id);
    setTimeout(() => {
      onAutoAdvance();
    }, 180);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
      {propertyTypesConfig.map((item) => (
        <OptionCard
          key={item.id}
          shortcut={item.shortcut}
          title={item.title}
          selected={value === item.id}
          onClick={() => handleSelect(item.id)}
        />
      ))}
    </div>
  );
};

