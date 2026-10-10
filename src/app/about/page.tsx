import type { Metadata } from "next";
import { NumberedCards, SectionHead } from "@/components/blocks";
import { CounterBand } from "@/components/counter-band";
import { CoverageMap, MapLegend } from "@/components/coverage-map";
import { LeadershipGrid } from "@/components/leadership-grid";
import { MadeInUsaSeal } from "@/components/made-in-usa";
import { CtaBand, JsonLd, PageIntro, breadcrumbJsonLd } from "@/components/sections";
import { ButtonLink, Figure, SectionLabel } from "@/components/ui";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { flexSteps } from "@/content/solutions";
import { leadership } from "@/content/team";

export const metadata: Metadata = {
  title: "About MAR Technology | Modular Manufacturer for Developers",
  description:
    "MAR Technology was launched to serve developers: engineering, price and time to market. Meet the leadership team, our Salt Lake City factory and our FLEX™ manufacturing model.",
  alternates: { canonical: "/about/" },
};

const principles = [
  { title: "Quality without compromise", body: "Every module is built in a controlled environment and inspected against structural and performance standards." },
  { title: "Speed that drives returns", body: "Factory control means predictable timelines and a faster path to occupancy." },
  { title: "Accountability", body: "We build, we deliver, and we stand behind our work with transparency." },
  { title: "Built for scale", body: "Production planned to grow with your development, phase by phase." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": leadership.map((p) => ({
            "@type": "Person",
            name: p.name,
            jobTitle: p.role,
            image: p.photo,
            sameAs: [p.linkedin],
            worksFor: { "@type": "Organization", name: site.legalName, url: site.url },
          })),
        }}
      />
      <PageIntro
        code="C-00"
        eyebrow="About MAR Technology"
        title="Built to fix a broken process."
        intro="MAR Technology was launched to serve an underserved market: developers. We focus on what matters most to them: engineering, price and time to market, without compromising quality."
        image={media.desertHome}
      />

      {/* Why we exist */}
      <section className="page-x container-max section-y">
        <div className="grid-4 gap-y-12">
          <div className="md:col-span-2">
            <SectionLabel code="C-01" className="text-stone-ink">Why we exist</SectionLabel>
            <h2 className="mt-5 text-display-m">A manufacturer organized around the developer.</h2>
            <div data-reveal className="mt-8 space-y-5 text-[1.05rem] text-stone-ink">
              <p>
                Traditional construction is still burdened by inefficiencies. Most modular manufacturers focus on individual
                consumers, whose demand is inconsistent, making it hard to deliver the speed, scale and predictability
                developers need.
              </p>
              <p>
                We built our company around the developer community. We manufacture from your existing plans or provide a
                full range of services, from schematic design through stamped construction documents. With decades of
                combined experience in construction, modular and prefab manufacturing, our team speaks your language.
              </p>
            </div>
          </div>
          <div className="relative md:col-span-2 lg:col-start-3 lg:pl-[12%]">
            <Figure media={media.solterraLiving} aspect="aspect-[4/5]" className="cut-tr [--cut:2.5rem]" sizes="(min-width:1024px) 40vw, 100vw" parallax />
            <MadeInUsaSeal className="absolute right-6 bottom-6 z-10 hidden size-28 md:grid lg:right-8 lg:bottom-8" />
          </div>
        </div>
      </section>

      <CounterBand code="C-02" title="A partner built for scale." />

      {/* FLEX */}
      <section className="border-b border-hairline bg-ivory">
        <div className="page-x container-max section-y">
          <SectionHead
            code="C-03"
            label="FLEX™ manufacturing"
            title="We bring the factory to the client, not the client to the factory."
            intro="FLEX™, Flexible Localized Expansion and Execution, brings production closer to where it's needed: reducing freight costs, minimizing transit damage, improving scheduling and accelerating delivery."
            action={<ButtonLink href="/solutions/flex-manufacturing/">How FLEX™ works</ButtonLink>}
          />
          <div className="mt-14">
            <NumberedCards items={flexSteps.map((s) => ({ title: s.title, body: s.body }))} />
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="scroll-mt-24 page-x container-max section-y">
        <SectionHead code="C-04" label="Leadership" title="The team behind every project." intro="Experienced leaders in modular construction, engineering and project delivery, focused on quality, speed and reliability." />
        <div className="mt-14">
          <LeadershipGrid />
        </div>
      </section>

      {/* Principles */}
      <section className="page-x container-max pb-24">
        <SectionHead code="C-05" label="Principles" title="What drives every project we deliver." />
        <div className="mt-12">
          <NumberedCards items={principles} />
        </div>
      </section>

      {/* Locations */}
      <section className="border-t border-hairline">
        <div className="page-x container-max section-y grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel code="C-06" className="text-stone-ink">Where we build</SectionLabel>
            <h2 className="mt-5 text-display-m">Factory in Utah. Serving all 50 states.</h2>
            <p data-reveal className="mt-6 text-stone-ink">{site.coverage.long}</p>
            <div className="mt-8 space-y-6">
              {[site.locations.factory, site.locations.hq].map((loc) => (
                <address key={loc.label} className="border-t border-hairline pt-4 not-italic">
                  <p className="label text-stone-ink">{loc.label}</p>
                  {loc.lines.map((l) => (
                    <span key={l} className="mt-1 block font-display text-lg font-bold">{l}</span>
                  ))}
                </address>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/factory-tour/">Request a factory tour</ButtonLink>
              <ButtonLink href="/locations/" variant="secondary">Service area</ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="cut-tr bg-ivory p-4 [--cut:2.5rem] md:p-8">
              <CoverageMap compact />
            </div>
            <MapLegend className="mt-5 text-stone-ink" />
          </div>
        </div>
      </section>

      <CtaBand code="C-07" />
    </>
  );
}
