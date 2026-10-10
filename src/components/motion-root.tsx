"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { recordPageView } from "@/lib/attribution";

/**
 * Site-wide motion (docs/redesign/06).
 *  1. Immediate: one IntersectionObserver + CSS transitions for [data-reveal] (no library, first paint safe).
 *  2. Enhancement: after load + idle, GSAP (ScrollTrigger + SplitText) adds masked line reveals on section
 *     headings, scroll-scrubbed parallax on [data-parallax] media and count-ups on [data-counter].
 * Everything is skipped for prefers-reduced-motion; content is fully visible without JS.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    recordPageView(new URL(window.location.href));
  }, [pathname]);

  // 1. CSS reveals
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      root.classList.remove("motion-ready");
      return;
    }
    root.classList.add("motion-ready", "reveal-on");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
      if (el.hasAttribute("data-reveal-group")) {
        Array.from(el.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--reveal-delay", `${i * 70}ms`));
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // 2. GSAP enhancement layer
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    const run = async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);

      const ctx = gsap.context(() => {
        // Masked line reveals on section headings (not the hero, which animates in CSS).
        const headings = gsap.utils.toArray<HTMLElement>(
          "main h2.text-display-m, main h2.text-display-l, main [data-split]",
        );
        headings.forEach((el) => {
          if (el.closest("[data-no-split]") || el.getBoundingClientRect().top < window.innerHeight * 0.6) return;
          el.classList.add("is-in"); // hand over from the CSS reveal
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.05,
                ease: "expo.out",
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              });
            },
          });
        });

        // Parallax media
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((wrap) => {
          const media = wrap.querySelector("img, video");
          if (!media) return;
          gsap.set(media, { scale: 1.12 });
          gsap.fromTo(
            media,
            { yPercent: -5 },
            { yPercent: 5, ease: "none", scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        // Count-ups
        gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
          const target = Number(el.dataset.counter);
          if (!Number.isFinite(target)) return;
          // The real value stays in place until the count actually starts, so a stalled animation can
          // never leave a misleading "0" on screen.
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            once: true,
            onEnter: () => {
              const state = { v: 0 };
              gsap.to(state, {
                v: target,
                duration: 1.8,
                ease: "power3.out",
                onUpdate: () => {
                  el.textContent = Math.round(state.v).toLocaleString();
                },
                onComplete: () => {
                  el.textContent = target.toLocaleString();
                },
              });
            },
          });
        });

        // Section rules draw in
        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
          gsap.from(el, { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });
      });

      ScrollTrigger.refresh();
      revert = () => ctx.revert();
    };

    // Defer until the page has loaded and the main thread is idle, so it never competes with first paint.
    const schedule = () => {
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (idle) idle(() => void run(), { timeout: 1500 });
      else window.setTimeout(() => void run(), 400);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      revert?.();
    };
  }, [pathname]);

  return null;
}
