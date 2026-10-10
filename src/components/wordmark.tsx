import { cx } from "./ui";

// Vector trace of the supplied MAR Technology logo mark (public/brand/mar-technology-logo.png).
// Both shapes are built on 45° diagonals; colours sampled from the logo file.
export const BRAND_NAVY = "#2D366F";
export const BRAND_GREY = "#6C7073";

export function Mark({ className, mono = false }: { className?: string; mono?: boolean }) {
  return (
    <svg viewBox="0 0 426 233" className={className} aria-hidden="true" focusable="false">
      <polygon
        points="0,0 135,0 212.5,77.5 290,0 334,0 194,140 143,89 0,232"
        fill={mono ? "currentColor" : BRAND_NAVY}
      />
      <polygon
        points="375,0 426,0 426,233 320,127 248.5,198.5 283,233 142,233"
        fill={mono ? "currentColor" : BRAND_GREY}
        opacity={mono ? 0.6 : 1}
      />
    </svg>
  );
}

/** Horizontal lockup: mark + "MAR TECHNOLOGY / BUILDING SYSTEMS" set in the logo's geometric face. */
export function Wordmark({ className, tone = "brand" }: { className?: string; tone?: "brand" | "light" }) {
  const light = tone === "light";
  return (
    <span className={cx("flex items-center gap-2.5 leading-none", className)}>
      <Mark className="h-7 w-auto shrink-0" mono={light} />
      <span className="flex flex-col">
        <span className={cx("font-brand text-[1.02rem] font-bold tracking-[0.02em] uppercase", light ? "text-white" : "text-navy")}>
          MAR Technology
        </span>
        <span
          className={cx(
            "font-brand mt-[3px] text-[0.53rem] font-semibold tracking-[0.2em] uppercase",
            light ? "text-white/70" : "text-brand-grey",
          )}
        >
          Building Systems
        </span>
      </span>
    </span>
  );
}
