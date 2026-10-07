import React from 'react';
import { timelineConfig, TimelineOption } from '../../config/formConfig';
import { OptionCard } from '../ui/OptionCard';

interface StepTimelineProps {
  value?: string;
  onChange: (val: string) => void;
  onAutoAdvance?: () => void;
}

export const StepTimeline: React.FC<StepTimelineProps> = ({
  value,
  onChange,
  onAutoAdvance,
}) => {
  const handleSelect = (item: TimelineOption) => {
    onChange(item.id);
    if (onAutoAdvance) {
      setTimeout(() => {
        onAutoAdvance();
      }, 180);
    }
  };

  return (
    <div className="grid gap-2.5 sm:gap-3 max-w-2xl w-full">
      {timelineConfig.map((item) => (
        <OptionCard
          key={item.id}
          shortcut={item.shortcut}
          title={item.title}
          subtitle={item.description}
          selected={value === item.id}
          onClick={() => handleSelect(item)}
        />
      ))}
    </div>
  );
};
