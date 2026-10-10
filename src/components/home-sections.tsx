import Image from "next/image";
import Link from "next/link";
import { faqs } from "@/content/faq";
import { solutions } from "@/content/solutions";
import { JsonLd } from "./sections";
import { Bullet, ButtonLink, SectionLabel, Slash } from "./ui";

/**
 * "Choose your path" — audience-segmented entry points (Elevate-style journey routing) in a navy
 * brand panel. Rows reveal their image on hover/focus on desktop; always visible on touch.
 */
export function PathPanel() {
  const paths = solutions.filter((s) => s.slug !== "flex-manufacturing");
  return (
    <section className="page-x container-max">
      <div className="on-dark cut-tr-bl relative overflow-hidden bg-navy px-5 py-14 text-white [--cut:2.5rem] lg:px-10 lg:py-20 lg:[--cut:5rem]">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-16 h-[140%] w-40 rotate-45 bg-white/[0.04]" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-40 h-[140%] w-10 rotate-45 bg-white/[0.06]" />
        <div className="grid-4 items-end gap-y-6">
          <div className="md:col-span-2">
            <p className="label flex items-center gap-3 text-white/70">
              <Slash className="[&_polygon:first-child]:fill-white" /> Choose your path
            </p>
            <h2 className="mt-5 text-display-m">Who are you building for?</h2>
          </div>
          <p className="text-white/70 lg:col-start-4">
            Tell us your project type and we&apos;ll tailor models, process and paperwork to it.
          </p>
        </div>

        <ul className="mt-12 border-t border-white/20">
          {paths.map((p, i) => (
            <li key={p.slug} className="border-b border-white/20">
              <Link
                href={`/solutions/${p.slug}/`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-6 lg:grid-cols-[4rem_1.2fr_1fr_auto] lg:gap-x-8 lg:py-8"
              >
                <span className="text-sm font-semibold tabular-nums text-white/60">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-[clamp(1.5rem,3vw,2.75rem)] leading-none font-semibold tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-2">
                    {p.navLabel}
                  </span>
                  <span className="mt-2 block max-w-md text-sm text-white/65 lg:hidden">{p.headline}</span>
                </span>
                <span className="relative hidden h-20 overflow-hidden lg:block">
                  <span className="absolute inset-0 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <Image src={p.image.src} alt="" fill sizes="28vw" className="cut-tr object-cover [--cut:1rem]" />
                  </span>
                  <span className="absolute inset-0 flex items-center text-sm text-white/65 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
                    {p.headline}
                  </span>
                </span>
                <span className="flex size-11 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-navy">
                  <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
                    <path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <ButtonLink href="/contact/" variant="inverse" data-cta-location="paths" className="text-navy">
            Start a project
          </ButtonLink>
          <Link href="/solutions/flex-manufacturing/" className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium tracking-[0.04em] uppercase hover:underline hover:underline-offset-4">
            <Bullet /> Large project? See FLEX™
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Objection-handling FAQ (native <details>, no JS) + FAQPage structured data. */
export function Faq() {
  return (
    <section className="page-x container-max section-y">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <div className="grid-4 gap-y-10">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionLabel code="FAQ" className="text-stone-ink">Questions</SectionLabel>
          <h2 className="mt-5 text-display-m">Good to know.</h2>
          <p className="mt-5 max-w-xs text-stone-ink">Can&apos;t find your answer? Our project consultants are a call away.</p>
          <div className="mt-6">
            <ButtonLink href="/contact/" variant="secondary" data-cta-location="faq">Ask a question</ButtonLink>
          </div>
        </div>
        <div className="md:col-span-1 lg:col-span-2 lg:col-start-3">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-hairline first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-semibold tracking-[-0.01em] marker:hidden [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="relative size-4 shrink-0">
                  <span className="absolute top-1/2 left-0 h-[1.5px] w-4 -translate-y-1/2 bg-navy" />
                  <span className="absolute top-0 left-1/2 h-4 w-[1.5px] -translate-x-1/2 bg-navy transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-stone-ink">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
