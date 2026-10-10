import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { LeadDrawer } from "@/components/lead-drawer";
import { MadeInUsaTag } from "@/components/made-in-usa";
import { MobileCta } from "@/components/mobile-cta";
import { MotionRoot } from "@/components/motion-root";
import { JsonLd, organizationJsonLd } from "@/components/sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

// Archivo: one variable file (weight + width axes). Semi-expanded heavy weights for display,
// normal width for reading text, so the whole site shares one clean industrial voice.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Modular Building Manufacturer for Developers | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description:
    "MAR Technology is a U.S. modular manufacturer serving developers nationwide. Homes, townhomes, classrooms and flex space engineered and built in our Salt Lake City facility.",
  applicationName: site.name,
  // Indexing is opt-in (set NEXT_PUBLIC_ALLOW_INDEXING=true only on the production domain at cutover).
  robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" ? undefined : { index: false, follow: false },
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Set before first paint so reveal elements don't flash; skipped entirely for reduced motion.
const motionBootstrap = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ready')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] bg-carbon px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileCta />
        <LeadDrawer tag={<MadeInUsaTag detail />} />
        <MotionRoot />
        <JsonLd data={organizationJsonLd()} />
        <Analytics />
      </body>
    </html>
  );
}
