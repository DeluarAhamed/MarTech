import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { CtaBand, JsonLd, breadcrumbJsonLd } from "@/components/sections";
import { SectionLabel } from "@/components/ui";
import { posts, topicFromSlug, topicIntro, topics, topicSlug } from "@/content/insights";
import { site } from "@/content/site";

export function generateStaticParams() {
  return topics.filter((t) => posts.some((p) => p.topic === t)).map((t) => ({ topic: topicSlug(t) }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/blog/category/[topic]">): Promise<Metadata> {
  const { topic } = await props.params;
  const t = topicFromSlug(topic);
  if (!t) return {};
  return {
    title: `${t} | Modular Construction Blog`,
    description: topicIntro[t],
    alternates: { canonical: `/blog/category/${topic}/` },
  };
}

export default async function CategoryPage(props: PageProps<"/blog/category/[topic]">) {
  const { topic } = await props.params;
  const t = topicFromSlug(topic);
  if (!t) notFound();
  const list = posts.filter((p) => p.topic === t);
  const others = topics.filter((o) => o !== t && posts.some((p) => p.topic === o));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
          { name: t, path: `/blog/category/${topic}/` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${t} articles`,
          url: `${site.url}/blog/category/${topic}/`,
          hasPart: list.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}/blog/${p.slug}/` })),
        }}
      />

      <section className="page-x container-max pt-28 md:pt-36">
        <nav aria-label="Breadcrumb" className="label text-stone-ink">
          <Link href="/blog/" className="hover:text-navy">Blog</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{t}</span>
        </nav>
        <div className="grid-4 mt-6 items-end gap-y-6">
          <div className="md:col-span-2 lg:col-span-3">
            <SectionLabel code="B-CAT" className="text-stone-ink">{list.length} articles</SectionLabel>
            <h1 className="hero-line mt-5 overflow-hidden pb-[0.06em] text-display-l">
              <span className="block">{t}.</span>
            </h1>
          </div>
          <p className="hero-rise-late text-stone-ink">{topicIntro[t]}</p>
        </div>
      </section>

      <section className="page-x container-max py-16 lg:py-20">
        <ul data-reveal data-reveal-group className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
        <div className="mt-16 border-t border-hairline pt-8">
          <p className="label text-stone-ink">More categories</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o}>
                <Link href={`/blog/category/${topicSlug(o)}/`} className="inline-flex min-h-10 items-center rounded-full border border-hairline px-4 text-sm font-medium hover:border-navy hover:text-navy">
                  {o}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand code="B-02" />
    </>
  );
}
