import type { SVGProps } from "react";

type SvgProps = SVGProps<SVGSVGElement>;

/** Glossy red chili pepper */
export function Chili(props: SvgProps) {
  return (
    <svg viewBox="0 0 240 120" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="chili-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ef2b2b" />
          <stop offset="60%" stopColor="#c8151b" />
          <stop offset="100%" stopColor="#8f0d12" />
        </linearGradient>
      </defs>
      <path
        d="M44 32C30 62 58 96 110 102c52 6 104-10 124-32 4-4 0-9-6-6-38 20-80 24-116 14C76 68 60 50 60 28Z"
        fill="url(#chili-body)"
      />
      <path
        d="M56 40c6 24 26 42 56 48"
        stroke="#fff"
        strokeOpacity="0.45"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M48 36c-10-14-2-30 10-30 10 0 12 14 6 24-3 5-10 8-16 6Z" fill="#4f9f3a" />
      <path d="M53 30c-4-8 0-16 6-18" stroke="#2f6d22" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Hand-drawn outline leaf */
export function LeafDoodle(props: SvgProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path d="M50 6c34 18 36 66 0 88C14 72 16 24 50 6Z" strokeLinejoin="round" />
      <path d="M50 12v80" strokeLinecap="round" />
      <path d="M50 34c8-4 14-10 18-18M50 48c10-2 18-8 24-16M50 62c10 0 20-6 26-14M50 34c-8-4-14-10-18-18M50 48c-10-2-18-8-24-16M50 62c-10 0-20-6-26-14" strokeLinecap="round" />
    </svg>
  );
}

/** Dotted outline pizza */
export function PizzaDoodle(props: SvgProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <circle cx="50" cy="50" r="44" />
      <circle cx="50" cy="50" r="36" strokeDasharray="4 5" />
      <circle cx="36" cy="38" r="6" />
      <circle cx="62" cy="34" r="6" />
      <circle cx="68" cy="58" r="6" />
      <circle cx="44" cy="64" r="6" />
      <path d="M50 14 70 86M50 14 24 78" strokeOpacity="0.5" />
      <circle cx="54" cy="48" r="1.5" fill="currentColor" />
      <circle cx="30" cy="54" r="1.5" fill="currentColor" />
      <circle cx="58" cy="72" r="1.5" fill="currentColor" />
    </svg>
  );
}

/** Soft, wide brush swoosh used behind sections */
export function Swoosh(props: SvgProps) {
  return (
    <svg viewBox="0 0 1440 700" fill="none" preserveAspectRatio="none" aria-hidden="true" {...props}>
      <path
        d="M-120 520C260 140 620 760 980 300S1420 240 1580 60"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="150"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Scattered "sprinkles" (sesame + crumbs) */
export function Sprinkles(props: SvgProps) {
  return (
    <svg viewBox="0 0 200 200" fill="currentColor" aria-hidden="true" {...props}>
      <ellipse cx="24" cy="36" rx="7" ry="4" transform="rotate(-30 24 36)" />
      <ellipse cx="160" cy="28" rx="6" ry="3.5" transform="rotate(20 160 28)" />
      <ellipse cx="60" cy="150" rx="7" ry="4" transform="rotate(40 60 150)" />
      <ellipse cx="176" cy="130" rx="5" ry="3" transform="rotate(-15 176 130)" />
      <circle cx="110" cy="70" r="4" />
      <circle cx="40" cy="96" r="3" />
      <circle cx="140" cy="176" r="4.5" />
      <circle cx="96" cy="184" r="2.5" />
      <circle cx="184" cy="78" r="3" />
    </svg>
  );
}

/** Curly steam / sauce squiggle */
export function Squiggle(props: SvgProps) {
  return (
    <svg viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M4 20c12-18 20 18 32 0s20 18 32 0 20 18 32 0 12-10 16-10" />
    </svg>
  );
}
