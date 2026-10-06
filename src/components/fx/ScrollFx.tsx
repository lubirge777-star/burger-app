import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

/**
 * Single rAF-throttled scroll listener that publishes `--sy` (px) and `--progress` (0–1)
 * on <html>, renders a top progress bar and a back-to-top button with a progress ring.
 */
export function ScrollFx() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const root = document.documentElement;
    const update = () => {
      const max = root.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const p = max > 0 ? y / max : 0;
      root.style.setProperty("--sy", String(Math.min(y, 1400)));
      root.style.setProperty("--progress", p.toFixed(4));
      setProgress(p);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const C = 2 * Math.PI * 22;
  const show = progress > 0.06;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[120] h-1 bg-transparent" aria-hidden="true">
        <div
          className="h-full origin-left bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-red"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <a
        href="#home"
        aria-label="Back to top"
        className={cn(
          "group fixed bottom-5 right-5 z-[110] flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_16px_30px_-10px_rgba(200,21,27,0.8)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 sm:bottom-8 sm:right-8",
          show ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-10 scale-50 opacity-0",
        )}
      >
        <svg viewBox="0 0 50 50" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" />
          <circle
            cx="25"
            cy="25"
            r="22"
            fill="none"
            stroke="#f9b300"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
          />
        </svg>
        <svg viewBox="0 0 24 24" className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5m-7 7 7-7 7 7" />
        </svg>
      </a>
    </>
  );
}
