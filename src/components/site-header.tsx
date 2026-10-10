"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, site } from "@/content/site";
import { track } from "@/lib/analytics";
import { Bullet, cx } from "./ui";
import { Wordmark } from "./wordmark";

/**
 * Site header with mega menu. Desktop: panels open on hover (with intent delay) or click, close on
 * Escape / outside click / route change. Mobile: full-screen dialog with accordion sections.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const headerRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHidden(y > 400 && y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset menu state on route change
    setOpen(null);
    dialogRef.current?.close();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const enter = useCallback((id: string) => {
    window.clearTimeout(closeTimer.current);
    setOpen(id);
  }, []);
  const leave = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  }, []);

  const isActive = (href: string) => href !== "/" && pathname.startsWith(href.replace(/#.*$/, ""));

  return (
    <>
      <header
        ref={headerRef}
        onPointerLeave={leave}
        className={cx(
          "fixed inset-x-0 top-0 z-50 bg-white text-carbon transition-[transform,box-shadow] duration-300 [view-transition-name:site-header]",
          scrolled || open ? "shadow-[0_1px_0_rgb(23_26_25/0.10)]" : "",
          hidden && !open && "-translate-y-full",
        )}
      >
        <div className="page-x container-max flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0" onPointerEnter={leave}>
            <Wordmark priority />
          </Link>

          <nav aria-label="Primary" className="hidden h-full lg:block">
            <ul className="flex h-full items-center gap-1">
              {mainNav.map((item) =>
                item.kind === "link" ? (
                  <li key={item.href} className="h-full" onPointerEnter={leave}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cx(
                        "relative flex h-full items-center px-3.5 text-[0.95rem] font-medium transition-colors hover:text-navy",
                        "after:absolute after:inset-x-3.5 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-navy after:transition-transform after:duration-300 hover:after:scale-x-100",
                        isActive(item.href) && "text-navy after:scale-x-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.id} className="h-full" onPointerEnter={() => enter(item.id)}>
                    <button
                      type="button"
                      aria-expanded={open === item.id}
                      aria-controls={`mega-${item.id}`}
                      onClick={() => setOpen((o) => (o === item.id ? null : item.id))}
                      className={cx(
                        "relative flex h-full items-center gap-1.5 px-3.5 text-[0.95rem] font-medium transition-colors hover:text-navy",
                        "after:absolute after:inset-x-3.5 after:bottom-0 after:h-[3px] after:origin-left after:bg-navy after:transition-transform after:duration-300",
                        open === item.id || isActive(item.href) ? "text-navy after:scale-x-100" : "after:scale-x-0",
                      )}
                    >
                      {item.label}
                      <svg viewBox="0 0 12 12" className={cx("size-2.5 transition-transform duration-300", open === item.id && "rotate-180")} aria-hidden="true">
                        <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    </button>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-4" onPointerEnter={leave}>
            <a
              href={`tel:${site.contacts.sales.tel}`}
              onClick={() => track("phone_click", { location: "header" })}
              className="hidden text-[0.95rem] font-semibold tabular-nums text-navy hover:underline hover:underline-offset-4 xl:inline-block"
            >
              {site.contacts.sales.phone}
            </a>
            <Link
              href="/contact/"
              data-cta-location="header"
              className="group hidden min-h-11 items-center gap-2.5 rounded-full bg-navy px-5 text-[0.75rem] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-navy-2 sm:inline-flex"
            >
              <Bullet />
              Start a project
            </Link>
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="-mr-2 flex size-11 items-center justify-center lg:hidden"
              aria-label="Open menu"
              aria-haspopup="dialog"
            >
              <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                <path d="M3 8h18M3 16h18" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mega panels */}
        {mainNav.map((item) =>
          item.kind === "menu" ? (
            <div
              key={item.id}
              id={`mega-${item.id}`}
              role="region"
              aria-label={`${item.label} menu`}
              hidden={open !== item.id}
              onPointerEnter={() => enter(item.id)}
              className="absolute inset-x-0 top-full hidden border-t border-hairline bg-white shadow-[0_24px_48px_-12px_rgb(23_26_25/0.18)] lg:block [&[hidden]]:hidden"
            >
              <div className="page-x container-max grid grid-cols-12 gap-8 py-10">
                <div className="col-span-8 grid grid-cols-2 gap-8">
                  {item.columns.map((col) => (
                    <div key={col.title}>
                      <p className="label text-stone-ink">{col.title}</p>
                      <ul className="mt-4 space-y-1">
                        {col.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="group/l -mx-3 flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-navy-tint">
                              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-navy/30 transition-colors group-hover/l:bg-navy" />
                              <span>
                                <span className="block font-semibold text-carbon group-hover/l:text-navy">{l.label}</span>
                                {l.description ? <span className="mt-0.5 block text-sm text-stone-ink">{l.description}</span> : null}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {item.feature ? (
                  <Link href={item.feature.href} className="group/f col-span-4 block">
                    <div className="cut-tr relative aspect-[16/10] overflow-hidden bg-carbon/5 [--cut:1.75rem]">
                      <Image src={item.feature.image} alt="" fill sizes="30vw" className="object-cover transition-transform duration-700 group-hover/f:scale-105" />
                      <span className="label absolute bottom-2 left-2 bg-carbon/60 px-1.5 py-1 text-[0.6rem] text-white">Rendering</span>
                    </div>
                    <p className="mt-4 font-display text-lg font-bold text-navy">{item.feature.title}</p>
                    <p className="mt-1 text-sm text-stone-ink">{item.feature.text}</p>
                  </Link>
                ) : (
                  <div className="col-span-4 flex flex-col justify-between rounded-sm bg-navy p-6 text-white">
                    <p className="font-display text-xl leading-tight font-bold">Talk to a project consultant</p>
                    <div className="mt-6 space-y-1 text-sm">
                      <a href={`tel:${site.contacts.sales.tel}`} className="block font-semibold tabular-nums hover:underline">{site.contacts.sales.phone}</a>
                      <a href={`mailto:${site.contacts.sales.email}`} className="block text-white/75 hover:underline">{site.contacts.sales.email}</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null,
        )}
      </header>

      {/* Mobile menu */}
      <dialog ref={dialogRef} aria-label="Menu" className="m-0 h-dvh max-h-none w-full max-w-none bg-white text-carbon backdrop:bg-transparent">
        <div className="flex h-full flex-col">
          <div className="page-x flex h-16 shrink-0 items-center justify-between border-b border-hairline">
            <Wordmark />
            <button type="button" onClick={() => dialogRef.current?.close()} className="-mr-2 flex size-11 items-center justify-center" aria-label="Close menu">
              <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile" className="page-x flex-1 overflow-y-auto py-4">
            <ul className="divide-y divide-hairline">
              {mainNav.map((item) =>
                item.kind === "link" ? (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => dialogRef.current?.close()} className="block py-4 font-display text-2xl font-bold">
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.id}>
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-2xl font-bold [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <svg viewBox="0 0 12 12" className="size-3.5 transition-transform group-open:rotate-180" aria-hidden="true">
                          <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                      </summary>
                      <ul className="pb-4">
                        {item.columns.flatMap((c) => c.links).map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} onClick={() => dialogRef.current?.close()} className="block py-2.5">
                              <span className="block font-semibold">{l.label}</span>
                              {l.description ? <span className="block text-sm text-stone-ink">{l.description}</span> : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="page-x shrink-0 space-y-3 border-t border-hairline py-5">
            <a href={`tel:${site.contacts.sales.tel}`} className="block text-center text-lg font-semibold tabular-nums text-navy">
              {site.contacts.sales.phone}
            </a>
            <Link
              href="/contact/"
              data-cta-location="mobile_menu"
              onClick={() => dialogRef.current?.close()}
              className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-navy px-6 text-[0.8125rem] font-semibold tracking-[0.08em] text-white uppercase"
            >
              <Bullet /> Start a project
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
