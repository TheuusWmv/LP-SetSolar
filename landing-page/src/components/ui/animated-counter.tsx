import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate, motionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  decimalSeparator?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.3,
  delay = 0.1,
  decimalSeparator = ",",
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  // Publish the real value in the initial HTML; animate only after hydration.
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    if (isInView) {
      const count = motionValue(0);
      const controls = animate(count, value, {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        onUpdate: (latest) => {
          setDisplayValue(latest);
        },
      });

      return () => controls.stop();
    } else {
      setDisplayValue(0);
    }
  }, [isInView, value, duration, delay, shouldReduceMotion]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals).replace(".", decimalSeparator)
      : Math.round(displayValue).toString();

  return (
    <span ref={ref} className={cn("tabular-nums inline-block", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
