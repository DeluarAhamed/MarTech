import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { MadeInUsaTag } from "@/components/made-in-usa";
import { SectionLabel } from "@/components/ui";
import { approvedClaim } from "@/content/claims";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Start a Project — Modular Project Consultation",
  description:
    "Tell us about your modular project — type, scale, location and timeline — and our project consultants will follow up with next steps. Call (385) 535-1031.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const response = approvedClaim("responseTime");
  const { sales, general } = site.contacts;

  return (
    <section className="module-grid pt-28 md:pt-40">
      <div className="page-x container-max grid gap-16 pb-28 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <SectionLabel code="K-00" className="text-stone-ink">Start a project</SectionLabel>
          <h1 className="mt-6 text-display-l">Let&apos;s build something.</h1>
          <div className="mt-6"><MadeInUsaTag detail /></div>
          <p className="mt-6 text-body-l text-carbon/80">
            Share your project type, scale, location and timeline. Our project consultants are experienced builders —
            not just salespeople.
          </p>
          <p className="mt-4 text-stone-ink">{site.coverage.formNote}</p>
          {response ? <p className="mt-4 text-stone-ink">{response.statement}.</p> : null}

          <div className="mt-12 space-y-8 border-t border-hairline pt-8 text-sm">
            <div>
              <p className="label text-stone-ink">Prefer to talk? · {sales.label}</p>
              <a href={`tel:${sales.tel}`} className="mt-2 block text-h3 tabular-nums hover:text-bronze-ink">{sales.phone}</a>
              <a href={`mailto:${sales.email}`} className="block py-1.5 hover:underline">{sales.email}</a>
            </div>
            <div>
              <p className="label text-stone-ink">{general.label}</p>
              <a href={`tel:${general.tel}`} className="mt-1 block py-1.5 tabular-nums hover:underline">{general.phone}</a>
              <a href={`mailto:${general.email}`} className="block py-1.5 hover:underline">{general.email}</a>
            </div>
            <div>
              <p className="label text-stone-ink">{site.locations.factory.label}</p>
              <p className="mt-2">{site.locations.factory.lines.join(", ")}</p>
            </div>
          </div>
        </aside>

        <div className="border-t border-carbon pt-10 lg:col-span-7 lg:col-start-6 lg:border-t-0 lg:border-l lg:border-hairline lg:pt-0 lg:pl-12">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
