# 01 — Current Website & Codebase Audit

**Audited:** 2026-10-09 · **Method:** live inspection of https://www.martechbuildingsystems.com (rendered DOM, public REST endpoints, sitemaps, robots.txt, network/script inventory). Nothing was changed on the live site.

> **Local repository status:** `D:\Web_Projects\www.martechbuildingsystems` is **empty and not a git repository**. There is no local source code to audit. The production site's source of truth lives inside WordPress on the host. Everything below comes from the public site.

---

## 1. Platform & hosting (observed, not assumed)

| Layer | Finding | Evidence |
|---|---|---|
| CMS | **WordPress** (core 7.0.x) | `/wp-json/`, `wp-includes` asset versions |
| Page builder | **Elementor 4.3.4 + Elementor Pro 4.3.1**, Hello Elementor theme 3.4.9 | `<meta name="generator">`, plugin asset paths |
| Hosting | **WP Engine** (very likely) | REST namespaces `wpe/cache-plugin/v1`, `wpe_sign_on_plugin/v1` |
| SEO plugin | **Yoast SEO** | `yoast/v1` namespace, Yoast robots block, `sitemap_index.xml` |
| Forms | **Gravity Forms 3.1.3** (form ID 2, AJAX, redirects to `/thank-you/`) | `gform_*` scripts and fields |
| Analytics | **GA4** property `G-LZ15LR7YL8` via gtag.js | script tag |
| Other third-party scripts | BugHerd (feedback widget, `apikey=tlxvwg6…`), Elfsight (announcement bar), Font Awesome kit, **unidentified script `s.ksrndkehqnwntyxlhgto.com/174315.js`** | script inventory |
| Agency | Footer credit: "Website & Digital Marketing by Sprout Media Lab" | footer |
| AI/automation plugins | REST namespaces `elementor-ai/v1`, `elementor-mcp-composer/v1.0.19`, `mcp`, `wp-abilities/v1` | `/wp-json/` |
| Posts / blog | **0 published posts** | `/wp-json/wp/v2/posts` returns empty |
| CRM integration | **None observable.** Where Gravity Forms entries go (email, Zapier, CRM) cannot be seen from the front end. | — |

**Action needed:** confirm ownership of and admin access to WordPress, WP Engine, the domain registrar/DNS, GA4, Google Search Console, and Gravity Forms entries. Confirm the contract scope with Sprout Media Lab, since the site was edited as recently as 2026-10-06.

## 2. Page inventory (complete, from the Yoast sitemap and WP REST)

| URL | Title tag | H1 | Indexed | Last modified |
|---|---|---|---|---|
| `/` | Modular Home Manufacturer for Developers \| Mar Technology Building Systems Salt Lake | Engineered for Developers. Designed for Rapid Returns. Built to Scale. | yes | 2026-10-06 |
| `/about/` | About MarTech Building Systems \| Modular Home Manufacturer | We Build Scalable Communities | yes | 2026-10-06 |
| `/what-we-do/` | Off-Site Modular Construction for Scalable Developments \| MarTech Building Systems | (same as title) | yes | 2026-10-06 |
| `/how-we-do-it/` | Modular Construction Process \| Design to Delivery | A Proven 5-Phase Process to Deliver Homes Faster | yes | 2026-10-06 |
| `/single-module/` | Single-Module Buildings \| ADUs & Commercial Units | Single Module (Bohemian model) | yes | 2026-10-06 |
| `/single-family/` | Modular Single-Family Homes \| Build-to-Rent Housing | Single-Family (Solterra model) | yes | 2026-10-06 |
| `/townhome/` | Modular Townhomes \| Multifamily Housing for Developers | Townhome & Multi-Family (Castello model) | yes | 2026-10-06 |
| `/modular-for-developers/` | Modular for Developers - Mar Technology Building Systems | BUILD SMARTER. BUILD FASTER. BUILD MORE. | yes | 2026-10-06 |
| `/contact/` | Modular Housing Project Consultation \| Contact MarTech (385) 535-1031 Salt Lake, UT | Start Your Next Development Project | yes | 2026-10-06 |
| `/thank-you/` | Thank You | Thank You for Contacting us | **noindex** ✔ | 2026-08-18 |

Media uploads date from 2026-06 onward, so the site and its search equity are **young**. Search Console data must still be reviewed before URLs change (see doc 10).

## 3. Content worth preserving

These are the existing content assets the new build should migrate. All are **client-published claims**: the redesign reuses them only after the client re-confirms them (see §6).

- **Positioning:** developer-focused modular manufacturer; "Built for developers, not one-off projects"; fixed-price bids; lender-ready documentation.
- **FLEX™ — "Flexible Localized Expansion & Execution":** establishes manufacturing capacity near large project sites. This is the most **distinctive, ownable story** on the site and is currently under-used.
- **Three models with real specifications and floor-plan PDFs:**
  - *Bohemian* (single module): 480 sqft (12'×40') to 576 sqft (12'×48'); ADU, classroom, employee housing, office, PMRV, custom.
  - *Solterra* (single-family, 3 modules): 1,440 sqft (36'×40') / 1,474 sqft (36'×48'); ranch; 2 bed/2.5 bath plus garage standard; 3 bed on request.
  - *Castello* (townhome/multifamily): 1,368 sqft (18'×40'); 2 bed/2.5 bath; split-level duplex or multiplex.
- **Capabilities:** modular units, modular classrooms, temporary and flex space, modular housing (single-family, townhome, multifamily, BTR).
- **Process content:** design → factory build → delivery and set → finish and handover. Buildertrend is used for client progress visibility.
- **Leadership bios:** Sal Patalano (Founder & CEO), Derek Clegg (VP Sales), Sean Rhodes (VP Production & Operations), Carlo Filio (Chief Engineer), Alejandra Piña (Senior Procurement Manager), Ziyaad Aboobaker (Founder & Chairman).
- **Locations:** HQ at 2001 Widewaters Pkwy A405, Knightdale NC 27545; primary manufacturing hub at 4701 W 6200 S, Bldg 100, Salt Lake City UT 84118.
- **Contacts:** sales@ / (385) 535-1031 for project consultations; info@ / (801) 903-8395 for general enquiries.
- **Compliance language:** third-party agencies "nationally recognized under DAPIA", ICC/state/local codes, "75–80% of inspections completed in the factory".
- **Imagery:** architectural **renders** of all three models (exterior and interior), floor plans, classroom/office/shell renders, team headshots, a factory image, a US map, and the FLEX logo.

## 4. Inconsistencies & accuracy issues to resolve before reuse

These items conflict across pages or need substantiation. The new site must not carry them forward until the client confirms them.

| # | Issue | Where |
|---|---|---|
| 1 | **Two phone numbers with unclear roles.** Meta descriptions use (385) 535-1031 (sales). The header "Call" button dials **(801) 903-8395** (general). | header vs. meta, contact |
| 2 | **Process step count:** "four-step delivery process" vs. "5-Phase Process" | home vs. how-we-do-it |
| 3 | **Traditional build timeline:** "8–14 months" vs. "10–14 months" | what-we-do vs. how-we-do-it |
| 4 | **Factory inspections:** "75%–80% of inspections in the factory" vs. "Inspections 100% factory-controlled" | about vs. how-we-do-it |
| 5 | **Delivery window caveats differ:** "up to 6 mods" (Bohemian), "up to 4 mods" (Solterra), "4 months for a duplex" (Castello). Homepage states "3–4 months" with no caveat. | models vs. home |
| 6 | **Unsubstantiated performance claims:** "30%+ increase in margins", "20–30% cost efficiency", "2x–10x production in 60–90 days", "Labor availability: Guaranteed", "Weather delays: None" | home, what-we-do, about, how-we-do-it |
| 7 | **Market scope:** "Modular homes for developers nationwide" vs. "Serving the Western U.S." | meta vs. developers page |
| 8 | **Brand name usage:** "Mar Technology", "MarTech", "Mar Technology Building Systems", and (in this brief) "MAR Technology" | site-wide |
| 9 | **Unverified compliance claims:** DAPIA agencies and certifications are mentioned, but no agency, state program, or certificate is named. The About page uses "Certified", "Licensed", and "Partners" images with no detail. | home, about |
| 10 | **Renders publicly labeled as unfinished:** image alt text includes "Living room_Not final" and "Kitchen…_Not final" | single-module |
| 11 | **Typos:** "Familly", "Extrerior", "municipalty", "contruction", "two two sizes", "1,474 sqt" | various |
| 12 | **Form ranges don't fit all segments:** "Number of Homes Planned" starts at 5–49, which doesn't suit classrooms, offices, or a single ADU | form |

## 5. Technical, SEO, performance & accessibility findings

**Performance** (one page-load sample in an in-app browser, so treat these as indicative only; this was not a Lighthouse or field-data run)
- ~97 requests, ~1.1 MB transferred, DOMContentLoaded ~4.9 s, load ~5.7 s, TTFB ~1.1 s.
- **Five Google font families requested with all 18 weights/italics each** (Roboto, Roboto Slab, Montserrat, Inter, Plus Jakarta Sans). This is a major render-blocking cost.
- jQuery, jQuery UI (slider/draggable), Swiper, Elementor runtime, Font Awesome kit, Elfsight platform, and **BugHerd loading for every public visitor** (a QA tool that should not be on production).
- Background slideshows use large PNG renders (for example `…-scaled.png`). No modern formats or responsive art direction were observed.

**SEO**
- ✔ Unique titles and meta descriptions on every page, a canonical tag, Open Graph/Twitter tags, a Yoast sitemap, and a noindexed thank-you page.
- ✖ No blog/insights content (0 posts), so there is no topical depth for "modular construction for developers" queries.
- ✖ Model pages use H2 for spec labels ("Dimensions:", "Application:"), which is a weak heading hierarchy. Model names are not used as H1s.
- ✖ The structured data observed on the homepage is Yoast's default `WebPage` graph. There is no `Organization` with both addresses, no `Product` for models, and no `BreadcrumbList` (verify across all pages).
- ✖ `robots.txt` includes `Crawl-delay: 10`. Google ignores it, but Bing respects it and may crawl slowly.
- ✖ Title tags carry phone numbers and inconsistent brand forms.
- ✖ Image alt text is missing on several images (4 on the homepage), and some alt values are file names.

**Accessibility (spot checks)**
- ✔ "Skip to content" link exists.
- ✖ Missing or filename-style alt text. Auto-advancing background slideshows (5 s) appear to have no pause control (WCAG 2.2.2). Contrast was not measured page by page, so a full audit is needed in the build phase.

**Security & privacy observations (for confirmation, not conclusions)**
- **Unidentified third-party script** `s.ksrndkehqnwntyxlhgto.com/174315.js`. This obfuscated-domain pattern is typical of visitor-identification or ad-tech tools. **The client/agency must identify it**, confirm it was intentionally installed, and disclose it in the privacy policy if it stays.
- BugHerd API key is exposed on the public site (normal for BugHerd, but the widget should be removed from production).
- REST namespaces `mcp`, `elementor-mcp-composer`, and `wp-abilities` are present. Confirm their endpoints require authentication.
- No privacy policy link or cookie/consent notice was observed in the footer.

## 6. What this means for the redesign

1. **There is no existing codebase to refactor.** The new platform will be a new repository. The WordPress site stays untouched and live until cutover, which is the core of the rollback plan (see doc 11).
2. **Content migration is small** (9 public pages, 3 models, 6 bios), so a clean rebuild is low-risk to SEO, provided the redirects in doc 03 are honoured.
3. **Trust gap:** the site has renders but **no completed-project photography, case studies, testimonials, named certifications, or client logos**. Those are the main reasons B2B buyers bounce. Closing the gap needs real assets, not design (see doc 12).
4. **The proposed stack is validated as a new build, not a migration.** Nothing in production is Next.js/Supabase today. Recommendations are in doc 08.
