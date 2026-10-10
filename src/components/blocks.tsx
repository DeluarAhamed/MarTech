import Link from "next/link";
import type { ReactNode } from "react";
import { Bullet, SectionLabel, cx } from "./ui";

/** Consistent section opener: label + heading on the left, intro (and action) on the right. */
export function SectionHead({
  code,
  label,
  title,
  intro,
  action,
  tone = "light",
  className,
}: {
  code: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cx("grid-4 items-end gap-y-6", className)}>
      <div className="md:col-span-2">
        <SectionLabel code={code} className={dark ? "text-white/70" : "text-stone-ink"}>{label}</SectionLabel>
        <h2 data-reveal className="mt-5 text-display-m">{title}</h2>
      </div>
      {intro || action ? (
        <div data-reveal className="lg:col-span-2 lg:col-start-3 lg:pl-[25%]">
          {intro ? <p className={cx("text-[1.05rem]", dark ? "text-white/75" : "text-stone-ink")}>{intro}</p> : null}
          {action ? <div className="mt-6">{action}</div> : null}
        </div>
      ) : null}
    </div>
  );
}

export type CardItem = { title: string; body: string; href?: string; meta?: string };

/**
 * Bordered, numbered cards with a navy hover state (the card style used for capabilities).
 * Cards with an href become links with a "Learn more" affordance.
 */
export function NumberedCards({ items, columns = 4, tone = "light", className }: { items: CardItem[]; columns?: 2 | 3 | 4; tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  const grid = columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <ol data-reveal data-reveal-group className={cx("grid gap-4", grid, className)}>
      {items.map((it, i) => {
        const inner = (
          <>
            <div className={cx("grid grid-cols-[3.75rem_1fr] border-b", dark ? "border-white/15" : "border-hairline")}>
              <span className={cx("border-r px-4 py-4 text-sm font-bold tabular-nums", dark ? "border-white/15 text-white/70" : "border-hairline text-navy")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="px-4 py-4 text-[1.15rem] leading-snug">{it.title}</h3>
            </div>
            <div className="flex flex-1 flex-col justify-end px-4 pt-12 pb-5 pl-[4.75rem]">
              {it.meta ? <p className={cx("label mb-2", dark ? "text-white/60" : "text-stone-ink")}>{it.meta}</p> : null}
              <p className={cx("text-[0.95rem]", dark ? "text-white/75" : "text-stone-ink")}>{it.body}</p>
              {it.href ? (
                <span className={cx("mt-4 inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.08em] uppercase", dark ? "text-white" : "text-navy")}>
                  <Bullet /> Learn more
                </span>
              ) : null}
            </div>
          </>
        );
        const cls = cx(
          "group flex h-full flex-col border transition-[border-color,background-color,box-shadow] duration-300",
          dark ? "border-white/15 bg-white/[0.03] hover:border-white/60" : "border-hairline bg-white hover:border-navy hover:shadow-[0_18px_40px_-24px_rgb(45_54_111/0.45)]",
        );
        return (
          <li key={it.title}>
            {it.href ? (
              <Link href={it.href} className={cls}>{inner}</Link>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Simple check list used for "what to bring" style content. */
export function Checklist({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cx("divide-y divide-hairline border-y border-hairline", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-4 py-4">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-navy text-white">
            <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
              <path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <span className="text-[1.02rem]">{item}</span>
        </li>
      ))}
    </ul>
  );
}
