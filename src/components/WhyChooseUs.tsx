import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { Chili, Swoosh } from "@/components/decor/Doodles";
import { SplitText } from "@/components/fx/SplitText";
import { Particles } from "@/components/fx/Particles";

const iconProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-8 w-8",
  "aria-hidden": true,
};

const features: { title: string; icon: ReactNode }[] = [
  {
    title: "Quality Product",
    icon: (
      <svg {...iconProps}>
        <circle cx="24" cy="19" r="11" />
        <circle cx="24" cy="19" r="5.5" />
        <path d="M17 28 13 42l11-5 11 5-4-14" />
      </svg>
    ),
  },
  {
    title: "Fresh Food",
    icon: (
      <svg {...iconProps}>
        <path d="M8 32h32" />
        <path d="M11 32c0-8 6-14 13-14s13 6 13 14" />
        <path d="M24 15v3M6 38h36" />
        <path d="M18 8c-1 2 1 3 0 5M24 6c-1 2 1 3 0 5M30 8c-1 2 1 3 0 5" strokeOpacity="0.7" />
      </svg>
    ),
  },
  {
    title: "Best Chef",
    icon: (
      <svg {...iconProps}>
        <path d="M15 28v10h18V28" />
        <path d="M15 28c-5 0-8-4-7-8 1-3 4-5 7-4 1-5 5-8 9-8s8 3 9 8c3-1 6 1 7 4 1 4-2 8-7 8Z" />
        <path d="M15 33h18" />
        <path d="M21 28v5M27 28v5" strokeOpacity="0.7" />
      </svg>
    ),
  },
  {
    title: "24/7 Service",
    icon: (
      <svg {...iconProps}>
        <circle cx="24" cy="24" r="15" />
        <path d="M24 15v9l6 4" />
        <path d="M9 24H5M43 24h-4M24 5v4M24 39v4" strokeOpacity="0.7" />
      </svg>
    ),
  },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="relative scroll-mt-24 overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24" aria-labelledby="why-title">
      {/* Background brush stroke — draws itself on scroll where supported */}
      <Swoosh className="sd-draw pointer-events-none absolute -left-[10%] top-[30%] h-[520px] w-[120%] text-brand-sand/60" />
      <Particles count={14} seed={7} tone="warm" />

      {/* Chilis — spin with scroll on top of their wiggle */}
      <div className="sd-spin pointer-events-none absolute -left-10 top-[34%] hidden md:block lg:left-0">
        <Chili className="animate-wiggle w-44 -rotate-[30deg] drop-shadow-xl lg:w-56" />
      </div>
      <div className="sd-spin pointer-events-none absolute -right-8 bottom-[8%] hidden md:block">
        <Chili className="animate-wiggle w-40 rotate-[160deg] drop-shadow-xl [animation-delay:-2s] lg:w-52" />
      </div>

      <div className="relative mx-auto max-w-[880px] px-5 text-center">
        <Reveal>
          <SectionTag>Why Choose Us</SectionTag>
        </Reveal>
        <SplitText
          id="why-title"
          lines={["Savor The Journey,", "Discover The Delight"]}
          stagger={28}
          className="display mt-6 text-brand-red text-[clamp(2rem,6vw,3.6rem)]"
        />
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-[720px] text-[13.5px] leading-[1.9] text-brand-muted md:text-[14.5px]">
            The mouth-watering aroma of sizzling creations now fills the streets of Bangalore, India, thanks to the
            passionate pursuit of three brothers. With over 65 years of combined experience in the culinary world,
            they embarked on a flavorful journey to craft the ultimate burger experience.
          </p>
        </Reveal>

        <ul className="mx-auto mt-12 grid max-w-[760px] grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10">
          {features.map((f, i) => (
            <Reveal as="li" key={f.title} delay={150 + i * 120} direction="pop" className="group flex flex-col items-center gap-4">
              <span className="animate-bob block" style={{ animationDelay: `${-i * 0.9}s` }}>
                <span className="icon-tile group-hover:rotate-[360deg] group-hover:bg-brand-red group-hover:text-white group-hover:shadow-[0_14px_28px_-10px_rgba(200,21,27,0.7)] [transition-duration:700ms]">
                  <span className="transition-transform duration-500 group-hover:scale-110">{f.icon}</span>
                </span>
              </span>
              <h3 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-brand-ink transition-colors duration-300 group-hover:text-brand-red md:text-[13px]">
                {f.title}
              </h3>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
