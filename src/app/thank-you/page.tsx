import type { Metadata } from "next";
import { ButtonLink, SectionLabel } from "@/components/ui";
import { approvedClaim } from "@/content/claims";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  const response = approvedClaim("responseTime");

  return (
    <section className="module-grid min-h-[80svh] pt-32 md:pt-44">
      <div className="page-x container-max pb-28">
        <SectionLabel code="K-01" className="text-stone-ink">Received</SectionLabel>
        <h1 className="mt-6 max-w-[16ch] text-display-l">
          Thanks — your request is with our team.
        </h1>
        <p className="mt-8 max-w-xl text-body-l text-carbon/80">
          {response ? `${response.statement}. ` : "A project consultant will be in touch. "}
          If it&apos;s urgent, call us on{" "}
          <a href={`tel:${site.contacts.sales.tel}`} className="font-medium underline underline-offset-4">{site.contacts.sales.phone}</a>.
        </p>

        <div className="mt-16 max-w-3xl border-t border-hairline pt-8">
            <h2 className="label text-stone-ink">Helpful to have ready for your consultation</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {["Site location and any survey or plat", "Plans or target unit mix", "Target schedule and financing status"].map((t, i) => (
                <li key={t} className="border-t border-carbon/80 pt-4">
                  <span className="label text-bronze-ink">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2">{t}</p>
                </li>
              ))}
            </ul>
          </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <ButtonLink href="/models/" variant="secondary">Explore models</ButtonLink>
          <ButtonLink href="/process/" variant="secondary">How the process works</ButtonLink>
        </div>
      </div>
    </section>
  );
}
