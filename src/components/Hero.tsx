import { useRef, type CSSProperties, type PointerEvent } from "react";
import heroBurger from "@/assets/hero-burger.jpg";
import pizza from "@/assets/pizza.jpg";
import friedChicken from "@/assets/fried-chicken.jpg";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { FoodCutout } from "@/components/ui/FoodCutout";
import { SplitText } from "@/components/fx/SplitText";
import { Particles } from "@/components/fx/Particles";
import { LeafDoodle, PizzaDoodle, Sprinkles, Squiggle } from "@/components/decor/Doodles";

/**
 * Subtle, professional curve: a shallow symmetric arc instead of the deep organic blob.
 * Mobile is even flatter so the content area stays generous.
 */
const CLIP_MOBILE = "M0 0H1V0.93C0.78 0.995 0.22 0.995 0 0.93Z";
const CLIP_DESKTOP = "M0 0H1V0.86C0.82 0.97 0.66 1 0.5 1C0.34 1 0.18 0.97 0 0.86Z";

function ChiliOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 120" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M44 32C30 62 58 96 110 102c52 6 104-10 124-32 4-4 0-9-6-6-38 20-80 24-116 14C76 68 60 50 60 28" />
      <path d="M48 36c-10-14-2-30 10-30 10 0 12 14 6 24-3 5-10 8-16 6Z" />
      <path d="M62 44c6 20 22 36 48 42" strokeOpacity="0.6" />
    </svg>
  );
}

/** Wrapper that applies mouse-depth (translate) + scroll-depth (transform) to its child. */
function Layer({ d, s = 0, className, children }: { d: number; s?: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={`depth scroll-depth ${className ?? ""}`} style={{ "--d": d, "--s": s } as CSSProperties}>
      {children}
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    sectionRef.current.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    sectionRef.current.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const onPointerLeave = () => {
    sectionRef.current?.style.setProperty("--mx", "0");
    sectionRef.current?.style.setProperty("--my", "0");
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden bg-brand-cream"
    >
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="hero-clip-m" clipPathUnits="objectBoundingBox">
            <path d={CLIP_MOBILE} />
          </clipPath>
          <clipPath id="hero-clip-d" clipPathUnits="objectBoundingBox">
            <path d={CLIP_DESKTOP} />
          </clipPath>
        </defs>
      </svg>

      <div className="hero-blob relative">
        <div className="bg-hero-red absolute inset-0" />

        {/* Radial glow that follows the mouse */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70 transition-[background] duration-700"
          style={{
            background:
              "radial-gradient(600px circle at calc(50% + var(--mx,0) * 30%) calc(45% + var(--my,0) * 25%), rgba(255,190,90,0.28), transparent 60%)",
          }}
          aria-hidden="true"
        />

        <Particles count={30} seed={3} />

        {/* Line-art doodles at different depths */}
        <div className="pointer-events-none absolute inset-0 text-white" aria-hidden="true">
          <Layer d={-30} s={0.25} className="absolute left-[3%] top-[14%] md:left-[4%] md:top-[13%]">
            <LeafDoodle className="animate-wiggle h-16 w-16 opacity-30 md:h-24 md:w-24" />
          </Layer>
          <Layer d={40} s={0.15} className="absolute right-[6%] top-[16%] hidden md:block lg:right-[9%]">
            <PizzaDoodle className="animate-spin-slow h-24 w-24 opacity-30 lg:h-28 lg:w-28" />
          </Layer>
          <Layer d={-45} s={0.35} className="absolute right-[1%] top-[30%] hidden lg:block">
            <ChiliOutline className="h-20 w-40 rotate-[18deg] opacity-30" />
          </Layer>
          <Layer d={25} s={0.2} className="absolute left-[12%] top-[52%] hidden md:block">
            <Squiggle className="animate-drift w-20 opacity-25" />
          </Layer>
          <Layer d={-25} s={0.3} className="absolute right-[24%] top-[66%] hidden lg:block">
            <Squiggle className="animate-drift w-16 -rotate-12 opacity-25" />
          </Layer>
          <Layer d={55} s={0.4} className="absolute left-[8%] top-[36%] hidden md:block">
            <Sprinkles className="animate-drift w-44 text-brand-yellow opacity-70" />
          </Layer>
          <Layer d={-50} s={0.1} className="absolute right-[10%] top-[48%] hidden md:block">
            <Sprinkles className="w-36 rotate-45 text-brand-yellow opacity-60" />
          </Layer>
          <Layer d={20} s={0.2} className="absolute left-[18%] top-[22%] md:left-[22%]">
            <Sprinkles className="w-24 text-white opacity-40" />
          </Layer>
          <Layer d={-20} s={0.25} className="absolute right-[20%] top-[26%] md:right-[24%]">
            <Sprinkles className="w-20 -rotate-90 text-white opacity-40" />
          </Layer>
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-5 pb-10 pt-[112px] text-center sm:pt-[128px] md:pb-16 md:pt-[150px]">
          <div
            style={{ opacity: "calc(1 - var(--sy, 0) / 700)", transform: "translate3d(0, calc(var(--sy, 0) * 0.35px), 0)" }}
          >
            <Reveal direction="pop" delay={100}>
              <SectionTag tone="dark" className="shine-panel px-6 py-2.5 text-[10.5px] shadow-lg sm:text-[11.5px]">
                Welcome to American Kitchen
              </SectionTag>
            </Reveal>

            <SplitText
              as="h1"
              lines={["Taste The", "Difference"]}
              delay={250}
              stagger={45}
              className="display relative mt-5 text-white text-[clamp(3.3rem,14vw,5.6rem)] md:mt-7 md:text-[clamp(5rem,9.6vw,8.75rem)]"
              style={{ textShadow: "0 10px 30px rgba(80,0,0,0.25)" }}
            />
          </div>

          {/* Burger */}
          <Reveal
            direction="zoom"
            delay={700}
            className="relative z-10 mx-auto -mt-[9%] w-[min(86vw,440px)] md:-mt-[9.5%] md:w-[clamp(420px,47vw,680px)]"
          >
            <Layer d={-18} s={-0.12}>
              <div style={{ transform: "scale(calc(1 + var(--sy, 0) / 4000)) rotate(calc(var(--sy, 0) * 0.01deg))" }}>
                <FoodCutout
                  src={heroBurger}
                  alt="Deconstructed cheeseburger with fresh lettuce, tomato, onion and melted cheese floating in mid-air"
                  width={1024}
                  height={1024}
                  fetchPriority="high"
                  className="animate-float h-auto w-full"
                />
              </div>
            </Layer>
          </Reveal>
        </div>
      </div>

      <Sprinkles className="animate-drift pointer-events-none absolute bottom-[3%] right-[16%] hidden w-28 text-brand-orange opacity-80 lg:block" aria-hidden="true" />
      <Sprinkles className="animate-drift pointer-events-none absolute bottom-[5%] left-[22%] hidden w-20 rotate-12 text-brand-orange opacity-70 [animation-delay:-3s] lg:block" aria-hidden="true" />

      {/* Photographic side dishes spilling off the edges */}
      <Reveal direction="left" delay={900} className="pointer-events-none absolute left-0 top-[38%] hidden -translate-x-[42%] md:block">
        <Layer d={35} s={0.18}>
          <FoodCutout
            src={pizza}
            alt=""
            aria-hidden="true"
            width={1024}
            height={1024}
            className="animate-spin-slow h-auto w-[clamp(180px,24vw,340px)] object-contain"
          />
        </Layer>
      </Reveal>
      <Reveal direction="right" delay={1000} className="pointer-events-none absolute right-0 top-[30%] hidden translate-x-[40%] md:block">
        <Layer d={-35} s={0.28}>
          <FoodCutout
            src={friedChicken}
            alt=""
            aria-hidden="true"
            width={1024}
            height={1024}
            className="animate-spin-slow h-auto w-[clamp(160px,20vw,290px)] object-contain [animation-direction:reverse]"
          />
        </Layer>
      </Reveal>

      {/* Scroll cue */}
      <a
        href="#why"
        aria-label="Scroll to content"
        className="absolute bottom-3 left-1/2 z-20 hidden h-11 w-7 -translate-x-1/2 items-start justify-center rounded-full border-2 border-white/70 pt-2 md:flex"
      >
        <span className="h-2 w-1 rounded-full bg-white" style={{ animation: "bob 1.4s ease-in-out infinite" }} />
      </a>
    </section>
  );
}
