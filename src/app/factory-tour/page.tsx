import type { Metadata } from "next";
import { TourForm } from "@/components/tour-form";
import { Figure, SectionLabel } from "@/components/ui";
import { media } from "@/content/media";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Schedule a Factory Tour — Salt Lake City",
  description: "Request a tour of MAR Technology's modular manufacturing hub in Salt Lake City, Utah.",
  alternates: { canonical: "/factory-tour/" },
};

export default function FactoryTourPage() {
  return (
    <section className="pt-28 md:pt-40">
      <div className="page-x container-max grid gap-16 pb-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel code="T-00" className="text-stone-ink">Factory tour</SectionLabel>
          <h1 className="mt-6 text-display-l">See it built.</h1>
          <p className="mt-6 text-body-l text-carbon/80">
            Walk the production floor, see modules at every stage and meet the team. Tell us when you&apos;d like to visit
            and we&apos;ll confirm a time.
          </p>
          <address className="mt-10 border-t border-hairline pt-6 not-italic">
            <p className="label text-stone-ink">{site.locations.factory.label}</p>
            {site.locations.factory.lines.map((l) => <p key={l} className="mt-1">{l}</p>)}
          </address>
          <div className="mt-10 hidden lg:block">
            <Figure media={media.factoryTour} aspect="aspect-[15/16]" sizes="40vw" />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <TourForm />
        </div>
      </div>
    </section>
  );
}
