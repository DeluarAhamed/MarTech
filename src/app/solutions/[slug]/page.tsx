import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModelCard } from "@/components/model-card";
import { CtaBand, FlexSection, JsonLd, PageIntro, ProcessSteps, breadcrumbJsonLd } from "@/components/sections";
import { ButtonLink, SectionLabel } from "@/components/ui";
import { models } from "@/content/models";
import { getSolution, solutions } from "@/content/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getSolution(slug);
  if (!s) return {};
  return { title: s.metaTitle, description: s.metaDescription, alternates: { canonical: `/solutions/${s.slug}/` } };
}

export default async function SolutionPage(props: PageProps<"/solutions/[slug]">) {
  const { slug } = await props.params;
  const s = getSolution(slug);
  if (!s) notFound();

  const relevant = models.filter((m) => s.models.includes(m.slug));
  const isFlex = s.slug === "flex-manufacturing";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions/" },
          { name: s.navLabel, path: `/solutions/${s.slug}/` },
        ])}
      />
      <PageIntro code={s.code} eyebrow={s.navLabel} title={s.headline} intro={s.intro} image={s.image}>
        <ButtonLink href={`/contact/?type=${s.formPreset}`}>{isFlex ? "See if your project qualifies" : "Start a project"}</ButtonLink>
      </PageIntro>

      <section>
        <div className="page-x container-max section-y grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel code={`${s.code}.1`} className="text-stone-ink">What you get</SectionLabel>
          </div>
          <ul data-reveal data-reveal-group className="grid gap-px sm:grid-cols-2 lg:col-span-8">
            {s.points.map((p) => (
              <li key={p.title} className="border-t border-carbon/80 pt-5 pb-10 sm:pr-8">
                <h2 className="text-h3">{p.title}</h2>
                <p className="mt-3 text-stone-ink">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {isFlex ? <FlexSection code={`${s.code}.2`} withCta={false} /> : null}

      <section className="border-t border-hairline bg-white">
        <div className="page-x container-max section-y">
          <SectionLabel code={`${s.code}.3`} className="text-stone-ink">Relevant models</SectionLabel>
          <h2 className="mt-6 text-display-m">Start from a standard.</h2>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {relevant.map((m) => <ModelCard key={m.slug} model={m} />)}
          </div>
        </div>
      </section>

      <section>
        <div className="page-x container-max section-y">
          <SectionLabel code={`${s.code}.4`} className="text-stone-ink">Process</SectionLabel>
          <h2 className="mt-6 mb-14 text-display-m">How it comes together.</h2>
          <ProcessSteps />
        </div>
      </section>

      <CtaBand code={`${s.code}.5`} />
    </>
  );
}
