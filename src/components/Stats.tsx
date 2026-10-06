import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/utils/cn";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 215, label: "Orders Every Day" },
  { value: 5, suffix: "K", label: "Happy Customers" },
  { value: 338, label: "Events Held" },
  { value: 22, label: "Culinary Awards" },
];

function useCountUp(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration]);

  return value;
}

function StatItem({ stat, index, start }: { stat: Stat; index: number; start: boolean }) {
  const value = useCountUp(stat.value, start);
  return (
    <li
      className={cn(
        "group relative flex flex-col items-center px-4 py-7 text-center transition-transform duration-500 hover:-translate-y-1.5 md:py-9",
        index > 0 && "before:absolute before:left-0 before:top-1/2 before:h-14 before:w-px before:-translate-y-1/2 before:bg-white/30",
        index === 2 && "before:hidden lg:before:block",
      )}
    >
      <span className="display relative z-[2] text-[2.4rem] leading-none text-white transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-125 md:text-[2.7rem]">
        {value}
        {stat.suffix}
      </span>
      <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 md:text-[11px]">
        {stat.label}
      </span>
    </li>
  );
}

export function Stats() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);

  return (
    <section className="relative py-6 md:py-10" aria-label="Our numbers">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div
          ref={ref}
          className={cn(
            "reveal shine-panel rounded-2xl bg-gradient-to-r from-brand-orange via-[#f5821f] to-brand-red shadow-[0_40px_70px_-30px_rgba(242,106,27,0.7)]",
            visible && "is-visible",
          )}
          data-dir="zoom"
        >
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} index={i} start={visible} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
