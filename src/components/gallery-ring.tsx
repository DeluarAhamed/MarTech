"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Media } from "@/content/media";

/**
 * Pinned panel with a ring of renderings around the MAR mark; on desktop (motion allowed) the ring
 * expands and turns as you scroll and the split headline slides apart. Static ring everywhere else.
 * GSAP is fetched only when the panel approaches the viewport.
 */
export function GalleryRing({
  images,
  left,
  right,
  children,
}: {
  images: Media[];
  left: string;
  right: string;
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const query = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    if (!query.matches) return;

    let revert: (() => void) | undefined;
    let cancelled = false;
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: root, start: "top top", end: "+=1200", scrub: 0.8, pin: true },
          });
          tl.fromTo(root, { "--ring": 0.55, "--spin": "-20deg" }, { "--ring": 1.18, "--spin": "25deg", ease: "none" }, 0)
            .fromTo("[data-ring-left]", { xPercent: 18 }, { xPercent: 0, ease: "none" }, 0)
            .fromTo("[data-ring-right]", { xPercent: -18 }, { xPercent: 0, ease: "none" }, 0);
        }, root);
        revert = () => ctx.revert();
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(root);
    return () => {
      cancelled = true;
      io.disconnect();
      revert?.();
    };
  }, []);

  const step = 360 / images.length;

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-sand px-5 py-8 [--ring:1] [--spin:0deg] lg:px-8"
    >
      <p className="label text-stone-ink">Renderings</p>

      <div className="relative flex flex-1 items-center justify-center py-16 lg:py-0">
        {/* Ring */}
        <div aria-hidden="true" className="relative size-[min(78vw,30rem)] [transform:rotate(var(--spin))]">
          {images.map((img, i) => (
            <div
              key={img.src}
              className="absolute top-1/2 left-1/2 h-[18%] w-[27%] -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * step}deg) translateY(calc(-38% * var(--ring) * 4.2)) rotate(${-i * step}deg) rotate(calc(-1 * var(--spin)))`,
              }}
            >
              <div className="relative size-full overflow-hidden bg-carbon/10">
                <Image src={img.src} alt="" fill sizes="180px" className="object-cover" />
              </div>
            </div>
          ))}
          <div className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center [transform:translate(-50%,-50%)_rotate(calc(-1*var(--spin)))]">
            <svg viewBox="0 0 64 64" className="size-full">
              <path d="M10 50V14h8l14 20 14-20h8v36h-8V27L32 47 18 27v23z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Split headline */}
        <h2 className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-between text-display-m lg:flex">
          <span data-ring-left>{left}</span>
          <span data-ring-right>{right}</span>
        </h2>
        <h2 className="absolute inset-x-0 top-0 text-center text-display-m lg:hidden">
          {left} {right}
        </h2>
      </div>

      <div className="max-w-xs">{children}</div>
    </div>
  );
}
