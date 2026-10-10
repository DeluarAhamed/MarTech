import type { Metadata } from "next";
import Link from "next/link";
import { NumberedCards, SectionHead } from "@/components/blocks";
import { CoverageMap, MapLegend } from "@/components/coverage-map";
import { Faq } from "@/components/home-sections";
import { MadeInUsaTag } from "@/components/made-in-usa";
import { CtaBand, JsonLd, breadcrumbJsonLd } from "@/components/sections";
import { ButtonLink, SectionLabel } from "@/components/ui";
import { distanceMiles, FACTORY, westernStates } from "@/content/locations";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Service Area | Modular Manufacturer Serving All 50 States",
  description:
    "MAR Technology serves developers in all 50 states. For freight efficiency, our Salt Lake City, Utah factory serves the Western states: UT, ID, NV, AZ, CO, WY, MT, NM, CA, OR and WA.",
  alternates: { canonical: "/locations/" },
};

const locationFaqs = [
  { q: "Do you serve all 50 states?", a: site.coverage.long },
  {
    q: "Why does the Utah factory serve the Western states?",
    a: "Freight is a meaningful cost in modular construction. Serving the Western states from our Salt Lake City factory keeps routes shorter, which helps control transportation cost and simplifies delivery scheduling.",
  },
  {
    q: "We're outside the West. Can you still build our project?",
    a: "Yes, enquiries from every state are welcome. Projects outside the Western states are assessed individually based on feasibility and delivery availability, and qualifying larger developments may be served through FLEX™ localized manufacturing.",
  },
  {
    q: "Do you serve Alaska and Hawaii?",
    a: "Yes, enquiries are welcome. Because freight to Alaska and Hawaii moves by sea, those projects are assessed individually rather than served as part of the contiguous Western region.",
  },
  {
    q: "Can we visit the factory?",
    a: "Yes. Tours of our Salt Lake City manufacturing hub can be requested online and we'll confirm a time with you.",
  },
];

export default function LocationsPage() {
  const states = westernStates.map((s) => ({ ...s, miles: distanceMiles(FACTORY, s.anchor) }));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations/" }])} />

      {/* Hero */}
      <section className="page-x container-max pt-28 md:pt-36">
        <div className="grid-4 items-end gap-y-8">
          <div className="md:col-span-2 lg:col-span-3">
            <SectionLabel code="L-00" className="text-stone-ink">Service area</SectionLabel>
            <h1 className="hero-line mt-6 max-w-[16ch] overflow-hidden pb-[0.06em] text-display-l">
              <span className="block">Built in Utah. Delivered across America.</span>
            </h1>
          </div>
          <div className="hero-fade-late">
            <MadeInUsaTag detail />
          </div>
        </div>
        <div className="grid-4 mt-10">
          <p className="statement md:col-span-2 lg:col-span-3 lg:col-start-2 lg:indent-[33.5%]">
            We serve developers in <strong className="font-bold text-navy">all 50 states</strong>. For freight efficiency,
            our <strong className="font-bold text-navy">Salt Lake City factory serves the Western states</strong>, and
            projects elsewhere are assessed individually.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="page-x container-max pt-16 pb-24 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <div className="cut-tr bg-ivory p-4 [--cut:3rem] md:p-8 lg:p-10">
              <CoverageMap />
            </div>
            <MapLegend className="mt-6 text-stone-ink" />
            <p className="mt-3 text-xs text-stone-ink">Hover or tab to a state. Distances are approximate straight-line miles from our Salt Lake City factory.</p>
          </div>
          <aside className="space-y-4 lg:col-span-3">
            <div className="bg-navy p-6 text-white">
              <p className="label text-white/70">Western states</p>
              <p className="mt-3 font-display text-2xl leading-tight font-bold">Served from our Utah factory</p>
              <p className="mt-3 text-sm text-white/75">Shorter freight routes for UT, ID, NV, AZ, CO, WY, MT, NM, CA, OR and WA.</p>
            </div>
            <div className="border border-hairline p-6">
              <p className="label text-stone-ink">Nationwide</p>
              <p className="mt-3 font-display text-2xl leading-tight font-bold">All 50 states welcome</p>
              <p className="mt-3 text-sm text-stone-ink">Assessed per project, based on feasibility and delivery availability.</p>
              <Link href="/solutions/flex-manufacturing/" className="mt-4 inline-block text-sm font-semibold text-navy underline-offset-4 hover:underline">
                Larger development? See FLEX™
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* State directory */}
      <section className="border-t border-hairline bg-ivory">
        <div className="page-x container-max section-y">
          <SectionHead
            code="L-01"
            label="Western states"
            title="Modular construction across the West."
            intro="Each state below is served from our Salt Lake City manufacturing hub. Choose a state for local details, models and next steps."
          />
          <ul data-reveal data-reveal-group className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {states.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/locations/${s.slug}/`}
                  className="group cut-tr flex h-full flex-col justify-between border border-hairline bg-white p-6 transition-[border-color,box-shadow] duration-300 [--cut:1.5rem] hover:border-navy hover:shadow-[0_18px_40px_-24px_rgb(45_54_111/0.45)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm font-bold text-navy tabular-nums">{s.code}</span>
                    <span className="text-xs text-stone-ink">{s.code === "UT" ? "Factory state" : `≈ ${s.miles.toLocaleString()} mi to ${s.anchor.city}`}</span>
                  </div>
                  <div className="mt-10">
                    <h3 className="text-2xl transition-colors group-hover:text-navy">{s.name}</h3>
                    <p className="mt-2 text-sm text-stone-ink">{s.metros.slice(0, 3).join(" · ")}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sites */}
      <section className="page-x container-max section-y">
        <SectionHead code="L-02" label="Where we are" title="Factory in Utah. Headquarters in North Carolina." />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {[
            { ...site.locations.factory, note: "Production, factory walk-throughs and tours.", cta: { href: "/factory-tour/", label: "Book a factory tour" } },
            { ...site.locations.hq, note: "Corporate headquarters.", cta: { href: "/contact/", label: "Contact us" } },
          ].map((loc, i) => (
            <div key={loc.label} className={i === 0 ? "cut-tr bg-navy p-8 text-white [--cut:2rem] md:p-10" : "border border-hairline p-8 md:p-10"}>
              <p className={i === 0 ? "label text-white/70" : "label text-stone-ink"}>{loc.label}</p>
              <address className="mt-4 font-display text-2xl leading-snug font-bold not-italic md:text-3xl">
                {loc.lines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
              <p className={i === 0 ? "mt-4 text-white/75" : "mt-4 text-stone-ink"}>{loc.note}</p>
              <div className="mt-8">
                <ButtonLink href={loc.cta.href} variant={i === 0 ? "inverse" : "secondary"} className={i === 0 ? "text-navy" : undefined}>
                  {loc.cta.label}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why location matters */}
      <section className="page-x container-max pb-24">
        <SectionHead
          code="L-03"
          label="Why factory location matters"
          title="Shorter routes, simpler deliveries."
          action={<ButtonLink href="/blog/modular-factory-location-western-states-freight/" variant="secondary">Read the guide</ButtonLink>}
        />
        <div className="mt-12">
          <NumberedCards
            columns={3}
            items={[
              { title: "Freight cost", body: "Finished modules are large loads. Shorter routes help control transportation cost per module." },
              { title: "Handling and transit", body: "Fewer miles mean less handling and less exposure between factory and foundation." },
              { title: "Delivery timing", body: "Delivery is easier to coordinate with site readiness over regional distances." },
            ]}
          />
        </div>
      </section>

      <Faq items={locationFaqs} title="Service area questions." />
      <CtaBand code="L-04" />
    </>
  );
}
