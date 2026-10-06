import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/utils/cn";

type Direction = "up" | "left" | "right" | "zoom" | "flip" | "blur" | "pop";

interface RevealProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the element animates in */
  delay?: number;
  direction?: Direction;
  as?: ElementType;
}

export function Reveal({ children, className, delay = 0, direction = "up", as: Tag = "div", style, ...rest }: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      data-dir={direction}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
