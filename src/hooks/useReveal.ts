import { useEffect, useRef, useState } from "react";
import { useAppReady } from "@/components/fx/ready";

/**
 * Observes an element and flips `visible` to true once it enters the viewport.
 * Waits for the preloader to finish so above-the-fold animations are actually seen.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const ready = useAppReady();

  useEffect(() => {
    if (!ready) return;
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, ready]);

  return { ref, visible };
}
