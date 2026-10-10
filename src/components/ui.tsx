import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Media } from "@/content/media";

function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export { cx };

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "inverse" | "ghost-inverse";
  children: ReactNode;
};

// Pill button with a leading bullet that fills on hover (layout reference: approved Désourdy direction).
const buttonBase =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-[0.8125rem] font-medium uppercase tracking-[0.04em] transition-[background-color,color,border-color] duration-300";

const variants = {
  primary: "bg-navy text-white hover:bg-navy-2",
  secondary: "border border-carbon/25 text-carbon hover:border-navy hover:text-navy",
  inverse: "bg-white text-carbon hover:bg-ivory",
  "ghost-inverse": "border border-white/40 text-white hover:border-white",
};

export function Bullet({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "relative inline-block size-2.5 shrink-0 rounded-full border border-current transition-transform duration-300 group-hover:scale-125",
        "after:absolute after:inset-0 after:scale-0 after:rounded-full after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-100",
        className,
      )}
    />
  );
}

export function ButtonLink({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <Link className={cx(buttonBase, variants[variant], className)} {...props}>
      <Bullet />
      {children}
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={cx("size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1", className)}
    >
      <path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Two parallel bars from the logo's diagonal cut — the site's recurring brand accent. */
export function Slash({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 14" aria-hidden="true" className={cx("h-3 w-auto shrink-0", className)}>
      <polygon points="0,14 14,0 18,0 4,14" fill="#2D366F" />
      <polygon points="6,14 20,0 22,0 22,2 10,14" fill="#6C7073" />
    </svg>
  );
}

/** Section label: brand slash + drawing-sheet code, e.g. "A-05 — The standards". */
export function SectionLabel({ code, children, className }: { code: string; children?: ReactNode; className?: string }) {
  return (
    <p className={cx("label flex items-center gap-3", className)}>
      <Slash />
      <span>{code}</span>
      {children ? (
        <>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
          <span>{children}</span>
        </>
      ) : null}
    </p>
  );
}

type FigureProps = {
  media: Media;
  className?: string;
  sizes: string;
  /** Above-the-fold image: load eagerly with high fetch priority. */
  eager?: boolean;
  /** Tailwind aspect class; omit to fill the parent (parent must be positioned with a height). */
  aspect?: string;
  imgClassName?: string;
};

/** Image with an honest provenance tag (renders/drawings are labelled). */
const provenanceTag: Record<Media["provenance"], string | null> = {
  photo: null,
  render: "Rendering",
  drawing: "Drawing",
  unconfirmed: "Concept image",
};

export function Figure({ media, className, sizes, eager, aspect, imgClassName }: FigureProps) {
  const tag = provenanceTag[media.provenance];
  return (
    <div className={cx("relative overflow-hidden bg-carbon/5", aspect, !aspect && "h-full w-full", className)}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
        className={cx("object-cover", imgClassName)}
      />
      {tag ? (
        <span className="label pointer-events-none absolute bottom-3 left-3 bg-carbon/70 px-2 py-1 text-[0.625rem] text-ivory backdrop-blur-sm">
          {tag}
        </span>
      ) : null}
    </div>
  );
}

export function SpecList({ specs, className }: { specs: { label: string; value: string }[]; className?: string }) {
  return (
    <dl className={cx("divide-y divide-hairline border-y border-hairline", className)}>
      {specs.map((spec) => (
        <div key={spec.label} className="grid grid-cols-[minmax(7rem,38%)_1fr] gap-4 py-3.5">
          <dt className="label pt-1 text-stone-ink">{spec.label}</dt>
          <dd className="tabular-nums">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
