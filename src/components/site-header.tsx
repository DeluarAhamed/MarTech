"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { primaryNav, site } from "@/content/site";
import { track } from "@/lib/analytics";
import { cx } from "./ui";
import { Wordmark } from "./wordmark";

/**
 * Minimal header after the approved reference layout: logo (col 1), comma-separated navigation
 * starting on column 3, contact on the right. Sits on the page at the top; once scrolled it
 * hides on the way down and returns as a solid bar on the way up.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 text-carbon transition-[transform,background-color,border-color] duration-300 [view-transition-name:site-header]",
          scrolled ? "border-b border-hairline bg-white/90 backdrop-blur-md" : "border-b border-transparent bg-transparent",
          hidden && "-translate-y-full",
        )}
      >
        <div className="page-x container-max flex h-14 items-center justify-between md:h-16 lg:grid lg:grid-cols-4 lg:gap-x-5">
          <Link href="/" aria-label={`${site.name} — home`} className="justify-self-start">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden lg:col-start-3 lg:block">
            <ul className="flex flex-wrap items-center text-[0.95rem] font-light">
              {primaryNav.map((item, i) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Fragment key={item.href}>
                    <li>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cx("inline-block py-2 hover:underline hover:underline-offset-4", active && "underline underline-offset-4")}
                      >
                        {item.label}
                      </Link>
                    </li>
                    {i < primaryNav.length - 1 ? <li aria-hidden="true" className="mr-1.5">,</li> : null}
                  </Fragment>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-5 justify-self-end lg:col-start-4">
            <a
              href={`tel:${site.contacts.sales.tel}`}
              onClick={() => track("phone_click", { location: "header" })}
              className="hidden text-[0.95rem] font-light tabular-nums hover:underline hover:underline-offset-4 xl:inline-block"
            >
              {site.contacts.sales.phone}
            </a>
            <Link
              href="/contact/"
              data-cta-location="header"
              className="hidden py-2 text-[0.95rem] font-light hover:underline hover:underline-offset-4 sm:inline-block"
            >
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
                <path d="M3 8h18M3 16h18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-white text-carbon backdrop:bg-transparent"
      >
        <div className="page-x flex h-full flex-col">
          <div className="flex h-14 items-center justify-between">
            <Wordmark />
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="-mr-2 flex size-11 items-center justify-center"
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-10 flex-1" onClick={() => dialogRef.current?.close()}>
            <ul className="space-y-1">
              {[{ href: "/", label: "Home" }, ...primaryNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block py-1.5 font-display text-[2.75rem] leading-tight font-extrabold tracking-tight">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3 pb-8">
            <a href={`tel:${site.contacts.sales.tel}`} className="block py-2 text-lg font-light tabular-nums">
              {site.contacts.sales.phone}
            </a>
            <Link
              href="/contact/"
              data-cta-location="mobile_menu"
              onClick={() => dialogRef.current?.close()}
              className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-carbon px-6 text-[0.8125rem] font-medium tracking-[0.04em] text-white uppercase"
            >
              Start a project
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
