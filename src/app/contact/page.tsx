import type { Metadata } from "next";
import Link from "next/link";
import { CoverageMap } from "@/components/coverage-map";
import { Faq } from "@/components/home-sections";
import { LeadForm } from "@/components/lead-form";
import { MadeInUsaTag } from "@/components/made-in-usa";
import { JsonLd, breadcrumbJsonLd } from "@/components/sections";
import { Bullet, SectionLabel, cx } from "@/components/ui";
import { approvedClaim } from "@/content/claims";
import { faqs } from "@/content/faq";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us | Modular Project Consultations",
  description:
    "Contact MAR Technology: project consultations (385) 535-1031, general enquiries (801) 903-8395, factory tours in Salt Lake City, Utah. Start your modular project online.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const response = approvedClaim("responseTime");
  const { sales, general } = site.contacts;

  const routes = [
    {
      label: "Project consultations",
      title: "Talk to a project consultant",
      text: "Our consultants are experienced builders, not just salespeople.",
      links: [
        { href: `tel:${sales.tel}`, text: sales.phone, strong: true },
        { href: `mailto:${sales.email}`, text: sales.email },
      ],
      dark: true,
    },
    {
      label: "General enquiries",
      title: "Questions, partners and press",
      text: "For anything that isn't a specific project.",
      links: [
        { href: `tel:${general.tel}`, text: general.phone, strong: true },
        { href: `mailto:${general.email}`, text: general.email },
      ],
    },
    {
      label: "Factory tour",
      title: "See it built in Salt Lake City",
      text: "Walk the production floor and meet the team.",
      links: [{ href: "/factory-tour/", text: "Request a tour", strong: true }],
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", name: "Contact MAR Technology", url: `${site.url}/contact/` }} />

      {/* Hero */}
      <section className="page-x container-max pt-28 md:pt-36">
        <div className="grid-4 items-end gap-y-8">
          <div className="md:col-span-2 lg:col-span-3">
            <SectionLabel code="K-00" className="text-stone-ink">Contact us</SectionLabel>
            <h1 className="hero-line mt-6 overflow-hidden pb-[0.06em] text-display-l">
              <span className="block">Let&apos;s talk about your <span className="text-navy">next development.</span></span>
            </h1>
          </div>
          <div className="hero-fade-late space-y-3">
            <MadeInUsaTag detail />
            <p className="text-sm text-stone-ink">{site.coverage.formNote}</p>
          </div>
        </div>
      </section>

      {/* Routes */}
      <section className="page-x container-max pt-14 pb-20">
        <ul className="grid gap-4 md:grid-cols-3">
          {routes.map((r) => (
            <li
              key={r.label}
              className={cx(
                "cut-tr flex flex-col justify-between p-7 [--cut:1.75rem] md:p-8",
                r.dark ? "bg-navy text-white" : "border border-hairline bg-white",
              )}
            >
              <div>
                <p className={cx("label", r.dark ? "text-white/70" : "text-stone-ink")}>{r.label}</p>
                <h2 className="mt-4 text-2xl leading-tight">{r.title}</h2>
                <p className={cx("mt-3 text-[0.95rem]", r.dark ? "text-white/75" : "text-stone-ink")}>{r.text}</p>
              </div>
              <div className="mt-10 space-y-1.5">
                {r.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className={cx(
                      "group flex items-center gap-2.5 py-1 underline-offset-4 hover:underline",
                      l.strong ? "font-display text-xl font-bold tabular-nums" : "text-[0.95rem]",
                      !r.dark && l.strong && "text-navy",
                    )}
                  >
                    {l.strong ? <Bullet /> : null}
                    {l.text}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Form */}
      <section id="project-form" className="scroll-mt-24 border-t border-hairline bg-ivory">
        <div className="page-x container-max section-y grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <SectionLabel code="K-01" className="text-stone-ink">Start a project</SectionLabel>
            <h2 className="mt-5 text-display-m">Tell us about your project.</h2>
            <p className="mt-5 text-stone-ink">
              Five short steps: project type, scale, location and timing, plans, and who to contact.
              {response ? ` ${response.statement}.` : ""}
            </p>
            <ol className="mt-10 space-y-5">
              {[
                ["You share the basics", "Type, scale, location, stage and plans."],
                ["A consultant follows up", "To review fit, models and documentation."],
                ["You receive next steps", "A tailored proposal, timeline and pricing path."],
              ].map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-navy text-sm font-bold text-white tabular-nums">{i + 1}</span>
                  <span>
                    <span className="block font-semibold">{t}</span>
                    <span className="block text-sm text-stone-ink">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </aside>
          <div className="bg-white p-6 shadow-[0_30px_60px_-40px_rgb(23_26_25/0.35)] md:p-10 lg:col-span-7 lg:col-start-6">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="page-x container-max section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel code="K-02" className="text-stone-ink">Locations</SectionLabel>
            <h2 className="mt-5 text-display-m">Where to find us.</h2>
            <div className="mt-8 space-y-8">
              {[site.locations.factory, site.locations.hq].map((loc) => (
                <address key={loc.label} className="border-t border-hairline pt-5 not-italic">
                  <p className="label text-stone-ink">{loc.label}</p>
                  {loc.lines.map((l) => (
                    <span key={l} className="mt-1 block font-display text-xl font-bold">{l}</span>
                  ))}
                </address>
              ))}
            </div>
            <Link href="/locations/" className="mt-8 inline-flex items-center gap-2.5 text-[0.8125rem] font-semibold tracking-[0.06em] text-navy uppercase hover:underline hover:underline-offset-4">
              <Bullet /> Service area
            </Link>
          </div>
          <div className="lg:col-span-8">
            <div className="cut-tr bg-ivory p-4 [--cut:2.5rem] md:p-8">
              <CoverageMap compact />
            </div>
          </div>
        </div>
      </section>

      <Faq items={faqs.slice(0, 6)} />
    </>
  );
}
