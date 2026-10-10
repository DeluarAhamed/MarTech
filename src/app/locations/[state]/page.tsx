import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NumberedCards, SectionHead } from "@/components/blocks";
import { CoverageMap, MapLegend } from "@/components/coverage-map";
import { Faq } from "@/components/home-sections";
import { MadeInUsaTag } from "@/components/made-in-usa";
import { ModelCard } from "@/components/model-card";
import { CtaBand, JsonLd, breadcrumbJsonLd } from "@/components/sections";
import { ButtonLink, SectionLabel } from "@/components/ui";
import { distanceMiles, FACTORY, getWesternState, westernStates } from "@/content/locations";
import { models } from "@/content/models";
import { site } from "@/content/site";
import { processSteps } from "@/content/solutions";

export function generateStaticParams() {
  return westernStates.map((s) => ({ state: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/locations/[state]">): Promise<Metadata> {
  const { state } = await props.params;
  const s = getWesternState(state);
  if (!s) return {};
  return {
    title: `Modular Construction in ${s.name} | Modular Homes and Buildings for Developers`,
    description: `Modular homes, townhomes, classrooms and flex space for developers in ${s.name}, manufactured in our Salt Lake City, Utah factory. Serving ${s.metros.slice(0, 3).join(", ")} and statewide.`,
    alternates: { canonical: `/locations/${s.slug}/` },
  };
}

export default async function StatePage(props: PageProps<"/locations/[state]">) {
  const { state } = await props.params;
  const s = getWesternState(state);
  if (!s) notFound();

  const miles = distanceMiles(FACTORY, s.anchor);
  const isUtah = s.code === "UT";
  const others = westernStates.filter((o) => o.slug !== s.slug);

  const faqs = [
    {
      q: `Do you build modular buildings in ${s.name}?`,
      a: `Yes. ${s.name} is one of the Western states served from our Salt Lake City, Utah factory. We work with developers on single-family communities, townhomes, multifamily, classrooms, workforce housing and flex space across the state.`,
    },
    {
      q: `How far is ${s.name} from your factory?`,
      a: isUtah
        ? "Our primary manufacturing hub is in Salt Lake City, so Utah projects are the closest to the factory floor."
        : `${s.anchor.city} is about ${miles.toLocaleString()} miles straight-line from our Salt Lake City factory. Actual delivery routes and freight are confirmed per project.`,
    },
    {
      q: `How do approvals and inspections work for a ${s.name} project?`,
      a: "Plan review and inspections are aligned with state and local requirements for every project. All designs, engineering and drawings are submitted for your approval before production begins.",
    },
    {
      q: "Can we build from our own plans?",
      a: "Yes. We can manufacture from your existing plan set, or provide design services from schematic design through stamped construction documents.",
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations/" },
          { name: s.name, path: `/locations/${s.slug}/` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Modular construction",
          name: `Modular construction in ${s.name}`,
          provider: { "@type": "Organization", name: site.legalName, url: site.url },
          areaServed: { "@type": "State", name: s.name },
        }}
      />

      {/* Hero */}
      <section className="page-x container-max pt-28 md:pt-36">
        <nav aria-label="Breadcrumb" className="label text-stone-ink">
          <Link href="/locations/" className="hover:text-navy">Locations</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{s.name}</span>
        </nav>
        <div className="grid-4 mt-6 items-end gap-y-8">
          <div className="md:col-span-2 lg:col-span-3">
            <SectionLabel code={`L-${s.code}`} className="text-stone-ink">Served from our Utah factory</SectionLabel>
            <h1 className="hero-line mt-6 overflow-hidden pb-[0.06em] text-display-l">
              <span className="block">Modular construction in <span className="text-navy">{s.name}</span>.</span>
            </h1>
          </div>
          <div className="hero-fade-late space-y-5">
            <MadeInUsaTag detail />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`/contact/?state=${s.code}`} data-cta-location={`state_${s.code}`}>Start a project</ButtonLink>
            </div>
          </div>
        </div>
        <div className="grid-4 mt-10">
          <p className="statement md:col-span-2 lg:col-span-3 lg:col-start-2 lg:indent-[33.5%]">{s.intro}</p>
        </div>
      </section>

      {/* Facts + map */}
      <section className="page-x container-max pt-16 pb-24">
        <dl className="grid-4 gap-y-6 border-y border-hairline py-6">
          {[
            ["Manufactured in", "Salt Lake City, UT"],
            [isUtah ? "Factory" : "Approx. distance", isUtah ? "In-state" : `${miles.toLocaleString()} mi to ${s.anchor.city}`],
            ["Metros served", `${s.metros.length}+ including ${s.metros[0]}`],
            ["Enquiries", "Statewide welcome"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 md:block">
              <dt className="label text-stone-ink">{k}</dt>
              <dd className="font-display text-lg font-bold md:mt-2 md:text-2xl">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="cut-tr bg-ivory p-4 [--cut:2.5rem] md:p-8">
              <CoverageMap highlight={s.code} compact />
            </div>
            <MapLegend className="mt-5 text-stone-ink" />
          </div>
          <div className="lg:col-span-4">
            <p className="label text-stone-ink">Communities we serve in {s.name}</p>
            <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
              {s.metros.map((m) => (
                <li key={m} className="flex items-center justify-between py-3.5">
                  <span className="font-semibold">{m}</span>
                  <span className="size-2 rounded-full bg-navy" aria-hidden="true" />
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-stone-ink">Projects anywhere in {s.name} are welcome. Delivery is confirmed per project.</p>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="border-t border-hairline bg-ivory">
        <div className="page-x container-max section-y">
          <SectionHead
            code="L-01"
            label={`What we build in ${s.name}`}
            title="Housing, classrooms and flex space."
            intro={`From single-family communities to workforce housing, ${s.name} developers can plan production in our factory while sitework moves ahead.`}
          />
          <div className="mt-14">
            <NumberedCards
              items={[
                { title: "Single-family communities", body: "For-sale and build-to-rent neighborhoods.", href: "/models/solterra/" },
                { title: "Townhomes and multifamily", body: "Duplex and residential-row configurations.", href: "/models/castello/" },
                { title: "Classrooms", body: "Temporary and permanent space for schools.", href: "/solutions/education/" },
                { title: "Workforce and flex", body: "Employee housing, offices and PMRVs.", href: "/solutions/workforce-flex/" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="page-x container-max section-y">
        <SectionHead code="L-02" label="Standard models" title="Start from a standard." action={<ButtonLink href="/models/" variant="secondary">All models</ButtonLink>} />
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="page-x container-max pb-24">
        <SectionHead code="L-03" label="How it works" title="Four steps from concept to keys." action={<ButtonLink href="/process/" variant="secondary">Our process</ButtonLink>} />
        <div className="mt-12">
          <NumberedCards items={processSteps.map((p) => ({ title: p.title, body: p.body }))} />
        </div>
      </section>

      <Faq items={faqs} title={`${s.name} questions.`} />

      {/* Other states */}
      <section className="page-x container-max pb-24">
        <p className="label text-stone-ink">Other Western states</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/locations/${o.slug}/`} className="inline-flex min-h-10 items-center rounded-full border border-hairline px-4 text-sm font-medium hover:border-navy hover:text-navy">
                {o.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/locations/" className="inline-flex min-h-10 items-center rounded-full bg-navy px-4 text-sm font-medium text-white">
              All locations
            </Link>
          </li>
        </ul>
      </section>

      <CtaBand code="L-05" heading={`Start a project in ${s.name}.`} />
    </>
  );
}
