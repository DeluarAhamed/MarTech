import { ButtonLink, SectionLabel } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="module-grid min-h-[80svh] pt-32 md:pt-44">
      <div className="page-x container-max pb-28">
        <SectionLabel code="404" className="text-stone-ink">Not found</SectionLabel>
        <h1 className="mt-6 max-w-[14ch] text-display-l">This page isn&apos;t on the plans.</h1>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/models/" variant="secondary">Explore models</ButtonLink>
        </div>
      </div>
    </section>
  );
}
