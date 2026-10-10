# MAR Technology — Website & Growth Platform Blueprint

**Status:** 🟢 BUILD STARTED (2026-10-09). The public-site MVP is built with the plan's recommended defaults. See [13-build-status.md](13-build-status.md) for what's done, the defaults chosen, and what's still open.
**Prepared:** 2026-10-09 · **Current live site:** WordPress/Elementor on WP Engine (untouched) · **This repo:** planning docs only

## What we're building

1. A **premium editorial website** for a modular manufacturer: oversized type, architectural imagery, restrained motion, and model discovery. It must be honest about what is a render, what is a claim, and what is proven.
2. A **private growth platform** at `/admin`: CRM (leads, contacts, pipeline, tasks), CMS (models, projects, pages, insights, SEO), and marketing analytics that connect **content → leads → pipeline → revenue**.

## Documents

| # | Document | Answers |
|---|---|---|
| 01 | [Current site audit](01-current-site-audit.md) | What exists today, what to keep, what's inconsistent |
| 02 | [Reference design analysis](02-reference-design-analysis.md) | What to learn from Désourdy, HUTS, Photoncycle, Elevate, Groth, plus 3 creative directions |
| 03 | [Information architecture](03-information-architecture.md) | Sitemap, templates, journeys, **redirect map** |
| 04 | [Homepage wireframe](04-homepage-wireframe.md) | Section-by-section layout and purpose |
| 05 | [Design system](05-design-system.md) | Colour (with contrast fixes), type, grid, components |
| 06 | [Animation & interaction](06-animation-interaction.md) | Motion budget, GSAP scope, reduced motion |
| 07 | [Conversion & lead qualification](07-conversion-lead-qualification.md) | Multi-step form, scoring, routing, spam |
| 08 | [Stack, CMS & database](08-cms-database-architecture.md) | Stack validation, schema, provenance, RLS |
| 09 | [Dashboard modules](09-dashboard-modules.md) | 13 modules, roles, phases, security rules |
| 10 | [Analytics & SEO measurement](10-analytics-seo-measurement.md) | Baseline, KPIs, attribution, events, SEO |
| 11 | [Implementation phases](11-implementation-phases.md) | P0–P8, dependencies, **cutover & rollback** |
| 12 | [Risks, assets & questions](12-risks-assets-questions.md) | What could go wrong, what's missing, what to decide |

## The five ideas that make this a "$10k+" site (not just a nicer theme)

1. **One unmistakable story:** *built in parallel.* Factory production runs alongside site work. Explained with one signature scroll diagram, it is what MAR actually sells.
2. **FLEX™ as the differentiator.** "We bring the factory to the project" is ownable and currently buried.
3. **Engineering-grade precision as the aesthetic.** Mono spec labels, drawing-sheet section codes, plan → render reveals. Editorial luxury meets an industrial manufacturer.
4. **Truth as a design feature.** Renders are labelled, statistics carry sources, and projects appear only when real. In a category full of inflated claims, credibility converts.
5. **A website that reports its own ROI.** Every lead carries its source. Every deal traces back to the pages and campaigns that created it.

## Approval gate (sign before P1 starts)

- [ ] Creative direction (doc 02 §7, Q-01)
- [ ] Information architecture + redirect map (doc 03, Q-09)
- [ ] Homepage wireframe (doc 04)
- [ ] Stack + CMS approach (doc 08, Q-15)
- [ ] Implementation phases & rollback plan (doc 11)
- [ ] Answers to the P0 questions in doc 12 (at minimum Q-01–Q-06, Q-08, Q-17, Q-22)

Approved by: ____________________ Date: ____________
