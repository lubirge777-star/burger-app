import { useEffect, useRef } from "react";

const BURST_COLORS = ["#c8151b", "#f9b300", "#f26a1b", "#6cbe45", "#fff6e9"];

/** Dot + lagging ring cursor that grows over interactive elements, plus a sesame burst on click. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Click burst works on every device
    const onClick = (e: MouseEvent) => {
      if (reduced) return;
      for (let i = 0; i < 12; i++) {
        const dot = document.createElement("span");
        const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.4;
        const dist = 40 + Math.random() * 50;
        const size = 5 + Math.random() * 7;
        dot.className = "burst-dot";
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size * (i % 2 ? 0.55 : 1)}px`;
        dot.style.background = BURST_COLORS[i % BURST_COLORS.length];
        dot.style.setProperty("--tx", `${Math.cos(angle) * dist}px`);
        dot.style.setProperty("--ty", `${Math.sin(angle) * dist}px`);
        dot.style.setProperty("--rot", `${Math.random() * 360}deg`);
        document.body.appendChild(dot);
        dot.addEventListener("animationend", () => dot.remove(), { once: true });
      }
    };
    window.addEventListener("click", onClick);

    if (!fine || reduced) return () => window.removeEventListener("click", onClick);

    document.documentElement.classList.add("has-cursor");
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let x = -100,
      y = -100,
      rx = -100,
      ry = -100,
      frame = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      ring.dataset.hover = target ? "true" : "false";
      dot.dataset.hover = target ? "true" : "false";
    };
    const onDown = () => (ring.dataset.down = "true");
    const onUp = () => (ring.dataset.down = "false");
    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };
    const onEnter = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("click", onClick);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[150] hidden h-10 w-10 rounded-full border-2 border-brand-red transition-[width,height,background-color,border-color,opacity] duration-300 ease-out [@media(pointer:fine)]:block data-[down=true]:h-7 data-[down=true]:w-7 data-[hover=true]:h-16 data-[hover=true]:w-16 data-[hover=true]:border-brand-yellow data-[hover=true]:bg-brand-yellow/20"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[151] hidden h-2 w-2 rounded-full bg-brand-red transition-[width,height,opacity] duration-200 [@media(pointer:fine)]:block data-[hover=true]:h-3 data-[hover=true]:w-3"
      />
    </>
  );
}
