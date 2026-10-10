import { Slash } from "./ui";

/** Infinite capability ticker. CSS-only; pauses on hover; static for reduced motion. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-8 pr-8 whitespace-nowrap">
          <span className="font-display text-[clamp(1.25rem,2.4vw,2.25rem)] font-bold tracking-[-0.02em] [font-stretch:112%]">{t}</span>
          <Slash className="h-4" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee group relative mt-10 overflow-hidden border-y border-hairline py-6 lg:mt-0" aria-label="What we build">
      <div className="marquee-track flex w-max">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
