import Link from "next/link";
import { models } from "@/content/models";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { MadeInUsaTag } from "./made-in-usa";
import { ButtonLink } from "./ui";
import { Wordmark } from "./wordmark";

/** Light, 4-column footer after the approved reference layout. */
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
            <p className="statement max-w-4xl">Let&apos;s talk about your next development — your plans, your site, your schedule.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact/" data-cta-location="footer">Start a project</ButtonLink>
              <ButtonLink href="/factory-tour/" variant="secondary">Factory tour</ButtonLink>
            </div>
          </div>
        </div>

        <div className="grid-4 gap-y-12 border-t border-hairline py-14 text-sm">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-xs text-stone-ink">{site.coverage.short}</p>
            <MadeInUsaTag detail className="mt-5" />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-5">
            <FooterList title="Solutions">
              {solutions.map((s) => (
                <FooterLink key={s.slug} href={`/solutions/${s.slug}/`}>{s.name}</FooterLink>
              ))}
            </FooterList>
            <FooterList title="Company">
              {models.map((m) => (
                <FooterLink key={m.slug} href={`/models/${m.slug}/`}>{m.name}</FooterLink>
              ))}
              <FooterLink href="/process/">Process</FooterLink>
              <FooterLink href="/about/">About</FooterLink>
            </FooterList>
          </nav>

          <div className="space-y-5">
            <div>
              <p className="label mb-1.5 text-stone-ink">{sales.label}</p>
              <a className="block py-1 tabular-nums hover:underline" href={`tel:${sales.tel}`}>{sales.phone}</a>
              <a className="block py-1 hover:underline" href={`mailto:${sales.email}`}>{sales.email}</a>
            </div>
            <div>
              <p className="label mb-1.5 text-stone-ink">{general.label}</p>
              <a className="block py-1 tabular-nums hover:underline" href={`tel:${general.tel}`}>{general.phone}</a>
              <a className="block py-1 hover:underline" href={`mailto:${general.email}`}>{general.email}</a>
            </div>
          </div>

          <div className="space-y-5">
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

        <div className="grid-4 gap-y-2 border-t border-hairline py-6 text-sm text-stone-ink">
          <p className="md:col-span-1">© {year} {site.legalName}</p>
          <p className="lg:col-start-3">Salt Lake City, Utah · Knightdale, North Carolina</p>
          <p className="lg:text-right">Renderings and concept images are labelled.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label mb-3 text-stone-ink">{title}</p>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-block py-1 hover:underline">{children}</Link>
    </li>
  );
}
