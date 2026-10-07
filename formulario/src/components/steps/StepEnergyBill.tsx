import React from 'react';
import { LeadType } from '../../types/form';
import { energyBillRangesPF, energyBillRangesPJ, EnergyBillRange } from '../../config/formConfig';
import { OptionCard } from '../ui/OptionCard';

interface StepEnergyBillProps {
  value?: number;
  onChange: (value: number) => void;
  onAutoAdvance?: () => void;
  leadType?: LeadType;
}

export const StepEnergyBill: React.FC<StepEnergyBillProps> = ({
  value,
  onChange,
  onAutoAdvance,
  leadType = 'pf',
}) => {
  const ranges = leadType === 'pj' ? energyBillRangesPJ : energyBillRangesPF;

  const handleSelect = (item: EnergyBillRange) => {
    onChange(item.numericValue);
    if (onAutoAdvance) {
      setTimeout(() => {
        onAutoAdvance();
      }, 180);
    }
  };

  return (
    <div className="grid gap-2.5 sm:gap-3 max-w-2xl w-full">
      {ranges.map((item) => (
        <OptionCard
          key={item.id}
          shortcut={item.shortcut}
          title={item.title}
          subtitle={item.description}
          selected={value === item.numericValue}
          onClick={() => handleSelect(item)}
        />
      ))}
    </div>
  );
};
