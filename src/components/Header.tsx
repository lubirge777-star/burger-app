import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/utils/cn";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

const leftLinks: NavItem[] = [
  { label: "Home", href: "#home", active: true },
  { label: "Our Menus", href: "#menu" },
  { label: "About", href: "#about" },
];

const rightLinks: NavItem[] = [
  { label: "Blogs", href: "#chefs" },
  { label: "Offers", href: "#offers" },
  { label: "Contact Us", href: "#contact" },
];

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 7h12l1 14H5L6 7Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4h2l2.4 11h11.2L21 7H6" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </svg>
  );
}

function NavLink({ label, href, active, onClick }: { label: string; href: string; active?: boolean; onClick?: () => void }) {
  return (
    <li>
      <a
        href={href}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group relative inline-block py-2 text-[11.5px] font-bold uppercase tracking-[0.16em] transition-colors duration-300",
          active ? "text-brand-red" : "text-brand-ink hover:text-brand-red",
        )}
      >
        {label}
        <span
          className={cn(
            "absolute left-0 -bottom-0.5 h-[2px] rounded-full bg-brand-red transition-all duration-300 ease-out",
            active ? "w-5" : "w-0 group-hover:w-5",
          )}
        />
      </a>
    </li>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        setHidden(y > 400 && y > last + 4);
        if (y < last - 4 || y < 400) setHidden(false);
        last = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the drawer when resizing up to desktop
  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden && !open && "-translate-y-[130%]",
      )}
    >
      <div className="mx-auto max-w-[1360px] px-3 sm:px-6 lg:px-10">
        <div
          className={cn(
            "relative flex items-center justify-between rounded-b-[26px] px-4 transition-all duration-500 sm:px-6 lg:px-7",
            scrolled
              ? "h-[62px] bg-brand-cream/90 shadow-[0_20px_50px_-20px_rgba(60,10,10,0.5)] backdrop-blur-md lg:h-[66px]"
              : "h-[68px] bg-brand-cream shadow-[0_18px_40px_-24px_rgba(60,10,10,0.55)] lg:h-[76px]",
          )}
        >
          {/* Left action */}
          <a href="#menu" className="btn-red hidden px-5 py-2.5 md:inline-flex">
            <BagIcon />
            Order Now
          </a>

          {/* Mobile: logo on the left */}
          <div className="flex items-center lg:hidden">
            <Logo size={56} className="translate-y-1" />
          </div>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-10 xl:gap-12">
            <ul className="flex items-center gap-7 xl:gap-9">
              {leftLinks.map((l) => (
                <NavLink key={l.label} {...l} />
              ))}
            </ul>
            <div
              className={cn(
                "relative px-2 transition-all duration-500 hover:rotate-[360deg] [transition-duration:800ms]",
                scrolled ? "top-1 scale-75" : "top-2 scale-100",
              )}
            >
              <Logo size={92} className="animate-float drop-shadow-[0_10px_18px_rgba(120,0,0,0.35)] [animation-duration:4s]" />
            </div>
            <ul className="flex items-center gap-7 xl:gap-9">
              {rightLinks.map((l) => (
                <NavLink key={l.label} {...l} />
              ))}
            </ul>
          </nav>

          {/* Right action */}
          <div className="flex items-center gap-3">
            <a href="#offers" className="btn-red hidden px-5 py-2.5 md:inline-flex">
              <CartIcon />
              Cart Now
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brand-red text-white shadow-md transition-transform duration-300 hover:scale-105 lg:hidden"
            >
              <span className={cn("absolute h-[2px] w-5 rounded bg-white transition-all duration-300", open ? "rotate-45" : "-translate-y-[6px]")} />
              <span className={cn("absolute h-[2px] w-5 rounded bg-white transition-all duration-300", open ? "opacity-0" : "opacity-100")} />
              <span className={cn("absolute h-[2px] w-5 rounded bg-white transition-all duration-300", open ? "-rotate-45" : "translate-y-[6px]")} />
            </button>
          </div>

          {/* Mobile drawer */}
          <div
            id="mobile-menu"
            className={cn(
              "absolute inset-x-0 top-full origin-top overflow-hidden rounded-b-[26px] bg-brand-cream shadow-[0_30px_60px_-20px_rgba(60,10,10,0.5)] transition-all duration-400 ease-out lg:hidden",
              open ? "max-h-[520px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
            )}
          >
            <nav aria-label="Mobile" className="px-6 pb-6 pt-2">
              <ul className="flex flex-col divide-y divide-brand-ink/10">
                {[...leftLinks, ...rightLinks].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] transition-colors",
                        l.active ? "text-brand-red" : "text-brand-ink hover:text-brand-red",
                      )}
                    >
                      {l.label}
                      <span aria-hidden="true" className="text-brand-red">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href="#menu" onClick={() => setOpen(false)} className="btn-red flex-1">
                  <BagIcon /> Order Now
                </a>
                <a href="#offers" onClick={() => setOpen(false)} className="btn-red flex-1">
                  <CartIcon /> Cart Now
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
