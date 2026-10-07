import React from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// DEFAULT PHYSICS & TIMING (Matching token --ease-out: cubic-bezier(0.23, 1, 0.32, 1))
// ============================================================================
const DEFAULT_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
const DEFAULT_DURATION = 0.55;
const DEFAULT_BLUR = "8px";
const DEFAULT_Y_OFFSET = 20;

// ============================================================================
// 1. INDEPENDENT BLUR REVEAL COMPONENT
// ============================================================================
export interface BlurRevealProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  scale?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  margin?: string;
  as?:
    | "div"
    | "span"
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "li"
    | "section"
    | "article";
}

export const BlurReveal: React.FC<BlurRevealProps> = ({
  children,
  className,
  delay = 0,
  duration = DEFAULT_DURATION,
  yOffset = DEFAULT_Y_OFFSET,
  blur = DEFAULT_BLUR,
  scale = 1,
  once = false,
  amount = 0.15,
  margin = "-40px 0px -40px 0px",
  as = "div",
  style,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = (motion[as] || motion.div) as React.ComponentType<
    HTMLMotionProps<any>
  >;

  return (
    <Component
      initial={false}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
      }}
      viewport={{
        once,
        amount,
        margin,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: DEFAULT_EASE,
      }}
      style={style}
      className={cn("transform-gpu", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// 2. ORCHESTRATED GROUP & ITEM (Automatic Staggering on Scroll Reveal)
// ============================================================================
export interface BlurRevealGroupProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  margin?: string;
  as?: "div" | "section" | "ul" | "ol";
}

export const BlurRevealGroup: React.FC<BlurRevealGroupProps> = ({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  once = false,
  amount = 0.15,
  margin = "-40px 0px -40px 0px",
  as = "div",
  ...props
}) => {
  const Component = (motion[as] || motion.div) as React.ComponentType<
    HTMLMotionProps<any>
  >;

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <Component
      variants={containerVariants}
      initial={false}
      whileInView="visible"
      viewport={{
        once,
        amount,
        margin,
      }}
      className={cn("transform-gpu", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface BlurRevealItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  yOffset?: number;
  blur?: string;
  scale?: number;
  as?: "div" | "span" | "li" | "p" | "h1" | "h2" | "h3" | "h4";
}

export const BlurRevealItem: React.FC<BlurRevealItemProps> = ({
  children,
  className,
  duration = DEFAULT_DURATION,
  yOffset = DEFAULT_Y_OFFSET,
  blur = DEFAULT_BLUR,
  scale = 1,
  as = "div",
  style,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = (motion[as] || motion.div) as React.ComponentType<
    HTMLMotionProps<any>
  >;

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : yOffset,
      filter: shouldReduceMotion ? "none" : `blur(${blur})`,
      scale: !shouldReduceMotion && scale !== 1 ? scale : undefined,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : duration,
        ease: DEFAULT_EASE,
      },
    },
  };

  return (
    <Component
      variants={itemVariants}
      style={style}
      className={cn("transform-gpu", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

// ============================================================================
// 3. EDITORIAL WORD-BY-WORD BLUR REVEAL (Apple / Linear-style typography)
// ============================================================================
export interface BlurRevealWordsProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  once?: boolean;
  amount?: number | "some" | "all";
}

export const BlurRevealWords: React.FC<BlurRevealWordsProps> = ({
  text,
  className,
  as = "h2",
  delay = 0,
  stagger = 0.04,
  duration = 0.45,
  yOffset = 12,
  blur = "6px",
  once = false,
  amount = 0.15,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component = (motion[as] || motion.h2) as React.ComponentType<
    HTMLMotionProps<any>
  >;
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : yOffset,
      filter: shouldReduceMotion ? "none" : `blur(${blur})`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.15 : duration,
        ease: DEFAULT_EASE,
      },
    },
  };

  return (
    <Component
      variants={containerVariants}
      initial={false}
      whileInView="visible"
      viewport={{ once, amount }}
      className={cn("inline-block flex-wrap transform-gpu", className)}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};
