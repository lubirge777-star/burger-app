import splChicken from "@/assets/spl-chicken.jpg";
import pizza from "@/assets/pizza.jpg";
import friedChicken from "@/assets/fried-chicken.jpg";
import bruschetta from "@/assets/bruschetta.jpg";
import heroBurger from "@/assets/hero-burger.jpg";
import quesadilla from "@/assets/quesadilla.jpg";
import { Reveal } from "@/components/ui/Reveal";
import { FoodCutout } from "@/components/ui/FoodCutout";
import { Tilt } from "@/components/fx/Tilt";
import { cn } from "@/utils/cn";

interface Dish {
  name: string;
  image: string;
  featured?: boolean;
}

const dishes: Dish[] = [
  { name: "Spl. Chicken", image: splChicken },
  { name: "Pizza", image: pizza },
  { name: "Chicken", image: friedChicken },
  { name: "Bruschetta", image: bruschetta },
  { name: "Burger", image: heroBurger, featured: true },
  { name: "Quesadilla", image: quesadilla },
];

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0l3 9h9l-7.3 5.4L19.5 24 12 18.3 4.5 24l2.8-9.6L0 9h9z" />
    </svg>
  );
}

/** One seamless marquee row (content duplicated, translated -50%). */
function MarqueeRow({ words, reverse, variant }: { words: string[]; reverse?: boolean; variant: "cream" | "ribbon" }) {
  return (
    <div className="group flex overflow-hidden">
      <div
        className={cn(
          "animate-marquee flex w-max shrink-0 whitespace-nowrap group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
          variant === "ribbon" && "[animation-duration:22s]",
        )}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {words.map((w, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span
                  className={cn(
                    "display px-6 transition-colors duration-300 md:px-8",
                    variant === "cream" && "text-[clamp(3rem,8vw,6.2rem)]",
                    variant === "cream" && (i % 2 === 0 ? "text-outline-red hover:text-brand-red" : "text-brand-red"),
                    variant === "ribbon" && "text-[clamp(1.6rem,3.6vw,2.6rem)] text-white",
                    variant === "ribbon" && i % 2 === 1 && "text-brand-yellow",
                  )}
                >
                  {w}
                </span>
                <Star
                  className={cn(
                    "animate-spin-slow shrink-0 [animation-duration:8s]",
                    variant === "cream" ? "h-8 w-8 text-brand-orange md:h-11 md:w-11" : "h-6 w-6 text-brand-yellow",
                  )}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PopularDishes() {
  return (
    <section id="menu" className="relative scroll-mt-24 pb-10 md:pb-16" aria-labelledby="dishes-title">
      <h2 id="dishes-title" className="sr-only">
        Our popular dishes
      </h2>

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {dishes.map((dish, i) => (
            <Reveal as="li" key={dish.name} delay={i * 90} direction="flip" className="h-full">
              <Tilt max={14}>
                <a
                  href="#menu-list"
                  className={cn(
                    "group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-sm transition-shadow duration-500 ease-out md:min-h-[310px]",
                    dish.featured
                      ? "bg-hero-red text-white shadow-[0_30px_50px_-24px_rgba(200,21,27,0.6)] hover:shadow-[0_40px_60px_-24px_rgba(200,21,27,0.75)]"
                      : "bg-white text-brand-ink shadow-[0_24px_40px_-30px_rgba(60,10,10,0.35)] hover:shadow-[0_34px_50px_-26px_rgba(60,10,10,0.45)]",
                  )}
                >
                  {/* Fill sweep from bottom on hover (non-featured) */}
                  {!dish.featured && (
                    <span className="absolute inset-x-0 bottom-0 h-0 bg-brand-cream transition-all duration-500 ease-out group-hover:h-full" aria-hidden="true" />
                  )}
                  {dish.featured ? (
                    <>
                      <span className="display relative pt-7 text-center text-[1.55rem] tracking-wider">{dish.name}</span>
                      <span className="relative mt-auto flex flex-1 items-center justify-center overflow-hidden">
                        <FoodCutout
                          src={dish.image}
                          alt={dish.name}
                          width={1024}
                          height={1024}
                          loading="lazy"
                          className="animate-bob w-[128%] max-w-none transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="relative flex flex-1 items-center justify-center px-5 pt-7">
                        <span className="animate-bob block w-full max-w-[150px]" style={{ animationDelay: `${-i * 0.6}s` }}>
                          <FoodCutout
                            src={dish.image}
                            alt={dish.name}
                            width={1024}
                            height={1024}
                            loading="lazy"
                            className="aspect-square w-full object-contain transition-transform duration-[900ms] ease-out group-hover:rotate-[360deg] group-hover:scale-110"
                          />
                        </span>
                      </span>
                      <span className="relative px-3 pb-7 pt-6 text-center text-[12.5px] font-extrabold uppercase tracking-[0.08em] transition-colors duration-300 group-hover:text-brand-red md:text-[13.5px]">
                        {dish.name}
                        <span className="absolute bottom-5 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-brand-red transition-all duration-500 group-hover:w-8" />
                      </span>
                    </>
                  )}
                </a>
              </Tilt>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Crossing marquee bands — clearly visible on cream */}
      <div className="relative mt-12 md:mt-16" aria-hidden="true">
        <div className="relative z-10 -mx-4 -rotate-2 bg-brand-red py-3 shadow-[0_20px_40px_-20px_rgba(200,21,27,0.7)] md:py-4">
          <MarqueeRow variant="ribbon" reverse words={["Fresh Burgers", "Hot Pizza", "Crispy Chicken", "Cheesy Quesadilla", "Bruschetta"]} />
        </div>
        <div className="relative -mt-2 py-4 md:py-6">
          <MarqueeRow variant="cream" words={["Popular Dishes", "Popular Dishes", "Popular Dishes", "Popular Dishes"]} />
        </div>
      </div>
    </section>
  );
}
