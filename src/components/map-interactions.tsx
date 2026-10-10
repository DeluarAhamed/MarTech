"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "./ui";

type Tip = { x: number; y: number; name: string; west: boolean; dist: string; anchor: string };

/**
 * Adds hover/focus tooltips and highlight to a server-rendered map by reading data attributes.
 * Also starts the route draw-in animation when the map scrolls into view.
 */
export function MapInteractions({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold: 0.25 });
    io.observe(root);

    const show = (el: Element | null) => {
      const node = el?.closest("[data-state]") as HTMLElement | null;
      root.querySelectorAll(".is-active").forEach((n) => n.classList.remove("is-active"));
      if (!node) return setTip(null);
      node.classList.add("is-active");
      const svg = root.querySelector("svg");
      if (!svg) return;
      const vb = svg.viewBox.baseVal;
      setTip({
        x: (Number(node.dataset.cx) / vb.width) * 100,
        y: (Number(node.dataset.cy) / vb.height) * 100,
        name: node.dataset.name ?? "",
        west: node.dataset.tier === "west",
        dist: node.dataset.dist ?? "",
        anchor: node.dataset.anchor ?? "",
      });
    };
    const over = (e: Event) => show(e.target as Element);
    const out = (e: PointerEvent) => {
      if (!root.contains(e.relatedTarget as Node)) show(null);
    };
    root.addEventListener("pointerover", over);
    root.addEventListener("focusin", over);
    root.addEventListener("pointerleave", out);
    const blur = (e: FocusEvent) => { if (!root.contains(e.relatedTarget as Node)) show(null); };
    root.addEventListener("focusout", blur);
    return () => {
      io.disconnect();
      root.removeEventListener("pointerover", over);
      root.removeEventListener("focusin", over);
      root.removeEventListener("pointerleave", out);
      root.removeEventListener("focusout", blur);
    };
  }, []);

  return (
    <div ref={ref} className={cx("us-map", inView && "in-view", className)}>
      {children}
      {tip ? (
        <div
          role="status"
          className={cx("pointer-events-none absolute z-10 w-56 -translate-x-1/2 rounded-sm", tip.y < 30 ? "translate-y-[18px]" : "-translate-y-[calc(100%+14px)]", " border border-hairline bg-white p-3.5 text-left shadow-[0_18px_40px_-12px_rgb(23_26_25/0.35)]")}
          style={{ left: `${Math.min(Math.max(tip.x, 14), 86)}%`, top: `${tip.y}%` }}
        >
          <p className="font-display text-base leading-tight font-bold text-carbon">{tip.name}</p>
          <p className={cx("mt-1.5 inline-block rounded-sm px-1.5 py-0.5 text-[0.65rem] font-bold tracking-[0.1em] uppercase", tip.west ? "bg-navy text-white" : "bg-[#cdd2df] text-carbon")}>
            {tip.west ? "Served from Utah" : "Nationwide"}
          </p>
          <p className="mt-2 text-xs leading-snug text-stone-ink">
            {tip.west
              ? `${tip.anchor} is about ${Number(tip.dist).toLocaleString()} miles straight-line from our Salt Lake City factory. Click for the ${tip.name} page.`
              : "Enquiries welcome. Delivery is assessed per project; larger developments may qualify for FLEX™."}
          </p>
        </div>
      ) : null}
    </div>
  );
}
