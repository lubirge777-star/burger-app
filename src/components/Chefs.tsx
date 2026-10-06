import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/fx/SplitText";
import { Tilt } from "@/components/fx/Tilt";

interface Chef {
  name: string;
  role: string;
  image: string;
}

const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=560`;

const chefs: Chef[] = [
  { name: "Marco Bellini", role: "Head Chef", image: pexels(8629122) },
  { name: "Daniel Okafor", role: "Grill Master", image: pexels(3814446) },
  { name: "Sabina Jenny", role: "Pastry Chef", image: pexels(5737830) },
  { name: "Arjun Mehta", role: "Sous Chef", image: pexels(30350306) },
];

const socials = ["facebook", "instagram", "x"] as const;

function SocialIcon({ name }: { name: (typeof socials)[number] }) {
  const common = { viewBox: "0 0 24 24", className: "h-3.5 w-3.5", fill: "currentColor", "aria-hidden": true };
  if (name === "facebook")
    return (
      <svg {...common}>
        <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4V14h2.8v8h3.3Z" />
      </svg>
    );
  if (name === "instagram")
    return (
      <svg {...common}>
        <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.8c2.7 0 3 0 4 .1 2.7.1 3.9 1.4 4.1 4.1v8c-.1 2.7-1.4 4-4.1 4.1H8c-2.7-.1-4-1.4-4.1-4.1V8C4 5.3 5.3 4 8 3.9h4Zm0-1.8H8C4.3 2 2.2 4.1 2 7.9v8.2C2.2 19.9 4.3 22 8 22h8c3.7-.2 5.8-2.3 6-6V8c-.2-3.8-2.3-5.9-6-6h-4Z" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M17.5 3h3l-7.1 8.1L21.7 21h-6.3l-4.9-6.4L4.8 21h-3l7.6-8.7L1.5 3h6.4l4.4 5.9L17.5 3Zm-1.1 16.2h1.7L6.9 4.7H5.1l11.3 14.5Z" />
    </svg>
  );
}

export function Chefs() {
  return (
    <section id="chefs" className="relative scroll-mt-24 pb-14 pt-20 md:pb-20 md:pt-28" aria-labelledby="chefs-title">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SplitText
          id="chefs-title"
          lines={["Meet Our", "Expert Chefs"]}
          stagger={40}
          className="display text-center text-brand-red text-[clamp(2rem,6vw,3.5rem)]"
        />

        <ul className="mx-auto mt-12 grid max-w-[1100px] grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {chefs.map((chef, i) => (
            <Reveal as="li" key={chef.name} delay={i * 130} direction={i % 2 ? "flip" : "blur"}>
              <Tilt max={16} className="rounded-xl">
              <article className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-brand-sand shadow-[0_30px_50px_-28px_rgba(40,10,5,0.5)]">
                <img
                  src={chef.image}
                  alt={`${chef.name}, ${chef.role}`}
                  width={560}
                  height={720}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-20" />

                {/* Name plate slides up on hover / focus */}
                <div className="absolute inset-x-3 bottom-3 translate-y-[calc(100%+16px)] rounded-lg bg-brand-orange px-4 py-3 text-white shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-within:translate-y-0 md:inset-x-4 md:bottom-4">
                  <h3 className="text-[13px] font-extrabold leading-tight md:text-[14px]">{chef.name}</h3>
                  <p className="text-[10.5px] uppercase tracking-[0.14em] text-white/85">{chef.role}</p>
                  <ul className="mt-2.5 flex gap-2">
                    {socials.map((s) => (
                      <li key={s}>
                        <a
                          href="#contact"
                          aria-label={`${chef.name} on ${s}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white hover:text-brand-orange"
                        >
                          <SocialIcon name={s} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Always-visible name on touch devices (hidden once hover is available) */}
                <p className="absolute inset-x-0 bottom-3 text-center text-[12px] font-bold text-white drop-shadow md:text-[13px] [@media(hover:hover)]:hidden">
                  {chef.name}
                </p>
              </article>
              </Tilt>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
