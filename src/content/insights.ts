import { morePosts } from "./insights-library";
import { media, type Media } from "./media";

// Insights (blog). Structured content blocks keep articles fast, typed and easy to move into the
// dashboard CMS later (docs/redesign/08). Editorial rules: no unverified statistics, no em dashes,
// every claim either general industry knowledge or MAR Technology's own published information.

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string; id: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "callout"; title: string; text: string; href?: string; cta?: string };

export type Topic = "Developers" | "Process" | "Housing" | "Education" | "Service area" | "Engineering";

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** Primary keyword the article is written for; secondary terms are woven into headings. */
  keyword: string;
  topic: Topic;
  date: string; // ISO
  minutes: number;
  image: Media;
  body: Block[];
};

const basePosts: Post[] = [
  {
    slug: "modular-construction-for-developers-guide",
    title: "Modular Construction for Developers: A Practical Guide",
    description:
      "How modular construction works for real estate developers: where it fits, how the process runs, what to prepare and how to evaluate a modular manufacturer.",
    keyword: "modular construction for developers",
    topic: "Developers",
    date: "2026-10-08",
    minutes: 8,
    image: media.townhomeCommunity,
    body: [
      { t: "p", text: "Modular construction moves most of a building's assembly from the job site into a factory. Modules are framed, enclosed, plumbed, wired and finished indoors, then transported to the site and set on foundations that were prepared at the same time. For a developer, that changes how a project is scheduled, financed and managed, not just how it is built." },
      { t: "p", text: "This guide explains where modular construction fits, how the process runs from design to handover, and what to prepare before you talk to a modular manufacturer." },
      { t: "h2", text: "Where modular construction fits best", id: "where-it-fits" },
      { t: "p", text: "Modular works best when a project repeats. Communities of single-family homes, townhome rows, build-to-rent portfolios, classroom buildings and workforce housing all reuse the same module types many times. Repetition lets a factory refine details, buy materials efficiently and hold a steady production rhythm." },
      { t: "ul", items: ["For-sale and build-to-rent single-family communities", "Townhomes, duplexes and residential rows", "Multifamily configurations built from stacked or joined modules", "Classrooms, offices and workforce housing, temporary or permanent", "ADUs and single-module buildings for infill sites"] },
      { t: "p", text: "Highly irregular one-off designs can still be built modularly, but the benefits are strongest when the design respects module dimensions and transport limits from the start." },
      { t: "h2", text: "How the modular process runs", id: "process" },
      { t: "p", text: "Most modular projects follow four stages. The important difference from site-built construction is that stages two and three overlap with work on the site." },
      { t: "ol", items: ["Design and engineering: plans are created or adapted to module dimensions, engineered and submitted for approval before production.", "Factory build: modules are produced in a climate-controlled facility with inspections at defined checkpoints.", "Delivery and set: modules are transported and crane-set on foundations, then joined and connected.", "Finish and handover: exterior detailing, interior finishes, utilities and final inspections lead to occupancy."] },
      { t: "callout", title: "See the parallel schedule", text: "Our process page shows how factory production and sitework run side by side.", href: "/process/#parallel", cta: "View our process" },
      { t: "h2", text: "Planning for modular from day one", id: "planning" },
      { t: "p", text: "The earlier a project is planned around modules, the more value it captures. Retrofitting a finished site-built design into modules is possible, but it usually costs time in redesign." },
      { t: "h3", text: "Design around the module" },
      { t: "p", text: "Module width and length are set by transport and handling. Floor plans, stair locations and wet walls should be arranged so module seams fall in sensible places. A manufacturer with an in-house engineering team can guide this early." },
      { t: "h3", text: "Coordinate the site schedule" },
      { t: "p", text: "Foundations, utilities and access must be ready when modules arrive. Crane access, staging space and delivery routes should be part of the site plan, not an afterthought." },
      { t: "h3", text: "Align approvals and inspections" },
      { t: "p", text: "Modular buildings are reviewed and inspected against state and local requirements. Many inspections happen in the factory, with the remaining on-site inspections focused on foundations, connections and final work. Confirm early which agencies review your project and when." },
      { t: "h2", text: "What to prepare before you call a manufacturer", id: "prepare" },
      { t: "ul", items: ["Site location and any survey or plat", "Target unit count and unit mix", "Your plans, if you have them, stamped or schematic", "Project stage: land, entitlements, permits and financing status", "Target delivery window"] },
      { t: "p", text: "With that information a manufacturer can confirm feasibility, recommend a standard model or a custom approach, and outline a schedule and proposal." },
      { t: "h2", text: "How to evaluate a modular manufacturer", id: "evaluate" },
      { t: "ul", items: ["Who designs and engineers the modules, and can they work from your plans?", "Where is the factory, and how far will modules travel to your site?", "How is quality controlled, and which inspections happen in the factory?", "How will you see progress during production?", "Can production scale for later phases of your project?"] },
      { t: "p", text: "Distance matters more than many teams expect. Freight is a real cost line, and longer routes add handling and scheduling risk. That is why MAR Technology serves the Western states from our Salt Lake City factory and assesses projects elsewhere individually, with FLEX™ localized manufacturing as an option for qualifying larger developments." },
      { t: "callout", title: "Talk through your project", text: "Share your site, unit count and timeline and our project consultants will follow up.", href: "/contact/", cta: "Start a project" },
    ],
  },
  {
    slug: "modular-vs-site-built-construction",
    title: "Modular vs. Site-Built Construction: What Changes for a Development Team",
    description:
      "A clear comparison of modular and site-built construction for developers: schedule, quality control, weather, approvals, logistics and when each approach makes sense.",
    keyword: "modular vs site built construction",
    topic: "Process",
    date: "2026-10-06",
    minutes: 7,
    image: media.solterraPerspective,
    body: [
      { t: "p", text: "Modular and site-built construction can produce buildings that look the same from the street. The difference is where the work happens and in what order. For a development team, that difference shows up in scheduling, risk and coordination." },
      { t: "h2", text: "Sequencing: parallel instead of sequential", id: "sequencing" },
      { t: "p", text: "On a site-built project, most trades follow one another on the same site. Framing waits for foundations, roofing waits for framing, and finishes wait for the building to be dried in. With modular construction, the building is produced in the factory while the site is prepared, so two critical paths run at the same time." },
      { t: "h2", text: "Weather and working conditions", id: "weather" },
      { t: "p", text: "Factory production happens indoors, so rain, snow and heat do not stop module assembly or expose materials during construction. Site work such as excavation and foundations is still weather dependent, which is why delivery is scheduled around site readiness." },
      { t: "h2", text: "Quality control", id: "quality" },
      { t: "p", text: "In a factory, the same crews build the same assemblies at fixed stations with defined checkpoints. That repetition supports consistent quality. On a site, quality depends more on crew availability and conditions on the day." },
      { t: "h2", text: "Approvals and inspections", id: "approvals" },
      { t: "p", text: "Both approaches must meet applicable codes. Modular projects typically involve plan review and inspections at the factory, plus local inspections on site for foundations, connections and final completion. Early coordination with the reviewing agencies keeps both tracks moving." },
      { t: "h2", text: "Logistics: the modular-specific work", id: "logistics" },
      { t: "p", text: "Modular adds tasks that site-built projects do not have: transport routing, crane selection, staging and set day planning. Factory location matters here, because longer routes add freight cost and scheduling exposure." },
      { t: "h2", text: "Side by side", id: "comparison" },
      { t: "ul", items: ["Where it is built: modular in a climate-controlled factory; site-built on site.", "Sequencing: modular runs factory and site work in parallel; site-built is mostly sequential.", "Weather exposure: modular production is indoors; site-built framing and finishes are exposed.", "Quality control: modular uses fixed stations and checkpoints; site-built varies with crews and conditions.", "Progress visibility: modular can share production milestones online; site-built relies on site visits and reports."] },
      { t: "h2", text: "When site-built may still make sense", id: "when-site-built" },
      { t: "p", text: "Very small one-off projects, sites that cannot receive large deliveries, or designs that cannot be divided into transportable modules may favor conventional construction. A modular manufacturer should tell you honestly when modular is not the right fit." },
      { t: "callout", title: "Is modular right for your site?", text: "Bring your plans, location, unit count and timeline and we will help you decide.", href: "/contact/", cta: "Discuss your project" },
    ],
  },
  {
    slug: "build-to-rent-community-modular-homes",
    title: "Planning a Build-to-Rent Community with Modular Homes",
    description:
      "How developers plan build-to-rent communities with modular homes: choosing a standard model, unit mix, phasing, site coordination and finishes that hold up for renters.",
    keyword: "build to rent modular homes",
    topic: "Housing",
    date: "2026-10-03",
    minutes: 6,
    image: media.castelloThreeQuarter,
    body: [
      { t: "p", text: "Build-to-rent communities reward consistency. Owners want homes that look good on day one, perform reliably for years and can be delivered in predictable phases. Modular construction lines up well with those goals because it is built on repetition." },
      { t: "h2", text: "Start from a standard model", id: "standard-model" },
      { t: "p", text: "Beginning with an engineered standard shortens design and lets you focus on site planning and finishes. MAR Technology's Solterra is a three-module ranch home designed as a starter home for sale or build-to-rent, and Castello is a split-level townhome for duplex or residential-row layouts." },
      { t: "callout", title: "Compare Solterra and Castello", text: "See footprints, layouts and configurations side by side.", href: "/models/#compare", cta: "Compare models" },
      { t: "h2", text: "Choose a unit mix that suits the site", id: "unit-mix" },
      { t: "p", text: "Detached homes create a classic neighborhood feel. Townhome rows deliver more homes on a reduced footprint. Many communities mix both, using townhomes along collectors and detached homes on interior streets." },
      { t: "h2", text: "Phase production with the site", id: "phasing" },
      { t: "ul", items: ["Plan phases so infrastructure and foundations stay ahead of module deliveries.", "Keep crane access and staging areas clear for each phase.", "Lock finish selections early so production is not held up by decisions.", "Use online progress tracking to keep lenders and partners informed."] },
      { t: "h2", text: "Finishes for renters", id: "finishes" },
      { t: "p", text: "Standard packages include finishes, appliances, fixtures, flooring, lighting, windows, doors and exterior siding. Customized finishes are available based on order size, so a portfolio owner can standardize on durable selections across every home." },
      { t: "h2", text: "Make elevations read as site-built", id: "elevations" },
      { t: "p", text: "Street-facing elevations, rooflines and material palettes can be designed to meet HOA and municipal expectations for traditional construction. Good modular design is not about boxes; it is about details that make a street feel complete." },
      { t: "callout", title: "Plan your community", text: "Share your site and target unit count to start a build-to-rent conversation.", href: "/modular-for-developers/", cta: "Modular for developers" },
    ],
  },
  {
    slug: "modular-classrooms-temporary-vs-permanent",
    title: "Modular Classrooms: Temporary and Permanent Options for Schools",
    description:
      "A guide to modular classrooms for school districts and campuses: temporary versus permanent use, configuration, planning around the school calendar and what to prepare.",
    keyword: "modular classrooms",
    topic: "Education",
    date: "2026-09-29",
    minutes: 5,
    image: media.classroom,
    body: [
      { t: "p", text: "Schools often need space faster than a traditional building program can deliver it. Modular classrooms are built off-site while the campus keeps operating, then delivered and set with limited disruption." },
      { t: "h2", text: "Temporary or permanent?", id: "temporary-or-permanent" },
      { t: "p", text: "Temporary classrooms cover enrollment peaks or provide space during renovation. Permanent modular classrooms become part of the campus long term. The right choice depends on how long the space is needed, site conditions and how the building should look next to existing facilities." },
      { t: "h2", text: "Configuring the space", id: "configuring" },
      { t: "p", text: "A single module can serve as one classroom or office. Modules can also be combined into larger buildings with multiple rooms. Interiors are designed to the school's program, with plans submitted for approval before production begins." },
      { t: "h2", text: "Planning around the school calendar", id: "calendar" },
      { t: "ul", items: ["Start design early so production can run during the school year.", "Schedule site work and delivery for breaks wherever possible.", "Plan safe routes for cranes and deliveries away from students.", "Confirm utility connections and accessibility requirements early."] },
      { t: "h2", text: "What to prepare", id: "prepare" },
      { t: "ul", items: ["Number of classrooms or rooms needed", "Temporary or permanent use", "Campus location and site constraints", "Target occupancy date"] },
      { t: "callout", title: "Modular for education", text: "See how MAR Technology supports schools and campuses.", href: "/solutions/education/", cta: "Education solutions" },
    ],
  },
  {
    slug: "modular-factory-location-western-states-freight",
    title: "Why Factory Location Matters for Modular Projects in the Western U.S.",
    description:
      "Freight is a real cost in modular construction. Learn why factory location matters, how MAR Technology serves the Western states from Utah, and what FLEX™ means for larger projects.",
    keyword: "modular home manufacturer western states",
    topic: "Service area",
    date: "2026-09-25",
    minutes: 5,
    image: media.moduleCommunity,
    body: [
      { t: "p", text: "Modules are large, finished building sections. Moving them from factory to site is a meaningful part of a modular project, both in cost and in scheduling. The distance between factory and site is one of the first things to consider when choosing a modular manufacturer." },
      { t: "h2", text: "Why distance adds cost and risk", id: "distance" },
      { t: "ul", items: ["Longer routes increase freight cost per module.", "More miles mean more handling and more exposure during transit.", "Permits and escorts for oversized loads vary by route.", "Delivery timing is easier to coordinate over shorter distances."] },
      { t: "h2", text: "How MAR Technology serves the West", id: "west" },
      { t: "p", text: "MAR Technology serves developers in all 50 states. For freight efficiency, our Salt Lake City, Utah factory serves the Western states: Utah, Idaho, Nevada, Arizona, Colorado, Wyoming, Montana, New Mexico, California, Oregon and Washington." },
      { t: "callout", title: "See the service area map", text: "Explore the interactive map and state pages.", href: "/locations/", cta: "View locations" },
      { t: "h2", text: "Projects outside the West", id: "nationwide" },
      { t: "p", text: "Projects in other states are welcome and assessed individually, based on feasibility and delivery availability. For qualifying larger developments, FLEX™, our Flexible Localized Expansion and Execution model, can establish manufacturing capacity closer to the project." },
      { t: "h2", text: "Questions to ask about logistics", id: "questions" },
      { t: "ul", items: ["Where will my modules be built?", "What route will deliveries take, and are there restrictions?", "How is delivery timed to site readiness?", "Who coordinates the crane and set day?"] },
      { t: "callout", title: "Large project outside the West?", text: "See whether your development could qualify for FLEX™.", href: "/solutions/flex-manufacturing/", cta: "Explore FLEX™" },
    ],
  },
  {
    slug: "modular-adu-single-module",
    title: "Modular ADUs: How a Single-Module Accessory Dwelling Comes Together",
    description:
      "How a modular ADU is designed, built and installed: single-module sizes, layouts, site preparation and how developers use ADUs and single modules at scale.",
    keyword: "modular ADU",
    topic: "Housing",
    date: "2026-09-22",
    minutes: 5,
    image: media.bohemianExterior,
    body: [
      { t: "p", text: "An accessory dwelling unit is a compact, self-contained home on the same lot as a primary residence or within a larger site plan. Built as a single module, an ADU arrives largely complete and is set on its foundation once the site is ready." },
      { t: "h2", text: "Sizes and layouts", id: "sizes" },
      { t: "p", text: "MAR Technology's Bohemian single module comes in two sizes: 480 sqft at 12 by 40 feet and 576 sqft at 12 by 48 feet. The ADU layout offers one bedroom and one bath, with a two-bedroom layout in the larger module." },
      { t: "callout", title: "Explore the Bohemian", text: "See renderings, specifications and the floor plan.", href: "/models/bohemian/", cta: "View model" },
      { t: "h2", text: "Beyond the backyard", id: "beyond" },
      { t: "p", text: "The same single module can be configured as employee housing, a classroom or an office, temporary or permanent. Modules can also be combined into larger buildings or multiplexes, which lets developers use one product across several uses." },
      { t: "h2", text: "Preparing the site", id: "site" },
      { t: "ul", items: ["Confirm local rules for accessory dwellings and setbacks.", "Plan access for the delivery truck and crane.", "Prepare the foundation and utility connections before delivery.", "Schedule final inspections once connections are complete."] },
      { t: "h2", text: "Using ADUs at scale", id: "scale" },
      { t: "p", text: "Developers adding ADUs across a portfolio benefit from a standard product, repeated many times. Factory production keeps quality consistent from the first unit to the last." },
      { t: "callout", title: "Planning multiple units?", text: "Tell us your unit count and locations.", href: "/contact/?type=adu", cta: "Start a project" },
    ],
  },
];

export const posts: Post[] = [...basePosts, ...morePosts].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const topics: Topic[] = ["Developers", "Process", "Housing", "Education", "Service area", "Engineering"];

export const topicSlug = (t: Topic) => t.toLowerCase().replace(/\s+/g, "-");

export function topicFromSlug(slug: string) {
  return topics.find((t) => topicSlug(t) === slug);
}

export const topicIntro: Record<Topic, string> = {
  Developers: "Guides for developers planning modular communities: evaluating manufacturers, underwriting and documentation.",
  Process: "How modular projects run, from plan review and factory inspections to set day and handover.",
  Housing: "Single-family, build-to-rent, townhome and ADU planning with modular construction.",
  Education: "Modular classrooms, offices and campus space for schools and public agencies.",
  "Service area": "Building modular across the Western states, served from our Salt Lake City factory.",
  Engineering: "Structure, floor plans and building systems in modular construction.",
};
