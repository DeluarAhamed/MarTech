import Image from "next/image";
import Link from "next/link";
import { topicSlug, type Post } from "@/content/insights";
import { provenanceLabel } from "@/content/media";

const fmt = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/** Blog card used on the blog index, category pages, articles and the homepage. */
export function PostCard({ post }: { post: Post }) {
  const tag = provenanceLabel(post.image);
  return (
    <article className="group relative flex h-full flex-col border border-hairline bg-white transition-[border-color,box-shadow] duration-300 hover:border-navy hover:shadow-[0_24px_48px_-28px_rgb(45_54_111/0.45)]">
      <div className="cut-tr relative aspect-[16/10] overflow-hidden bg-carbon/5 [--cut:1.75rem]">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          sizes="(min-width:1024px) 31vw, (min-width:768px) 48vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {tag ? <span className="label absolute bottom-2 left-2 bg-carbon/60 px-1.5 py-1 text-[0.6rem] text-white">{tag}</span> : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Link href={`/blog/category/${topicSlug(post.topic)}/`} className="label relative z-10 w-fit text-navy hover:underline">
          {post.topic}
        </Link>
        <h3 className="mt-3 text-xl leading-snug transition-colors group-hover:text-navy">
          <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-[0.95rem] text-stone-ink">{post.description}</p>
        <p className="mt-auto pt-6 text-sm text-stone-ink">
          <time dateTime={post.date}>{fmt(post.date)}</time> · {post.minutes} min read
        </p>
      </div>
    </article>
  );
}
