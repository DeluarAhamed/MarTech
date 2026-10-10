import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MadeInUsaTag } from "@/components/made-in-usa";
import { CtaBand, JsonLd, breadcrumbJsonLd } from "@/components/sections";
import { Bullet, ButtonLink } from "@/components/ui";
import { PostCard } from "@/components/post-card";
import { getPost, posts, topicSlug, type Block } from "@/content/insights";
import { provenanceLabel } from "@/content/media";
import { site } from "@/content/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: { type: "article", publishedTime: p.date, images: [{ url: p.image.src, alt: p.image.alt }] },
  };
}

const fmt = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

function Body({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return <p key={i} className="mt-5 text-[1.08rem] leading-[1.75] text-carbon/85">{b.text}</p>;
          case "h2":
            return <h2 key={i} id={b.id} className="mt-14 scroll-mt-28 text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight">{b.text}</h2>;
          case "h3":
            return <h3 key={i} className="mt-9 text-xl">{b.text}</h3>;
          case "ul":
            return (
              <ul key={i} className="mt-5 space-y-2.5">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[1.05rem] leading-relaxed text-carbon/85">
                    <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-navy" />
                    {it}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-6 space-y-4">
                {b.items.map((it, n) => (
                  <li key={it} className="grid grid-cols-[2.25rem_1fr] gap-2 text-[1.05rem] leading-relaxed text-carbon/85">
                    <span className="grid size-7 place-items-center rounded-full bg-navy text-xs font-bold text-white tabular-nums">{n + 1}</span>
                    {it}
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <aside key={i} className="cut-tr my-10 bg-navy p-6 text-white [--cut:1.5rem] md:p-8">
                <p className="font-display text-xl font-bold">{b.title}</p>
                <p className="mt-2 text-white/75">{b.text}</p>
                {b.href ? (
                  <Link href={b.href} className="mt-5 inline-flex items-center gap-2.5 text-[0.8125rem] font-semibold tracking-[0.06em] uppercase hover:underline hover:underline-offset-4">
                    <Bullet /> {b.cta ?? "Learn more"}
                  </Link>
                ) : null}
              </aside>
            );
        }
      })}
    </>
  );
}

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = post.body.filter((b): b is Extract<Block, { t: "h2" }> => b.t === "h2");
  const related = posts.filter((p) => p.slug !== post.slug).sort((a, b) => Number(b.topic === post.topic) - Number(a.topic === post.topic)).slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
          { name: post.title, path: `/blog/${post.slug}/` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          image: [post.image.src],
          datePublished: post.date,
          dateModified: post.date,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.legalName, logo: { "@type": "ImageObject", url: `${site.url}/brand/mar-technology-logo.png` } },
          mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
          keywords: post.keyword,
        }}
      />

      <article>
        <header className="page-x container-max pt-28 md:pt-36">
          <nav aria-label="Breadcrumb" className="label text-stone-ink">
            <Link href="/blog/" className="hover:text-navy">Blog</Link>
            <span aria-hidden="true"> / </span>
            <Link href={`/blog/category/${topicSlug(post.topic)}/`} className="hover:text-navy">{post.topic}</Link>
          </nav>
          <h1 className="hero-line mt-6 max-w-[22ch] overflow-hidden pb-[0.06em] text-[clamp(2.25rem,5vw,4.75rem)] leading-[0.98]">
            <span className="block">{post.title}</span>
          </h1>
          <div className="hero-fade-late mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-ink">
            <span className="font-semibold text-carbon">By the {site.name} team</span>
            <time dateTime={post.date}>{fmt(post.date)}</time>
            <span>{post.minutes} min read</span>
          </div>
          <div className="cut-tr relative mt-10 aspect-[16/9] overflow-hidden bg-carbon/5 [--cut:3rem] lg:aspect-[2.4/1]">
            <Image src={post.image.src} alt={post.image.alt} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
            {provenanceLabel(post.image) ? <span className="label absolute bottom-3 left-3 bg-carbon/60 px-2 py-1 text-[0.6rem] text-white">{provenanceLabel(post.image)}</span> : null}
          </div>
        </header>

        <div className="page-x container-max grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="label text-stone-ink">In this guide</p>
              <ol className="mt-4 space-y-1 border-l border-hairline">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-stone-ink hover:border-navy hover:text-navy">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-10 hidden lg:block">
                <MadeInUsaTag detail />
              </div>
            </div>
          </aside>
          <div className="max-w-[44rem] lg:col-span-7 lg:col-start-5">
            <Body blocks={post.body} />
            <div className="mt-14 flex flex-wrap gap-3 border-t border-hairline pt-8">
              <ButtonLink href="/contact/" data-cta-location={`article_${post.slug}`}>Start a project</ButtonLink>
              <ButtonLink href="/modular-for-developers/" variant="secondary">Modular for developers</ButtonLink>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-hairline bg-ivory">
        <div className="page-x container-max section-y">
          <h2 className="text-display-m">Keep reading.</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand code="I-02" />
    </>
  );
}
