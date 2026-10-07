import React from 'react';
import {
  motion,
  useReducedMotion,
  HTMLMotionProps,
} from 'framer-motion';

const DEFAULT_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
const DEFAULT_DURATION = 0.55;
const DEFAULT_BLUR = '10px';
const DEFAULT_Y_OFFSET = 18;

export interface BlurRevealProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  scale?: number;
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'section';
}

export const BlurReveal: React.FC<BlurRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = DEFAULT_DURATION,
  yOffset = DEFAULT_Y_OFFSET,
  blur = DEFAULT_BLUR,
  scale = 1,
  as = 'div',
  style,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = (motion[as] || motion.div) as React.ComponentType<HTMLMotionProps<any>>;

  return (
    <Component
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : yOffset,
        filter: shouldReduceMotion ? 'none' : `blur(${blur})`,
        scale: !shouldReduceMotion && scale !== 1 ? scale : undefined,
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: DEFAULT_EASE,
      }}
      style={style}
      className={`transform-gpu ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
