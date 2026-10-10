# 06 — Animation & Interaction Strategy

**Principle: restraint.** Motion explains (process, parallel build, plan → render) or orients (page transitions, reveals). It never decorates for its own sake. Désourdy proves that premium means calm.

## 1. Motion budget

| Tier | Where | Allowed |
|---|---|---|
| **Signature** (max 2 per page) | Home A-06 parallel timeline; FLEX™ 4-step; model plan → render | GSAP + ScrollTrigger, pinned/scrubbed |
| **Structural** | Every page | Section text reveals (opacity + 12–24 px translate), image clip/scale-in (1.06 → 1.0), header state |
| **Micro** | Buttons, links, cards, form | CSS transitions only (150–250 ms) |
| **Forbidden** | — | Scroll-jacking that changes scroll speed on mobile, parallax on body text, cursor followers, auto-advancing carousels without a pause control, motion on dashboard data |

## 2. Tokens

| Token | Value |
|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--dur-micro` | 180 ms |
| `--dur-reveal` | 700–900 ms |
| `--stagger` | 60–80 ms |

## 3. Library decisions

- **GSAP 3 + ScrollTrigger** for the signature and structural tiers. GSAP and its plugins (SplitText included) are free for commercial use as of v3.13. Pin the exact version in the build phase.
- **Smooth scrolling (Lenis):** **optional, off by default.** It adds polish on desktop but can harm accessibility and native feel. Test it on staging and decide with the client (Q-10). It is never enabled with reduced motion or on touch devices.
- **No** Framer Motion and GSAP together. Use one animation runtime.
- Page transitions: the native **View Transitions API** where supported (progressive enhancement), with an instant swap elsewhere.

## 4. Reduced motion & accessibility

- Use `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)`. When reduced: no pinning, no scrub, no translate. Content appears immediately (or with an opacity fade ≤ 200 ms).
- Every pinned section has a **static equivalent** that is fully readable without JavaScript (SSR'd markup; animation is enhancement only).
- Video: muted, `playsinline`, a visible pause button, no autoplay when reduced motion is set or `Save-Data` is on.
- Never animate focus outlines away. Focus order is unaffected by visual transforms.
- Content inside pinned sections stays in the DOM and readable by screen readers. Do not use `aria-hidden` on content.

## 5. Performance rules

- Animate only `transform` and `opacity` (plus `clip-path` for image reveals).
- Lazy-load GSAP via dynamic import inside client components, and only on routes that need it.
- Kill ScrollTriggers on route change (`useGSAP` cleanup) to avoid leaks in the App Router.
- Budget: INP < 200 ms, CLS < 0.1, no long tasks > 50 ms caused by animation on a mid-range Android device.

## 6. Signature interactions (specs)

### 6.1 Parallel timeline (Home A-06, Process page)
- Desktop: pin for ~150 vh. Scroll scrubs three tracks (Site / Factory / Traditional). Labels fade in at milestones, and the tracks converge on "Set day".
- Mobile: no pin. Three static bars with a short caption per milestone.
- Data: durations come from approved claims, otherwise relative-only bars.

### 6.2 Plan → render (model cards and model detail)
- Default: the render shows. On hover/focus (desktop) or tap of "Show plan" (touch), an SVG floor plan draws in (stroke-dashoffset, 700 ms) and the render dims to 15%.
- Reduced motion: a simple crossfade toggle.

### 6.3 FLEX™ map
- An abstract US outline with the Salt Lake City hub. On entering the viewport, steps 01–04 activate sequentially, and a secondary "deployed" node appears near an illustrative site location, explicitly labelled "illustrative".

## 7. Interaction patterns

- Header hides on scroll-down and shows on scroll-up (CSS + a small observer, no GSAP).
- Model filters update the URL query string (shareable, crawlable base page).
- The form gives instant inline validation on blur, never on each keystroke. The error summary appears at the top on submit.
- Dashboard: no decorative motion. Only skeleton loaders and 150 ms state transitions.
