import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { GalleryRing } from "@/components/gallery-ring";
import { HeroMedia } from "@/components/hero-media";
import { MadeInUsaTag } from "@/components/made-in-usa";
import { Bullet, ButtonLink, Figure, cx } from "@/components/ui";
import { approvedClaim, type ClaimKey } from "@/content/claims";
import { capabilities, hero, heroCopy } from "@/content/home";
import { media, type Media } from "@/content/media";
import { getModel } from "@/content/models";
import { site } from "@/content/site";
import { processSteps } from "@/content/solutions";

export const metadata: Metadata = {
  title: { absolute: "MAR Technology | U.S. Modular Manufacturer for Developers" },
  description:
    "Engineered for developers. MAR Technology manufactures modular homes, townhomes, classrooms and flex space in Salt Lake City, serving developers nationwide.",
  alternates: { canonical: "/" },
};

const PROOF_CLAIMS: ClaimKey[] = ["deliveryWindow", "factoryInspections", "productionScaling"];

type Showcase = { href: string; image: Media; name: string; code: string; meta: string; morph?: string; cta?: string };

export default function HomePage() {
  const proof = PROOF_CLAIMS.map(approvedClaim).filter((c) => c !== null);
  const solterra = getModel("solterra")!;
  const castello = getModel("castello")!;
  const bohemian = getModel("bohemian")!;

  const rowOne: [Showcase, Showcase] = [
    { href: "/models/solterra/", image: solterra.hero, name: solterra.name, code: "02", meta: `${solterra.specs[0].value} · ${solterra.category}`, morph: "solterra" },
    { href: "/models/castello/", image: castello.hero, name: castello.name, code: "03", meta: `${castello.specs[0].value} · ${castello.category}`, morph: "castello" },
  ];
  const rowTwo: [Showcase, Showcase] = [
    { href: "/models/bohemian/", image: bohemian.hero, name: bohemian.name, code: "01", meta: `${bohemian.specs[0].value} · ${bohemian.category}`, morph: "bohemian" },
    { href: "/contact/?model=custom", image: media.modularShell, name: "Your plans", code: "00", meta: "Built from your stamped plan set", cta: "models_custom" },
  ];

  const ring = [
    media.solterraPerspective, media.castelloEntry, media.bohemianExterior, media.solterraLiving,
    media.castelloKitchen, media.desertHome, media.bohemianBedroom, media.solterraKitchen,
    media.castelloLiving, media.moduleCommunity, media.solterraBedroom, media.classroom,
  ];

  return (
    <>
      <h1 className="sr-only">MAR Technology — U.S. modular manufacturer, engineered for developers</h1>

      {/* 01 — Wordmark + cinematic media */}
      <section className="page-x container-max pt-16 md:pt-20">
        <p
          aria-hidden="true"
          className="hero-line overflow-hidden font-display leading-[0.8] font-black tracking-[-0.055em] whitespace-nowrap [container-type:inline-size]"
        >
          <span className="block text-[10.62cqw] uppercase">MAR Technology</span>
        </p>
        <div className="relative mt-4 aspect-[4/5] overflow-hidden bg-carbon sm:aspect-[16/10] lg:mt-5 lg:aspect-[2.1/1]">
          <HeroMedia image={hero.image} video={hero.video} />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 lg:p-5">
            <MadeInUsaTag tone="dark" className="bg-carbon/40 backdrop-blur-sm" />
            {hero.video?.provenance !== "footage" ? (
              <span className="label bg-carbon/50 px-2 py-1 text-[0.625rem] text-white/85">Rendering</span>
            ) : null}
          </div>
        </div>
      </section>

      {/* 02 — Statement */}
      <section className="page-x container-max pt-20 pb-24 md:pt-28 lg:pb-40">
        <div className="grid-4">
          <div className="mb-8 lg:mb-0">
            <p className="label text-stone-ink">{heroCopy.eyebrow.join(" · ")}</p>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <p data-reveal className="statement lg:indent-[33.5%]">
              <strong className="font-extrabold">Engineered for developers.</strong> {heroCopy.sub} Whether it&apos;s
              temporary housing, classrooms, office space, single-family communities, ADUs or multifamily, MAR
              Technology manufactures your buildings off-site in Salt Lake City — while your site is prepared.
            </p>
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/about/">About us</ButtonLink>
              <ButtonLink href="/contact/" variant="secondary" data-cta-location="statement">Start a project</ButtonLink>
            </div>
          </div>
        </div>
        {proof.length >= 2 ? (
          <dl className="grid-4 mt-24 border-t border-hairline pt-8">
            {proof.map((c) => (
              <div key={c.statement} className="lg:col-start-auto">
                <dt className="label text-stone-ink">{c.label}</dt>
                <dd className="mt-3 font-display text-display-m tabular-nums">{c.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </section>

      {/* 03 — Models, staggered */}
      <section aria-labelledby="home-models" className="page-x container-max">
        <h2 id="home-models" className="sr-only">Our models</h2>
        <div className="grid-4 gap-y-16 lg:items-start">
          <ShowcaseCard item={rowOne[0]} className="md:col-span-2" size="lg" />
          <ShowcaseCard item={rowOne[1]} className="lg:col-span-2 lg:ml-[37%] lg:mt-3" size="sm" />
          <ShowcaseCard item={rowTwo[0]} className="lg:col-span-2 lg:mr-[37%] lg:mt-24" size="sm" />
          <ShowcaseCard item={rowTwo[1]} className="md:col-span-2 lg:mt-48" size="lg" />
        </div>
      </section>

      {/* 04 — Explore */}
      <section className="page-x container-max py-28 text-center lg:py-44">
        <h2 data-reveal className="text-display-m">Explore our models</h2>
        <p data-reveal className="mx-auto mt-5 max-w-md text-stone-ink">
          Three engineered standards — single module, single-family and townhome — ready to configure, finish and scale
          to your project. Or bring your own plans.
        </p>
        <div data-reveal className="mt-8">
          <ButtonLink href="/models/">Discover</ButtonLink>
        </div>
      </section>

      {/* 05 — Gallery ring */}
      <section className="page-x container-max">
        <GalleryRing images={ring} left="Engineered off-site." right="Built to scale.">
          <p className="text-sm">
            Every MAR Technology building is designed, engineered and produced in a climate-controlled facility — then
            delivered ready to set on your foundations.
          </p>
          <div className="mt-5">
            <ButtonLink href="/models/">All models</ButtonLink>
          </div>
        </GalleryRing>
      </section>

      {/* 06 — Capabilities (services pattern) */}
      <section className="section-y">
        <div className="grid-4 gap-y-12 pr-5 lg:pr-5">
          <div className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
            <h2 data-reveal className="page-x max-w-md text-display-m lg:pl-[calc(1.25rem+8%)]">
              Your vision. Built to suit.
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div data-reveal="clip" className="relative aspect-[2/3] md:-ml-0">
                <Figure media={media.housing} sizes="(min-width:1024px) 26vw, 100vw" />
              </div>
              <div className="page-x self-end md:px-0">
                <p data-reveal className="text-stone-ink">
                  MAR Technology manufactures more than housing. Residential, commercial, educational, workforce and
                  custom applications give developers more ways to build.
                </p>
                <div data-reveal className="mt-6">
                  <ButtonLink href="/solutions/">Solutions</ButtonLink>
                </div>
              </div>
            </div>
          </div>
          <ol className="page-x space-y-5 lg:col-span-2 lg:col-start-3 lg:mt-40 lg:ml-[25%] lg:px-0">
            {capabilities.map((c, i) => (
              <li key={c.code} data-reveal>
                <Link href={c.href} className="group block border border-hairline bg-white transition-colors hover:border-carbon">
                  <div className="grid grid-cols-[4.5rem_1fr] border-b border-hairline">
                    <span className="border-r border-hairline px-5 py-4 text-sm font-extrabold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="px-5 py-4 text-h3 font-light">{c.title}</h3>
                  </div>
                  <div className="grid grid-cols-[4.5rem_1fr]">
                    <span />
                    <div className="flex min-h-48 flex-col justify-end px-5 pt-16 pb-6">
                      <p className="text-[0.95rem] text-stone-ink">{c.body}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-medium tracking-[0.04em] uppercase">
                        <Bullet /> Learn more
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 07 — Process, card row */}
      <section className="page-x container-max pb-28 lg:pb-44">
        <div className="grid-4 items-end gap-y-6">
          <h2 data-reveal className="text-display-m md:col-span-2">A four-step delivery process</h2>
          <p data-reveal className="text-stone-ink lg:col-start-4">
            A predictable, engineered path from concept to occupancy — designed around developer schedules and lender
            milestones.
          </p>
        </div>
        <ol data-reveal data-reveal-group className="grid-4 mt-12 gap-y-5">
          {processSteps.map((s) => (
            <li key={s.n} className="flex flex-col border border-hairline">
              <div className="grid grid-cols-[3.5rem_1fr] border-b border-hairline">
                <span className="border-r border-hairline px-4 py-4 text-sm font-extrabold tabular-nums">{s.n}</span>
                <h3 className="px-4 py-4 text-lg font-light">{s.title}</h3>
              </div>
              <p className="flex-1 px-4 pt-14 pb-5 text-[0.95rem] text-stone-ink">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <ButtonLink href="/process/" variant="secondary">Our process</ButtonLink>
        </div>
      </section>

      {/* 08 — FLEX™ (history pattern) */}
      <section className="pb-28 lg:pb-44">
        <div className="grid-4 gap-y-12">
          <div className="page-x lg:col-span-2 lg:pl-[calc(1.25rem+8%)]">
            <h2 data-reveal className="max-w-md text-display-m">We bring the factory to the project.</h2>
            <div className="mt-16 grid gap-5 md:grid-cols-2">
              <div className="md:col-start-2">
                <p data-reveal className="text-stone-ink">
                  FLEX™ — Flexible Localized Expansion &amp; Execution. For qualifying larger developments, we establish
                  manufacturing capacity closer to your site, reducing freight distance and keeping production aligned
                  with your schedule.
                </p>
                <p data-reveal className="mt-4 text-sm text-stone-ink">{site.coverage.short}</p>
                <div data-reveal className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/solutions/flex-manufacturing/">FLEX™ manufacturing</ButtonLink>
                </div>
                <div data-reveal className="mt-8">
                  <MadeInUsaTag detail />
                </div>
              </div>
            </div>
          </div>
          <div data-reveal="clip" className="relative aspect-[3/4] lg:col-span-2 lg:col-start-3 lg:ml-[25%] lg:aspect-[3/5]">
            <Figure media={media.moduleCommunity} sizes="(min-width:1024px) 38vw, 100vw" />
          </div>
        </div>
      </section>

      {/* 09 — Featured, full bleed */}
      <section aria-label="Featured model">
        <Link href="/models/castello/" className="group relative block h-[80svh] min-h-[28rem] overflow-hidden lg:h-[110vh]">
          <Image
            src={media.castelloThreeQuarter.src}
            alt={media.castelloThreeQuarter.alt}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
          <div className="absolute right-5 bottom-5 left-5 grid grid-cols-[auto_1fr_auto] items-start gap-x-6 bg-carbon/45 p-4 text-sm text-white backdrop-blur-md md:left-auto md:w-[min(46rem,60vw)]">
            <span className="inline-flex items-center gap-2 font-medium uppercase"><Bullet /> View</span>
            <span>
              <strong className="font-extrabold">Castello</strong>
              <span className="block text-white/75">Townhome &amp; multifamily · Rendering</span>
            </span>
            <span className="font-extrabold tabular-nums">03</span>
          </div>
        </Link>
      </section>
    </>
  );
}

function ShowcaseCard({ item, className, size }: { item: Showcase; className?: string; size: "lg" | "sm" }) {
  const image = (
    <div className={cx("relative overflow-hidden bg-carbon/5", size === "lg" ? "aspect-[7/5]" : "aspect-[7/5]")}>
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes={size === "lg" ? "(min-width:768px) 50vw, 100vw" : "(min-width:1024px) 32vw, (min-width:768px) 50vw, 100vw"}
        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
      />
      <span className="label absolute bottom-3 left-3 bg-carbon/60 px-2 py-1 text-[0.625rem] text-white">Rendering</span>
    </div>
  );
  return (
    <Link href={item.href} data-cta-location={item.cta} className={cx("group block", className)}>
      {item.morph ? (
        <ViewTransition name={`model-${item.morph}`} share="morph" default="none">
          <div>{image}</div>
        </ViewTransition>
      ) : (
        image
      )}
      <div className="mt-3 grid grid-cols-2 gap-x-5 text-sm">
        <Bullet className="mt-1" />
        <div>
          <div className="flex justify-between gap-4 border-b border-hairline pb-1.5">
            <strong className="font-extrabold">{item.name}</strong>
            <span className="font-extrabold tabular-nums">{item.code}</span>
          </div>
          <p className="pt-1.5 text-stone-ink">{item.meta}</p>
        </div>
      </div>
    </Link>
  );
}
