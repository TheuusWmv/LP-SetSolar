import React from 'react';
import { mainGoalsConfig, GoalOption } from '../../config/formConfig';
import { OptionCard } from '../ui/OptionCard';

interface StepGoalProps {
  value?: string;
  onChange: (val: string) => void;
  onAutoAdvance?: () => void;
}

export const StepGoal: React.FC<StepGoalProps> = ({
  value,
  onChange,
  onAutoAdvance,
}) => {
  const handleSelect = (item: GoalOption) => {
    onChange(item.id);
    if (onAutoAdvance) {
      setTimeout(() => {
        onAutoAdvance();
      }, 180);
    }
  };

  return (
    <div className="grid gap-2.5 sm:gap-3 max-w-2xl w-full">
      {mainGoalsConfig.map((item) => (
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
