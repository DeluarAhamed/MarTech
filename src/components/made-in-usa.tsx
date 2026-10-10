import { approvedClaim } from "@/content/claims";
import { cx } from "./ui";

/**
 * Made in USA badge + seal. Both render only while the `madeInUsa` claim is approved in the
 * claims registry, so they can be withdrawn site-wide in one place.
 */

/** US flag, 19:10 proportions: 13 stripes and a starred canton. */
export function UsFlag({ className }: { className?: string }) {
  const stripe = 10 / 13;
  return (
    <svg viewBox="0 0 19 10" className={cx("h-3.5 w-auto shrink-0 rounded-[1px] shadow-[0_0_0_0.5px_rgb(0_0_0/0.15)]", className)} aria-hidden="true">
      <rect width="19" height="10" fill="#fff" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} y={i * 2 * stripe} width="19" height={stripe} fill="#B22234" />
      ))}
      <rect width="7.6" height={stripe * 7} fill="#3C3B6E" />
      <g fill="#fff">
        {Array.from({ length: 9 }, (_, row) =>
          Array.from({ length: row % 2 === 0 ? 6 : 5 }, (_, col) => (
            <circle key={`${row}-${col}`} cx={0.63 + col * 1.27 + (row % 2 ? 0.63 : 0)} cy={0.42 + row * 0.6} r="0.22" />
          )),
        )}
      </g>
    </svg>
  );
}

/** Bold inline badge: flag + MADE IN USA (+ optional location line). */
export function MadeInUsaTag({ tone = "light", detail = false, className }: { tone?: "light" | "dark"; detail?: boolean; className?: string }) {
  const claim = approvedClaim("madeInUsa");
  if (!claim) return null;
  const dark = tone === "dark";
  return (
    <span
      className={cx(
        "inline-flex max-w-full flex-wrap items-stretch overflow-hidden rounded-[3px] border text-[0.7rem] leading-none font-bold tracking-[0.14em] uppercase [font-stretch:110%]",
        dark ? "border-white/35 bg-white/10 text-white backdrop-blur-sm" : "border-navy/25 bg-white text-navy",
        className,
      )}
    >
      <span className="flex items-center gap-2 px-2.5 py-2 whitespace-nowrap">
        <UsFlag />
        {claim.statement}
      </span>
      {detail && claim.label ? (
        <span
          className={cx(
            "flex items-center border-l px-2.5 py-2 font-semibold tracking-[0.1em] whitespace-nowrap",
            dark ? "border-white/25 text-white/80" : "border-navy/15 bg-navy-tint text-navy/80",
          )}
        >
          {claim.label.replace("Manufactured in ", "")}
        </span>
      ) : null}
    </span>
  );
}

/** Circular seal with slowly rotating type and the flag at its centre. */
export function MadeInUsaSeal({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const claim = approvedClaim("madeInUsa");
  if (!claim) return null;
  const dark = tone === "dark";
  const text = "MADE IN USA • MANUFACTURED IN SALT LAKE CITY, UTAH • ";
  return (
    <div
      role="img"
      aria-label="Made in USA. Manufactured in Salt Lake City, Utah."
      className={cx(
        "relative grid size-32 place-items-center rounded-full",
        dark ? "bg-navy text-white" : "bg-white text-navy shadow-[0_10px_40px_rgb(23_26_25/0.18)]",
        className,
      )}
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full motion-safe:animate-[spin_28s_linear_infinite]" aria-hidden="true">
        <defs>
          <path id="seal-circle" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <text fill="currentColor" style={{ fontSize: 8.6, fontWeight: 700, letterSpacing: "0.12em" }}>
          <textPath href="#seal-circle" textLength="292">{text}</textPath>
        </text>
      </svg>
      <span className={cx("grid size-[3.6rem] place-items-center rounded-full border", dark ? "border-white/30" : "border-navy/20")}>
        <UsFlag className="h-5" />
      </span>
    </div>
  );
}
