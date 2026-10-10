# 10 — Marketing Analytics & SEO Measurement Plan

## 1. Baseline first (before any change)

Capture and store these before cutover so improvement can be proven:

- [ ] GA4 export of the last 90 days (or since property creation): sessions by channel and landing page, form-submit events (if configured), engagement.
- [ ] Search Console: verified property for `https://www.martechbuildingsystems.com` (domain property preferred), last 16 months (or since start): queries, pages, clicks, impressions, indexed pages.
- [ ] Gravity Forms entry count by month (lead volume baseline).
- [ ] Lighthouse + PageSpeed Insights (field CrUX data if available) for all 9 URLs, mobile and desktop.
- [ ] Backlink snapshot (free: GSC "Links" report).

**Assumption to verify:** it is unknown whether GA4 currently tracks Gravity Forms submissions as a key event (Q-18).

## 2. Measurement framework

| Business goal | KPI | Source of truth |
|---|---|---|
| More qualified enquiries | Qualified + priority leads / month | CRM |
| Better lead quality | % leads Priority/Qualified; lead → opportunity rate | CRM |
| Faster sales response | Median first-response time vs SLA | CRM |
| Pipeline growth | New pipeline created (**Estimate**, labelled) | CRM |
| Revenue | Won deal value (**contract signed = Verified**) | CRM |
| Organic visibility | Non-brand clicks, impressions, top-10 keywords count | GSC |
| Site conversion | Start-a-project conversion rate (submits / sessions) by landing page | GA4 + CRM |
| Marketing efficiency | Cost per qualified lead, pipeline per $ by campaign | CRM + spend |
| Experience quality | Core Web Vitals pass rate (LCP < 2.5 s, INP < 200 ms, CLS < 0.1) | CrUX / Vercel Speed Insights |

No targets are set until the baseline exists. Targets are agreed with the client after 30 days of clean data.

## 3. Attribution design

1. On first visit, a first-party cookie `mar_aid` (anonymous UUID, 13 months) and `mar_ft` (first-touch: utm_*, click IDs, referrer, landing page, timestamp) are set **only if consent allows analytics storage** (§5). Otherwise, touch data is held in session storage for the current visit only.
2. Each session updates `mar_lt` (last-touch, non-direct). Direct visits don't overwrite a known source, which is the standard last-non-direct model.
3. On form submit, the server reads the touch data, validates it, and writes `attribution_touches` (first + last).
4. GA4 `client_id`/`session_id` are stored (consent-dependent) to join CRM leads with GA4 behaviour.
5. Reports: first-touch (what creates demand), last-touch (what converts), and a **content-assisted** view (pages viewed before conversion, captured as a lightweight page-path list in the same consent-scoped storage, capped at 20 entries).
6. Multi-touch modelling is deferred until volume justifies it.

**UTM governance:** lowercase, `source` = platform (google, linkedin, newsletter), `medium` = cpc/paid_social/email/referral/qr, `campaign` = `yyyy-mm_segment_theme`. The dashboard UTM builder enforces this format.

## 4. GA4 event plan

| Event | Parameters (no PII) | Key event |
|---|---|---|
| `generate_lead` | form_type, project_type, segment, lead_band, form_variant | ✔ |
| `form_start` / `form_step` | form_type, step_number | |
| `tour_request` | — | ✔ |
| `flex_qualify_submit` | — | ✔ |
| `phone_click` / `email_click` | location | ✔ (phone) |
| `file_download` | file_type, model_slug | |
| `model_view` | model_slug | |
| `model_compare` | model_slugs | |
| `cta_click` | cta_label, location | |
| `segment_select` | segment | |
| `scroll_depth_75` | page_template | |

Implementation: gtag directly or through Google Tag Manager (Q-19; GTM adds flexibility for marketing staff but adds weight and governance needs). **Never** send names, emails, phones, or free-text messages to GA4.

## 5. Consent & privacy

- Use **Google Consent Mode v2** with a lightweight consent banner (custom-built, matching the design system), with categories: necessary, analytics, marketing.
- Default: analytics and marketing denied until consent for visitors from jurisdictions requiring opt-in. US-state handling (for example California CPRA, Utah UCPA, and others) plus the "Do Not Sell/Share" requirement depends on whether ad pixels are used. **Legal review by the client's counsel is required** (Q-20).
- Privacy policy updated to list every processor: Vercel, Supabase, GA4, email provider, Turnstile, calendar tool, and any pixels.
- Remove or disclose the unidentified script found in the audit.

## 6. Dashboard data pipelines

| Source | Method | Frequency |
|---|---|---|
| CRM | Native (same DB) | Real-time |
| GA4 | GA4 **Data API** via service account → `analytics_daily_ga4` | Daily cron (Vercel Cron) |
| Search Console | **Search Console API** → `search_console_daily` | Daily (data lags ~2–3 days) |
| Campaign spend | Manual entry / CSV import first; ad-platform APIs later if justified | Weekly |
| Web vitals | Vercel Speed Insights (or `web-vitals` → own table) | Continuous |

Integration status is shown in Settings. Sync failures create a task for an admin.

## 7. SEO plan

### Technical
- Server-rendered HTML for all public pages. `generateMetadata` per route from `seo_metadata`.
- `sitemap.xml` generated from published entities. `robots.txt` without `Crawl-delay`. Disallow `/admin`, `/api`.
- Canonicals, a single H1 per page, logical heading order, descriptive alt text (required field in CMS).
- Structured data (JSON-LD): `Organization` (both addresses, contact points per line purpose, `sameAs` LinkedIn), `WebSite`, `BreadcrumbList`, `Product`-like markup for models (**no price/offer unless real**), `Article` for insights, `FAQPage` where FAQs exist (rich results are limited for most sites; markup still aids understanding).
- 301 map (doc 03 §3) tested automatically in CI against the old URL list.
- Image SEO: meaningful file names, AVIF/WebP, dimensions.
- Core Web Vitals budgets enforced in CI (Lighthouse CI on key templates).

### Content (topic clusters; volumes to be researched with a keyword tool, **no volumes assumed here**)
| Pillar | Example cluster topics |
|---|---|
| Modular construction for developers | modular vs site-built timeline, fixed-price modular bids, lender financing for modular, carrying-cost impact |
| Build-to-rent & for-sale communities | modular BTR communities, modular townhome density, starter-home economics |
| Education | modular classrooms (temporary vs permanent), procurement process for districts |
| Workforce & flex | employee housing, PMRV explained, temporary office space |
| Process & compliance | what third-party plan review means, factory inspections, transport & set day |
| FLEX™ | localized manufacturing for large projects |
| Location (only where MAR genuinely serves) | modular builder Utah / Mountain West states, once the service area is confirmed |

- Cadence proposal: 2 articles/month, each mapped to a model or segment page with internal links. Bylines from real team members (expertise signals).
- **No AI-generated filler at scale.** Claude can draft, but each article needs an expert review and a named author.

### Migration safeguards
- Crawl the old site (all URLs, titles, metas, H1s) → `migration-baseline.csv` before cutover.
- After cutover: monitor GSC coverage, 404s (dashboard log), and ranking for the top 20 queries daily for 2 weeks, then weekly.
