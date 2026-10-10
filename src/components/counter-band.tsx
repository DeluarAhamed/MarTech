import { approvedClaim } from "@/content/claims";
import { counters, type Counter } from "@/content/home";
import { SectionLabel, cx } from "./ui";

function visibleCounters(limit = 4): Counter[] {
  const gated = counters.filter((c) => c.claim && approvedClaim(c.claim));
  const open = counters.filter((c) => !c.claim);
  return [...gated, ...open].slice(0, limit);
}

/**
 * Animated stats band. Values render at their final number in HTML (SEO, no-JS); the motion layer
 * counts [data-counter] elements up from zero when the band scrolls into view.
 */
export function CounterBand({ tone = "navy", title, code = "N-01" }: { tone?: "navy" | "light"; title?: string; code?: string }) {
  const items = visibleCounters();
  const dark = tone === "navy";

  return (
    <section className={cx("relative overflow-hidden", dark ? "on-dark bg-navy text-white" : "bg-ivory text-carbon")}>
      {dark ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[55%] w-[34rem] opacity-[0.06]">
          <span className="absolute -top-24 left-0 h-[160%] w-24 rotate-45 bg-white" />
          <span className="absolute -top-24 left-36 h-[160%] w-7 rotate-45 bg-white" />
        </div>
      ) : null}
      <div className="page-x container-max relative py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionLabel code={code} className={dark ? "text-white/70 [&_polygon:first-child]:fill-white" : "text-stone-ink"}>
            By the numbers
          </SectionLabel>
          {title ? <h2 className="text-display-m max-w-xl">{title}</h2> : null}
        </div>
        <dl className={cx("mt-12 grid sm:grid-cols-2 lg:grid-cols-4", dark ? "divide-white/15" : "divide-hairline")}>
          {items.map((c, i) => (
            <div
              key={c.label}
              className={cx(
                "flex flex-col border-t py-8 sm:pr-8 lg:border-t-0 lg:border-l lg:px-8 lg:py-2",
                i === 0 && "lg:border-l-0 lg:pl-0",
                dark ? "border-white/15" : "border-hairline",
              )}
            >
              <dt className={cx("label order-1", dark ? "text-white/65" : "text-stone-ink")}>{c.label}</dt>
              <dd className="order-2 mt-4 font-display leading-none font-extrabold tracking-[-0.03em] tabular-nums [font-stretch:118%]">
                {c.text ? (
                  <span className={cx(c.text.length > 8 ? "block text-[clamp(1.6rem,2.2vw,2.35rem)] [font-stretch:100%] [overflow-wrap:anywhere]" : "text-[clamp(3rem,6vw,6rem)]")}>{c.text}</span>
                ) : (
                  <span className="text-[clamp(3rem,6vw,6rem)]">
                    {c.prefix}
                    <span data-counter={c.value}>{c.value}</span>
                    <span className={dark ? "text-bronze" : "text-navy"}>{c.suffix}</span>
                  </span>
                )}
              </dd>
              <dd className={cx("order-3 mt-5 max-w-[16rem] text-[0.95rem]", dark ? "text-white/75" : "text-stone-ink")}>{c.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
