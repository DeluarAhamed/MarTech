"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { Bullet, cx } from "./ui";

/**
 * Mobile-only sticky action bar: appears after the first screen, hides near the footer
 * (which has its own CTA) and on the contact page.
 */
export function MobileCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector("footer");
      const nearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname.startsWith("/contact") || pathname.startsWith("/thank-you")) return null;

  return (
    <div
      className={cx(
        "fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full border border-hairline bg-white/90 p-1.5 shadow-[0_8px_30px_rgb(23_26_25/0.12)] backdrop-blur-md transition-[transform,opacity] duration-300 sm:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[150%] opacity-0",
      )}
      aria-hidden={!show}
    >
      <Link
        href="/contact/"
        data-cta-location="mobile_bar"
        tabIndex={show ? 0 : -1}
        className="flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-full bg-navy text-[0.75rem] font-medium tracking-[0.06em] text-white uppercase"
      >
        <Bullet /> Start a project
      </Link>
      <a
        href={`tel:${site.contacts.sales.tel}`}
        tabIndex={show ? 0 : -1}
        onClick={() => track("phone_click", { location: "mobile_bar" })}
        aria-label={`Call ${site.contacts.sales.phone}`}
        className="flex size-12 items-center justify-center rounded-full border border-hairline text-navy"
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path
            d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}
