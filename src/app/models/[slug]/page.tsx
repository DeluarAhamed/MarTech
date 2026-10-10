import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { CtaBand, JsonLd, breadcrumbJsonLd } from "@/components/sections";
import { Arrow, ButtonLink, Figure, SectionLabel, SpecList } from "@/components/ui";
import { applicationLabels, getModel, models } from "@/content/models";
import { site } from "@/content/site";

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/models/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const model = getModel(slug);
  if (!model) return {};
  return {
    title: `${model.name} — Modular ${model.category}`,
    description: `${model.name}: ${model.summary}`,
    alternates: { canonical: `/models/${model.slug}/` },
    openGraph: { images: [{ url: model.hero.src, width: model.hero.width, height: model.hero.height, alt: model.hero.alt }] },
  };
}

export default async function ModelPage(props: PageProps<"/models/[slug]">) {
  const { slug } = await props.params;
  const model = getModel(slug);
  if (!model) notFound();

  const others = models.filter((m) => m.slug !== model.slug);
  const [lead, ...rest] = model.gallery;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Models", path: "/models/" },
          { name: model.name, path: `/models/${model.slug}/` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${model.name} modular ${model.category.toLowerCase()}`,
          description: model.summary,
          image: model.gallery.map((g) => g.src),
          brand: { "@type": "Brand", name: site.name },
          manufacturer: { "@type": "Organization", name: site.legalName },
          category: `Modular ${model.category}`,
        }}
      />

      {/* Intro */}
      <section className="pt-28 md:pt-36">
        <div className="page-x container-max">
          <nav aria-label="Breadcrumb" className="label text-stone-ink">
            <Link href="/models/" className="hover:text-carbon">Models</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{model.name}</span>
          </nav>
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel code={model.code} className="text-stone-ink">{model.category}</SectionLabel>
              <h1 data-reveal className="mt-4 text-display-xl">{model.name}</h1>
            </div>
            <div data-reveal className="lg:col-span-5">
              <p className="text-body-l">{model.tagline}</p>
              <p className="mt-4 text-carbon/75">{model.summary}</p>
            </div>
          </div>
        </div>
        <div className="page-x container-max mt-12">
          <ViewTransition name={`model-${model.slug}`} share="morph" default="none">
            <div>
              <Figure media={lead} aspect="aspect-[4/3] md:aspect-[16/9]" sizes="100vw" eager />
            </div>
          </ViewTransition>
        </div>
      </section>

      {/* Specs */}
      <section>
        <div className="page-x container-max section-y grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel code={`${model.code}.1`} className="text-stone-ink">Specification</SectionLabel>
            <SpecList specs={model.specs} className="mt-8" />
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={`/contact/?model=${model.slug}`}>Start a project with {model.name}</ButtonLink>
            </div>
          </div>
          <div className="space-y-6 text-body-l text-carbon/80 lg:col-span-6 lg:col-start-7">
            {model.description.map((p) => (
              <p key={p} data-reveal>{p}</p>
            ))}
            <div data-reveal className="border-t border-hairline pt-6">
              <h2 className="label text-stone-ink">Configurations</h2>
              <ul className="mt-4 space-y-2 text-base text-carbon">
                {model.configurations.map((c) => (
                  <li key={c} className="flex gap-3"><span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-bronze-ink" />{c}</li>
                ))}
              </ul>
            </div>
            <div data-reveal className="border-t border-hairline pt-6">
              <h2 className="label text-stone-ink">Applications</h2>
              <p className="mt-3 text-base">{model.applications.map((a) => applicationLabels[a]).join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floor plans */}
      <section className="border-y border-hairline bg-white">
        <div className="page-x container-max section-y">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel code={`${model.code}.2`} className="text-stone-ink">Floor plans</SectionLabel>
              <h2 className="mt-6 text-display-m">The plan.</h2>
            </div>
            <ul className="flex flex-wrap gap-3">
              {model.planPdfs.map((pdf) => (
                <li key={pdf.href}>
                  <a href={pdf.href} target="_blank" rel="noopener" className="group inline-flex min-h-12 items-center gap-3 border border-carbon/80 px-5 text-sm font-medium hover:bg-carbon hover:text-ivory">
                    {pdf.label} <Arrow className="rotate-90 group-hover:translate-x-0 group-hover:translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={`mt-12 grid gap-8 ${model.plans.length > 1 ? "md:grid-cols-2" : ""}`}>
            {model.plans.map((plan) => (
              <figure key={plan.src} data-reveal>
                <div className="relative aspect-[4/3]">
                  <Image src={plan.src} alt={plan.alt} fill sizes={model.plans.length > 1 ? "(min-width:768px) 45vw, 95vw" : "90vw"} className="object-contain mix-blend-multiply" />
                </div>
                <figcaption className="label mt-4 text-stone-ink">{plan.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {rest.length ? (
        <section>
          <div className="page-x container-max section-y">
            <SectionLabel code={`${model.code}.3`} className="text-stone-ink">Gallery</SectionLabel>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {rest.map((img, i) => (
                <div key={img.src} data-reveal="clip" className={i === 0 && rest.length % 2 === 1 ? "sm:col-span-2" : ""}>
                  <Figure media={img} aspect={i === 0 && rest.length % 2 === 1 ? "aspect-[16/9]" : "aspect-[4/3]"} sizes="(min-width:640px) 50vw, 100vw" />
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-stone-ink">Renderings show standard finishes; customised finishes are available based on order size.</p>
          </div>
        </section>
      ) : null}

      {/* Other models */}
      <section className="border-t border-hairline">
        <div className="page-x container-max py-20">
          <SectionLabel code={`${model.code}.4`} className="text-stone-ink">Other standards</SectionLabel>
          <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
            {others.map((m) => (
              <li key={m.slug}>
                <Link href={`/models/${m.slug}/`} className="group flex items-center justify-between gap-6 py-6">
                  <span className="flex items-baseline gap-6">
                    <span className="label text-stone-ink">{m.code}</span>
                    <span className="text-h2">{m.name}</span>
                    <span className="hidden text-stone-ink sm:inline">{m.category}</span>
                  </span>
                  <Arrow className="size-5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand code={`${model.code}.5`} heading={`Plan a project with ${model.name}.`} />
    </>
  );
}
