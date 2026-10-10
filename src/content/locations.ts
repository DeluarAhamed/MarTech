// Service geography (client direction 2026-10-10): MAR Technology serves all 50 states. For freight
// efficiency, the Salt Lake City factory serves the Western states; elsewhere projects are assessed
// individually and larger developments can be served through FLEX™ localized manufacturing.
// Distances are calculated straight-line (great-circle) miles from the factory and labelled as such.

export type WesternState = {
  code: string;
  slug: string;
  name: string;
  /** Anchor metro used for the distance figure and map route. */
  anchor: { city: string; lat: number; lon: number };
  metros: string[];
  /** One honest, state-specific framing sentence (no claims about local law or market data). */
  intro: string;
};

export const FACTORY = { city: "Salt Lake City", state: "Utah", lat: 40.76, lon: -111.89 };

export const westernStates: WesternState[] = [
  {
    code: "UT",
    slug: "utah",
    name: "Utah",
    anchor: { city: "Provo", lat: 40.23, lon: -111.66 },
    metros: ["Salt Lake City", "Provo and Orem", "Ogden", "St. George", "Logan"],
    intro: "Utah is home to our primary manufacturing hub, so projects across the Wasatch Front and beyond sit closest to the factory floor.",
  },
  {
    code: "ID",
    slug: "idaho",
    name: "Idaho",
    anchor: { city: "Boise", lat: 43.62, lon: -116.2 },
    metros: ["Boise", "Nampa and Meridian", "Idaho Falls", "Coeur d'Alene", "Twin Falls"],
    intro: "From the Treasure Valley to eastern Idaho, developers can plan modular phases around a factory within regional freight distance.",
  },
  {
    code: "NV",
    slug: "nevada",
    name: "Nevada",
    anchor: { city: "Las Vegas", lat: 36.17, lon: -115.14 },
    metros: ["Las Vegas", "Henderson", "Reno and Sparks", "Elko", "Carson City"],
    intro: "Nevada projects, from the Las Vegas valley to northern Nevada, are served from our Salt Lake City factory.",
  },
  {
    code: "AZ",
    slug: "arizona",
    name: "Arizona",
    anchor: { city: "Phoenix", lat: 33.45, lon: -112.07 },
    metros: ["Phoenix", "Mesa and Chandler", "Tucson", "Flagstaff", "Prescott"],
    intro: "Arizona developers building in the Valley, Tucson or the high country can use modular to run production alongside sitework.",
  },
  {
    code: "CO",
    slug: "colorado",
    name: "Colorado",
    anchor: { city: "Denver", lat: 39.74, lon: -104.99 },
    metros: ["Denver", "Colorado Springs", "Fort Collins", "Grand Junction", "Pueblo"],
    intro: "Front Range and Western Slope projects alike are within reach of our Salt Lake City manufacturing hub.",
  },
  {
    code: "WY",
    slug: "wyoming",
    name: "Wyoming",
    anchor: { city: "Cheyenne", lat: 41.14, lon: -104.82 },
    metros: ["Cheyenne", "Casper", "Rock Springs", "Laramie", "Jackson"],
    intro: "For Wyoming's workforce housing, classrooms and residential communities, modular brings controlled factory production to remote and seasonal sites.",
  },
  {
    code: "MT",
    slug: "montana",
    name: "Montana",
    anchor: { city: "Billings", lat: 45.78, lon: -108.5 },
    metros: ["Billings", "Missoula", "Bozeman", "Great Falls", "Helena"],
    intro: "Montana projects benefit from building indoors in a climate-controlled facility while site preparation moves ahead.",
  },
  {
    code: "NM",
    slug: "new-mexico",
    name: "New Mexico",
    anchor: { city: "Albuquerque", lat: 35.08, lon: -106.65 },
    metros: ["Albuquerque", "Santa Fe", "Las Cruces", "Rio Rancho", "Farmington"],
    intro: "From Albuquerque to Las Cruces, New Mexico developers can plan modular housing, classrooms and flex space with our Utah factory.",
  },
  {
    code: "CA",
    slug: "california",
    name: "California",
    anchor: { city: "Los Angeles", lat: 34.05, lon: -118.24 },
    metros: ["Los Angeles", "San Diego", "Sacramento", "Fresno", "San Francisco Bay Area"],
    intro: "California developers can pair modular production with sitework to move from entitlement to occupancy with fewer on-site variables.",
  },
  {
    code: "OR",
    slug: "oregon",
    name: "Oregon",
    anchor: { city: "Portland", lat: 45.52, lon: -122.68 },
    metros: ["Portland", "Salem", "Eugene", "Bend", "Medford"],
    intro: "Oregon projects, from the Willamette Valley to Central Oregon, are served from our Salt Lake City factory.",
  },
  {
    code: "WA",
    slug: "washington",
    name: "Washington",
    anchor: { city: "Seattle", lat: 47.61, lon: -122.33 },
    metros: ["Seattle", "Tacoma", "Spokane", "Vancouver", "Tri-Cities"],
    intro: "Washington developers on both sides of the Cascades can plan modular phases around factory production in Utah.",
  },
];

export function distanceMiles(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

export function getWesternState(slug: string) {
  return westernStates.find((s) => s.slug === slug);
}

export const westernCodes = new Set(westernStates.map((s) => s.code));
