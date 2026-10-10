import type { NextConfig } from "next";

// Legacy WordPress URLs → new structure (docs/redesign/03-information-architecture.md §3).
// `permanent: true` issues 308, which search engines treat like 301.
const legacyRedirects = [
  ["/what-we-do/", "/solutions/"],
  ["/how-we-do-it/", "/process/"],
  ["/solutions/developers/", "/modular-for-developers/"],
  ["/single-module/", "/models/bohemian/"],
  ["/single-family/", "/models/solterra/"],
  ["/townhome/", "/models/castello/"],
  ["/sitemap_index.xml", "/sitemap.xml"],
  ["/page-sitemap.xml", "/sitemap.xml"],
] as const;

const nextConfig: NextConfig = {
  // Existing URLs use trailing slashes; keep the same shape to preserve equity.
  trailingSlash: true,
  // Tailwind output is small and atomic: inlining removes the render-blocking stylesheet request.
  experimental: { inlineCss: true },
  images: {
    // Current media lives in the WordPress uploads library. Move to owned storage before WP is decommissioned.
    remotePatterns: [new URL("https://www.martechbuildingsystems.com/wp-content/uploads/**")],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ...(process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
        ],
      },
    ];
  },
};

export default nextConfig;
