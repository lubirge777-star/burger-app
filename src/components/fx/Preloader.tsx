import { useEffect, useState } from "react";
import { setAppReady } from "./ready";
import { cn } from "@/utils/cn";

const MIN_DURATION = 1500;

/** Full-screen bouncing-burger loader that splits open like a curtain. */
export function Preloader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "gone">("loading");

  useEffect(() => {
    const start = performance.now();
    document.documentElement.style.overflow = "hidden";

    const finish = () => {
      const wait = Math.max(0, MIN_DURATION - (performance.now() - start));
      window.setTimeout(() => {
        setPhase("leaving");
        document.documentElement.style.overflow = "";
        window.setTimeout(setAppReady, 250);
        window.setTimeout(() => setPhase("gone"), 1300);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    // Safety net: never trap the user behind the loader
    const fallback = window.setTimeout(finish, 4000);
    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(fallback);
    };
  }, []);

  if (phase === "gone") return null;
  const leaving = phase === "leaving";

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden" aria-hidden={leaving} role="status" aria-label="Loading">
      {/* Curtain halves */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1/2 bg-brand-red transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
          leaving && "-translate-y-full",
        )}
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-1/2 bg-brand-red transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
          leaving && "translate-y-full",
        )}
      />


      {/* Content */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-6 text-white transition-all duration-500",
          leaving && "scale-75 opacity-0",
        )}
      >
        <div className="relative">
          <span className="steam left-[30%] top-0" style={{ animationDelay: "0s" }} />
          <span className="steam left-[50%] top-0" style={{ animationDelay: "0.8s" }} />
          <span className="steam left-[70%] top-0" style={{ animationDelay: "1.6s" }} />
          <svg viewBox="0 0 120 90" className="w-28" style={{ animation: "loaderBounce 1s ease-in-out infinite" }}>
            <path d="M14 42 C14 8, 106 8, 106 42 Z" fill="#f9b300" />
            <ellipse cx="40" cy="26" rx="3.5" ry="2" fill="#fff8e1" />
            <ellipse cx="60" cy="20" rx="3.5" ry="2" fill="#fff8e1" />
            <ellipse cx="80" cy="26" rx="3.5" ry="2" fill="#fff8e1" />
            <path d="M10 46 q6 7 12 0 q6 7 12 0 q6 7 12 0 q6 7 12 0 q6 7 12 0 q6 7 12 0 q6 7 12 0 q6 7 12 0 v-4 H10 Z" fill="#6cbe45" />
            <path d="M14 50 H106 v5 l-7 7 v-7 H14 Z" fill="#ffd12e" />
            <rect x="12" y="56" width="96" height="13" rx="6.5" fill="#5a2a16" />
            <path d="M14 72 H106 v4 c0 7 -5 11 -12 11 H26 c-7 0 -12 -4 -12 -11 Z" fill="#f9b300" />
          </svg>
        </div>
        <p className="display text-4xl tracking-wider sm:text-5xl">
          {"BURGER".split("").map((c, i) => (
            <span key={i} className="inline-block" style={{ animation: `bob 1.2s ease-in-out ${i * 0.08}s infinite` }}>
              {c}
            </span>
          ))}
        </p>
        <div className="h-1 w-44 overflow-hidden rounded-full bg-white/20">
          <div className="h-full origin-left rounded-full bg-brand-yellow" style={{ animation: `loaderBar ${MIN_DURATION}ms cubic-bezier(0.6,0,0.2,1) forwards` }} />
        </div>
      </div>
    </div>
  );
}
