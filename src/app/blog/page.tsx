import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, JsonLd, breadcrumbJsonLd } from "@/components/sections";
import { Bullet, SectionLabel } from "@/components/ui";
import { posts } from "@/content/insights";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Blog | Modular Construction Guides for Developers",
  description:
    "Guides on modular construction for developers: modular vs site-built, build-to-rent communities, modular classrooms, ADUs and why factory location matters in the Western U.S.",
  alternates: { canonical: "/blog/" },
};

const fmt = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;
  const topics = Array.from(new Set(rest.map((p) => p.topic)));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${site.name} Blog`,
          url: `${site.url}/blog/`,
          blogPost: sorted.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}/blog/${p.slug}/`, datePublished: p.date })),
        }}
      />

      <section className="page-x container-max pt-28 md:pt-36">
        <SectionLabel code="I-00" className="text-stone-ink">Blog</SectionLabel>
        <div className="grid-4 mt-6 items-end gap-y-6">
          <h1 className="hero-line overflow-hidden pb-[0.06em] text-display-l md:col-span-2 lg:col-span-3">
            <span className="block">Guides for building <span className="text-navy">modular, at scale.</span></span>
          </h1>
          <p className="hero-fade-late text-stone-ink">Practical articles on modular construction for developers, schools and workforce projects.</p>
        </div>
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Topics">
          {topics.map((t) => (
            <li key={t}>
              <a href={`#topic-${t.toLowerCase().replace(/\s+/g, "-")}`} className="inline-flex min-h-10 items-center rounded-full border border-hairline px-4 text-sm font-medium hover:border-navy hover:text-navy">
                {t}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Featured */}
      <section className="page-x container-max pt-12 pb-20">
        <Link href={`/blog/${featured.slug}/`} className="group grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="cut-tr relative aspect-[16/10] overflow-hidden bg-carbon/5 [--cut:3rem] lg:col-span-7">
            <Image src={featured.image.src} alt={featured.image.alt} fill loading="eager" fetchPriority="high" sizes="(min-width:1024px) 58vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]" />
            <span className="label absolute bottom-3 left-3 bg-carbon/60 px-2 py-1 text-[0.6rem] text-white">Rendering</span>
          </div>
          <div className="lg:col-span-5">
            <p className="label text-navy">Featured · {featured.topic}</p>
            <h2 className="mt-4 text-display-m transition-colors group-hover:text-navy">{featured.title}</h2>
            <p className="mt-4 text-[1.05rem] text-stone-ink">{featured.description}</p>
            <p className="mt-6 flex items-center gap-3 text-sm text-stone-ink">
              <time dateTime={featured.date}>{fmt(featured.date)}</time>
              <span aria-hidden="true">·</span>
              {featured.minutes} min read
            </p>
            <span className="mt-6 inline-flex items-center gap-2.5 text-[0.8125rem] font-semibold tracking-[0.06em] text-navy uppercase">
              <Bullet /> Read the guide
            </span>
          </div>
        </Link>
      </section>

      {/* By topic */}
      <section className="border-t border-hairline bg-ivory">
        <div className="page-x container-max section-y space-y-20">
          {topics.map((t) => {
            const list = rest.filter((p) => p.topic === t);
            if (!list.length) return null;
            return (
              <div key={t} id={`topic-${t.toLowerCase().replace(/\s+/g, "-")}`} className="scroll-mt-28">
                <div className="flex items-end justify-between gap-6 border-b border-hairline pb-4">
                  <h2 className="text-2xl">{t}</h2>
                  <span className="text-sm text-stone-ink">{list.length} {list.length === 1 ? "article" : "articles"}</span>
                </div>
                <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}/`} className="group flex h-full flex-col bg-white transition-shadow duration-300 hover:shadow-[0_24px_48px_-28px_rgb(45_54_111/0.45)]">
                        <div className="cut-tr relative aspect-[16/10] overflow-hidden [--cut:1.75rem]">
                          <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width:1024px) 31vw, (min-width:768px) 48vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <p className="label text-navy">{p.topic}</p>
                          <h3 className="mt-3 text-xl leading-snug transition-colors group-hover:text-navy">{p.title}</h3>
                          <p className="mt-3 line-clamp-3 text-[0.95rem] text-stone-ink">{p.description}</p>
                          <p className="mt-auto pt-6 text-sm text-stone-ink">
                            <time dateTime={p.date}>{fmt(p.date)}</time> · {p.minutes} min read
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBand code="I-01" />
    </>
  );
}
