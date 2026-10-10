# CLAUDE.md — MAR Technology website & growth platform

## Current stage: P3 public-site build (started 2026-10-09 on the owner's go-ahead)
- The blueprint lives in `docs/redesign/` (start with `docs/redesign/README.md`). Build status: `docs/redesign/13-build-status.md`.
- Built with the plan's recommended defaults where client questions are still open (doc 12) — keep those choices easy to change.
- The live site (WordPress/Elementor on WP Engine) is production. Never modify it from here.

## Codebase map
- `src/content/*` — all copy, specs, media and the claims registry. Edit content here, not in components.
- `src/components/*` — UI. `sections.tsx` holds shared page sections; `ui.tsx` holds primitives.
- `src/lib/*` — lead schema (Zod, shared client/server), scoring rubric, storage, attribution, analytics.
- `src/app/api/leads/route.ts` — the only write path for public forms.
- `supabase/migrations/` — SQL for lead storage (RLS on, no client policies).
- Next.js 16: read `node_modules/next/dist/docs/` before using unfamiliar APIs (async `params`/`searchParams`, flat ESLint, `proxy` not `middleware`).

## Commands
- `npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` (run `npx next typegen` first if route types are missing)

## Non-negotiable content rules
- Never invent company statistics, project specs, completed projects, testimonials, client logos, or certifications.
- Public statistics render only from an `approved` + `verified` record in the `claims` registry (doc 08 §4.6). If a needed fact is missing, stop and ask.
- Label every non-photographic image as a rendering.
- Distinguish data provenance everywhere: `verified` / `client_reported` / `estimate` / `illustrative`. Illustrative/seed data never reaches production.

## Engineering rules (for the build phase)
- Stack: Next.js App Router + TypeScript (strict), Tailwind, GSAP (scoped), Supabase (Postgres/Auth/Storage), Drizzle, Zod, Recharts (admin only), Vercel.
- Authorization is server-side on every read and mutation. RLS is default-deny. No service-role key in client code. No PII in URLs, logs, analytics, or notifications.
- Migrations must be backward-compatible (expand → migrate → contract) to keep Vercel instant rollback safe.
- Respect `prefers-reduced-motion`. Every animated section needs a static, SSR-readable equivalent.
- Mobile-first, WCAG 2.2 AA, Core Web Vitals budgets (LCP < 2.5 s, INP < 200 ms, CLS < 0.1).
- Add dependencies only with a stated reason. Prefer platform features.
- Preserve existing URLs or add 301s per `docs/redesign/03-information-architecture.md` §3.

## Workflow
- Start each task in plan mode, then read the relevant `docs/redesign/*` doc.
- One ticket → one branch → one PR with a Vercel preview. Run `/code-review` before merge and `/security-review` before production releases.
- Record decisions as short ADRs in `docs/redesign/decisions/`.
