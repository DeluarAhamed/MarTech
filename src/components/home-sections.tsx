import Link from "next/link";
import { faqs as allFaqs } from "@/content/faq";
import { solutionHref, solutions } from "@/content/solutions";
import { PathPreview } from "./path-preview";
import { JsonLd } from "./sections";
import { Bullet, ButtonLink, SectionLabel } from "./ui";

/** "Choose your path": full-bleed navy band with audience rows and a large crossfading preview. */
export function PathPanel() {
  const items = solutions
    .filter((s) => s.slug !== "flex-manufacturing")
    .map((s) => ({ href: solutionHref(s.slug), label: s.navLabel, headline: s.headline, image: s.image }));

  return (
    <section className="on-dark relative overflow-hidden bg-navy text-white">
      {/* Logo-derived parallel bars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[8%] w-[30rem] opacity-[0.07]">
        <span className="absolute -top-20 left-0 h-[140%] w-20 rotate-[45deg] bg-white" />
        <span className="absolute -top-20 left-32 h-[140%] w-6 rotate-[45deg] bg-white" />
      </div>
      <div className="page-x container-max section-y relative">
        <div className="grid-4 items-end gap-y-6">
          <div className="md:col-span-2">
            <SectionLabel code="A-04" className="text-white/70 [&_polygon:first-child]:fill-white">Choose your path</SectionLabel>
            <h2 className="mt-5 text-display-m">Who are you building for?</h2>
          </div>
          <p className="text-white/75 lg:col-span-2 lg:col-start-3 lg:pl-[25%]">
            Tell us your project type and we&apos;ll tailor models, process and documentation to it.
          </p>
        </div>

        <div className="mt-14">
          <PathPreview items={items} />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
          <ButtonLink href="/contact/" variant="inverse" data-cta-location="paths" className="text-navy">
            Start a project
          </ButtonLink>
          <Link
            href="/solutions/flex-manufacturing/"
            className="inline-flex items-center gap-2.5 text-[0.8125rem] font-semibold tracking-[0.06em] uppercase hover:underline hover:underline-offset-4"
          >
            <Bullet /> Large project? See FLEX™
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Objection-handling FAQ (native <details>, no JS) + FAQPage structured data. */
export function Faq({ items = allFaqs, title = "Good to know." }: { items?: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="page-x container-max section-y">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <div className="grid-4 gap-y-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel code="FAQ" className="text-stone-ink">Questions</SectionLabel>
          <h2 className="mt-5 text-display-m">{title}</h2>
          <p className="mt-5 max-w-xs text-stone-ink">Can&apos;t find your answer? Our project consultants are a call away.</p>
          <div className="mt-6">
            <ButtonLink href="/contact/" variant="secondary" data-cta-location="faq">Ask a question</ButtonLink>
          </div>
        </div>
        <div className="md:col-span-1 lg:col-span-2 lg:col-start-3">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-hairline first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-bold tracking-[-0.01em] transition-colors hover:text-navy [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="relative grid size-8 shrink-0 place-items-center rounded-full border border-hairline transition-colors group-open:border-navy group-open:bg-navy">
                  <span className="absolute h-[1.5px] w-3 bg-navy group-open:bg-white" />
                  <span className="absolute h-3 w-[1.5px] bg-navy transition-transform duration-300 group-open:scale-y-0" />
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
