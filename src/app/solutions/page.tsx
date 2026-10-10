import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, JsonLd, PageIntro, breadcrumbJsonLd } from "@/components/sections";
import { Arrow, Figure, SectionLabel } from "@/components/ui";
import { media } from "@/content/media";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Off-Site Modular Construction Solutions",
  description:
    "Modular manufacturing for housing developers, schools, workforce and flex space — plus FLEX™ localized manufacturing for large projects.",
  alternates: { canonical: "/solutions/" },
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Solutions", path: "/solutions/" }])} />
      <PageIntro
        code="S-00"
        eyebrow="Solutions"
        title="More than housing."
        intro="Our modular capabilities support residential, educational, workforce and custom applications — manufactured off-site while your site is prepared."
        image={media.moduleCommunity}
      />

      <section>
        <div className="page-x container-max section-y">
          <ul className="divide-y divide-hairline border-y border-hairline">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link href={`/solutions/${s.slug}/`} className="group grid gap-6 py-10 md:grid-cols-12 md:items-center">
                  <span className="label text-stone-ink md:col-span-1">{s.code}</span>
                  <div className="md:col-span-5">
                    <h2 className="text-display-m transition-colors group-hover:text-bronze-ink">{s.navLabel}</h2>
                    <p className="mt-4 max-w-lg text-stone-ink">{s.intro}</p>
                  </div>
                  <div className="md:col-span-4 md:col-start-8">
                    <Figure media={s.image} aspect="aspect-[16/10]" sizes="(min-width:768px) 33vw, 100vw" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <Arrow className="hidden size-6 justify-self-end md:col-span-1 md:block" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-hairline bg-white">
        <div className="page-x container-max section-y grid gap-10 lg:grid-cols-12">
          <SectionLabel code="S-05" className="text-stone-ink lg:col-span-3">Why off-site</SectionLabel>
          <ul data-reveal data-reveal-group className="grid gap-px sm:grid-cols-2 lg:col-span-9">
            {[
              ["Parallel construction", "Factory production runs alongside site preparation, compressing the overall schedule."],
              ["Controlled environment", "Indoor production avoids rain, seasonal slowdowns and weather-related disruption to the build."],
              ["Consistent quality", "Production checkpoints and inspections in a climate-controlled facility."],
              ["Predictable delivery", "Delivery is scheduled to coincide with site readiness, and progress is visible online throughout the build."],
            ].map(([t, b]) => (
              <li key={t} className="border-t border-carbon/80 pt-5 pb-8 sm:pr-8">
                <h3 className="text-h3">{t}</h3>
                <p className="mt-3 text-stone-ink">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand code="S-06" />
    </>
  );
}
