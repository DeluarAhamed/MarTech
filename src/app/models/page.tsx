import type { Metadata } from "next";
import Link from "next/link";
import { ModelGrid } from "@/components/model-grid";
import { CtaBand, JsonLd, PageIntro, breadcrumbJsonLd } from "@/components/sections";
import { Arrow, SectionLabel } from "@/components/ui";
import { applicationLabels, models } from "@/content/models";

export const metadata: Metadata = {
  title: "Modular Building Models | Single Module, Single-Family and Townhome",
  description:
    "Explore MAR Technology's standard modular models: Bohemian single module (480–576 sqft), Solterra single-family (1,440–1,474 sqft) and Castello townhome (1,368 sqft).",
  alternates: { canonical: "/models/" },
};

export default function ModelsPage() {

  const rows: { label: string; get: (m: (typeof models)[number]) => string }[] = [
    { label: "Category", get: (m) => m.category },
    ...["Size", "Footprint", "Modules", "Layout"].map((label) => ({
      label,
      get: (m: (typeof models)[number]) =>
        m.specs.find((s) => s.label === label || (label === "Size" && s.label === "Livable area"))?.value ?? "n/a",
    })),
    { label: "Applications", get: (m) => m.applications.map((a) => applicationLabels[a]).join(", ") },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Models", path: "/models/" }])} />
      <PageIntro
        code="M-00"
        eyebrow="Model catalog"
        title="The standards."
        intro="Three engineered starting points, configured, finished and scaled to your project. Or bring your own plans and we'll manufacture to them."
      />

      <section>
        <div className="page-x container-max pb-24">
          <h2 className="sr-only">All models</h2>
          <ModelGrid models={models} />

          <Link href="/contact/?model=custom" className="group mt-14 flex flex-wrap items-center justify-between gap-6 border border-dashed border-carbon/30 p-8 transition-colors hover:border-carbon hover:bg-white">
            <div>
              <p className="label text-stone-ink">M-00 · Custom</p>
              <p className="mt-2 text-h2">Building from your own plan set?</p>
            </div>
            <span className="inline-flex items-center gap-2 font-medium">Discuss your plans <Arrow /></span>
          </Link>
        </div>
      </section>

      <section id="compare" className="scroll-mt-24 border-t border-hairline bg-white">
        <div className="page-x container-max section-y">
          <SectionLabel code="M-04" className="text-stone-ink">Compare</SectionLabel>
          <h2 className="mt-6 text-display-m">Side by side.</h2>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">Comparison of standard models</caption>
              <thead>
                <tr className="border-b border-carbon">
                  <th scope="col" className="label w-40 py-4 pr-6 font-normal text-stone-ink">Spec</th>
                  {models.map((m) => (
                    <th key={m.slug} scope="col" className="py-4 pr-6 align-bottom">
                      <span className="label block font-normal text-stone-ink">{m.code}</span>
                      <Link href={`/models/${m.slug}/`} className="font-display text-h3 hover:underline">{m.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-hairline">
                    <th scope="row" className="label py-4 pr-6 align-top font-normal text-stone-ink">{row.label}</th>
                    {models.map((m) => (
                      <td key={m.slug} className="py-4 pr-6 align-top tabular-nums">{row.get(m)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-stone-ink">Lead times and pricing are quoted per project based on configuration, finish level and quantity.</p>
        </div>
      </section>

      <CtaBand code="M-05" />
    </>
  );
}
