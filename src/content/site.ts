// Single source for brand facts. Brand rule (client decision 2026-10-09): always "MAR Technology" —
// never "Mar Technology" or "MarTech".
export const site = {
  name: "MAR Technology",
  legalName: "MAR Technology Building Systems, Inc.",
  shortTagline: "U.S. modular manufacturer for developers",
  /** Approved coverage positioning (client decision 2026-10-09). Never promise delivery to a specific state. */
  coverage: {
    short: "Serving developers nationwide from our Salt Lake City manufacturing hub.",
    long: "MAR Technology is a U.S.-based modular manufacturer serving developers nationwide, subject to project feasibility and delivery availability. Our primary manufacturing hub is in Salt Lake City, Utah, with a focus on the Western United States and flexible manufacturing options for qualifying larger projects.",
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

// Projects and Insights stay out of navigation until verified content exists (docs/redesign/03 §4).
export const primaryNav = [
  { href: "/solutions/", label: "Solutions" },
  { href: "/models/", label: "Models" },
  { href: "/process/", label: "Process" },
  { href: "/about/", label: "About" },
] as const;
