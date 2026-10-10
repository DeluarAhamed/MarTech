"use client";

import { useEffect, useState } from "react";
import { applicationLabels, type ApplicationKey, type Model } from "@/content/models";
import { track } from "@/lib/analytics";
import { ModelCard } from "./model-card";
import { cx } from "./ui";

const filters: { key: "all" | ApplicationKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "housing", label: applicationLabels.housing },
  { key: "education", label: applicationLabels.education },
  { key: "workforce", label: applicationLabels.workforce },
  { key: "office", label: applicationLabels.office },
];

/**
 * Client-side filter so /models/ stays a static, CDN-cached page. Without JS every model is listed.
 * The active filter is mirrored to ?use= so filtered views are shareable.
 */
export function ModelGrid({ models }: { models: Model[] }) {
  const [active, setActive] = useState<"all" | ApplicationKey>("all");

  useEffect(() => {
    const use = new URLSearchParams(window.location.search).get("use");
    const match = filters.find((f) => f.key === use);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync from URL once on mount
    if (match) setActive(match.key);
  }, []);

  const choose = (key: "all" | ApplicationKey) => {
    setActive(key);
    const url = new URL(window.location.href);
    if (key === "all") url.searchParams.delete("use");
    else url.searchParams.set("use", key);
    window.history.replaceState(null, "", url);
    track("model_filter", { filter: key });
  };

  const visible = active === "all" ? models : models.filter((m) => m.applications.includes(active));

  return (
    <>
      <div role="group" aria-label="Filter models by application" className="flex flex-wrap gap-2 border-b border-hairline pb-6">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => choose(f.key)}
            aria-pressed={active === f.key}
            className={cx(
              "inline-flex min-h-11 items-center rounded-full border px-5 text-sm transition-colors",
              active === f.key ? "border-carbon bg-carbon text-ivory" : "border-carbon/25 hover:border-carbon",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{visible.length} models shown</p>
      <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((model, i) => (
          <ModelCard key={model.slug} model={model} eager={i === 0} />
        ))}
      </div>
    </>
  );
}
