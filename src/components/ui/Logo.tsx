import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  /** Visual size in px (the badge is square) */
  size?: number;
}

/** Circular "BURGER" badge logo rendered as an inline SVG so it stays crisp at any size. */
export function Logo({ className, size = 84 }: LogoProps) {
  return (
    <a
      href="#home"
      aria-label="Burger — home"
      className={cn("group inline-flex shrink-0 select-none", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-hidden="true">
        <defs>
          <radialGradient id="logo-glow" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#e2252b" />
            <stop offset="100%" stopColor="#b2111a" />
          </radialGradient>
        </defs>

        {/* Badge */}
        <circle cx="60" cy="60" r="58" fill="url(#logo-glow)" />
        <circle cx="60" cy="60" r="58" fill="none" stroke="#fff" strokeWidth="3" />
        <circle
          cx="60"
          cy="60"
          r="51"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />

        {/* Burger illustration */}
        <g className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
          {/* top bun */}
          <path d="M30 52 C30 30, 90 30, 90 52 Z" fill="#f9b300" />
          <ellipse cx="46" cy="42" rx="2.6" ry="1.5" fill="#fff8e1" transform="rotate(-20 46 42)" />
          <ellipse cx="58" cy="37" rx="2.6" ry="1.5" fill="#fff8e1" />
          <ellipse cx="70" cy="40" rx="2.6" ry="1.5" fill="#fff8e1" transform="rotate(20 70 40)" />
          <ellipse cx="52" cy="47" rx="2.4" ry="1.4" fill="#fff8e1" transform="rotate(10 52 47)" />
          <ellipse cx="66" cy="47" rx="2.4" ry="1.4" fill="#fff8e1" transform="rotate(-15 66 47)" />
          {/* lettuce */}
          <path
            d="M28 54 q4 5 8 0 q4 5 8 0 q4 5 8 0 q4 5 8 0 q4 5 8 0 q4 5 8 0 q4 5 8 0 v-3 H28 Z"
            fill="#6cbe45"
          />
          {/* cheese */}
          <path d="M31 57 H89 v4 l-5 5 v-5 H31 Z" fill="#ffd12e" />
          {/* patty */}
          <rect x="30" y="61" width="60" height="9" rx="4.5" fill="#5a2a16" />
          {/* bottom bun */}
          <path d="M31 72 H89 v4 c0 5 -4 8 -9 8 H40 c-5 0 -9 -3 -9 -8 Z" fill="#f9b300" />
        </g>

        {/* Ribbon */}
        <path d="M16 86 h88 l-5 9 l5 9 H16 l5 -9 Z" fill="#ffc82e" />
        <path d="M16 86 h88 l-5 9 l5 9 H16 l5 -9 Z" fill="none" stroke="#b2111a" strokeWidth="1.2" />
        <text
          x="60"
          y="102"
          textAnchor="middle"
          fontFamily="'Luckiest Guy', Impact, sans-serif"
          fontSize="15"
          fill="#c8151b"
          letterSpacing="1"
        >
          BURGER
        </text>
      </svg>
    </a>
  );
}
