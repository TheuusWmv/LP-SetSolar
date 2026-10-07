import React from 'react';
import { OwnershipStatus, LeadType } from '../../types/form';
import { ownershipStatusConfig, ownershipStatusConfigPJ } from '../../config/formConfig';
import { OptionCard } from '../ui/OptionCard';

interface StepOwnershipProps {
  value?: OwnershipStatus;
  onChange: (val: OwnershipStatus) => void;
  onAutoAdvance?: () => void;
  leadType?: LeadType;
}

export const StepOwnership: React.FC<StepOwnershipProps> = ({
  value,
  onChange,
  onAutoAdvance,
  leadType = 'pf',
}) => {
  const options = leadType === 'pj' ? ownershipStatusConfigPJ : ownershipStatusConfig;

  const handleSelect = (id: OwnershipStatus) => {
    onChange(id);
    if (onAutoAdvance) {
      setTimeout(() => {
        onAutoAdvance();
      }, 180);
    }
  };

  return (
    <div className="grid gap-2.5 sm:gap-3 max-w-2xl w-full">
      {options.map((item) => (
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
