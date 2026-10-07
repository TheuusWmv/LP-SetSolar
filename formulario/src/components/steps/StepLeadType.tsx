import React from 'react';
import { PropertyType } from '../../types/form';
import { propertyTypesConfig } from '../../config/formConfig';
import { OptionCard } from '../ui/OptionCard';

interface StepLeadTypeProps {
  value?: PropertyType;
  onChange: (val: PropertyType) => void;
  onAutoAdvance?: () => void;
}

export const StepLeadType: React.FC<StepLeadTypeProps> = ({
  value,
  onChange,
  onAutoAdvance,
}) => {
  const handleSelect = (id: PropertyType) => {
    onChange(id);
    if (onAutoAdvance) {
      setTimeout(() => {
        onAutoAdvance();
      }, 180);
    }
  };

  return (
    <div className="grid gap-2.5 sm:gap-3 max-w-2xl w-full">
      {propertyTypesConfig.map((item) => (
        <OptionCard
          key={item.id}
          shortcut={item.shortcut}
          title={item.title}
          subtitle={item.description}
          selected={value === item.id}
          onClick={() => handleSelect(item.id)}
        />
      ))}
    </div>
  );
};
