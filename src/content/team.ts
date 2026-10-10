// Leadership, from the published About page (bios and LinkedIn URLs as listed on the legacy site).
// Headshots are 160×200 on the legacy site; consistent higher-resolution portraits are on the
// missing-asset list (docs/redesign/12 §2).
const WP = "https://www.martechbuildingsystems.com/wp-content/uploads";

export type Leader = {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  /** One-line summary for cards. */
  bio: string;
  /** Longer published bio, shown when expanded. */
  more: string;
  focus: string[];
};

export const leadership: Leader[] = [
  {
    name: "Salvatore (Sal) Patalano",
    role: "Founder & CEO",
    photo: `${WP}/2026/07/Sal.jpg`,
    linkedin: "https://www.linkedin.com/in/salvatorepatalano/",
    bio: "Serial entrepreneur with more than three decades in technology, now leading day-to-day management, innovation and scale.",
    more: "Sal held senior executive roles at companies ranging from early-stage ventures to Fortune 500 firms. He founded and exited two businesses and spent a dozen years growing large global teams at IBM, CA Technologies (acquired by Broadcom) and Lenovo before returning to his passion for start-ups. As a founder of MAR Technology he focuses on day-to-day management, innovation, scalability and building a world-class company.",
    focus: ["Management", "Innovation", "Scale"],
  },
  {
    name: "Ziyaad Aboobaker",
    role: "Founder & Chairman",
    photo: `${WP}/2026/07/Ziyad.jpg`,
    linkedin: "https://www.linkedin.com/in/ziyaadaboobaker/",
    bio: "Global strategy, private equity and venture-backed operations background. Leads corporate strategy, capital deployment and governance.",
    more: "Ziyaad holds an MBA from Harvard Business School and combines experience at McKinsey & Company, Tana Capital and the high-growth technology platform RapidSOS to lead corporate strategy, capital deployment and long-term governance. He is also an active angel investor in technology start-ups.",
    focus: ["Strategy", "Capital", "Governance"],
  },
  {
    name: "Derek Clegg",
    role: "VP Sales",
    photo: `${WP}/2026/09/Derek-Clegg-Headshot-17Sep26.png`,
    linkedin: "https://www.linkedin.com/in/derek-clegg-988b511aa/",
    bio: "Over a decade across real estate, construction and modular building. Leads growth across residential and commercial segments.",
    more: "Derek is responsible for growth across all client segments, with a strong focus on multifamily, K-12 and long-term care facilities. Before MAR Technology he held leadership roles at Cushman & Wakefield, Onni Group and Wedgewood Homes, and brings experience in commercial underwriting, acquisitions, property development and portfolio management.",
    focus: ["Multifamily", "K-12", "Commercial"],
  },
  {
    name: "Sean Rhodes",
    role: "VP Production & Operations",
    photo: `${WP}/2026/07/Sean.jpg`,
    linkedin: "https://www.linkedin.com/in/sean-rhodes-766b26212/",
    bio: "A decade leading modular set crews and factory floors. Brings constructability and value-engineering expertise.",
    more: "Sean has worked on the factory floor and led modular setting teams for some of the nation's largest modular manufacturers, including Guerdon, Silver Creek Modular and Plant Prefab. He provides technical expertise in modular design, logistics planning and project consulting across multifamily, medical, military, educational and single-family projects.",
    focus: ["Production", "Logistics", "Set"],
  },
  {
    name: "Carlo Filio",
    role: "Chief Engineer",
    photo: `${WP}/2026/07/Carlo.jpg`,
    linkedin: "https://www.linkedin.com/in/carlo-filio-85792556/",
    bio: "Civil engineer with multi-residential, hospitality and adaptive-reuse experience, focused on QA/QC and risk management.",
    more: "Carlo has led multi-million-dollar projects across multi-residential, luxury hotel, resort and wellness developments, including new builds, renovations and adaptive reuse. He has directed multidisciplinary teams in seismic zones and dense urban sites, with expertise in value engineering, procurement, modular construction, prefabrication and sustainable building practice.",
    focus: ["Engineering", "QA/QC", "Value engineering"],
  },
  {
    name: "Alejandra Piña",
    role: "Senior Procurement Manager",
    photo: `${WP}/2026/07/Ale.jpg`,
    linkedin: "https://www.linkedin.com/in/apinab/",
    bio: "Builds supplier partnerships and sourcing strategies for quality, value and reliable purchasing on every project.",
    more: "Alejandra focuses on trusted supplier partnerships, strategic sourcing, supplier negotiation, vendor development and procurement process optimization. Her bilingual, multicultural background includes more than a decade across marketing management and production project management, coordinating international teams across many brands.",
    focus: ["Sourcing", "Suppliers", "Procurement"],
  },
];
