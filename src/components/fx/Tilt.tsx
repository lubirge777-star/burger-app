import { useRef, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/utils/cn";

interface TiltProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

/** 3D perspective tilt with a moving glare highlight. */
export function Tilt({ children, className, max = 12 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLSpanElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transition = "transform 0.1s ease-out";
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) scale3d(1.03,1.03,1.03)`;
    if (glare.current) {
      glare.current.style.opacity = "1";
      glare.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.45), transparent 55%)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.34,1.56,0.64,1)";
    el.style.transform = "";
    if (glare.current) glare.current.style.opacity = "0";
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={cn("relative h-full [transform-style:preserve-3d]", className)}>
      {children}
      <span ref={glare} aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-300" />
    </div>
  );
}
