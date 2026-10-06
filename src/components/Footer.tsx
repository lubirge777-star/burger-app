import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { Sprinkles } from "@/components/decor/Doodles";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "#home" },
      { label: "About Us", href: "#about" },
      { label: "Our Menus", href: "#menu" },
      { label: "Our Chefs", href: "#chefs" },
      { label: "Offers", href: "#offers" },
    ],
  },
  {
    title: "Our Menu",
    links: [
      { label: "Burgers", href: "#menu" },
      { label: "Pizza", href: "#menu" },
      { label: "Fried Chicken", href: "#menu" },
      { label: "Bruschetta", href: "#menu" },
      { label: "Quesadilla", href: "#menu" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Party Bookings", href: "#about" },
      { label: "Gift Vouchers", href: "#about" },
      { label: "Franchise", href: "#contact" },
      { label: "Careers", href: "#contact" },
      { label: "Privacy Policy", href: "#contact" },
    ],
  },
];

const hours = [
  { day: "Mon – Thu", time: "11:00 – 22:00" },
  { day: "Fri – Sat", time: "11:00 – 00:00" },
  { day: "Sunday", time: "12:00 – 21:00" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative scroll-mt-24 overflow-hidden bg-brand-red text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Sprinkles className="pointer-events-none absolute left-[6%] top-10 w-32 text-white/15" aria-hidden="true" />
      <Sprinkles className="pointer-events-none absolute right-[8%] bottom-16 w-40 -rotate-45 text-white/15" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1200px] px-5 pb-8 pt-16 sm:px-8 md:pt-20">
        {/* Brand */}
        <Reveal className="flex flex-col items-center text-center">
          <Logo size={108} className="drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)]" />
          <p className="mt-6 max-w-[460px] text-[13px] leading-[1.9] text-white/80">
            Smashed patties, hand-cut fries and a whole lot of love — crafted fresh every day at the heart of the
            American kitchen.
          </p>
          <ul className="mt-6 flex items-center gap-3" aria-label="Social links">
            {["Facebook", "Instagram", "X", "YouTube"].map((name) => (
              <li key={name}>
                <a
                  href="#contact"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-[11px] font-extrabold transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-brand-red"
                >
                  {name[0]}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Columns */}
        <div className="mt-14 grid grid-cols-2 gap-10 border-t border-white/15 pt-12 sm:grid-cols-3 lg:grid-cols-5">
          {columns.map((col, i) => (
            <Reveal as="nav" key={col.title} delay={i * 80} aria-label={col.title}>
              <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em]">{col.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-[12.5px] text-white/80 transition-colors duration-300 hover:text-white"
                    >
                      <span className="h-px w-0 bg-brand-yellow transition-all duration-300 group-hover:w-3" aria-hidden="true" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal delay={240}>
            <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em]">Opening Hours</h3>
            <ul className="mt-5 space-y-2.5 text-[12.5px]">
              {hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between gap-3 border-b border-dashed border-white/15 pb-2">
                  <span className="text-white/80">{h.day}</span>
                  <span className="font-semibold text-brand-yellow">{h.time}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={320} className="col-span-2 sm:col-span-1">
            <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em]">Contact</h3>
            <address className="mt-5 space-y-2.5 text-[12.5px] not-italic text-white/80">
              <p>
                No. 8, 100 Feet Road,
                <br />
                Indiranagar, Bangalore 560038
              </p>
              <p>
                <a href="tel:+918045678900" className="transition-colors hover:text-white">
                  +91 80 4567 8900
                </a>
              </p>
              <p>
                <a href="mailto:hello@burger.kitchen" className="transition-colors hover:text-white">
                  hello@burger.kitchen
                </a>
              </p>
            </address>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-[11.5px] text-white/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Burger — American Kitchen. All rights reserved.</p>
          <ul className="flex items-center gap-5">
            <li>
              <a href="#contact" className="transition-colors hover:text-white">
                Terms
              </a>
            </li>
            <li>
              <a href="#contact" className="transition-colors hover:text-white">
                Privacy
              </a>
            </li>
            <li>
              <a href="#home" className="inline-flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-brand-yellow">
                Back to top
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 19V5m-7 7 7-7 7 7" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
