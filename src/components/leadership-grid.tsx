import Image from "next/image";
import { leadership } from "@/content/team";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
      />
    </svg>
  );
}

/** Leadership cards: portrait, role, focus areas, summary, expandable full bio and LinkedIn link. */
export function LeadershipGrid() {
  return (
    <ul data-reveal data-reveal-group className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {leadership.map((p) => (
        <li
          key={p.name}
          className="group relative flex h-full flex-col border border-hairline bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-navy hover:shadow-[0_24px_48px_-28px_rgb(45_54_111/0.5)] md:p-7"
        >
          <div className="flex items-start gap-5">
            <div className="cut-tr relative h-[7.5rem] w-24 shrink-0 overflow-hidden bg-carbon/5 [--cut:0.9rem]">
              <Image
                src={p.photo}
                alt={`Portrait of ${p.name}`}
                fill
                sizes="96px"
                className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl leading-tight">{p.name}</h3>
              <p className="label mt-2 text-navy">{p.role}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {p.focus.map((f) => (
                  <li key={f} className="rounded-full bg-navy-tint px-2.5 py-1 text-[0.7rem] font-semibold text-navy">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={p.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} on LinkedIn (opens in a new tab)`}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-hairline text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <LinkedInIcon className="size-4" />
            </a>
          </div>

          <p className="mt-6 text-[0.98rem] text-stone-ink">{p.bio}</p>

          <details className="group/bio mt-auto pt-5">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-[0.75rem] font-semibold tracking-[0.08em] text-navy uppercase [&::-webkit-details-marker]:hidden">
              <span className="relative grid size-5 place-items-center rounded-full border border-navy/30">
                <span className="absolute h-px w-2.5 bg-navy" />
                <span className="absolute h-2.5 w-px bg-navy transition-transform group-open/bio:scale-y-0" />
              </span>
              <span className="group-open/bio:hidden">Read full bio</span>
              <span className="hidden group-open/bio:inline">Close bio</span>
            </summary>
            <p className="mt-4 border-t border-hairline pt-4 text-[0.95rem] leading-relaxed text-stone-ink">{p.more}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
