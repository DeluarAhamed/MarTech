"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Media } from "@/content/media";
import { cx } from "./ui";

export type PathItem = { href: string; label: string; headline: string; image: Media };

/**
 * Audience rows on the left, a large preview on the right that crossfades to the hovered or
 * focused row. Every preview is fully visible (no cropping by the row). Touch: each row shows
 * its own image inline instead.
 */
export function PathPreview({ items }: { items: PathItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <ul className="border-t border-white/20 lg:col-span-7">
        {items.map((p, i) => (
          <li key={p.href} className="border-b border-white/20">
            <Link
              href={p.href}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-x-4 py-6 lg:py-8"
            >
              <span className={cx("text-sm font-bold tabular-nums transition-colors", active === i ? "text-white" : "text-white/50")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span
                  className={cx(
                    "block font-display text-[clamp(1.6rem,3.2vw,3rem)] leading-none font-bold tracking-[-0.025em] transition-[color,transform] duration-500 [font-stretch:112%]",
                    active === i ? "translate-x-2 text-white" : "text-white/60",
                  )}
                >
                  {p.label}
                </span>
                <span className="mt-3 block max-w-md text-[0.95rem] text-white/65">{p.headline}</span>
                <span className="cut-tr relative mt-5 block aspect-[16/9] overflow-hidden [--cut:1.5rem] lg:hidden">
                  <Image src={p.image.src} alt="" fill sizes="90vw" className="object-cover" />
                </span>
              </span>
              <span
                className={cx(
                  "flex size-12 items-center justify-center rounded-full border transition-colors",
                  active === i ? "border-white bg-white text-navy" : "border-white/30 text-white",
                )}
              >
                <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
                  <path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="relative hidden lg:col-span-5 lg:block">
        <div className="cut-tr sticky top-28 aspect-[4/5] overflow-hidden bg-white/5 [--cut:3rem]">
          {items.map((p, i) => (
            <div
              key={p.href}
              className={cx(
                "absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]",
                active === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
              )}
            >
              <Image src={p.image.src} alt="" fill sizes="40vw" className="object-cover" />
            </div>
          ))}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-carbon/70 to-transparent p-5 pt-16">
            <span className="font-display text-lg font-bold text-white">{items[active]?.label}</span>
            <span className="label bg-carbon/50 px-2 py-1 text-[0.6rem] text-white">Rendering</span>
          </div>
        </div>
      </div>
    </div>
  );
}
