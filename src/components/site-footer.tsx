import Link from "next/link";
import { westernStates } from "@/content/locations";
import { models } from "@/content/models";
import { site } from "@/content/site";
import { solutionHref, solutions } from "@/content/solutions";
import { MadeInUsaTag } from "./made-in-usa";
import { ButtonLink } from "./ui";
import { LogoStacked } from "./wordmark";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { sales, general } = site.contacts;
  const { factory, hq } = site.locations;

  return (
    <footer className="border-t border-hairline bg-white text-carbon">
      <div className="page-x container-max">
        {/* Contact statement */}
        <div className="grid-4 gap-y-8 py-20 lg:py-28">
          <p className="label text-stone-ink">Start a project</p>
          <div className="md:col-span-2 lg:col-span-3">
            <p className="font-display text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.025em] [font-stretch:110%]">
              Let&apos;s talk about your next development. <span className="text-navy">Your plans, your site, your schedule.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact/" data-cta-location="footer">Start a project</ButtonLink>
              <ButtonLink href="/factory-tour/" variant="secondary">Factory tour</ButtonLink>
            </div>
          </div>
        </div>

        <div className="grid gap-12 border-t border-hairline py-14 text-sm md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <LogoStacked className="w-48" />
            <p className="mt-6 max-w-xs text-stone-ink">{site.coverage.short}</p>
            <MadeInUsaTag detail className="mt-5" />
          </div>

          <FooterList title="Solutions" className="lg:col-span-2">
            {solutions.map((s) => (
              <FooterLink key={s.slug} href={solutionHref(s.slug)}>{s.name}</FooterLink>
            ))}
            {models.map((m) => (
              <FooterLink key={m.slug} href={`/models/${m.slug}/`}>{m.name} model</FooterLink>
            ))}
          </FooterList>

          <FooterList title="Western states" className="lg:col-span-2">
            {westernStates.map((s) => (
              <FooterLink key={s.slug} href={`/locations/${s.slug}/`}>{s.name}</FooterLink>
            ))}
          </FooterList>

          <FooterList title="Company" className="lg:col-span-2">
            <FooterLink href="/about/">About</FooterLink>
            <FooterLink href="/process/">Process</FooterLink>
            <FooterLink href="/locations/">Service area</FooterLink>
            <FooterLink href="/insights/">Insights</FooterLink>
            <FooterLink href="/factory-tour/">Factory tour</FooterLink>
            <FooterLink href="/contact/">Contact us</FooterLink>
          </FooterList>

          <div className="space-y-6 lg:col-span-3">
            {[sales, general].map((c) => (
              <div key={c.label}>
                <p className="label mb-1.5 text-stone-ink">{c.label}</p>
                <a className="block py-1 font-display text-lg font-bold tabular-nums text-navy hover:underline" href={`tel:${c.tel}`}>{c.phone}</a>
                <a className="block py-1 hover:underline" href={`mailto:${c.email}`}>{c.email}</a>
              </div>
            ))}
            {[factory, hq].map((loc) => (
              <address key={loc.label} className="not-italic">
                <p className="label mb-1.5 text-stone-ink">{loc.label}</p>
                {loc.lines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </address>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-hairline py-6 text-sm text-stone-ink md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.legalName}</p>
          <p>Renderings and concept images are labelled.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="label mb-3 text-stone-ink">{title}</p>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-block py-1 hover:text-navy hover:underline hover:underline-offset-4">{children}</Link>
    </li>
  );
}
