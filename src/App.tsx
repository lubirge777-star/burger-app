import type { CSSProperties } from "react";
import heroBurger from "@/assets/hero-burger.jpg";
import { useSampledColor } from "@/hooks/useSampledColor";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { PopularDishes } from "@/components/PopularDishes";
import { About } from "@/components/About";
import { MenuList } from "@/components/MenuList";
import { Chefs } from "@/components/Chefs";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/fx/Preloader";
import { Cursor } from "@/components/fx/Cursor";
import { ScrollFx } from "@/components/fx/ScrollFx";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function App() {
  // The hero burger is photographed on a flat red; sample it so the CSS blob matches exactly.
  const heroRed = useSampledColor(heroBurger, "#c8151b");
  useMagnetic();

  return (
    <div className="relative min-h-screen bg-brand-cream" style={{ "--hero-red": heroRed } as CSSProperties}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-ink focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      <Preloader />
      <ScrollFx />
      <Cursor />
      <Header />

      <main id="main">
        <Hero />
        <WhyChooseUs />
        <PopularDishes />
        <About />
        <MenuList />
        <Chefs />
        <Stats />
        <Testimonials />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
