"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";

// The form is only downloaded the first time the drawer opens (keeps it out of every page's initial JS).
const LeadForm = dynamic(() => import("./lead-form").then((m) => m.LeadForm), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-carbon/5" aria-hidden="true" />,
});

type Preset = { type?: string; model?: string; state?: string };

/**
 * Right-side "Start a project" drawer. Any link to /contact/ is progressively enhanced:
 * without JS it navigates to the full contact page; with JS it opens this drawer instead.
 * Opt out per link with data-no-drawer.
 */
export function LeadDrawer({ tag }: { tag: ReactNode }) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [preset, setPreset] = useState<Preset | null>(null);
  const [instance, setInstance] = useState(0);
  const [closing, setClosing] = useState(false);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setClosing(true);
    window.setTimeout(() => {
      dialog.close();
      setClosing(false);
    }, reduce ? 0 : 280);
  }, []);

  const open = useCallback((next: Preset, source: string) => {
    setPreset(next);
    setInstance((n) => n + 1);
    dialogRef.current?.showModal();
    track("cta_click", { cta_label: "start_project", location: source });
  }, []);

  // Intercept clicks on contact links site-wide. Capture phase runs before <Link>'s own handler;
  // preventDefault() there makes Link skip its client navigation.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.hasAttribute("data-no-drawer") || anchor.target === "_blank") return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || !/^\/contact\/?$/.test(url.pathname)) return;
      if (window.location.pathname.startsWith("/contact")) return; // the full form is already on screen
      e.preventDefault();
      open(
        { type: url.searchParams.get("type") ?? undefined, model: url.searchParams.get("model") ?? undefined, state: url.searchParams.get("state") ?? undefined },
        anchor.dataset.ctaLocation ?? window.location.pathname,
      );
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [open]);

  // Close when the route changes (e.g. after a successful submission).
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  // Lock page scroll while open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const sync = () => {
      document.documentElement.style.overflow = dialog.open ? "hidden" : "";
    };
    const observer = new MutationObserver(sync);
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => observer.disconnect();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="lead-drawer-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close(); // backdrop click
      }}
      data-closing={closing || undefined}
      className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-[38rem] translate-x-0 bg-white p-0 text-carbon shadow-2xl transition-[translate,opacity] duration-300 ease-[var(--ease-out-expo)] backdrop:bg-carbon/55 backdrop:backdrop-blur-[2px] starting:open:translate-x-full data-[closing]:translate-x-full motion-reduce:transition-none"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-start justify-between gap-4 border-b border-hairline px-6 pt-6 pb-6 sm:px-10">
          <div>
            <p id="lead-drawer-title" className="statement text-[1.75rem]">Let&apos;s talk about your next development.</p>
            <div className="mt-4">{tag}</div>
          </div>
          <button
            type="button"
            onClick={close}
            className="-mr-2 flex size-12 shrink-0 items-center justify-center rounded-full border border-hairline transition-colors hover:border-carbon"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-8 sm:px-10">
          {preset ? <LeadForm key={instance} variant="drawer" initialType={preset.type} initialModel={preset.model} initialState={preset.state} /> : null}
        </div>

        <footer className="border-t border-hairline px-6 py-4 text-sm text-stone-ink sm:px-10">
          Prefer to talk?{" "}
          <a href={`tel:${site.contacts.sales.tel}`} className="font-medium text-carbon tabular-nums underline-offset-4 hover:underline">
            {site.contacts.sales.phone}
          </a>
        </footer>
      </div>
    </dialog>
  );
}
