import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionTagProps {
  children: ReactNode;
  className?: string;
  tone?: "red" | "dark" | "white";
}

/** Small uppercase pill used as an eyebrow above section titles. */
export function SectionTag({ children, className, tone = "red" }: SectionTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em]",
        tone === "red" && "bg-brand-red text-white",
        tone === "dark" && "bg-brand-ink text-white",
        tone === "white" && "bg-white text-brand-red",
        className,
      )}
    >
      {children}
    </span>
  );
}
