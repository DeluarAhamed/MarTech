import type { Metadata } from "next";
import Image from "next/image";
import { NumberedCards, SectionHead } from "@/components/blocks";
import { Faq } from "@/components/home-sections";
import { MadeInUsaTag } from "@/components/made-in-usa";
import { ParallelSchedule } from "@/components/parallel-schedule";
import { CtaBand, JsonLd, breadcrumbJsonLd } from "@/components/sections";
import { ButtonLink, Figure, SectionLabel } from "@/components/ui";
import { faqs } from "@/content/faq";
import { media } from "@/content/media";
import { processSteps } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Modular Construction Process | Design, Factory Build, Delivery, Handover",
  description:
    "How the modular construction process works with MAR Technology: design and engineering, factory build, delivery and set, finish and handover, with parallel factory and site work.",
  alternates: { canonical: "/process/" },
};

const checkpoints = [
  { title: "Design approval", body: "Final plans, engineering and specifications are reviewed and approved before production." },
  { title: "Build commencement", body: "Production begins as materials arrive at the factory." },
  { title: "Inspections", body: "Each module undergoes required inspections consistent with ICC, state and local requirements." },
  { title: "Factory walk-through", body: "Modules are available for a walk-through so you can create a final punch list." },
  { title: "Site readiness", body: "Delivery is scheduled in advance to coincide with site readiness." },
];

const comparison = [
  { aspect: "Where it's built", modular: "Climate-controlled factory", site: "On site, exposed to weather" },
  { aspect: "Sequencing", modular: "Factory and site work in parallel", site: "Mostly sequential phases" },
  { aspect: "Quality control", modular: "Fixed stations with production checkpoints", site: "Varies with crews and conditions" },
  { aspect: "Progress visibility", modular: "Online milestone tracking in Buildertrend", site: "Site visits and reports" },
  { aspect: "Structure", modular: "Steel-framed base units", site: "Typically wood frame" },
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Process", path: "/process/" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How a modular building is delivered with MAR Technology",
          step: processSteps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
        }}
      />

      {/* Hero */}
      <section className="page-x container-max pt-28 md:pt-36">
        <div className="grid-4 items-end gap-y-8">
          <div className="md:col-span-2 lg:col-span-3">
            <SectionLabel code="P-00" className="text-stone-ink">Our process</SectionLabel>
            <h1 className="hero-line mt-6 overflow-hidden pb-[0.06em] text-display-l">
              <span className="block">Concept to keys, <span className="text-navy">in four steps.</span></span>
            </h1>
          </div>
          <div className="hero-fade-late space-y-5">
            <p className="text-stone-ink">A factory-built approach that compresses timelines, reduces risk and keeps delivery consistent at scale.</p>
            <ButtonLink href="/contact/" data-cta-location="process_hero">Start a project</ButtonLink>
          </div>
        </div>
        <div className="relative mt-12">
          <Figure media={media.solterraPerspective} aspect="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2.6/1]" className="cut-tr [--cut:3rem] lg:[--cut:6rem]" sizes="100vw" eager parallax />
          <div className="absolute top-4 left-4"><MadeInUsaTag tone="dark" detail /></div>
        </div>
      </section>

      {/* Steps */}
      <section className="page-x container-max section-y">
        <SectionHead
          code="P-01"
          label="Four steps"
          title="A predictable, engineered path."
          intro="Each step has defined deliverables and sign-offs, designed around developer schedules and lender milestones."
        />
        <div className="mt-14">
          <NumberedCards items={processSteps.map((s) => ({ title: s.title, body: s.body }))} />
        </div>
      </section>

      {/* Parallel construction */}
      <section id="parallel" className="on-dark scroll-mt-20 bg-navy text-white">
        <div className="page-x container-max section-y">
          <SectionHead
            tone="dark"
            code="P-02"
            label="Parallel construction"
            title="Factory and site, at the same time."
            intro="On a site-built project every trade waits for the one before it, and for the weather. With modular, production happens indoors while permits, sitework and foundations move forward."
          />
          <div className="mt-16">
            <ParallelSchedule />
          </div>
          <div className="mt-16">
            <NumberedCards
              tone="dark"
              columns={3}
              items={[
                { title: "Two critical paths", body: "Factory production and sitework progress at once instead of one after the other." },
                { title: "Indoor production", body: "Rain, snow and heat don't stop module assembly or expose materials during construction." },
                { title: "Set when ready", body: "Modules are delivered to match site readiness, then set, connected and finished." },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Checkpoints */}
      <section className="page-x container-max section-y">
        <SectionHead code="P-03" label="Checkpoints" title="Clear milestones. Defined sign-offs." intro="Every stage has deliverables and approvals, so your project stays on schedule, on budget and fully controlled." />
        <ol data-reveal data-reveal-group className="relative mt-14 grid gap-6 md:grid-cols-5">
          <span aria-hidden="true" className="absolute top-5 right-[10%] left-[10%] hidden h-[2px] bg-navy/15 md:block" />
          {checkpoints.map((c, i) => (
            <li key={c.title} className="relative">
              <span className="relative z-10 grid size-10 place-items-center rounded-full bg-navy text-sm font-bold text-white tabular-nums ring-8 ring-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-lg">{c.title}</h3>
              <p className="mt-2 text-[0.95rem] text-stone-ink">{c.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Compliance */}
      <section id="compliance" className="scroll-mt-24 border-t border-hairline bg-ivory">
        <div className="page-x container-max section-y grid gap-12 lg:grid-cols-12 lg:items-center">
          <div data-reveal className="cut-bl relative aspect-[4/3] overflow-hidden [--cut:3rem] lg:col-span-6">
            <Image src={media.blueprint.src} alt={media.blueprint.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            <span className="label absolute top-3 right-3 bg-carbon/60 px-2 py-1 text-[0.6rem] text-white">Concept image</span>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionLabel code="P-04" className="text-stone-ink">Engineering and compliance</SectionLabel>
            <h2 data-reveal className="mt-5 text-display-m">Designed to move through approvals.</h2>
            <p data-reveal className="mt-6 text-[1.05rem] text-stone-ink">
              From engineering to documentation, every project is prepared with lender and regulatory requirements in mind.
              Our team can handle all design through a stamped architectural plan set, or build from your plans.
            </p>
            <p data-reveal className="mt-4 text-[1.05rem] text-stone-ink">
              Independent third-party agencies supplement our internal testing, listing, quality-assurance inspection and
              design plan reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="page-x container-max section-y">
        <SectionHead code="P-05" label="Modular vs. site-built" title="A different way to build." action={<ButtonLink href="/blog/modular-vs-site-built-construction/" variant="secondary">Read the comparison</ButtonLink>} />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="cut-tr bg-navy p-7 text-white [--cut:2rem] md:p-9">
            <p className="label text-white/70">Modular with MAR Technology</p>
            <dl className="mt-6 divide-y divide-white/15">
              {comparison.map((c) => (
                <div key={c.aspect} className="grid grid-cols-[9rem_1fr] gap-4 py-4">
                  <dt className="text-sm text-white/60">{c.aspect}</dt>
                  <dd className="flex gap-2.5 font-semibold">
                    <svg viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-bronze" aria-hidden="true"><path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                    {c.modular}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="border border-hairline p-7 md:p-9">
            <p className="label text-stone-ink">Site-built</p>
            <dl className="mt-6 divide-y divide-hairline">
              {comparison.map((c) => (
                <div key={c.aspect} className="grid grid-cols-[9rem_1fr] gap-4 py-4">
                  <dt className="text-sm text-stone-ink">{c.aspect}</dt>
                  <dd className="text-stone-ink">{c.site}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Factory tour */}
      <section id="factory" className="scroll-mt-24 page-x container-max pb-24">
        <div className="cut-tr-bl grid overflow-hidden bg-navy text-white [--cut:3rem] lg:grid-cols-2 [&>*]:min-w-0">
          <div className="p-8 md:p-12">
            <SectionLabel code="P-06" className="text-white/70 [&_polygon:first-child]:fill-white">Factory tour</SectionLabel>
            <h2 className="mt-5 text-display-m">Tour the factory behind every build.</h2>
            <p className="mt-5 max-w-md text-white/75">See how we deliver consistent quality, controlled timelines and scalable production before your project begins.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/factory-tour/" variant="inverse" className="text-navy">Schedule a factory tour</ButtonLink>
            </div>
            <div className="mt-8"><MadeInUsaTag tone="dark" detail /></div>
          </div>
          <div className="relative min-h-72">
            <Image src={media.factoryShowcase.src} alt={media.factoryShowcase.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            <span className="label absolute bottom-3 left-3 bg-carbon/60 px-2 py-1 text-[0.6rem] text-white">Concept image</span>
          </div>
        </div>
      </section>

      <Faq items={faqs.filter((f) => ["Can we follow progress during production?", "How is the building structured?", "Can you build from our existing plans?", "Can we visit the factory?"].includes(f.q))} title="Process questions." />
      <CtaBand code="P-07" />
    </>
  );
}
