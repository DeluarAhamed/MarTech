import Image from "next/image";
import { cx } from "./ui";

// Brand assets cut from the supplied logo file (public/brand/mar-technology-logo.png) by
// scratch script logo-assets.js: transparent mark, horizontal lockup and stacked lockup.
export const BRAND_NAVY = "#2D366F";
export const BRAND_GREY = "#6C7073";

/** Vector mark (traced from the logo) for small, crisp uses such as badges and the favicon. */
export function Mark({ className, mono = false }: { className?: string; mono?: boolean }) {
  return (
    <svg viewBox="0 0 426 233" className={className} aria-hidden="true" focusable="false">
      <polygon points="0,0 135,0 212.5,77.5 290,0 334,0 194,140 143,89 0,232" fill={mono ? "currentColor" : BRAND_NAVY} />
      <polygon
        points="375,0 426,0 426,233 320,127 248.5,198.5 283,233 142,233"
        fill={mono ? "currentColor" : BRAND_GREY}
        opacity={mono ? 0.6 : 1}
      />
    </svg>
  );
}

/** The official horizontal lockup (mark + MAR TECHNOLOGY / BUILDING SYSTEMS). */
export function Wordmark({ className, tone = "brand", priority }: { className?: string; tone?: "brand" | "light"; priority?: boolean }) {
  return (
    <Image
      src={tone === "light" ? "/brand/mar-logo-horizontal-white.png" : "/brand/mar-logo-horizontal.png"}
      alt="MAR Technology Building Systems"
      width={1431}
      height={200}
      loading={priority ? "eager" : undefined}
      sizes="240px"
      className={cx("h-8 w-auto md:h-9", className)}
    />
  );
}

/** The official stacked lockup, used where the full logo should be seen at size. */
export function LogoStacked({ className, tone = "brand" }: { className?: string; tone?: "brand" | "light" }) {
  return (
    <Image
      src={tone === "light" ? "/brand/mar-logo-stacked-white.png" : "/brand/mar-logo-stacked.png"}
      alt="MAR Technology Building Systems"
      width={910}
      height={418}
      sizes="260px"
      className={cx("h-auto w-56", className)}
    />
  );
}
