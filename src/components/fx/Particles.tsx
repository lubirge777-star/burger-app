import type { CSSProperties } from "react";
import { cn } from "@/utils/cn";

type Shape = "seed" | "dot" | "ring" | "leaf" | "tomato";

// Deterministic pseudo-random so SSR/hydration and re-renders are stable
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const SHAPES: Shape[] = ["seed", "dot", "ring", "leaf", "tomato", "seed", "dot"];

function ParticleShape({ shape, warm }: { shape: Shape; warm?: boolean }) {
  switch (shape) {
    case "seed":
      return <span className={cn("block h-2 w-3.5 rounded-full", warm ? "bg-brand-yellow/70" : "bg-[#fff3d1]")} />;
    case "dot":
      return <span className={cn("block h-2.5 w-2.5 rounded-full", warm ? "bg-brand-orange/60" : "bg-brand-yellow")} />;
    case "ring":
      return <span className={cn("block h-5 w-5 rounded-full border-2", warm ? "border-brand-red/30" : "border-white/60")} />;
    case "leaf":
      return <span className="block h-3 w-5 rounded-[100%_0] bg-[#6cbe45]" />;
    case "tomato":
      return <span className="block h-4 w-4 rounded-full bg-[#ff4b3a] shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.15)]" />;
  }
}

interface ParticlesProps {
  count?: number;
  className?: string;
  seed?: number;
  /** "warm" swaps light colours for ones that read on cream backgrounds */
  tone?: "light" | "warm";
}

/** Field of drifting ingredient particles (sesame, cheese, leaves, tomatoes). */
export function Particles({ count = 26, className, seed = 1, tone = "light" }: ParticlesProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const r = (n: number) => rand(seed * 100 + i * 7 + n);
        const style = {
          left: `${r(1) * 100}%`,
          top: `${r(2) * 100}%`,
          "--px": `${(r(3) - 0.5) * 80}px`,
          "--py": `${(r(4) - 0.5) * 90}px`,
          "--pr": `${(r(5) - 0.5) * 540}deg`,
          "--dur": `${5 + r(6) * 7}s`,
          "--delay": `${-r(7) * 8}s`,
          scale: `${0.6 + r(8) * 0.9}`,
          opacity: 0.55 + r(9) * 0.45,
        } as CSSProperties;
        return (
          <span key={i} className="particle" style={style}>
            <ParticleShape shape={SHAPES[i % SHAPES.length]} warm={tone === "warm"} />
          </span>
        );
      })}
    </div>
  );
}
