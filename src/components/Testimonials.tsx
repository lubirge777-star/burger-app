import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const avatar = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160`;

const testimonials: Testimonial[] = [
  {
    quote:
      "Amazing food and wonderful people! I miss the corner — a homecoming family-friendly destination to quench the thirst in the parched days. Simply the best smash burger in town.",
    name: "Jonathan Reyes",
    role: "Food Blogger",
    avatar: avatar(14950779),
  },
  {
    quote:
      "The food is always delicious, hot and prepared with great care. The staff were kind, the service quick and friendly, and the fries are seriously addictive. Our weekly ritual now.",
    name: "Amara Collins",
    role: "Regular Guest",
    avatar: avatar(3936894),
  },
  {
    quote:
      "They catered our office party for 60 people and nailed it. Everything arrived on time, piping hot, and the triple cheeseburger disappeared in minutes. Highly recommended!",
    name: "Samuel Adeyemi",
    role: "Event Organizer",
    avatar: avatar(35681211),
  },
  {
    quote:
      "Local ingredients, huge portions, and a cheese pull that made my kids cheer. You can taste the 65 years of experience in every single bite — a proper neighbourhood gem.",
    name: "Lucas Moreau",
    role: "Travel Writer",
    avatar: avatar(6102841),
  },
  {
    quote:
      "Honest, no-nonsense comfort food done exceptionally well. The bruschetta is bright and fresh and the fried chicken is shatteringly crisp. We'll be back very soon.",
    name: "Helen Carter",
    role: "Chef & Author",
    avatar: avatar(16869444),
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), 6500);
    return () => window.clearInterval(id);
  }, [paused, go]);

  const current = testimonials[index];

  return (
    <section
      className="relative py-14 md:py-20"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 id="testimonials-title" className="sr-only">
        What our guests say
      </h2>

      <Reveal className="relative mx-auto max-w-[900px] px-14 text-center sm:px-20">
        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-ink/15 text-brand-ink transition-all duration-300 hover:border-brand-red hover:bg-brand-red hover:text-white sm:left-2"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-ink/15 text-brand-ink transition-all duration-300 hover:border-brand-red hover:bg-brand-red hover:text-white sm:right-2"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>

        <div className="mx-auto max-w-[640px]" aria-live="polite">
          <svg viewBox="0 0 48 48" className="mx-auto mb-4 h-8 w-8 text-brand-red/80" fill="currentColor" aria-hidden="true">
            <path d="M14 10c-5 3-8 8-8 14v14h14V24h-8c0-4 2-7 6-9l-4-5Zm20 0c-5 3-8 8-8 14v14h14V24h-8c0-4 2-7 6-9l-4-5Z" />
          </svg>

          <figure key={index} className="animate-[fadeSlide_0.6s_cubic-bezier(0.22,1,0.36,1)]">
            <blockquote className="text-[13.5px] leading-[1.95] text-brand-muted md:text-[15px]">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-5">
              <span className="block text-[13px] font-extrabold uppercase tracking-[0.14em] text-brand-ink">{current.name}</span>
              <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.16em] text-brand-orange">{current.role}</span>
            </figcaption>
          </figure>
        </div>

        {/* Avatars */}
        <ul className="mt-7 flex items-center justify-center gap-2.5" role="tablist" aria-label="Choose a testimonial">
          {testimonials.map((t, i) => {
            const active = i === index;
            return (
              <li key={t.name}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Show testimonial from ${t.name}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "block overflow-hidden rounded-full ring-2 transition-all duration-500 ease-out",
                    active
                      ? "h-14 w-14 ring-brand-red shadow-[0_12px_24px_-10px_rgba(200,21,27,0.6)]"
                      : "h-9 w-9 ring-transparent opacity-60 hover:scale-110 hover:opacity-100",
                  )}
                >
                  <img src={t.avatar} alt="" width={160} height={160} loading="lazy" className="h-full w-full object-cover" />
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
