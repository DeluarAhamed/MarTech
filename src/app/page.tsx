import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { GalleryRing } from "@/components/gallery-ring";
import { CounterBand } from "@/components/counter-band";
import { HeroMedia } from "@/components/hero-media";
import { Marquee } from "@/components/marquee";
import { PlayFilm } from "@/components/play-film";
import { Faq, PathPanel } from "@/components/home-sections";
import { CtaBand } from "@/components/sections";
import { MadeInUsaSeal, MadeInUsaTag } from "@/components/made-in-usa";
import { Bullet, ButtonLink, Figure, cx } from "@/components/ui";
import { NumberedCards, SectionHead } from "@/components/blocks";
import { capabilities, hero, heroCopy } from "@/content/home";
import { media, type Media } from "@/content/media";
import { posts } from "@/content/insights";
import { getModel } from "@/content/models";
import { site } from "@/content/site";
import { processSteps } from "@/content/solutions";

export const metadata: Metadata = {
  title: { absolute: "MAR Technology | U.S. Modular Manufacturer for Developers" },
  description:
    "Engineered for developers. MAR Technology manufactures modular homes, townhomes, classrooms and flex space in Salt Lake City, serving developers nationwide.",
  alternates: { canonical: "/" },
};

type Showcase = { href: string; image: Media; name: string; code: string; meta: string; morph?: string; cta?: string };

export default function HomePage() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
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
      {/* 01 Hero: height-aware so wordmark, headline and CTAs always fit the first viewport on desktop */}
      <section className="page-x container-max flex flex-col pt-20 md:pt-24 lg:h-[100svh] lg:max-h-[75rem] lg:min-h-[42rem] lg:pb-5">
        <p
          aria-hidden="true"
          className="hero-line shrink-0 overflow-hidden font-brand leading-[0.84] font-extrabold text-navy whitespace-nowrap [container-type:inline-size] [font-stretch:112%]"
        >
          <span className="block text-[min(9.1cqw,18svh)] tracking-[-0.025em] uppercase">MAR Technology</span>
        </p>
        <div aria-hidden="true" className="hero-rise mt-2 flex shrink-0 items-center gap-4 text-brand-grey md:mt-3">
          <span className="h-[3px] flex-1 bg-navy" />
          <span className="font-brand text-[clamp(0.8rem,min(1.7vw,2.6svh),1.75rem)] font-bold tracking-[0.22em] uppercase">Building Systems</span>
          <span className="h-[3px] flex-1 bg-navy" />
        </div>

        <div className="relative mt-4 lg:mt-5 lg:min-h-0 lg:flex-1">
          <div className="cut-tr relative aspect-[4/3] overflow-hidden bg-carbon [--cut:2.25rem] sm:aspect-[16/10] sm:[--cut:3rem] lg:aspect-auto lg:h-full lg:[--cut:6rem]">
            <HeroMedia image={hero.image} video={hero.video} />
            <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-tr from-carbon/90 via-carbon/40 to-transparent lg:block" />
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 lg:top-5 lg:left-5">
              <MadeInUsaTag tone="dark" detail />
              {hero.video?.provenance !== "footage" ? (
                <span className="label bg-carbon/50 px-2 py-1.5 text-[0.625rem] leading-none text-white/85">Rendering</span>
              ) : null}
            </div>
            {hero.film ? (
              <div className="absolute inset-0 hidden items-center justify-center lg:flex">
                <PlayFilm film={hero.film} />
              </div>
            ) : null}
          </div>

          <MadeInUsaSeal className="absolute -top-9 right-9 z-10 hidden size-28 xl:grid" />

          {/* Value proposition: overlaid on desktop, below the image on small screens */}
          <div className="mt-6 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0 lg:max-w-[50rem] lg:p-8 lg:text-white xl:p-10">
            <p className="hero-rise label mb-4 hidden text-white/75 lg:block">U.S. modular manufacturer · Salt Lake City, Utah</p>
            <h1 className="hero-rise text-[clamp(2.1rem,min(4.2vw,7svh),4.5rem)] leading-[0.95] font-extrabold tracking-[-0.03em]">
              Modular buildings, engineered for developers.
            </h1>
            <p className="hero-rise-late mt-4 max-w-xl text-[1.05rem] text-stone-ink lg:text-white/85">
              Homes, townhomes, classrooms and flex space, manufactured in our Utah factory while your site is prepared.
              Serving all 50 states.
            </p>
            <div className="hero-rise-late mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact/" data-cta-location="hero" className="lg:bg-white lg:text-navy lg:hover:bg-ivory">
                Start a project
              </ButtonLink>
              <ButtonLink href="/models/" variant="secondary" className="lg:border-white/40 lg:text-white lg:hover:border-white lg:hover:text-white">
                Explore models
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 01b Capabilities marquee */}
      <Marquee
        items={["Single-family", "Townhomes", "Multifamily", "Build-to-rent", "Classrooms", "Workforce housing", "Offices and flex space", "ADUs", "PMRVs", "Made in USA"]}
      />

      {/* 02 — Statement */}
      <section className="page-x container-max pt-20 pb-24 md:pt-28 lg:pb-40">
        <div className="grid-4">
          <div className="mb-8 lg:mb-0">
            <p className="label text-stone-ink">{heroCopy.eyebrow.join(" · ")}</p>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <p data-reveal className="statement lg:indent-[33.5%]">
              <strong className="font-bold text-navy">Built for developers, not one-off projects.</strong> Whether it&apos;s
              temporary housing, classrooms, office space, single-family communities, ADUs or multifamily, we speak
              your language: an off-site model that controls the variables, with fixed-price bids for forecastable
              planning. {heroCopy.sub}
            </p>
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/about/">About us</ButtonLink>
              <ButtonLink href="/contact/" variant="secondary" data-cta-location="statement">Start a project</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 02b Counters */}
      <CounterBand />
      <div className="h-24 lg:h-36" />

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
          Three engineered standards: single module, single-family and townhome. Ready to configure, finish and scale
          to your project. Or bring your own plans.
        </p>
        <div data-reveal className="mt-8">
          <ButtonLink href="/models/">Discover</ButtonLink>
        </div>
      </section>

      {/* 04b — Audience paths */}
      <PathPanel />

      {/* 05 — Gallery ring */}
      <div className="h-24 lg:h-40" />
      <section className="page-x container-max">
        <GalleryRing images={ring} title="Engineered off-site." accent="Built to scale.">
          <p>
            Every MAR Technology building is designed, engineered and produced in a climate-controlled facility, then
            delivered ready to set on your foundations.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/models/">All models</ButtonLink>
            <ButtonLink href="/process/" variant="secondary">Our process</ButtonLink>
          </div>
        </GalleryRing>
      </section>

      {/* 06 — Capabilities: heading row, then image and cards side by side, aligned */}
      <section className="page-x container-max section-y">
        <SectionHead
          code="A-06"
          label="Our modular manufacturing capabilities"
          title="Your vision. Built to suit."
          intro="MAR Technology manufactures more than housing. Residential, commercial, educational, workforce and custom applications give developers more ways to build."
          action={<ButtonLink href="/solutions/">All solutions</ButtonLink>}
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:items-stretch">
          <div data-reveal className="cut-bl relative aspect-[4/3] overflow-hidden [--cut:2.5rem] lg:col-span-5 lg:aspect-auto lg:min-h-full">
            <Figure media={media.housing} sizes="(min-width:1024px) 40vw, 100vw" parallax />
          </div>
          <div className="lg:col-span-7">
            <NumberedCards columns={2} className="h-full [&>li]:h-full" items={capabilities.map((c) => ({ title: c.title, body: c.body, href: c.href }))} />
          </div>
        </div>
      </section>

      {/* 07 — Process */}
      <section className="page-x container-max pb-28 lg:pb-44">
        <SectionHead
          code="A-07"
          label="A four-step delivery process"
          title="From concept to occupancy."
          intro="A predictable, engineered path designed around developer schedules and lender milestones."
          action={<ButtonLink href="/process/" variant="secondary">Our process</ButtonLink>}
        />
        <div className="mt-12">
          <NumberedCards items={processSteps.map((s) => ({ title: s.title, body: s.body }))} />
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
                  FLEX™ means Flexible Localized Expansion &amp; Execution. For qualifying larger developments, we establish
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
          <div data-reveal className="cut-bl relative aspect-[3/4] [--cut:4rem] lg:col-span-2 lg:col-start-3 lg:ml-[25%] lg:aspect-[3/5]">
            <Figure media={media.moduleCommunity} sizes="(min-width:1024px) 38vw, 100vw" parallax />
          </div>
        </div>
      </section>

      {/* 08b — FAQ */}
      <Faq />

      {/* 08c Latest from the blog */}
      <section className="page-x container-max pb-28 lg:pb-40">
        <SectionHead
          code="A-10"
          label="From the blog"
          title="Guides for developers."
          action={<ButtonLink href="/blog/" variant="secondary">All articles</ButtonLink>}
        />
        <ul data-reveal data-reveal-group className="mt-12 grid gap-6 md:grid-cols-3">
          {latest.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}/`} className="group block h-full border border-hairline bg-white transition-[border-color,box-shadow] duration-300 hover:border-navy hover:shadow-[0_24px_48px_-28px_rgb(45_54_111/0.45)]">
                <div className="cut-tr relative aspect-[16/10] overflow-hidden [--cut:1.75rem]">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width:768px) 31vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="p-6">
                  <p className="label text-navy">{p.topic} · {p.minutes} min read</p>
                  <h3 className="mt-3 text-xl leading-snug group-hover:text-navy">{p.title}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 09 — Featured, full bleed */}
      <section aria-label="Featured model">
        <Link href="/models/castello/" data-parallax className="group relative block h-[80svh] min-h-[28rem] overflow-hidden lg:h-[110vh]">
          <Image
            src={media.castelloThreeQuarter.src}
            alt={media.castelloThreeQuarter.alt}
            fill
            sizes="100vw"
            className="object-cover"
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
      <CtaBand code="A-12" />
    </>
  );
}

function ShowcaseCard({ item, className, size }: { item: Showcase; className?: string; size: "lg" | "sm" }) {
  const image = (
    <div className={cx("cut-tr relative aspect-[7/5] overflow-hidden bg-carbon/5", size === "lg" ? "[--cut:3.5rem]" : "[--cut:2rem]")}>
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
