"use client";

import { useEffect, useRef } from "react";

// Signature interaction (docs/redesign/06 §6.1). Durations are intentionally relative —
// no month counts are shown until a timeline claim is approved (src/content/claims.ts).
const tracks = [
  {
    key: "site",
    label: "Site",
    segments: [
      { label: "Permits & approvals", start: 0, end: 30 },
      { label: "Sitework & foundations", start: 30, end: 62 },
      { label: "Utilities", start: 62, end: 72 },
    ],
  },
  {
    key: "factory",
    label: "Factory",
    segments: [
      { label: "Design & engineering", start: 0, end: 26 },
      { label: "Module production", start: 26, end: 60 },
      { label: "Inspection & walk-through", start: 60, end: 72 },
    ],
  },
  {
    key: "traditional",
    label: "Site-built",
    segments: [
      { label: "Permits", start: 0, end: 30 },
      { label: "Sitework", start: 30, end: 52 },
      { label: "Framing, MEP & finishes on site, sequential and weather-exposed", start: 52, end: 100 },
    ],
  },
];

const SET_DAY = 72;
const HANDOVER = 84;

export function ParallelTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Pin + scrub only on large screens with motion allowed. Everything else sees the static diagram,
    // and GSAP is never downloaded.
    const query = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    if (!query.matches) return;

    let revert: (() => void) | undefined;
    let cancelled = false;

    const load = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const bars = el.querySelectorAll<HTMLElement>("[data-seg]");
        const markers = el.querySelectorAll<HTMLElement>("[data-marker]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 15%", end: "+=1100", scrub: 0.6, pin: true },
        });
        tl.from(bars, { scaleX: 0, transformOrigin: "left center", ease: "none", stagger: 0.12, duration: 0.5 })
          .from(markers, { opacity: 0, y: 12, stagger: 0.2, duration: 0.3 }, "-=0.4");
      });
      revert = () => mm.revert();
    };

    // Download the animation runtime only when the section is about to scroll into view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        void load();
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      revert?.();
    };
  }, []);

  return (
    <div ref={ref} className="on-dark relative bg-carbon py-10 text-ivory">
      <div className="relative">
        <div className="space-y-8 md:space-y-10">
          {tracks.map((track) => (
            <div key={track.key} className="grid gap-3 md:grid-cols-[8rem_1fr] md:items-center md:gap-6">
              <p className={`label ${track.key === "traditional" ? "text-ivory/50" : "text-bronze"}`}>{track.label}</p>
              <div className="relative h-auto md:h-14">
                <ol className="flex flex-col gap-1.5 md:block">
                  {track.segments.map((seg) => (
                    <li
                      key={seg.label}
                      data-seg
                      className={`flex min-h-10 items-center px-3 text-xs leading-tight md:absolute md:inset-y-0 md:min-h-0 md:text-[0.8rem] ${
                        track.key === "traditional"
                          ? "border border-ivory/20 text-ivory/60"
                          : track.key === "factory"
                            ? "bg-bronze text-carbon"
                            : "bg-ivory/90 text-carbon"
                      }`}
                      style={{ left: `${seg.start}%`, width: `calc(${seg.end - seg.start}% - 4px)` }}
                    >
                      {seg.label}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone markers (desktop only; mobile captions below) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[8rem] right-0 ml-6 hidden md:block">
          <div data-marker className="absolute inset-y-[-1.5rem] border-l border-dashed border-ivory/60" style={{ left: `${SET_DAY}%` }}>
            <span className="label absolute -top-6 left-2 whitespace-nowrap text-ivory">Set day</span>
          </div>
          <div data-marker className="absolute inset-y-[-1.5rem] border-l border-ivory" style={{ left: `${HANDOVER}%` }}>
            <span className="label absolute -top-6 left-2 whitespace-nowrap text-bronze">Handover</span>
          </div>
        </div>
      </div>
      <p className="mt-10 max-w-2xl text-sm text-ivory/60">
        Illustrative sequence, not to scale. Factory production runs while the site is prepared; modules are set
        once foundations and utilities are ready. Project-specific schedules are provided with your proposal.
      </p>
    </div>
  );
}
