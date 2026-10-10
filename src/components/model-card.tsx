"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, ViewTransition } from "react";
import type { Model } from "@/content/models";
import { applicationLabels } from "@/content/models";
import { Arrow, cx } from "./ui";

/** Model card with the plan → render reveal (docs/redesign/06 §6.2). Hover/focus on desktop, toggle on touch. */
export function ModelCard({ model, eager }: { model: Model; eager?: boolean }) {
  const [showPlan, setShowPlan] = useState(false);
  const plan = model.plans[0];

  return (
    <article className="group/card relative flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-carbon/5">
        <ViewTransition name={`model-${model.slug}`} share="morph" default="none">
          <div className="absolute inset-0">
            <Image
              src={model.hero.src}
              alt={model.hero.alt}
              fill
              loading={eager ? "eager" : undefined}
              fetchPriority={eager ? "high" : undefined}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
              className={cx(
                "object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-[1.03]",
                showPlan && "opacity-10",
                "lg:group-hover/card:opacity-10 lg:group-focus-within/card:opacity-10",
              )}
            />
          </div>
        </ViewTransition>
        <div
          className={cx(
            "absolute inset-0 bg-ivory p-6 opacity-0 transition-opacity duration-500",
            showPlan && "opacity-100",
            "lg:group-hover/card:opacity-100 lg:group-focus-within/card:opacity-100",
          )}
          aria-hidden={!showPlan}
        >
          <Image src={plan.src} alt={plan.alt} fill sizes="(min-width: 1024px) 33vw, 90vw" className="object-contain p-6 mix-blend-multiply" />
        </div>
        <span className="label absolute top-3 left-3 bg-ivory/90 px-2 py-1 text-[0.625rem] text-carbon">{model.code}</span>
        <span className="label pointer-events-none absolute bottom-3 left-3 bg-carbon/70 px-2 py-1 text-[0.625rem] text-ivory">
          {showPlan ? "Drawing" : "Rendering"}
        </span>
        <button
          type="button"
          onClick={() => setShowPlan((v) => !v)}
          aria-pressed={showPlan}
          className="label absolute right-3 bottom-3 z-10 min-h-9 bg-ivory px-3 text-[0.625rem] text-carbon lg:hidden"
        >
          {showPlan ? "Show render" : "Show plan"}
        </button>
      </div>

      <div className="flex flex-1 flex-col border-b border-hairline pt-5 pb-6">
        <p className="label text-stone-ink">{model.category}</p>
        <h3 className="mt-2 text-h2">
          <Link href={`/models/${model.slug}/`} className="after:absolute after:inset-0 after:content-['']">
            {model.name}
          </Link>
        </h3>
        <ul className="label mt-4 flex flex-wrap gap-x-4 gap-y-1 text-carbon/80">
          {model.cardSpecs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-stone-ink">{model.applications.map((a) => applicationLabels[a]).join(" · ")}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
          View model <Arrow />
        </span>
      </div>
    </article>
  );
}
