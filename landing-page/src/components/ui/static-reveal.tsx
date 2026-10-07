import { createElement, type HTMLAttributes, type ReactNode } from "react";
type Props = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  as?: "div" | "span" | "h1" | "h2" | "p";
  delay?: number;
  yOffset?: number;
  blur?: string;
};
// Critical content is always visible, including before scripts load.
export function BlurReveal({
  as = "div",
  delay: _delay,
  yOffset: _offset,
  blur: _blur,
  children,
  ...props
}: Props) {
  return createElement(as, props, children);
}
