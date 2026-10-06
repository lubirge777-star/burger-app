import { useEffect } from "react";

/** Makes every matching element gently follow the pointer while hovered (precise pointers only). */
export function useMagnetic(selector = ".btn-red, [data-magnetic]", strength = 0.35) {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const cleanups = els.map((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      };
      const leave = () => {
        el.style.transition = "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)";
        el.style.transform = "";
        window.setTimeout(() => (el.style.transition = ""), 600);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => cleanups.forEach((c) => c());
  }, [selector, strength]);
}
