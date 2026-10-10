// Single source for brand facts. Brand rule (client decision 2026-10-09): always "MAR Technology" —
// never "Mar Technology" or "MarTech".
export const site = {
  name: "MAR Technology",
  legalName: "MAR Technology Building Systems, Inc.",
  shortTagline: "U.S. modular manufacturer for developers",
  /** Approved coverage positioning (client decision 2026-10-09). Never promise delivery to a specific state. */
  coverage: {
    short: "Serving all 50 states. Western states are delivered from our Salt Lake City factory.",
    long: "MAR Technology is a U.S. modular manufacturer serving developers in all 50 states. For freight efficiency, our Salt Lake City, Utah factory serves the contiguous Western states. Projects elsewhere, including Alaska and Hawaii, are assessed individually, and qualifying larger developments can be served through FLEX™ localized manufacturing.",
    formNote: "We welcome enquiries from all 50 states. Manufacturing and delivery are confirmed per project, based on feasibility and availability.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.martechbuildingsystems.com",
  contacts: {
    sales: {
      label: "Project consultations",
      phone: "(385) 535-1031",
      tel: "+13855351031",
      email: "sales@martechbuildingsystems.com",
    },
    general: {
      label: "General enquiries",
      phone: "(801) 903-8395",
      tel: "+18019038395",
      email: "info@martechbuildingsystems.com",
    },
  },
  locations: {
    factory: {
      label: "Primary manufacturing hub",
      lines: ["4701 W 6200 S, Building 100", "Salt Lake City, UT 84118"],
      street: "4701 W 6200 S, Building 100",
      city: "Salt Lake City",
      region: "UT",
      postalCode: "84118",
    },
    hq: {
      label: "Headquarters",
      lines: ["2001 Widewaters Parkway, A405", "Knightdale, NC 27545"],
      street: "2001 Widewaters Parkway, A405",
      city: "Knightdale",
      region: "NC",
      postalCode: "27545",
    },
  },
} as const;

export type NavLink = { href: string; label: string; description?: string };
export type NavItem =
  | { kind: "link"; href: string; label: string }
  | { kind: "menu"; id: string; label: string; href: string; columns: { title: string; links: NavLink[] }[]; feature?: { href: string; title: string; text: string; image: string } };

const WP = "https://www.martechbuildingsystems.com/wp-content/uploads";

/** Primary navigation (mega menu on desktop, accordion on mobile). */
export const mainNav: NavItem[] = [
  { kind: "link", href: "/modular-for-developers/", label: "Developers" },
  {
    kind: "menu",
    id: "solutions",
    label: "Solutions",
    href: "/solutions/",
    columns: [
      {
        title: "Who we build for",
        links: [
          { href: "/modular-for-developers/", label: "Developers and builders", description: "Communities, townhomes, build-to-rent" },
          { href: "/solutions/education/", label: "Education and public sector", description: "Temporary and permanent classrooms" },
          { href: "/solutions/workforce-flex/", label: "Workforce and flex space", description: "Employee housing, offices, PMRVs" },
          { href: "/solutions/flex-manufacturing/", label: "FLEX™ manufacturing", description: "Production closer to large projects" },
        ],
      },
      {
        title: "How we work",
        links: [
          { href: "/process/", label: "Our process", description: "Design, factory build, delivery, handover" },
          { href: "/process/#parallel", label: "Parallel construction", description: "Factory and site, at the same time" },
          { href: "/factory-tour/", label: "Factory tour", description: "Visit the Salt Lake City hub" },
        ],
      },
    ],
    feature: { href: "/solutions/", title: "All solutions", text: "Housing, education, workforce and custom modular buildings.", image: `${WP}/2026/09/Single-Module-Units-in-Community-e1789484955740.png` },
  },
  {
    kind: "menu",
    id: "models",
    label: "Models",
    href: "/models/",
    columns: [
      {
        title: "Standard models",
        links: [
          { href: "/models/bohemian/", label: "Bohemian", description: "Single module, 480 to 576 sqft" },
          { href: "/models/solterra/", label: "Solterra", description: "Single-family, 1,440 to 1,474 sqft" },
          { href: "/models/castello/", label: "Castello", description: "Townhome and multifamily, 1,368 sqft" },
        ],
      },
      {
        title: "Plan your build",
        links: [
          { href: "/models/#compare", label: "Compare models", description: "Specs side by side" },
          { href: "/contact/?model=custom", label: "Build from your plans", description: "Stamped or schematic plan sets" },
        ],
      },
    ],
    feature: { href: "/models/", title: "Explore the catalog", text: "Three engineered standards, ready to configure.", image: `${WP}/2026/08/MT-Single-Familly-EXT-Perspective_V6-scaled.png` },
  },
  { kind: "link", href: "/locations/", label: "Locations" },
  { kind: "link", href: "/blog/", label: "Blog" },
  {
    kind: "menu",
    id: "company",
    label: "Company",
    href: "/about/",
    columns: [
      {
        title: "Company",
        links: [
          { href: "/about/", label: "About MAR Technology", description: "Leadership, FLEX™, locations" },
          { href: "/process/", label: "Process", description: "Four steps from concept to keys" },
          { href: "/locations/", label: "Service area", description: "All 50 states, Western states from Utah" },
        ],
      },
      {
        title: "Get in touch",
        links: [
          { href: "/contact/", label: "Contact us", description: "Sales and general enquiries" },
          { href: "/factory-tour/", label: "Book a factory tour", description: "Salt Lake City, Utah" },
          { href: "/blog/", label: "Blog", description: "Guides for developers" },
        ],
      },
    ],
  },
];

/** Flat list kept for simple consumers. */
export const primaryNav = [
  { href: "/modular-for-developers/", label: "Developers" },
  { href: "/models/", label: "Models" },
  { href: "/process/", label: "Process" },
  { href: "/locations/", label: "Locations" },
  { href: "/blog/", label: "Blog" },
  { href: "/about/", label: "About" },
] as const;
