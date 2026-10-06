import burgerWhite from "@/assets/burger-white.jpg";
import heroBurger from "@/assets/hero-burger.jpg";
import splChicken from "@/assets/spl-chicken.jpg";
import friedChicken from "@/assets/fried-chicken.jpg";
import pizza from "@/assets/pizza.jpg";
import bruschetta from "@/assets/bruschetta.jpg";
import quesadilla from "@/assets/quesadilla.jpg";
import { Reveal } from "@/components/ui/Reveal";
import { FoodCutout } from "@/components/ui/FoodCutout";
import { Chili, Sprinkles, Squiggle } from "@/components/decor/Doodles";

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  image: string;
}

const items: MenuItem[] = [
  { name: "Fresh Smoked Burger", desc: "Smoked cheddar, bacon jam, pickles", price: "$8.49", image: burgerWhite },
  { name: "Classic Pepperoni Pizza", desc: "Spicy pepperoni, mozzarella, basil", price: "$12.00", image: pizza },
  { name: "Triple Cheeseburger", desc: "Three patties, triple cheddar, onion", price: "$9.99", image: heroBurger },
  { name: "Tomato Bruschetta", desc: "Toasted ciabatta, basil, balsamic glaze", price: "$6.75", image: bruschetta },
  { name: "Specialty Of The House", desc: "Butter chicken, cream swirl, naan", price: "$11.25", image: splChicken },
  { name: "Chicken Quesadilla", desc: "Grilled tortilla, cheese pull, lime", price: "$8.25", image: quesadilla },
  { name: "Crispy Fried Chicken", desc: "Buttermilk brined, secret spice mix", price: "$8.99", image: friedChicken },
  { name: "Smash Double Stack", desc: "Smashed patties, special sauce, slaw", price: "$10.50", image: burgerWhite },
];

export function MenuList() {
  return (
    <section id="menu-list" className="relative scroll-mt-24 pb-20 pt-6 md:pb-28 md:pt-10" aria-labelledby="menu-title">
      {/* Orange band */}
      <div className="absolute inset-x-0 bottom-0 top-[200px] bg-brand-orange md:top-[230px]" aria-hidden="true">
        <Squiggle className="absolute right-[6%] top-[14%] hidden w-28 text-white/40 lg:block" />
        <Sprinkles className="absolute right-[14%] bottom-[14%] hidden w-40 text-white/30 lg:block" />
        <Chili className="absolute right-[3%] bottom-[18%] hidden w-44 rotate-[200deg] drop-shadow-xl lg:block" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal direction="blur" className="relative max-w-[800px] rounded-md bg-white p-6 shadow-[0_40px_80px_-30px_rgba(60,20,0,0.45)] sm:p-9 md:p-11">
          <h2 id="menu-title" className="text-[1.65rem] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-[2rem]">
            Our Most
            <br />
            Popular Dishes
          </h2>

          <ul className="mt-7 grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {items.map((item, i) => (
              <Reveal as="li" key={item.name + i} delay={200 + i * 80} direction={i % 2 ? "right" : "left"}>
                <a
                  href="#offers"
                  className="group flex items-center gap-3.5 rounded-lg px-2 py-2.5 transition-colors duration-300 hover:bg-brand-cream"
                >
                  <FoodCutout
                    src={item.image}
                    alt=""
                    width={96}
                    height={96}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-full object-contain ring-2 ring-brand-cream transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-bold text-brand-ink transition-colors group-hover:text-brand-red">
                      {item.name}
                    </span>
                    <span className="block truncate text-[10.5px] text-brand-muted">{item.desc}</span>
                  </span>
                  <span className="relative pl-3 text-[12.5px] font-extrabold text-brand-orange">
                    <span className="absolute left-0 top-1/2 h-px w-2 bg-brand-orange/40" aria-hidden="true" />
                    {item.price}
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          {/* Pizza spilling out of the card */}
          <Reveal
            direction="zoom"
            delay={300}
            className="pointer-events-none absolute -bottom-12 -left-6 w-[150px] sm:-left-12 sm:w-[190px] md:-bottom-16 md:-left-16 md:w-[230px]"
          >
            <FoodCutout
              src={pizza}
              alt=""
              aria-hidden="true"
              width={1024}
              height={1024}
              loading="lazy"
              className="animate-spin-slow w-full object-contain"
            />
          </Reveal>
        </Reveal>

        {/* Floating burger on the cream area */}
        <Reveal
          direction="right"
          delay={200}
          className="pointer-events-none absolute right-[3%] top-[-70px] hidden w-[240px] lg:block xl:w-[260px]"
        >
          <FoodCutout src={burgerWhite} alt="" aria-hidden="true" width={1024} height={1024} loading="lazy" className="animate-float w-full rotate-[10deg]" />
        </Reveal>
      </div>
    </section>
  );
}
