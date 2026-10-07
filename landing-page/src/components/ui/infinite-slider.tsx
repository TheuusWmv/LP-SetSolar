import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
type Props = {
  children: ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};
export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  direction = "horizontal",
  reverse = false,
  className,
}: Props) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="logo-marquee"
        style={
          {
            "--marquee-gap": gap + "px",
            "--marquee-duration": duration + "s",
            animationDirection: reverse ? "reverse" : "normal",
            flexDirection: direction === "vertical" ? "column" : "row",
          } as CSSProperties
        }
      >
        <div className="logo-marquee-group">{children}</div>
        <div className="logo-marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
