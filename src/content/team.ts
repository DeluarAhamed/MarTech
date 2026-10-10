// Leadership, condensed from the published About page. Headshots are 160×200 on the legacy site;
// consistent, higher-resolution portraits are on the missing-asset list (docs/redesign/12 §2).
const WP = "https://www.martechbuildingsystems.com/wp-content/uploads";

export type Leader = { name: string; role: string; photo: string; bio: string };

export const leadership: Leader[] = [
  {
    name: "Salvatore (Sal) Patalano",
    role: "Founder & CEO",
    photo: `${WP}/2026/07/Sal.jpg`,
    bio: "Serial entrepreneur with more than three decades in technology, including senior roles at IBM, CA Technologies and Lenovo. Leads day-to-day management, innovation and scale.",
  },
  {
    name: "Ziyaad Aboobaker",
    role: "Founder & Chairman",
    photo: `${WP}/2026/07/Ziyad.jpg`,
    bio: "Background in global strategy, private equity and venture-backed operations, including McKinsey & Company. Harvard Business School MBA. Leads corporate strategy and governance.",
  },
  {
    name: "Derek Clegg",
    role: "VP Sales",
    photo: `${WP}/2026/09/Derek-Clegg-Headshot-17Sep26.png`,
    bio: "Over a decade across real estate, construction and modular, with prior roles at Cushman & Wakefield, Onni Group and Wedgewood Homes. Leads growth across residential and commercial segments.",
  },
  {
    name: "Sean Rhodes",
    role: "VP Production & Operations",
    photo: `${WP}/2026/07/Sean.jpg`,
    bio: "A decade leading modular set crews and factory floors at manufacturers including Guerdon, Silver Creek Modular and Plant Prefab. Brings constructability and value-engineering expertise.",
  },
  {
    name: "Carlo Filio",
    role: "Chief Engineer",
    photo: `${WP}/2026/07/Carlo.jpg`,
    bio: "Civil engineer who has led multi-residential, hospitality and adaptive-reuse projects, including work in seismic zones and dense urban sites, with a focus on QA/QC and risk management.",
  },
  {
    name: "Alejandra Piña",
    role: "Senior Procurement Manager",
    photo: `${WP}/2026/07/Ale.jpg`,
    bio: "Builds supplier partnerships and sourcing strategies that deliver quality, value and reliable purchasing for every project.",
  },
];
