# 03 — Information Architecture

## 1. Primary navigation

```
[MAR logo]   Solutions   Models   Process   Projects   About   Insights      (385) 535-1031   [Start a project]
```

- Five to six items, with "Projects" **hidden until at least one verified project exists** (see §4).
- Mobile: full-screen menu with large type, phone, and the "Start a project" button pinned at the bottom.
- Footer: full sitemap, both addresses, both contact lines with their purposes, privacy, terms, and accessibility statement.

## 2. Sitemap (public)

```
/                                   Home
/solutions/                         Solutions overview
  /solutions/developers/            Housing developers & builders (absorbs /modular-for-developers/)
  /solutions/build-to-rent/         BTR & for-sale communities (if client confirms as distinct segment)
  /solutions/education/             Modular classrooms & campuses
  /solutions/workforce-flex/        Workforce housing, temporary & flex/office space, PMRV
  /solutions/flex-manufacturing/    FLEX™ localized manufacturing
/models/                            Model catalog (filter by application, size, modules)
  /models/bohemian/                 Single module (480–576 sqft)
  /models/solterra/                 Single-family (1,440–1,474 sqft)
  /models/castello/                 Townhome & multifamily (1,368 sqft)
  /models/compare/                  Side-by-side compare (noindex; query-param driven)
  /models/custom/                   Build from your plans
/process/                           Design → Factory → Delivery → Handover (+ parallel timeline)
  /process/engineering-compliance/  Codes, third-party inspection, documentation (verified only)
  /process/factory/                 Salt Lake City hub + factory tour booking
/projects/                          Projects & case studies   ← launches only with verified projects
  /projects/[slug]/
/about/                             Company, FLEX story, leadership, locations
  /about/leadership/                (optional split if bios grow)
  /about/careers/                   (only if client wants it)
/insights/                          Articles, guides, resources
  /insights/[slug]/
  /insights/topic/[topic]/
  /resources/                       Spec sheets, floor plans, lender/developer packs
/contact/                           "Start a project" multi-step form + contact details
/factory-tour/                      Tour request (short form)
/thank-you/                         Post-submit (noindex), next steps + calendar
/privacy/  /terms/  /accessibility/
```

**Private (never indexed, never linked publicly)**
```
/admin/...                          Authenticated dashboard (doc 09)
/api/...                            Server routes; lead intake is POST-only and validated
```

## 3. URL preservation & redirect map

Existing URLs are young, but they are indexed. Rule: **every existing URL returns 200 or a single 301 hop. No chains and no 404s.** Confirm against Search Console's top pages before final sign-off.

| Current URL | New URL | Status |
|---|---|---|
| `/` | `/` | keep |
| `/about/` | `/about/` | keep |
| `/contact/` | `/contact/` | keep (page becomes "Start a project") |
| `/what-we-do/` | `/solutions/` | 301 |
| `/how-we-do-it/` | `/process/` | 301 |
| `/modular-for-developers/` | `/solutions/developers/` | 301 |
| `/single-module/` | `/models/bohemian/` | 301 |
| `/single-family/` | `/models/solterra/` | 301 |
| `/townhome/` | `/models/castello/` | 301 |
| `/thank-you/` | `/thank-you/` | keep, noindex |
| `/wp-content/uploads/…/*.pdf` (floor plans) | `/resources/…` or same path via rewrite | 301 or preserve if linked externally |
| `/sitemap_index.xml`, `/page-sitemap.xml` | `/sitemap.xml` | 301 |
| `/wp-admin/`, `/wp-login.php` | 410 or 404 after cutover | — |

**Alternative (lower SEO risk, less tidy):** keep the model URLs `/single-module/` etc. unchanged. Recommendation: the 301s above are worth it now, while equity is small. That gets harder later. Client decision: Q-09.

Redirects live in a **`redirects` database table** that admins can manage, mirrored to `next.config` at build time for the critical set (doc 08).

## 4. Content gating rules (truthfulness)

| Section | Launch condition |
|---|---|
| Projects / case studies | ≥1 project with client permission, real photos, and verified facts |
| Testimonials | Named source with written permission on file |
| Client/partner logos | Written permission |
| Certifications/compliance badges | Named agency/program + document on file |
| Statistics anywhere | An approved `claims` record (doc 08) |
| Insights | Editorial calendar approved; at least 3 articles at launch |

Sections that fail their condition are **hidden from the build automatically** (CMS-driven), not filled with placeholders.

## 5. Page templates

| Template | Used by | Key modules |
|---|---|---|
| T1 Home | `/` | see doc 04 |
| T2 Segment landing | `/solutions/*` | hero, pains → MAR answer, relevant models, process excerpt, proof, segment-preset form |
| T3 Model catalog | `/models/` | filter bar, model cards, compare tray, custom-plans CTA |
| T4 Model detail | `/models/[slug]` | gallery (render labels), spec table, floor plans (download), configurations, applications, delivery note, related models, CTA with model preselected |
| T5 Process / story | `/process/*` | parallel timeline, numbered steps, checkpoints, compliance, factory tour |
| T6 Project detail | `/projects/[slug]` | facts strip (verified), challenge → approach → outcome, gallery, models used, CTA |
| T7 Article | `/insights/[slug]` | editorial layout, ToC, author, related, inline CTA, schema |
| T8 Utility | contact, tour, thank-you, legal | forms, next steps |

## 6. User journeys (primary)

1. **Developer evaluating vendors** (organic search or referral): Home → Solutions/Developers → Model (Solterra/Castello) → Process → Start a project (scale-qualified).
2. **School/district buyer:** Search "modular classrooms Utah" → Solutions/Education → Bohemian (classroom config) → Start a project (education preset) or Factory tour.
3. **Large-project prospect:** FLEX™ page → "See if your project qualifies" → FLEX qualification step → high-priority routing.
4. **Lender/partner due diligence:** About → Leadership → Engineering & compliance → Resources (spec pack).
5. **Returning visitor** (from a campaign email): Insight article → inline CTA → Start a project with attribution preserved.
