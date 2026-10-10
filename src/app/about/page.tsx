import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, JsonLd, PageIntro, breadcrumbJsonLd } from "@/components/sections";
import { ButtonLink, SectionLabel } from "@/components/ui";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { leadership } from "@/content/team";

export const metadata: Metadata = {
  title: "About — Modular Manufacturing for Developers",
  description:
    "MAR Technology was launched to serve developers: engineering, price and time to market. Meet the leadership team and our Salt Lake City manufacturing hub.",
  alternates: { canonical: "/about/" },
};

const principles = [
  ["Quality without compromise", "Every module is built in a controlled environment and inspected against structural and performance standards."],
  ["Speed that drives returns", "Factory control means predictable timelines and a faster path to occupancy."],
  ["Accountability", "We build, we deliver, and we stand behind our work with transparency."],
  ["Built for scale", "Production capacity designed to grow with your development."],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about/" }])} />
      <PageIntro
        code="C-00"
        eyebrow="About"
        title="Built to fix a broken process."
        intro="MAR Technology was launched to serve an underserved market — developers. We focus on what matters most to them: engineering, price and time to market, without compromising quality."
        image={media.desertHome}
      />

      <section>
        <div className="page-x container-max section-y grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel code="C-01" className="text-stone-ink">Why we exist</SectionLabel>
          </div>
          <div data-reveal className="space-y-6 text-body-l text-carbon/80 lg:col-span-7">
            <p>
              Traditional construction is still burdened by inefficiencies. Most modular manufacturers focus on individual
              consumers, whose demand is inconsistent — making it hard to deliver the speed, scale and predictability
              developers need.
            </p>
            <p>
              We built our company around the developer community. We can manufacture from your existing plans or provide
              a full range of services, from schematic design through stamped construction documents. And with decades of
              combined experience in construction, modular and prefab manufacturing, our team speaks your language.
            </p>
          </div>
        </div>
      </section>

      <section className="on-dark bg-carbon text-ivory">
        <div className="page-x container-max section-y grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionLabel code="C-02" className="text-bronze">FLEX™</SectionLabel>
            <h2 data-reveal className="mt-6 text-display-m">We bring the factory to the client — not the client to the factory.</h2>
          </div>
          <div data-reveal className="space-y-6 text-ivory/75 lg:col-span-5 lg:col-start-8">
            <p className="text-body-l">
              Our FLEX™ — Flexible Localized Expansion &amp; Execution — model brings production closer to where it&apos;s
              needed: reducing freight costs, minimising transit damage, improving scheduling and accelerating delivery.
            </p>
            <ButtonLink href="/solutions/flex-manufacturing/" variant="ghost-inverse">How FLEX™ works</ButtonLink>
          </div>
        </div>
      </section>

      <section id="leadership" className="scroll-mt-24">
        <div className="page-x container-max section-y">
          <SectionLabel code="C-03" className="text-stone-ink">Leadership</SectionLabel>
          <h2 data-reveal className="mt-6 max-w-2xl text-display-m">The team behind every project.</h2>
          <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((p) => (
              <li key={p.name} data-reveal className="grid grid-cols-[6.5rem_1fr] gap-5">
                <div className="relative aspect-[4/5] overflow-hidden bg-carbon/5">
                  <Image src={p.photo} alt={`Portrait of ${p.name}`} fill sizes="104px" className="object-cover grayscale" />
                </div>
                <div>
                  <h3 className="text-h3">{p.name}</h3>
                  <p className="label mt-1 text-bronze-ink">{p.role}</p>
                  <p className="mt-3 text-[0.95rem] text-stone-ink">{p.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-hairline bg-white">
        <div className="page-x container-max section-y">
          <SectionLabel code="C-04" className="text-stone-ink">Principles</SectionLabel>
          <ul data-reveal data-reveal-group className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(([t, b]) => (
              <li key={t} className="border-t border-carbon/80 pt-5 pb-8 sm:pr-8">
                <h3 className="text-h3">{t}</h3>
                <p className="mt-3 text-stone-ink">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="page-x container-max section-y">
          <SectionLabel code="C-05" className="text-stone-ink">Locations</SectionLabel>
          <h2 data-reveal className="mt-6 text-display-m">Where we build.</h2>
          <p data-reveal className="mt-6 max-w-2xl text-body-l text-carbon/80">{site.coverage.long}</p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[site.locations.factory, site.locations.hq].map((loc) => (
              <address key={loc.label} data-reveal className="border-t border-carbon/80 pt-6 not-italic">
                <p className="label text-stone-ink">{loc.label}</p>
                <p className="mt-4 text-h3">{loc.lines[0]}</p>
                <p className="text-h3 text-stone-ink">{loc.lines[1]}</p>
              </address>
            ))}
          </div>
          <div className="mt-12">
            <ButtonLink href="/factory-tour/" variant="secondary">Request a factory tour</ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand code="C-06" />
    </>
  );
}
