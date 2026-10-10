"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import type { Media } from "@/content/media";
import { Slash } from "./ui";

/**
 * Pinned panel: headline and tagline on the left, a ring of renderings around the MAR mark on the
 * right. On desktop (motion allowed) the ring expands and turns as you scroll. The panel is sized to
 * the viewport on desktop and stacks on mobile, so nothing overlaps at any size.
 */
export function GalleryRing({
  images,
  title,
  accent,
  children,
}: {
  images: Media[];
  title: string;
  accent: string;
  children: ReactNode;
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
          gsap
            .timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=1100", scrub: 0.8, pin: true } })
            .fromTo(root, { "--ring": 0.72, "--spin": "-20deg" }, { "--ring": 1.12, "--spin": "20deg", ease: "none" });
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
      className="relative grid items-center gap-8 overflow-hidden bg-sand px-5 py-10 [--ring:1] [--spin:0deg] md:px-10 lg:h-[100svh] lg:max-h-[60rem] lg:min-h-[38rem] lg:grid-cols-12 lg:gap-6 lg:px-14 lg:py-10"
    >
      {/* Copy */}
      <div className="relative z-10 lg:col-span-5">
        <p className="label flex items-center gap-3 text-stone-ink">
          <Slash /> Renderings
        </p>
        <h2 data-no-split className="mt-6 text-[clamp(2.25rem,4.6vw,4.75rem)] leading-[0.95]">
          <span className="block">{title}</span>
          <span className="block text-navy">{accent}</span>
        </h2>
        <div className="mt-6 max-w-sm text-[1.02rem] text-stone-ink">{children}</div>
      </div>

      {/* Ring */}
      <div className="relative flex items-center justify-center lg:col-span-7 lg:h-full">
        <div
          aria-hidden="true"
          className="relative aspect-square w-[min(70vw,19rem)] [transform:rotate(var(--spin))] md:w-[min(60vw,28rem)] lg:w-[min(46vw,72svh,40rem)]"
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className="absolute top-1/2 left-1/2 h-[18%] w-[27%]"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * step}deg) translateY(calc(-38% * var(--ring) * 4.2)) rotate(${-i * step}deg) rotate(calc(-1 * var(--spin)))`,
              }}
            >
              <div className="relative size-full overflow-hidden bg-carbon/10 shadow-[0_10px_30px_-12px_rgb(23_26_25/0.35)]">
                <Image src={img.src} alt="" fill sizes="200px" className="object-cover" />
              </div>
            </div>
          ))}
          <div className="absolute top-1/2 left-1/2 grid size-[18%] place-items-center rounded-full bg-white shadow-[0_12px_36px_-12px_rgb(23_26_25/0.35)] [transform:translate(-50%,-50%)_rotate(calc(-1*var(--spin)))]">
            <svg viewBox="0 0 426 233" className="w-[62%]">
              <polygon points="0,0 135,0 212.5,77.5 290,0 334,0 194,140 143,89 0,232" fill="#2D366F" />
              <polygon points="375,0 426,0 426,233 320,127 248.5,198.5 283,233 142,233" fill="#6C7073" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
