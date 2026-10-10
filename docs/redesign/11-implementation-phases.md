# 11 — Implementation Phases & Dependencies

Durations are **rough planning estimates** for one senior developer working with Claude Code. They assume assets and approvals arrive on time, and asset/approval delays are the most likely cause of slippage. They are not quotes.

```
P0 Decisions & access ──► P1 Foundation ──► P2 Design system ──► P3 Public site MVP ──┐
                                   │                                                  ├─► P7 SEO migration & launch ──► P8 Growth
                                   └──► P4 Admin core (CRM) ──► P5 CMS ───────────────┤
                                                          └──► P6 Analytics & forecasting ┘ (P6 can finish post-launch)
        Asset production (photo/video shoot, claims evidence) runs in parallel from P0 ─────────────► needed by P3/P7
        P3.5 Motion layer runs after P3 content is stable
```

| Phase | Goal | Key deliverables | Depends on | Exit / approval gate | Est. |
|---|---|---|---|---|---|
| **P0 Decisions & access** | Unblock everything | Signed-off design direction (doc 02), answers to doc 12 questions, access to WP admin, WP Engine, DNS, GA4, GSC; GitHub org/repo; Vercel + Supabase accounts owned by **MAR**, not by an individual or agency; photo/video shoot scheduled | — | **Client approval of this plan** | 1–2 wk |
| **P1 Foundation** | Safe skeleton | `git init` + GitHub repo, protected `main`, PR previews on Vercel, Next.js + TS strict + Tailwind + ESLint/Prettier, Supabase dev/staging, Drizzle schema v1 (identity, CRM, content, claims), CI (typecheck, lint, unit, Playwright smoke, Lighthouse CI), env/secrets policy, `CLAUDE.md` rules | P0 | Staging URL live; CI green; RLS default-deny verified | 1 wk |
| **P2 Design system** | Look & feel locked | Tokens, type, grid, core components (doc 05) on an internal `/dev/ui` route (blocked in production), homepage high-fidelity design (Figma or coded prototype) | P1, Q-01/02/03 | **Client approves homepage hi-fi** | 1.5–2 wk |
| **P3 Public site MVP** | All pages, real content | Home, Solutions (+segments), Models (catalog, 3 details, compare), Process (+ compliance, factory), About, Contact/Start a project (multi-step, Zod, Turnstile, DB write, email alerts), Tour, Thank-you, legal pages. Content migrated; claims only if approved; renders labelled. Static fallbacks for all interactions. | P2; content + claim answers | Content review sign-off; a11y (axe + manual keyboard/screen reader) pass; CWV budgets met on staging | 3–4 wk |
| **P3.5 Motion layer** | Premium feel | GSAP signature interactions (parallel timeline, plan → render, FLEX map), reveals, reduced-motion paths, optional Lenis test | P3 | Client review on real devices; INP budget holds | 1 wk |
| **P4 Admin core** | Leads never lost | Auth (invite-only, MFA), roles, Leads, Contacts/Orgs, Pipeline, Tasks, notifications, audit log, Team, base Settings; policy tests per role | P1 (schema), P3 form | Security review; role-permission test suite green | 3 wk |
| **P5 CMS** | Client edits content | Model/project/page-section/post editors, media library with provenance + rights, SEO panel, redirects manager, revisions + restore, preview, publish workflow, claims registry UI | P4 | Client team trained, edits a page end-to-end on staging | 2–3 wk |
| **P6 Analytics & forecasting** | Connect marketing → revenue | GA4 events + consent mode, GA4 Data API + GSC API sync, attribution reports, campaigns + spend, UTM builder, overview KPIs, revenue forecast (estimates labelled) | P4, GA4/GSC access | Numbers reconciled against GA4/GSC UIs within tolerance | 2 wk (can complete after launch) |
| **P7 SEO migration & launch** | Zero-loss cutover | Old-site crawl baseline, redirect tests, sitemap/robots/schema validation, final content QA, privacy/consent live, uptime monitoring, error tracking, **cutover runbook + rollback runbook rehearsed on staging** | P3, P4 (lead capture must be live), P5 preferred | **Client go/no-go sign-off** | 1 wk |
| **P8 Growth** | Compounding results | Insights publishing cadence, case studies as projects complete, A/B tests, scoring rubric tuning after 60–90 days, spec-pack lead magnet, ad-platform imports if spend justifies | P7 | Monthly KPI review | ongoing |

**Indicative total to launch:** ~14–18 weeks of build time after P0, excluding client review cycles and asset production.

## Cutover & rollback plan (deployment safety)

1. **Leave WordPress untouched** on WP Engine throughout. Before cutover: full WP Engine backup + export of Gravity Forms entries.
2. Lower DNS TTL to 300 s at least 48 h before cutover.
3. Cutover = point DNS (`www` + apex) to Vercel. WordPress remains reachable at a WP Engine temporary domain (or `legacy.` subdomain, password-protected, noindex).
4. **Rollback (site-level):** point DNS back to WP Engine (minutes, thanks to the low TTL). Leads submitted on the new site remain in Supabase, so nothing is lost.
5. **Rollback (release-level, after launch):** Vercel "Instant Rollback" to the previous deployment. DB migrations are backward-compatible (expand → contract), so rollback is always schema-safe.
6. **Content rollback:** `content_revisions` restore per entity.
7. Keep WP Engine for **at least 60 days** post-launch before decommissioning (client decision), after confirming no traffic hits the legacy host.

## Working with Claude Code (how each phase runs)

- One phase = one or more Claude Code sessions, each starting with **plan mode** and reading `CLAUDE.md` + the relevant doc here.
- Break each phase into tickets (GitHub Issues) with acceptance criteria copied from these docs. One branch + PR per ticket. Vercel preview link on every PR.
- Before merge: `/code-review` on the diff. Before each production release: `/security-review`.
- Claude must **stop and ask** when a ticket needs a fact not in the CMS/claims registry (no invented numbers, projects, testimonials, or certifications).
- Decisions are recorded in `docs/redesign/decisions/ADR-xxx.md` (short architecture decision records) so later sessions don't re-litigate them.
