# 08 — Stack Validation, CMS & Database Architecture

## 1. Stack validation

**Current production:** WordPress + Elementor Pro + Gravity Forms + Yoast on WP Engine (doc 01). **Local repo:** empty. So the proposed stack is a **new build**, not a migration of existing code.

| Proposed | Verdict | Reasoning |
|---|---|---|
| Next.js (App Router) + TypeScript | ✔ Adopt | SSR/SSG for SEO, server actions/route handlers for secure lead intake, one codebase for site + dashboard |
| Tailwind CSS | ✔ Adopt | Token-driven design system shared by site and dashboard |
| GSAP + ScrollTrigger | ✔ Adopt (scoped) | Free for commercial use; loaded only on routes that need it (doc 06) |
| Supabase (Postgres + Auth + Storage) | ✔ Adopt | Managed Postgres, Row-Level Security, auth with MFA, private storage for uploads |
| **Drizzle** vs Prisma | ✔ **Drizzle** | Lighter runtime, SQL-first, works cleanly with RLS-aware SQL and Supabase migrations; no binary engine |
| Zod | ✔ Adopt | Shared validation for forms, server actions, and CMS block schemas |
| Recharts | ✔ Adopt (dashboard only) | Never loaded on public routes |
| Vercel | ✔ Adopt | Preview deployments per PR, **instant rollback**, edge caching |
| GA4 + Search Console | ✔ Integrate | GA4 property exists (`G-LZ15LR7YL8`); GSC access to confirm |
| **Additional, minimal** | | |
| Transactional email | Resend or Postmark | Lead alerts and auto-acknowledgement (decision Q-14) |
| Bot protection | Cloudflare Turnstile | Doc 07 §6 |
| Rich text editor | Tiptap (dashboard only) | Structured JSON output, no HTML injection risk |
| E2E tests | Playwright | Forms, auth, permissions, redirects |

### CMS decision: custom CMS inside the dashboard *(recommended)* vs headless CMS

| | Custom (Supabase tables + dashboard editors) | Headless (Sanity / Payload / Storyblok) |
|---|---|---|
| One login, one database for CRM + content | ✔ | ✖ two systems |
| Join content to leads (which article/model generated pipeline) | ✔ native SQL | Needs sync |
| Build effort | Higher (editors, previews, versioning) | Lower |
| Content volume | Small (≈15 pages, 3–10 models, posts) | — |

**Recommendation:** a **custom structured CMS.** Content is mostly structured (models, projects, claims, posts), and the attribution requirement favours one database. Pages are composed from a **fixed set of typed section blocks** (validated by Zod), not free-form page building, which protects the design quality.
**Fallback:** if the build budget tightens, Payload CMS (Next.js-native, Postgres) can run in the same app and database. Decision Q-15.

## 2. Data truthfulness model

Every number shown publicly or in the dashboard carries **provenance**:

```sql
create type provenance as enum ('verified', 'client_reported', 'estimate', 'illustrative');
```

- **verified**: backed by a document or system record (a signed contract, an inspection report, CRM data).
- **client_reported**: stated by MAR but no evidence on file. **Not allowed to render publicly as a statistic.**
- **estimate**: calculated forecasts (pipeline weighting, revenue forecast). Always shown with an "Estimate" badge and its method.
- **illustrative**: demo, seed, or diagram data. Rendering on production public routes is blocked, and the dashboard shows it with a striped "Illustrative" badge.

A **`claims` registry** controls every public statistic (§4.6).

## 3. Entity-relationship overview

```
auth.users ─1:1─ profiles ─M:N─ roles (via user_roles)

organizations ─1:M─ contacts ─1:M─ leads ─1:1─ lead_scores
      │                 │           │
      │                 │           └─M:1─ form_submissions ─1:M─ attribution_touches
      └─1:M─ deals ─────┘ (primary_contact)
               ├─M:1─ pipeline_stages ─M:1─ pipelines
               ├─1:M─ deal_stage_history
               ├─1:M─ deal_line_items ─M:1─ models
               └─1:M─ activities / tasks (also on leads, contacts)

campaigns ─1:M─ campaign_spend ;  attribution_touches ─M:1─ campaigns (via utm_campaign match)

models ─1:M─ model_configurations ; models ─M:N─ media_assets ; models ─M:N─ applications
projects ─M:N─ models ; projects ─M:N─ media_assets ; projects ─M:1─ organizations (client, permissioned)
posts ─M:1─ authors(profiles) ; posts ─M:N─ topics ; posts ─M:N─ models (related)
pages ─1:M─ page_sections (typed jsonb)
claims ─1:M─ claim_usages ; claims ─M:1─ evidence (media_assets/doc)
seo_metadata (1:1 with any publishable entity) ; redirects ; content_revisions ; audit_log
analytics_daily_ga4 ; search_console_daily ; integrations ; settings
```

## 4. Tables (core columns; all have `id uuid pk`, `created_at`, `updated_at` unless noted)

### 4.1 Identity & access
- `profiles` (`id` = `auth.users.id`, full_name, title, avatar_asset_id, is_active)
- `roles` (key: `owner | admin | sales_manager | sales_rep | marketing | content_editor | viewer`)
- `user_roles` (user_id, role_key) composite pk
- `audit_log` (actor_id, action, entity_table, entity_id, before jsonb, after jsonb, ip_hash, at). **Append-only.** No update or delete grants.

### 4.2 CRM
- `organizations` (name, domain, type: developer/gc/school_district/government/investor/other, hq_city, hq_state, website, notes)
- `contacts` (organization_id, first_name, last_name, email **unique citext**, phone, role, consent_marketing bool, consent_at, consent_source, do_not_contact bool)
- `form_submissions` (**immutable**: type: project/tour/flex/contact, payload jsonb (validated), anonymous_id, ip_hash, user_agent, page_url, form_variant, spam_score, status: accepted/rejected_spam, received_at)
- `attribution_touches` (submission_id, touch: first/last, source, medium, campaign, term, content, click_id_type, click_id, referrer, landing_page, touched_at, ga_client_id, ga_session_id)
- `leads` (contact_id, organization_id, submission_id, project_type, units int, modules int, location_city, location_state, location_zip, target_quarter, project_stage, plans_status, segment, status: new/contacted/qualified/nurture/disqualified/converted, disqualify_reason, owner_id, first_response_at)
- `lead_scores` (lead_id, score int, band, breakdown jsonb, rubric_version, computed_at)
- `pipelines` (name), `pipeline_stages` (pipeline_id, name, position, default_probability numeric, is_won, is_lost)
- `deals` (organization_id, primary_contact_id, lead_id, pipeline_stage_id, name, owner_id, **amount_estimate numeric, amount_basis enum('quote_sent','contract_signed','rep_estimate','model_x_units')**, amount_provenance provenance, probability_override, expected_close_date, closed_at, lost_reason)
- `deal_line_items` (deal_id, model_id nullable, description, quantity, unit_price_estimate, provenance)
- `deal_stage_history` (deal_id, from_stage_id, to_stage_id, changed_by, changed_at)
- `activities` (type: call/email/meeting/note/site_visit/factory_tour, subject, body, occurred_at, actor_id, lead_id?, contact_id?, deal_id?, CHECK at least one FK)
- `tasks` (title, due_at, status, priority, assignee_id, lead_id?, contact_id?, deal_id?, completed_at, auto_rule)
- `uploads` (submission_id/lead_id, storage_path, mime, size, scan_status)

### 4.3 Marketing
- `campaigns` (name, channel: organic/paid_search/paid_social/email/referral/event/direct_mail, utm_campaign unique, start_date, end_date, budget, objective, status)
- `campaign_spend` (campaign_id, spend_date, amount, source: manual/import, provenance)
- `analytics_daily_ga4` (date, source, medium, campaign, landing_page, sessions, engaged_sessions, users, key_events), unique(date, source, medium, campaign, landing_page)
- `search_console_daily` (date, page, query, clicks, impressions, ctr, position), unique(date, page, query)

### 4.4 Content / CMS
- `media_assets` (storage_path, kind: image/video/pdf/svg, width, height, alt_text **required for images**, caption, credit, **provenance_kind: photo/render/illustration/drawing/stock**, rights_status, rights_notes)
- `applications` (key: housing/education/workforce/office/pmrv/custom, label)
- `models` (slug unique, name, category, status: draft/review/published/archived, summary, body jsonb (Tiptap), sqft_min, sqft_max, footprint_text, modules_count, beds_min/max, baths_min/max, structure, delivery_note, spec_provenance, published_at)
- `model_configurations` (model_id, name, beds, baths, sqft, footprint, notes, position)
- `model_applications` (model_id, application_key)
- `model_media` (model_id, asset_id, role: hero/gallery/plan/plan_pdf, position)
- `projects` (slug, title, client_org_id, **client_permission_doc_asset_id required to publish**, location_city, location_state, completed_on, units, summary, body jsonb, status, facts_provenance)
- `project_models`, `project_media`
- `posts` (slug, title, excerpt, body jsonb, author_id, status, published_at, reading_minutes)
- `topics`, `post_topics`, `post_related_models`
- `pages` (slug, title, template, status), `page_sections` (page_id, position, block_type, data jsonb validated by Zod per block_type)
- `testimonials` (quote, person_name, person_title, organization_id, permission_asset_id required, status)
- `faq_items` (question, answer jsonb, scope: global/model/segment, position)
- `seo_metadata` (entity_table, entity_id, meta_title, meta_description, og_asset_id, canonical_url, noindex), unique(entity_table, entity_id)
- `redirects` (from_path unique, to_path, status_code 301/302/410, hits int, last_hit_at)
- `content_revisions` (entity_table, entity_id, snapshot jsonb, author_id, created_at). Enables content rollback.

### 4.5 System
- `integrations` (provider: ga4/gsc/email/calendar/slack, status, config jsonb (**non-secret only**), last_sync_at, last_error). Secrets live in Vercel env / Supabase Vault, never in table rows.
- `settings` (key, value jsonb): SLA hours, scoring rubric, service area, notification recipients.

### 4.6 Claims registry
- `claims` (key unique e.g. `delivery_window`, statement, value_text, unit, assumptions, source_description, evidence_asset_id, provenance, status: draft/approved/retired, approved_by, approved_at, review_due_at)
- `claim_usages` (claim_id, entity_table, entity_id, block_ref)
- The public renderer refuses (at build time) any `ClaimStat` whose claim is not `approved` + `verified`. Claims get an annual review reminder via `review_due_at` → `tasks`.

## 5. Access control

**Defence in depth: RLS in Postgres + role checks in server code + no client-side service key.**

| Role | Leads/contacts/deals | Content | Analytics | Team/settings |
|---|---|---|---|---|
| owner | all | all | all | all |
| admin | all | all | all | all except ownership transfer |
| sales_manager | all, reassign | read | read | — |
| sales_rep | own + unassigned queue (Q-12) | read | own pipeline | — |
| marketing | read (no notes on private deals, configurable) | all | all | campaigns |
| content_editor | none | create/edit; publish needs approval (configurable) | content metrics | — |
| viewer | read-only aggregate dashboards; no PII | read | aggregates | — |

- `anon` role: **no table grants on CRM tables at all.** Public site reads published content through `SELECT` policies `status = 'published'` (or build-time fetch with a read-only key).
- Lead intake: a **server route** validates (Zod + Turnstile + rate limit) and writes using a server-only privileged client. Nothing from the browser writes to tables directly.
- Helper SQL function `has_role(role_key)` / `is_owner_of(record)` is used in policies. Every policy is covered by automated tests (Phase 4).
- Auth: Supabase Auth, email + **mandatory MFA (TOTP)** for all staff, invite-only (sign-up disabled), session timeout, and SSO later if MAR uses Google Workspace or Microsoft 365 (Q-16).
- PII: email/phone visible only to permitted roles. Exports are logged in `audit_log`. A data-retention setting purges rejected spam after 30 days and supports contact deletion requests.

## 6. Environments & migrations

- Supabase projects: `dev` (local via Supabase CLI), `staging`, `production`. Production is never seeded with illustrative data.
- Drizzle migrations are checked into git, applied by CI to staging, then promoted to production with a manual approval. **Every migration is backward-compatible** (expand → migrate → contract) so a Vercel rollback never meets an incompatible schema.
- Daily automated backups + point-in-time recovery (Supabase Pro plan; confirm budget, Q-17).
