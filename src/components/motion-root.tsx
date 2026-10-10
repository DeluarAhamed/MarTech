"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { recordPageView } from "@/lib/attribution";

/**
 * Site-wide structural motion (docs/redesign/06) using one IntersectionObserver + CSS transitions —
 * no animation library on the critical path. GSAP is reserved for the pinned signature interaction.
 *   [data-reveal]        → fade + rise as it enters the viewport
 *   [data-reveal="clip"] → image clip/scale reveal
 *   [data-reveal-group]  → children stagger in
 * Content is fully visible without JS and with reduced motion (see globals.css).
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    recordPageView(new URL(window.location.href));
  }, [pathname]);

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

  return null;
}
