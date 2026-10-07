import React from 'react';
import { PJSegment } from '../../types/form';
import { pjSegmentsConfig } from '../../config/formConfig';
import { OptionCard } from '../ui/OptionCard';

interface StepPJSegmentProps {
  value?: PJSegment;
  onChange: (val: PJSegment) => void;
  onAutoAdvance: () => void;
}

export const StepPJSegment: React.FC<StepPJSegmentProps> = ({
  value,
  onChange,
  onAutoAdvance,
}) => {
  const handleSelect = (id: PJSegment) => {
    onChange(id);
    setTimeout(() => {
      onAutoAdvance();
    }, 180);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
      {pjSegmentsConfig.map((item) => (
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
