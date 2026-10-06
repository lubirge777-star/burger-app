import aboutBurger from "@/assets/about-burger.jpg";
import burgerWhite from "@/assets/burger-white.jpg";
import { Reveal } from "@/components/ui/Reveal";
import { FoodCutout } from "@/components/ui/FoodCutout";
import { Sprinkles, Swoosh } from "@/components/decor/Doodles";
import { SplitText } from "@/components/fx/SplitText";
import { Tilt } from "@/components/fx/Tilt";

const RESTAURANT_IMG =
  "https://images.pexels.com/photos/32568165/pexels-photo-32568165.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=520&w=700";

const perks = ["Receive Party Bookings", "Gift Vouchers", "100% Local Ingredients", "New Season New Food"];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-16 md:py-24" aria-labelledby="about-title">
      <Swoosh className="pointer-events-none absolute -right-[20%] top-[5%] h-[600px] w-[110%] rotate-6 text-brand-sand/60" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
        {/* Collage */}
        <Reveal direction="left" className="relative mx-auto w-full max-w-[460px] pb-16 pr-10 sm:pr-16 lg:mx-0">
          <Tilt max={10} className="rounded-sm">
            <div className="group relative overflow-hidden rounded-sm shadow-[0_40px_70px_-30px_rgba(40,10,5,0.6)]">
              <div className="sd-zoom">
                <img
                  src={aboutBurger}
                  alt="Double cheeseburger with a dramatic splash of cheese sauce"
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
              </div>
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </Tilt>

          <Reveal
            direction="right"
            delay={250}
            className="absolute bottom-0 right-0 w-[62%] max-w-[300px] overflow-hidden rounded-sm border-[7px] border-brand-cream shadow-[0_30px_60px_-24px_rgba(40,10,5,0.55)]"
          >
            <img
              src={RESTAURANT_IMG}
              alt="Warmly lit restaurant dining room with wooden tables"
              width={700}
              height={520}
              loading="lazy"
              className="aspect-[5/4] w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
            />
          </Reveal>

          {/* Accent badge */}
          <Reveal
            delay={400}
            direction="pop"
            className="absolute -left-5 top-8 z-30 hidden sm:block"
          >
            <span className="animate-wiggle flex h-24 w-24 flex-col items-center justify-center rounded-full bg-brand-yellow text-center text-brand-ink shadow-[0_16px_30px_-10px_rgba(249,179,0,0.8)]">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Since</span>
              <span className="display text-2xl leading-none text-brand-red">1998</span>
            </span>
          </Reveal>
        </Reveal>

        {/* Copy */}
        <div className="relative">
          <SplitText
            id="about-title"
            lines={["A World Of Flavors", "In Every Bite."]}
            stagger={30}
            className="display text-brand-red text-[clamp(1.9rem,5vw,3.1rem)]"
          />
          <Reveal delay={120}>
            <p className="mt-6 max-w-[560px] text-[13.5px] leading-[1.95] text-brand-muted md:text-[14.5px]">
              We are lucky to live in a glorious age that gives us everything we could ask for as a human race. What
              more could you need when you have meat covered in cheese nestled between bread. From smashed patties at
              Shake Shack to Glamburgers at Honky Tonk, there's a little something for everyone. Some burgers are
              humble.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <ul className="mt-7 grid max-w-[520px] grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-[13.5px] text-brand-ink/90">
                  <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-brand-red" aria-hidden="true">
                    <path d="M6 0 7.6 4.4 12 6 7.6 7.6 6 12 4.4 7.6 0 6l4.4-1.6Z" fill="currentColor" />
                  </svg>
                  {perk}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={320}>
            <a href="#menu-list" className="btn-red mt-9 px-8">
              Read More
            </a>
          </Reveal>
        </div>
      </div>

      {/* Floating burger cutout + splatter */}
      <div className="pointer-events-none absolute -bottom-6 right-[4%] hidden w-[260px] lg:block xl:w-[300px]" aria-hidden="true">
        <Sprinkles className="absolute -left-10 top-6 w-32 text-brand-orange opacity-80" />
        <FoodCutout src={burgerWhite} alt="" width={1024} height={1024} loading="lazy" className="animate-float-slow w-full -rotate-[12deg]" />
      </div>
    </section>
  );
}
