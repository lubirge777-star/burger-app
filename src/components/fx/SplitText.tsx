import type { CSSProperties, ElementType } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/utils/cn";

interface SplitTextProps {
  lines: string[];
  as?: ElementType;
  className?: string;
  id?: string;
  /** Base delay in ms */
  delay?: number;
  /** Delay between characters in ms */
  stagger?: number;
  style?: CSSProperties;
}

/** Headline that springs in letter-by-letter; each letter jellies on hover. */
export function SplitText({ lines, as: Tag = "h2", className, id, delay = 0, stagger = 35, style }: SplitTextProps) {
  const { ref, visible } = useReveal<HTMLElement>(0.2);
  let index = 0;

  return (
    <Tag ref={ref} id={id} aria-label={lines.join(" ")} className={cn(visible && "is-split-visible", className)} style={style}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(" ").map((word, wi, words) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.split("").map((ch, ci) => {
                const d = delay + index++ * stagger;
                return (
                  <span key={ci} className="char" style={{ "--d": `${d}ms` } as CSSProperties}>
                    {ch}
                  </span>
                );
              })}
              {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
