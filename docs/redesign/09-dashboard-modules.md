# 09 — Secure Dashboard Module Plan

Route: `/admin` (noindex, `X-Robots-Tag: noindex`, excluded from sitemap, auth-gated in middleware **and** re-checked in every server action/route).

Global UI: left nav, top bar with search (contacts, organizations, deals, content) and a "+ New" menu, notification bell (assigned leads, overdue tasks). **Provenance badges** everywhere numbers appear: `Verified` · `Estimate` · `Illustrative`.

| # | Module | Purpose | Key views & features | Roles | Phase |
|---|---|---|---|---|---|
| 1 | **Overview & KPIs** | One-screen health check | New leads (7/30/90 d), priority leads awaiting response, median first-response time vs SLA, qualified-lead rate, open pipeline (weighted, **Estimate**), won this quarter (**Verified** = contract signed), organic clicks trend, top converting pages | all (viewer: aggregates) | 4 → 6 |
| 2 | **Leads** | Inbox for new submissions | Table + saved filters (band, segment, state, owner, status), lead detail with score breakdown, raw submission, attribution first/last touch, uploads, convert-to-deal, disqualify with reason, bulk assign | sales_*, admin | 4 |
| 3 | **Contacts & organizations** | Relationship record | Dedup/merge, timeline of activities, consent status, do-not-contact, related deals and leads | sales_*, marketing (read) | 4 |
| 4 | **Sales pipeline** | Move opportunities | Kanban by stage (keyboard-accessible drag + "move to" menu), list view, deal detail with line items (model × qty), stage history, next task required on every open deal | sales_*, admin | 4 |
| 5 | **Revenue forecast** | Expected revenue | Weighted pipeline by expected close month = Σ amount_estimate × probability. Shows method, assumptions, and confidence. Separates **Committed (contract signed)** vs **Weighted estimate** vs **Best case**. Never mixes estimates into "revenue". | owner, admin, sales_manager | 6 |
| 6 | **Projects & models** | Manage catalog and case studies | Model editor (specs, configurations, media roles, plan PDFs, applications), project editor with **publish gate** (requires permission document + verified facts), preview link | content_editor, marketing, admin | 5 |
| 7 | **CMS (pages)** | Edit marketing pages | Section-block editor (fixed block types), draft → review → publish workflow, scheduled publish, revision history + restore, preview on staging URL | content_editor, marketing, admin | 5 |
| 8 | **Blog & SEO** | Insights + on-page SEO | Post editor (Tiptap), topics, related models, SEO panel (title/description length, canonical, OG image, noindex), internal-link suggestions (simple, rule-based), redirect manager with hit counts, 404 log | content_editor, marketing | 5 |
| 9 | **Traffic & attribution** | Where leads come from | Leads and qualified leads by first-touch / last-touch channel, landing page, campaign; GA4 sessions joined by date/source; GSC clicks/impressions by page and query; **content → lead → deal** view (which pages and articles appear in the journeys of leads that became deals) | marketing, owner, admin | 6 |
| 10 | **Campaign performance** | ROI per campaign | Campaign registry + UTM builder (enforces naming rules), spend entry/import, cost per lead, cost per qualified lead, pipeline created, won value (verified only), ROAS clearly labelled | marketing, owner | 6 |
| 11 | **Tasks & reminders** | Nothing falls through | My tasks / team tasks, due today / overdue, auto-tasks (first response, stale deal > 14 days in stage, claim review due), email digest at 8:00 local | all staff | 4 |
| 12 | **Team & permissions** | Access management | Invite user, assign roles, enforce MFA, deactivate (keeps history), view audit log | owner, admin | 4 |
| 13 | **Settings & integrations** | Configuration | SLA, scoring rubric (versioned), service area, notification routing, GA4/GSC connection status + last sync, email provider, calendar link, data retention, claims registry | owner, admin (claims: marketing propose, owner approve) | 4 → 6 |

## Security requirements (apply to every module)

- Server-side authorization on **every** read and mutation. UI hiding is cosmetic only.
- RLS enabled on all tables. Automated policy tests per role (Playwright + SQL tests).
- No PII in URLs, logs, analytics events, or notification bodies.
- CSV export: restricted to owner/admin/sales_manager, logged, with watermark columns (exported_by, exported_at).
- Security headers: CSP (nonce-based), HSTS, `frame-ancestors 'none'` on /admin, `Referrer-Policy: strict-origin-when-cross-origin`.
- Dependency audit in CI; `/security-review` run before each production release.

## Data display rules

- Every chart and KPI tile states its period, its source (CRM / GA4 / GSC / manual), and its provenance.
- Seeded demo data exists **only** in dev/staging and is flagged `illustrative`. Production starts empty and that is shown honestly (empty states with guidance, not fake charts).
- GA4 numbers are labelled as sampled/modelled where GA4 says so. GA4 and CRM lead counts will differ (consent, ad blockers). The dashboard explains this and treats **CRM as the source of truth for leads**.
