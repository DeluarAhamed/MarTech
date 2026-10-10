import { approvedClaim } from "@/content/claims";
import { cx } from "./ui";

/**
 * "Made in USA" tag. Renders only while the `madeInUsa` claim is approved in the claims registry,
 * so it can be withdrawn site-wide in one place if the FTC standard can't be documented.
 */
export function MadeInUsaTag({ tone = "light", detail = false, className }: { tone?: "light" | "dark"; detail?: boolean; className?: string }) {
  const claim = approvedClaim("madeInUsa");
  if (!claim) return null;
  const dark = tone === "dark";
  return (
    <span
      className={cx(
        "label inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 border px-2.5 py-1.5 text-[0.65rem] leading-none [&>span]:whitespace-nowrap",
        dark ? "border-ivory/30 text-ivory" : "border-carbon/25 text-carbon",
        className,
      )}
    >
      <UsaMark />
      <span>{claim.statement}</span>
      {detail && claim.label ? (
        <>
          <span aria-hidden="true" className={cx("h-3 w-px", dark ? "bg-ivory/30" : "bg-carbon/25")} />
          <span className={dark ? "text-ivory/70" : "text-stone-ink"}>{claim.label}</span>
        </>
      ) : null}
    </span>
  );
}

/** Abstract stars-and-stripes mark (not a flag reproduction). */
function UsaMark() {
  return (
    <svg viewBox="0 0 16 11" aria-hidden="true" className="h-[0.6rem] w-auto shrink-0">
      <rect width="16" height="11" fill="currentColor" opacity="0.12" />
      <g fill="#a23b2a">
        <rect y="0" width="16" height="1.57" />
        <rect y="3.14" width="16" height="1.57" />
        <rect y="6.28" width="16" height="1.57" />
        <rect y="9.43" width="16" height="1.57" />
      </g>
      <rect width="7" height="6.28" fill="#1f3a5f" />
      <g fill="#f5f3ee">
        <circle cx="1.8" cy="1.6" r="0.55" />
        <circle cx="3.5" cy="1.6" r="0.55" />
        <circle cx="5.2" cy="1.6" r="0.55" />
        <circle cx="2.65" cy="3.1" r="0.55" />
        <circle cx="4.35" cy="3.1" r="0.55" />
        <circle cx="1.8" cy="4.6" r="0.55" />
        <circle cx="3.5" cy="4.6" r="0.55" />
        <circle cx="5.2" cy="4.6" r="0.55" />
      </g>
    </svg>
  );
}
