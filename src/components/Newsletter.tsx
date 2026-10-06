import { useState, type FormEvent } from "react";
import pizza from "@/assets/pizza.jpg";
import splChicken from "@/assets/spl-chicken.jpg";
import { Reveal } from "@/components/ui/Reveal";
import { FoodCutout } from "@/components/ui/FoodCutout";
import { Sprinkles, Squiggle } from "@/components/decor/Doodles";
import { SplitText } from "@/components/fx/SplitText";
import { Particles } from "@/components/fx/Particles";
import { cn } from "@/utils/cn";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("done");
    setEmail("");
  };

  return (
    <section id="offers" className="relative scroll-mt-24 overflow-hidden bg-brand-orange py-20 text-white md:py-28" aria-labelledby="offers-title">
      <Particles count={22} seed={11} />
      {/* Doodles */}
      <Squiggle className="pointer-events-none absolute left-[26%] top-10 w-24 text-white/40" aria-hidden="true" />
      <Sprinkles className="pointer-events-none absolute right-[28%] top-8 w-28 text-white/35" aria-hidden="true" />
      <Sprinkles className="pointer-events-none absolute bottom-6 left-[32%] w-24 rotate-45 text-white/30" aria-hidden="true" />

      {/* Side dishes */}
      <Reveal direction="left" className="pointer-events-none absolute -left-16 bottom-[-20%] hidden w-[260px] md:block lg:-left-10 lg:w-[340px]">
        <FoodCutout
          src={splChicken}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
          loading="lazy"
          className="animate-spin-slow w-full object-contain"
        />
      </Reveal>
      <Reveal direction="right" className="pointer-events-none absolute -right-20 top-[-25%] hidden w-[280px] md:block lg:-right-12 lg:w-[380px]">
        <FoodCutout
          src={pizza}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
          loading="lazy"
          className="animate-spin-slow w-full object-contain [animation-direction:reverse]"
        />
      </Reveal>

      <div className="relative mx-auto max-w-[640px] px-5 text-center">
        <SplitText
          id="offers-title"
          lines={["Join For", "Hot Offers"]}
          stagger={45}
          className="display text-[clamp(2.2rem,6vw,3.6rem)]"
          style={{ textShadow: "0 8px 24px rgba(120,40,0,0.25)" }}
        />
        <Reveal delay={100}>
          <p className="mx-auto mt-5 max-w-[480px] text-[13px] leading-[1.9] text-white/90 md:text-[14px]">
            Sign up for our newsletter and be the first to taste new seasonal creations, secret menu drops and
            members-only deals delivered straight to your inbox.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <form onSubmit={onSubmit} noValidate className="mx-auto mt-8 max-w-[520px]">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div
              className={cn(
                "flex items-center rounded-full bg-white p-1.5 shadow-[0_24px_40px_-20px_rgba(60,20,0,0.5)] transition-shadow duration-300 focus-within:shadow-[0_24px_50px_-16px_rgba(60,20,0,0.6)]",
                status === "error" && "ring-2 ring-brand-red",
              )}
            >
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="Enter your email address"
                autoComplete="email"
                className="min-w-0 flex-1 bg-transparent px-5 py-2.5 text-[13px] text-brand-ink outline-none placeholder:text-brand-muted/70"
              />
              <button type="submit" className="btn-red px-6 py-3 text-[10.5px]">
                Sign Up
              </button>
            </div>
            <p className="mt-3 min-h-[1.25rem] text-[12px] font-medium" aria-live="polite">
              {status === "error" && "Please enter a valid email address."}
              {status === "done" && "You're in! Keep an eye on your inbox for hot offers 🍔"}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
