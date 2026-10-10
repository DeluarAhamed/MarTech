import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { approvedClaim } from "@/content/claims";
import type { Media } from "@/content/media";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { flexSteps, processSteps } from "@/content/solutions";
import { projectTypes } from "@/lib/lead-schema";
import { MadeInUsaTag } from "./made-in-usa";
import { ButtonLink, Figure, SectionLabel, cx } from "./ui";

/** Interior page opener: oversized title + optional lead image. */
export function PageIntro({
  code,
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  code: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: Media;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-28 md:pt-36">
      <div className="page-x container-max">
        <SectionLabel code={code} className="text-stone-ink">{eyebrow}</SectionLabel>
        <h1 className="hero-line mt-6 max-w-[15ch] overflow-hidden pb-[0.08em] text-display-l font-black">
          <span className="block">{title}</span>
        </h1>
        {intro || children ? (
          <div className="grid-4 mt-10 md:mt-14">
            <div className="md:col-span-2 lg:col-span-3 lg:col-start-2">
              {intro ? <p data-reveal className="statement lg:indent-[33.5%]">{intro}</p> : null}
              {children ? <div data-reveal className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
            </div>
          </div>
        ) : null}
      </div>
      {image ? (
        <div className="page-x container-max mt-14 md:mt-20">
          <Figure media={image} aspect="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[2.1/1]" className="cut-tr [--cut:3rem] lg:[--cut:6rem]" sizes="100vw" eager parallax />
        </div>
      ) : (
        <div className="h-16 md:h-24" />
      )}
    </section>
  );
}

export function ProcessSteps({ dark = false }: { dark?: boolean }) {
  return (
    <ol data-reveal data-reveal-group className="grid gap-px md:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step) => (
        <li key={step.n} className={cx("flex flex-col border-t pt-6 pb-10 md:pr-8", dark ? "border-ivory/25" : "border-carbon/80")}>
          <span className={cx("label", dark ? "text-bronze" : "text-bronze-ink")}>{step.n}</span>
          <h3 className="mt-6 text-h3">{step.title}</h3>
          <p className={cx("mt-4 text-[0.95rem]", dark ? "text-ivory/70" : "text-stone-ink")}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function FlexSection({ code = "A-08", withCta = true }: { code?: string; withCta?: boolean }) {
  return (
    <section className="on-dark module-grid relative overflow-hidden bg-carbon text-ivory">
      <div className="page-x container-max section-y">
        <SectionLabel code={code} className="text-bronze">FLEX™ manufacturing</SectionLabel>
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 data-reveal className="text-display-m">
              We bring the factory <span className="text-bronze">to the project.</span>
            </h2>
            <p data-reveal className="mt-8 max-w-xl text-body-l text-ivory/75">
              FLEX™ means Flexible Localized Expansion &amp; Execution. For qualifying large developments, we establish
              manufacturing capacity closer to your site, reducing freight distance and transit risk and keeping
              production aligned with your schedule.
            </p>
            <p data-reveal className="mt-4 max-w-xl text-ivory/60">{site.coverage.short} Primary focus: the Western United States.</p>
            {withCta ? (
              <div data-reveal className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/contact/?type=flex" variant="inverse">See if your project qualifies</ButtonLink>
                <ButtonLink href="/solutions/flex-manufacturing/" variant="ghost-inverse">How FLEX™ works</ButtonLink>
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div data-reveal className="relative aspect-[3/2] opacity-80">
              <Image src={media.usMap.src} alt="" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-contain invert" />
              <span className="absolute top-[38%] left-[22%] flex items-center gap-2">
                <span className="relative flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-bronze opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-3 rounded-full bg-bronze" />
                </span>
                <span className="label text-ivory">Salt Lake City hub</span>
              </span>
            </div>
            <p className="label mt-3 text-ivory/50">Map is schematic</p>
          </div>
        </div>
        <ol data-reveal data-reveal-group className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {flexSteps.map((step) => (
            <li key={step.n} className="border-t border-ivory/25 pt-6 pb-4 sm:pr-8">
              <span className="label text-bronze">{step.n}</span>
              <h3 className="mt-4 text-h3">{step.title}</h3>
              <p className="mt-3 text-[0.95rem] text-ivory/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Final conversion block (docs/redesign/04 A-13). */
export function CtaBand({ code = "A-13", heading = "Start a project." }: { code?: string; heading?: string }) {
  const quick = projectTypes.filter((t) => ["housing-community", "townhome-multifamily", "classroom", "office-flex", "flex", "other"].includes(t.value));
  const response = approvedClaim("responseTime");
  return (
    <section className="page-x container-max pt-10 pb-24 lg:pb-32">
      <div className="on-dark cut-tr-bl relative overflow-hidden bg-navy text-white [--cut:2.5rem] lg:[--cut:5rem]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[6%] w-[26rem] opacity-[0.07]">
          <span className="absolute -top-20 left-0 h-[150%] w-20 rotate-45 bg-white" />
          <span className="absolute -top-20 left-32 h-[150%] w-6 rotate-45 bg-white" />
        </div>
        <div className="relative grid gap-12 p-8 md:p-12 lg:grid-cols-12 lg:p-16">
          <div className="lg:col-span-7">
            <SectionLabel code={code} className="text-white/70 [&_polygon:first-child]:fill-white">Next step</SectionLabel>
            <h2 className="mt-6 text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.95]">{heading}</h2>
            <p className="mt-6 max-w-lg text-white/75">
              Bring us your plans, location, unit count and timeline. We&apos;ll help you decide if modular is the right fit.
              {response ? ` ${response.statement}.` : ""}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="/contact/" variant="inverse" className="text-navy" data-cta-location={`cta_${code}`}>Start a project</ButtonLink>
              <a href={`tel:${site.contacts.sales.tel}`} className="font-display text-xl font-bold tabular-nums underline-offset-4 hover:underline">
                {site.contacts.sales.phone}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="label text-white/70">What are you building?</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {quick.map((t) => (
                <li key={t.value}>
                  <Link
                    href={`/contact/?type=${t.value}`}
                    className="group flex min-h-14 items-center justify-between gap-3 border border-white/20 px-4 text-[0.95rem] font-semibold transition-colors hover:border-white hover:bg-white hover:text-navy"
                  >
                    {t.label}
                    <svg viewBox="0 0 20 20" className="size-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true">
                      <path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <MadeInUsaTag tone="dark" detail />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function organizationJsonLd() {
  const { factory, hq } = site.locations;
  const address = (loc: { street: string; city: string; region: string; postalCode: string }) => ({
    "@type": "PostalAddress",
    streetAddress: loc.street,
    addressLocality: loc.city,
    addressRegion: loc.region,
    postalCode: loc.postalCode,
    addressCountry: "US",
  });
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/brand/mar-technology-logo.png`,
    address: address(hq),
    location: [
      { "@type": "Place", name: factory.label, address: address(factory) },
      { "@type": "Place", name: hq.label, address: address(hq) },
    ],
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", telephone: "+1-385-535-1031", email: site.contacts.sales.email, areaServed: "US" },
      { "@type": "ContactPoint", contactType: "customer service", telephone: "+1-801-903-8395", email: site.contacts.general.email, areaServed: "US" },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: `${site.url}${item.path}` })),
  };
}
