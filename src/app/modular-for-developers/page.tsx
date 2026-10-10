import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Checklist, NumberedCards, SectionHead } from "@/components/blocks";
import { CoverageMap, MapLegend } from "@/components/coverage-map";
import { Faq } from "@/components/home-sections";
import { MadeInUsaSeal, MadeInUsaTag } from "@/components/made-in-usa";
import { ModelCard } from "@/components/model-card";
import { CtaBand, JsonLd, breadcrumbJsonLd } from "@/components/sections";
import { ButtonLink, Figure, SectionLabel } from "@/components/ui";
import { faqs } from "@/content/faq";
import { westernStates } from "@/content/locations";
import { media } from "@/content/media";
import { models } from "@/content/models";
import { site } from "@/content/site";
import { flexSteps } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Modular Construction for Developers | Scalable Modular Manufacturing",
  description:
    "Modular construction for developers: single-family, townhome, build-to-rent and multifamily modules manufactured in Salt Lake City, with FLEX™ production for larger projects.",
  alternates: { canonical: "/modular-for-developers/" },
};

const benefits = [
  { title: "Faster timelines", body: "Modules are built off-site while sitework continues, so two critical paths run at once." },
  { title: "Predictable costs", body: "Fixed factory pricing and fewer on-site variables make underwriting clearer." },
  { title: "Production around your phases", body: "Manufacturing is planned around your phasing and delivery schedule." },
  { title: "Consistent quality", body: "Factory-built at fixed stations with inspections at defined checkpoints." },
];

const pillars = [
  {
    title: "Community-grade engineering",
    body: "Structural systems, MEP and envelope assemblies designed for repetition, value engineering and lender due diligence, without compromising curb appeal.",
  },
  {
    title: "Predictable pro formas",
    body: "Fixed factory pricing, short construction windows and reduced carry costs support clearer underwriting and faster capital recycling.",
  },
  {
    title: "Indistinguishable from site-built",
    body: "Street-facing elevations, rooflines and material palettes designed to meet HOA and municipal expectations for traditional construction.",
  },
];

const applications = [
  { title: "Single-family communities", body: "For-sale and build-to-rent neighborhoods, from a first phase to a full community.", href: "/models/solterra/" },
  { title: "Townhomes and multifamily", body: "Split-level duplex and residential-row configurations on a reduced footprint.", href: "/models/castello/" },
  { title: "Classrooms and campuses", body: "Temporary and permanent classrooms, from a few rooms to a K-12 campus.", href: "/solutions/education/" },
  { title: "Workforce and flex space", body: "Employee housing, temporary offices and adaptable space where it is needed.", href: "/solutions/workforce-flex/" },
];

const devFaqs = faqs.filter((f) =>
  ["Can you build from our existing plans?", "Where do you deliver?", "Can we follow progress during production?", "What is FLEX™?", "How are lead times and pricing set?"].includes(f.q),
);

export default function DevelopersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Modular for developers", path: "/modular-for-developers/" }])} />

      {/* Hero */}
      <section className="page-x container-max pt-28 md:pt-36">
        <div className="grid-4 items-end gap-y-8">
          <div className="md:col-span-2 lg:col-span-3">
            <SectionLabel code="D-00" className="text-stone-ink">Modular for developers</SectionLabel>
            <h1 className="hero-line mt-6 overflow-hidden pb-[0.06em] text-[clamp(2.75rem,7.4vw,7.75rem)] leading-[0.9] font-extrabold tracking-[-0.035em] [font-stretch:115%]">
              <span className="block">Build smarter.</span>
            </h1>
            <p className="hero-line overflow-hidden pb-[0.06em] font-display text-[clamp(2.75rem,7.4vw,7.75rem)] leading-[0.9] font-extrabold tracking-[-0.035em] text-navy [font-stretch:115%]">
              <span className="block">Build faster. Build more.</span>
            </p>
          </div>
          <div className="hero-fade-late">
            <p className="text-[1.08rem] text-stone-ink">
              Scalable modular manufacturing for developers, from a first phase to a full community.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact/?type=housing-community" data-cta-location="dev_hero">Discuss your project</ButtonLink>
            </div>
          </div>
        </div>
        <div className="relative mt-12 md:mt-16">
          <Figure media={media.townhomeCommunity} aspect="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2.4/1]" className="cut-tr [--cut:3rem] lg:[--cut:6rem]" sizes="100vw" eager />
          <div className="absolute top-4 left-4"><MadeInUsaTag tone="dark" detail /></div>
          <MadeInUsaSeal className="absolute -bottom-12 right-6 hidden lg:grid" />
        </div>
      </section>

      {/* Benefits */}
      <section className="page-x container-max section-y">
        <SectionHead
          code="D-01"
          label="A faster, more predictable way to build"
          title="Modular buildings built for developers."
          intro="Whether you're planning a dozen classrooms, temporary offices, a small single-family community or a multi-phase townhome community, MAR Technology provides the manufacturing, expertise and flexibility to keep your development moving."
        />
        <div className="mt-14">
          <NumberedCards items={benefits} />
        </div>
      </section>

      {/* Built for developers */}
      <section className="on-dark bg-navy text-white">
        <div className="page-x container-max section-y">
          <div className="grid-4 gap-y-12">
            <div className="md:col-span-2">
              <SectionLabel code="D-02" className="text-white/70">Built for developers, not one-off projects</SectionLabel>
              <h2 data-reveal className="mt-5 text-display-m">From take-offs to lender packages, aligned with how communities get delivered.</h2>
              <div data-reveal className="cut-tr relative mt-10 aspect-[4/3] overflow-hidden [--cut:2.5rem]">
                <Image src={media.solterraPerspective.src} alt={media.solterraPerspective.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
                <span className="label absolute bottom-3 left-3 bg-carbon/60 px-2 py-1 text-[0.6rem] text-white">Rendering</span>
              </div>
            </div>
            <ul data-reveal data-reveal-group className="space-y-4 lg:col-span-2 lg:col-start-3 lg:pl-[12%]">
              {pillars.map((p, i) => (
                <li key={p.title} className="border-t border-white/20 pt-6 pb-4">
                  <span className="text-sm font-bold text-white/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-2xl">{p.title}</h3>
                  <p className="mt-3 max-w-lg text-white/75">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="page-x container-max section-y">
        <SectionHead
          code="D-03"
          label="What we build"
          title="Your vision. Built to suit."
          intro="MAR Technology manufactures more than housing. Residential, educational, workforce and custom applications give developers more ways to build."
        />
        <div className="mt-14">
          <NumberedCards items={applications} />
        </div>
      </section>

      {/* Models */}
      <section className="border-t border-hairline bg-ivory">
        <div className="page-x container-max section-y">
          <SectionHead
            code="D-04"
            label="Start from a standard"
            title="Three engineered models. Or your plans."
            action={<ButtonLink href="/models/" variant="secondary">Compare models</ButtonLink>}
          />
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {models.map((m) => (
              <ModelCard key={m.slug} model={m} />
            ))}
          </div>
        </div>
      </section>

      {/* FLEX */}
      <section className="page-x container-max section-y">
        <div className="grid-4 gap-y-12">
          <div className="md:col-span-2">
            <SectionLabel code="D-05" className="text-stone-ink">Introducing FLEX™</SectionLabel>
            <h2 data-reveal className="mt-5 text-display-m">Big project? We can bring manufacturing closer to your development.</h2>
            <p data-reveal className="mt-6 max-w-xl text-[1.05rem] text-stone-ink">
              FLEX™, Flexible Localized Expansion and Execution, brings scalable manufacturing closer to qualifying
              developments. It reduces transportation costs, simplifies logistics and keeps production aligned with your
              project. Think of it as your own production facility, on demand.
            </p>
            <div data-reveal className="mt-8">
              <ButtonLink href="/contact/?type=flex" data-cta-location="dev_flex">See if your project qualifies</ButtonLink>
            </div>
          </div>
          <ol data-reveal data-reveal-group className="grid grid-cols-2 gap-4 lg:col-span-2 lg:col-start-3">
            {flexSteps.map((s) => (
              <li key={s.n} className="cut-tr flex flex-col justify-between bg-navy-tint p-6 [--cut:1.5rem]">
                <span className="text-sm font-bold text-navy tabular-nums">{s.n}</span>
                <div className="mt-10">
                  <h3 className="text-xl text-navy">{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-stone-ink">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Location */}
      <section className="border-t border-hairline">
        <div className="page-x container-max section-y">
          <div className="grid-4 gap-y-10">
            <div>
              <SectionLabel code="D-06" className="text-stone-ink">Strategically located</SectionLabel>
              <h2 data-reveal className="mt-5 text-display-m">Regionally flexible.</h2>
              <p data-reveal className="mt-6 text-stone-ink">{site.coverage.long}</p>
              <div data-reveal className="mt-8">
                <ButtonLink href="/locations/" variant="secondary">Service area</ButtonLink>
              </div>
            </div>
            <div className="md:col-span-1 lg:col-span-3">
              <CoverageMap compact />
              <MapLegend className="mt-6 text-stone-ink" />
              <ul className="mt-8 flex flex-wrap gap-2">
                {westernStates.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/locations/${s.slug}/`} className="inline-flex min-h-10 items-center rounded-full border border-hairline px-4 text-sm font-medium hover:border-navy hover:text-navy">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bring us */}
      <section className="page-x container-max pb-10">
        <div className="cut-tr-bl grid-4 gap-y-10 bg-ivory p-6 [--cut:2.5rem] md:p-12 lg:[--cut:4rem]">
          <div className="md:col-span-2">
            <SectionLabel code="D-07" className="text-stone-ink">Let&apos;s build something together</SectionLabel>
            <h2 className="mt-5 text-display-m">Bring us your plans, location, unit count and timeline.</h2>
            <p className="mt-5 max-w-lg text-stone-ink">We&apos;ll help determine whether modular construction is the right fit for your development.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact/?type=housing-community" data-cta-location="dev_bring">Start a project</ButtonLink>
              <ButtonLink href={`tel:${site.contacts.sales.tel}`} variant="secondary">{site.contacts.sales.phone}</ButtonLink>
            </div>
          </div>
          <Checklist
            className="md:col-span-2"
            items={["Site location and any survey or plat", "Target unit count and unit mix", "Stamped or schematic plans, if you have them", "Project stage: land, entitlements, financing", "Target delivery window"]}
          />
        </div>
      </section>

      <Faq items={devFaqs} title="Developer questions." />
      <CtaBand code="D-08" />
    </>
  );
}
