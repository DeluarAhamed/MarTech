import type { Metadata } from "next";
import { ParallelTimeline } from "@/components/parallel-timeline";
import { CtaBand, JsonLd, PageIntro, ProcessSteps, breadcrumbJsonLd } from "@/components/sections";
import { ButtonLink, Figure, SectionLabel } from "@/components/ui";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "Modular Construction Process — Design to Handover",
  description:
    "How MAR Technology delivers modular buildings: design and engineering, factory production, delivery and set, finish and handover — with clear checkpoints at every stage.",
  alternates: { canonical: "/process/" },
};

const checkpoints = [
  ["Design approval", "Final plans, engineering and specifications are reviewed and approved before production."],
  ["Build commencement", "Production begins as materials arrive."],
  ["Inspections", "Each module undergoes required inspections consistent with ICC, state and local municipality requirements."],
  ["Factory walk-through", "Modules are available for a walk-through so you can create a final punch list."],
  ["Site readiness", "Delivery is scheduled in advance to coincide with site readiness."],
];

const comparison = [
  ["Where it's built", "Climate-controlled factory", "On site, exposed to weather"],
  ["Sequencing", "Factory and site work in parallel", "Sequential phases"],
  ["Quality control", "Production checkpoints and in-factory inspections", "Varies by crew and conditions"],
  ["Progress visibility", "Online milestone tracking (Buildertrend)", "Site visits and reports"],
  ["Structure", "Steel frame", "Typically wood frame"],
];

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Process", path: "/process/" }])} />
      <PageIntro
        code="P-00"
        eyebrow="Process"
        title="Concept to keys, in four steps."
        intro="From design to handover, our factory-built approach compresses timelines, reduces risk and keeps delivery consistent at scale."
      />

      <section>
        <div className="page-x container-max pb-24">
          <h2 className="sr-only">The four steps</h2>
          <ProcessSteps />
        </div>
      </section>

      <section className="on-dark bg-carbon text-ivory">
        <div className="page-x container-max section-y">
          <SectionLabel code="P-01" className="text-bronze">Parallel construction</SectionLabel>
          <h2 data-reveal className="mt-6 max-w-3xl text-display-m">Factory and site, at the same time.</h2>
          <div className="mt-16"><ParallelTimeline /></div>
        </div>
      </section>

      <section>
        <div className="page-x container-max section-y grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel code="P-02" className="text-stone-ink">Checkpoints</SectionLabel>
            <h2 data-reveal className="mt-6 text-display-m">Clear milestones. Defined sign-offs.</h2>
            <p data-reveal className="mt-6 text-stone-ink">
              Every stage has defined deliverables and sign-offs, so your project stays on schedule and fully controlled.
            </p>
          </div>
          <ol data-reveal data-reveal-group className="lg:col-span-7 lg:col-start-6">
            {checkpoints.map(([title, body], i) => (
              <li key={title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-hairline py-6">
                <span className="label pt-1.5 text-bronze-ink">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-h3">{title}</h3>
                  <p className="mt-2 text-stone-ink">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="compliance" className="scroll-mt-24 border-t border-hairline bg-white">
        <div className="page-x container-max section-y grid gap-14 lg:grid-cols-12 lg:items-center">
          <div data-reveal="clip" className="lg:col-span-6">
            <Figure media={media.blueprint} aspect="aspect-[3/2]" sizes="(min-width:1024px) 50vw, 100vw" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionLabel code="P-03" className="text-stone-ink">Engineering &amp; compliance</SectionLabel>
            <h2 data-reveal className="mt-6 text-display-m">Designed to move through approvals.</h2>
            <div data-reveal className="mt-6 space-y-4 text-carbon/80">
              <p>
                From engineering to documentation, every project is prepared with lender and regulatory requirements
                in mind. Our team can handle all design through a stamped architectural plan set, or build from your plans.
              </p>
              <p>
                We contract with independent third-party agencies that supplement our internal testing, listing,
                quality-assurance inspection and design plan reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="page-x container-max section-y">
          <SectionLabel code="P-04" className="text-stone-ink">Modular vs. site-built</SectionLabel>
          <h2 data-reveal className="mt-6 text-display-m">A different way to build.</h2>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <caption className="sr-only">Modular construction compared with site-built construction</caption>
              <thead>
                <tr className="border-b border-carbon">
                  <th scope="col" className="label w-1/4 py-4 pr-6 font-normal text-stone-ink"><span className="sr-only">Aspect</span></th>
                  <th scope="col" className="py-4 pr-6 font-display text-h3">Modular</th>
                  <th scope="col" className="py-4 pr-6 font-display text-h3 text-stone-ink">Site-built</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([aspect, mod, trad]) => (
                  <tr key={aspect} className="border-b border-hairline">
                    <th scope="row" className="label py-4 pr-6 align-top font-normal text-stone-ink">{aspect}</th>
                    <td className="py-4 pr-6 align-top">{mod}</td>
                    <td className="py-4 pr-6 align-top text-stone-ink">{trad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="factory" className="on-dark scroll-mt-24 bg-carbon text-ivory">
        <div className="page-x container-max section-y grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionLabel code="P-05" className="text-bronze">Factory tour</SectionLabel>
            <h2 data-reveal className="mt-6 text-display-m">Tour the factory behind every build.</h2>
            <p data-reveal className="mt-6 text-body-l text-ivory/75">
              See how we deliver consistent quality, controlled timelines and scalable production — before your project begins.
            </p>
            <div data-reveal className="mt-10">
              <ButtonLink href="/factory-tour/" variant="inverse">Schedule a factory tour</ButtonLink>
            </div>
          </div>
          <div data-reveal="clip" className="lg:col-span-6 lg:col-start-7">
            <Figure media={media.factory} aspect="aspect-[4/3]" sizes="(min-width:1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <CtaBand code="P-06" />
    </>
  );
}
