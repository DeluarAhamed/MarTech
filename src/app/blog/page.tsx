import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { CtaBand, JsonLd, breadcrumbJsonLd } from "@/components/sections";
import { Bullet, SectionLabel } from "@/components/ui";
import { posts, topicIntro, topics, topicSlug } from "@/content/insights";
import { provenanceLabel } from "@/content/media";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Blog | Modular Construction Guides for Developers",
  description:
    "Modular construction guides for developers, schools and workforce projects: process, housing, education, engineering and building across the Western U.S.",
  alternates: { canonical: "/blog/" },
};

const fmt = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function BlogPage() {
  const [featured, ...rest] = posts;
  const featuredTag = provenanceLabel(featured.image);
  const active = topics.filter((t) => posts.some((p) => p.topic === t));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${site.name} Blog`,
          url: `${site.url}/blog/`,
          blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}/blog/${p.slug}/`, datePublished: p.date })),
        }}
      />

      <section className="page-x container-max pt-28 md:pt-36">
        <SectionLabel code="B-00" className="text-stone-ink">Blog</SectionLabel>
        <div className="grid-4 mt-6 items-end gap-y-6">
          <h1 className="hero-line overflow-hidden pb-[0.06em] text-display-l md:col-span-2 lg:col-span-3">
            <span className="block">Guides for building <span className="text-navy">modular, at scale.</span></span>
          </h1>
          <p className="hero-rise-late text-stone-ink">{posts.length} practical guides on modular construction for developers, schools and workforce projects.</p>
        </div>
        <nav aria-label="Blog categories" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {active.map((t) => (
              <li key={t}>
                <Link
                  href={`/blog/category/${topicSlug(t)}/`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-hairline px-4 text-sm font-medium hover:border-navy hover:text-navy"
                >
                  {t}
                  <span className="text-xs text-stone-ink">{posts.filter((p) => p.topic === t).length}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Featured */}
      <section className="page-x container-max pt-12 pb-20">
        <Link href={`/blog/${featured.slug}/`} className="group grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="cut-tr relative aspect-[16/10] overflow-hidden bg-carbon/5 [--cut:3rem] lg:col-span-7">
            <Image src={featured.image.src} alt={featured.image.alt} fill loading="eager" fetchPriority="high" sizes="(min-width:1024px) 58vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]" />
            {featuredTag ? <span className="label absolute bottom-3 left-3 bg-carbon/60 px-2 py-1 text-[0.6rem] text-white">{featuredTag}</span> : null}
          </div>
          <div className="lg:col-span-5">
            <p className="label text-navy">Latest · {featured.topic}</p>
            <h2 className="mt-4 text-display-m transition-colors group-hover:text-navy">{featured.title}</h2>
            <p className="mt-4 text-[1.05rem] text-stone-ink">{featured.description}</p>
            <p className="mt-6 text-sm text-stone-ink">
              <time dateTime={featured.date}>{fmt(featured.date)}</time> · {featured.minutes} min read
            </p>
            <span className="mt-6 inline-flex items-center gap-2.5 text-[0.8125rem] font-semibold tracking-[0.06em] text-navy uppercase">
              <Bullet /> Read the guide
            </span>
          </div>
        </Link>
      </section>

      {/* By category */}
      <section className="border-t border-hairline bg-ivory">
        <div className="page-x container-max section-y space-y-20">
          {active.map((t) => {
            const list = rest.filter((p) => p.topic === t);
            if (!list.length) return null;
            return (
              <div key={t}>
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-5">
                  <div>
                    <h2 className="text-2xl">{t}</h2>
                    <p className="mt-2 max-w-xl text-sm text-stone-ink">{topicIntro[t]}</p>
                  </div>
                  <Link href={`/blog/category/${topicSlug(t)}/`} className="inline-flex items-center gap-2.5 text-[0.75rem] font-semibold tracking-[0.08em] text-navy uppercase hover:underline hover:underline-offset-4">
                    <Bullet /> All {t.toLowerCase()} articles
                  </Link>
                </div>
                <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {list.slice(0, 3).map((p) => (
                    <li key={p.slug}>
                      <PostCard post={p} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBand code="B-01" />
    </>
  );
}
