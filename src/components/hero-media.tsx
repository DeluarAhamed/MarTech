"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HeroVideo } from "@/content/home";
import type { Media } from "@/content/media";

/**
 * Full-bleed hero media. The image is always rendered (LCP + poster). Video, when supplied, starts
 * after load and only if motion is allowed and the visitor isn't on Save-Data. A visible control
 * pauses it (WCAG 2.2.2). Scroll parallax is a single rAF-throttled transform (no animation library),
 * skipped for reduced motion and paused once the hero leaves the viewport.
 */
export function HeroMedia({ image, video }: { image: Media; video: HeroVideo | null }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOn, setVideoOn] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const cleanups: (() => void)[] = [];

    if (video && !reduce && !saveData) {
      const start = () => setVideoOn(true);
      if (document.readyState === "complete") start();
      else {
        window.addEventListener("load", start, { once: true });
        cleanups.push(() => window.removeEventListener("load", start));
      }
    }

    const wrap = wrapRef.current;
    const layer = layerRef.current;
    if (!reduce && wrap && layer) {
      let frame = 0;
      let visible = true;
      const update = () => {
        frame = 0;
        const h = wrap.offsetHeight || 1;
        const progress = Math.min(Math.max(window.scrollY / h, 0), 1);
        layer.style.transform = `translate3d(0, ${progress * 14}%, 0)`;
      };
      const onScroll = () => {
        if (visible && !frame) frame = requestAnimationFrame(update);
      };
      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
      io.observe(wrap);
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => {
        io.disconnect();
        window.removeEventListener("scroll", onScroll);
        if (frame) cancelAnimationFrame(frame);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [video]);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
    setPlaying(!el.paused);
  };

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <div ref={layerRef} className="absolute inset-0 -bottom-[14%] will-change-transform">
        <div className="absolute inset-0 motion-safe:animate-[hero-settle_2.4s_var(--ease-out-expo)_both]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[60%_center]"
          />
          {video && videoOn ? (
            <video
              ref={videoRef}
              className="absolute inset-0 size-full object-cover object-[60%_center]"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src={video.src} type={video.type} />
            </video>
          ) : null}
        </div>
      </div>
      {video && videoOn ? (
        <button
          type="button"
          onClick={toggle}
          className="label absolute right-4 bottom-4 z-10 min-h-9 border border-ivory/40 bg-carbon/40 px-3 text-[0.625rem] text-ivory backdrop-blur-sm md:right-14"
        >
          {playing ? "Pause video" : "Play video"}
        </button>
      ) : null}
    </div>
  );
}
