"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { models } from "@/content/models";
import { site } from "@/content/site";
import { usStates } from "@/lib/us-states";
import { track } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { plansStatuses, projectLeadSchema, projectStages, projectTypes, roles, timelines } from "@/lib/lead-schema";
import { Bullet, cx } from "./ui";

type Data = {
  projectType: string;
  units: string;
  unitsUnknown: boolean;
  modelInterest: string[];
  city: string;
  state: string;
  zip: string;
  timeline: string;
  projectStage: string;
  plansStatus: string;
  firstName: string;
  lastName: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  message: string;
  marketingConsent: boolean;
};

const empty: Data = {
  projectType: "", units: "", unitsUnknown: false, modelInterest: [], city: "", state: "", zip: "",
  timeline: "", projectStage: "", plansStatus: "", firstName: "", lastName: "", company: "", role: "",
  email: "", phone: "", message: "", marketingConsent: false,
};

const STEPS = [
  { title: "What are you building?", fields: ["projectType"] },
  { title: "How big is the project?", fields: ["units", "modelInterest"] },
  { title: "Where and when?", fields: ["city", "state", "zip", "timeline", "projectStage"] },
  { title: "Where are your plans?", fields: ["plansStatus"] },
  { title: "Who should we contact?", fields: ["firstName", "lastName", "company", "role", "email", "phone", "message"] },
] as const;

const STORAGE_KEY = "mar_lead_draft";

function toPayload(d: Data) {
  const units = d.unitsUnknown || d.units === "" ? null : Number.parseInt(d.units, 10);
  return {
    formType: "project" as const,
    projectType: d.projectType,
    units: Number.isNaN(units) ? null : units,
    modelInterest: d.modelInterest,
    city: d.city, state: d.state, zip: d.zip,
    timeline: d.timeline, projectStage: d.projectStage, plansStatus: d.plansStatus,
    firstName: d.firstName, lastName: d.lastName, company: d.company, role: d.role,
    email: d.email, phone: d.phone, message: d.message, marketingConsent: d.marketingConsent,
  };
}

function stepErrors(step: number, d: Data): Record<string, string> {
  const fields = STEPS[step].fields as readonly string[];
  const result = projectLeadSchema.safeParse({ ...toPayload(d), startedAt: 1 });
  const errors: Record<string, string> = {};
  if (!result.success) {
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (fields.includes(key) && !errors[key]) errors[key] = issue.message;
    }
  }
  if (step === 1 && !d.unitsUnknown && d.units === "") errors.units = "Enter an approximate number, or choose “Not sure yet”";
  return errors;
}

type LeadFormProps = {
  /** Preset project type / model. When omitted on the page variant, they are read from the URL (?type=, ?model=). */
  initialType?: string;
  initialModel?: string;
  /** Two-letter state code preset (e.g. from a state location page). */
  initialState?: string;
  variant?: "page" | "drawer";
};

export function LeadForm({ initialType, initialModel, initialState, variant = "page" }: LeadFormProps) {
  const router = useRouter();
  const formId = useId();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [mailFallback, setMailFallback] = useState("");
  const startedAt = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const hydrated = useRef(false);
  // Focus requests are applied after render commits, so screen-reader and keyboard users land on the new step or the error summary.
  const [focusReq, setFocusReq] = useState<{ target: "heading" | "summary"; n: number } | null>(null);

  useEffect(() => {
    if (!focusReq) return;
    (focusReq.target === "heading" ? headingRef : summaryRef).current?.focus();
  }, [focusReq]);

  // Restore draft, then apply presets from the entry point (segment/model page).
  useEffect(() => {
    let draft = empty;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) draft = { ...empty, ...(JSON.parse(saved) as Partial<Data>) };
    } catch { /* ignore */ }
    const params = variant === "page" ? new URLSearchParams(window.location.search) : null;
    const type = initialType ?? params?.get("type") ?? undefined;
    const model = initialModel ?? params?.get("model") ?? undefined;
    const stateCode = (initialState ?? params?.get("state") ?? "").toUpperCase();
    const validState = usStates.some(([c]) => c === stateCode);
    const validType = projectTypes.some((t) => t.value === type);
    const validModel = model === "custom" || models.some((m) => m.slug === model);
    const next = {
      ...draft,
      projectType: validType ? type! : draft.projectType,
      modelInterest: validModel && !draft.modelInterest.includes(model!) ? [...draft.modelInterest, model!] : draft.modelInterest,
      state: validState ? stateCode : draft.state,
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from sessionStorage
    setData(next);
    if (validType) setStep(1);
    hydrated.current = true;
    startedAt.current = Date.now();
    track("form_start", { form_type: "project", form_variant: variant });
  }, [initialType, initialModel, initialState, variant]);

  useEffect(() => {
    if (!hydrated.current) return;
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* ignore */ }
  }, [data]);

  const set = <K extends keyof Data>(key: K, value: Data[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => k !== key)));
  };

  const goTo = (n: number) => {
    setStep(n);
    setErrors({});
    setFocusReq((r) => ({ target: "heading", n: (r?.n ?? 0) + 1 }));
    track("form_step", { form_type: "project", step_number: n + 1 });
  };

  const next = () => {
    const errs = stepErrors(step, data);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setFocusReq((r) => ({ target: "summary", n: (r?.n ?? 0) + 1 }));
      return;
    }
    if (step < STEPS.length - 1) goTo(step + 1);
    else void submit();
  };

  async function submit() {
    setStatus("sending");
    setServerError("");
    setMailFallback("");
    try {
      const res = await fetch("/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...toPayload(data),
          website: honeypot.current?.value ?? "",
          startedAt: startedAt.current,
          pageUrl: window.location.pathname + window.location.search,
          attribution: getAttribution(),
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (res.status >= 500) {
        // Storage not reachable: keep the enquiry alive via the visitor's own email client.
        setMailFallback(buildMailto(data));
        track("lead_fallback_offered", { form_type: "project" });
        throw new Error("We couldn't submit your request online right now. You can send the same details to our sales team by email in one click:");
      }
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong.");
      track("generate_lead", { form_type: "project", project_type: data.projectType });
      try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
      router.push("/thank-you/");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const errorList = Object.entries(errors);
  const isClassroom = data.projectType === "classroom";
  const unitsLabel = isClassroom ? "Approximate number of classrooms" : ["office-flex", "workforce", "pmrv", "adu"].includes(data.projectType) ? "Approximate number of units or modules" : "Approximate number of homes";

  return (
    <form
      noValidate
      onSubmit={(e) => { e.preventDefault(); next(); }}
      aria-labelledby={`${formId}-title`}
      className="@container relative"
    >
      {/* Progress */}
      <div className="mb-10">
        <div className="label flex justify-between text-stone-ink">
          <span>Step {step + 1} of {STEPS.length}</span>
          <span>{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
        </div>
        <div className="mt-3 h-px w-full bg-hairline" aria-hidden="true">
          <div className="h-px bg-navy transition-[width] duration-500" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      <h2 id={`${formId}-title`} ref={headingRef} tabIndex={-1} className={cx("outline-none", variant === "drawer" ? "text-h2" : "text-display-m")}>
        {STEPS[step].title}
      </h2>

      {errorList.length > 0 ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-6 border-l-2 border-danger bg-danger/5 p-4 text-sm outline-none">
          <p className="font-medium">Please fix the following:</p>
          <ul className="mt-2 list-disc pl-5">
            {errorList.map(([key, msg]) => (
              <li key={key}><a href={`#${formId}-${key}`} className="underline underline-offset-2">{msg}</a></li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={cx("space-y-10", variant === "drawer" ? "mt-8" : "mt-10")}>
        {step === 0 && (
          <ChoiceGrid
            id={`${formId}-projectType`}
            legend="Project type"
            options={projectTypes}
            value={data.projectType}
            onChange={(v) => set("projectType", v)}
            error={errors.projectType}
            columns={variant === "drawer" ? "" : "@lg:grid-cols-2"}
          />
        )}

        {step === 1 && (
          <>
            <div>
              <Field id={`${formId}-units`} label={unitsLabel} error={errors.units}>
                <input
                  id={`${formId}-units`}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  disabled={data.unitsUnknown}
                  value={data.units}
                  onChange={(e) => set("units", e.target.value)}
                  className={inputClass(!!errors.units)}
                  aria-invalid={!!errors.units}
                  aria-describedby={errors.units ? `${formId}-units-error` : undefined}
                />
              </Field>
              <label className="mt-4 flex min-h-11 items-center gap-3 text-sm">
                <input type="checkbox" checked={data.unitsUnknown} onChange={(e) => set("unitsUnknown", e.target.checked)} className="size-5 accent-carbon" />
                Not sure yet
              </label>
            </div>
            <fieldset>
              <legend className="label text-stone-ink">Models of interest (optional)</legend>
              <div className="mt-4 grid gap-2 @lg:grid-cols-2">
                {[...models.map((m) => ({ value: m.slug, label: `${m.name}: ${m.category}` })), { value: "custom", label: "Build from our own plans" }].map((opt) => {
                  const checked = data.modelInterest.includes(opt.value);
                  return (
                    <label key={opt.value} className={choiceClass(checked)}>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => set("modelInterest", checked ? data.modelInterest.filter((v) => v !== opt.value) : [...data.modelInterest, opt.value])}
                      />
                      <Check on={checked} />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid gap-6 @xl:grid-cols-6">
              <TextField className="@xl:col-span-3" id={`${formId}-city`} label="Project city" value={data.city} onChange={(v) => set("city", v)} error={errors.city} autoComplete="address-level2" />
              <Field id={`${formId}-state`} label="State" error={errors.state} className="@xl:col-span-2">
                <select
                  id={`${formId}-state`}
                  value={data.state}
                  onChange={(e) => set("state", e.target.value)}
                  autoComplete="address-level1"
                  className={inputClass(!!errors.state)}
                  aria-invalid={!!errors.state}
                  aria-describedby={errors.state ? `${formId}-state-error` : undefined}
                >
                  <option value="">Select…</option>
                  {usStates.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                </select>
              </Field>
              <TextField className="@xl:col-span-1" id={`${formId}-zip`} label="ZIP" optional value={data.zip} onChange={(v) => set("zip", v)} error={errors.zip} autoComplete="postal-code" inputMode="numeric" />
            </div>
            <p className="-mt-4 text-sm text-stone-ink">{site.coverage.formNote}</p>
            <ChoiceGrid id={`${formId}-projectStage`} legend="Project stage" options={projectStages} value={data.projectStage} onChange={(v) => set("projectStage", v)} error={errors.projectStage} columns="@lg:grid-cols-2" />
            <ChoiceGrid id={`${formId}-timeline`} legend="Target delivery" options={timelines} value={data.timeline} onChange={(v) => set("timeline", v)} error={errors.timeline} columns="@lg:grid-cols-2" />
          </>
        )}

        {step === 3 && (
          <ChoiceGrid id={`${formId}-plansStatus`} legend="Plans" options={plansStatuses} value={data.plansStatus} onChange={(v) => set("plansStatus", v)} error={errors.plansStatus} />
        )}

        {step === 4 && (
          <div className="grid gap-6 @lg:grid-cols-2">
            <TextField id={`${formId}-firstName`} label="First name" value={data.firstName} onChange={(v) => set("firstName", v)} error={errors.firstName} autoComplete="given-name" />
            <TextField id={`${formId}-lastName`} label="Last name" value={data.lastName} onChange={(v) => set("lastName", v)} error={errors.lastName} autoComplete="family-name" />
            <TextField id={`${formId}-company`} label="Company or organization" value={data.company} onChange={(v) => set("company", v)} error={errors.company} autoComplete="organization" />
            <Field id={`${formId}-role`} label="Your role" error={errors.role}>
              <select
                id={`${formId}-role`}
                value={data.role}
                onChange={(e) => set("role", e.target.value)}
                className={inputClass(!!errors.role)}
                aria-invalid={!!errors.role}
                aria-describedby={errors.role ? `${formId}-role-error` : undefined}
              >
                <option value="">Select…</option>
                {roles.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </Field>
            <TextField id={`${formId}-email`} label="Work email" type="email" value={data.email} onChange={(v) => set("email", v)} error={errors.email} autoComplete="email" />
            <TextField id={`${formId}-phone`} label="Phone" optional type="tel" value={data.phone} onChange={(v) => set("phone", v)} error={errors.phone} autoComplete="tel" />
            <Field id={`${formId}-message`} label="Anything else we should know?" optional className="@lg:col-span-2" error={errors.message}>
              <textarea id={`${formId}-message`} rows={4} value={data.message} onChange={(e) => set("message", e.target.value)} className={cx(inputClass(false), "py-3")} />
            </Field>
            <label className="flex items-start gap-3 text-sm text-stone-ink @lg:col-span-2">
              <input type="checkbox" checked={data.marketingConsent} onChange={(e) => set("marketingConsent", e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-carbon" />
              Send me occasional updates about new models and insights. (Optional. We&apos;ll respond to this request either way.)
            </label>
            <p className="text-xs text-stone-ink @lg:col-span-2">
              We use these details only to respond to your project enquiry and never share them without your consent.
            </p>
          </div>
        )}
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>Website <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {serverError ? (
        <div role="alert" className="mt-8 border-l-2 border-danger bg-danger/5 p-4 text-sm">
          <p>{serverError}</p>
          {mailFallback ? (
            <a
              href={mailFallback}
              onClick={() => track("lead_fallback_email", { form_type: "project" })}
              className="mt-3 inline-flex min-h-11 items-center gap-2.5 rounded-full bg-navy px-5 text-[0.75rem] font-medium tracking-[0.06em] text-white uppercase"
            >
              Email my project details
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-hairline pt-8">
        {step > 0 ? (
          <button type="button" onClick={() => goTo(step - 1)} className="min-h-12 px-2 text-sm font-medium underline-offset-4 hover:underline">
            Back
          </button>
        ) : <span />}
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-navy px-7 text-[0.8125rem] font-medium tracking-[0.04em] text-white uppercase transition-colors hover:bg-navy-2 disabled:opacity-60"
        >
          <Bullet />
          {step === STEPS.length - 1 ? (status === "sending" ? "Sending…" : "Send project details") : "Continue"}
        </button>
      </div>
    </form>
  );
}

function labelOf(list: readonly { value: string; label: string }[], value: string) {
  return list.find((o) => o.value === value)?.label ?? value;
}

/** Pre-filled email to sales with everything the visitor entered (used only when online submission fails). */
function buildMailto(d: Data) {
  const lines = [
    `Project type: ${labelOf(projectTypes, d.projectType)}`,
    `Scale: ${d.unitsUnknown || !d.units ? "Not sure yet" : d.units}`,
    `Models of interest: ${d.modelInterest.join(", ") || "None"}`,
    `Location: ${d.city}, ${d.state} ${d.zip}`.trim(),
    `Project stage: ${labelOf(projectStages, d.projectStage)}`,
    `Target delivery: ${labelOf(timelines, d.timeline)}`,
    `Plans: ${labelOf(plansStatuses, d.plansStatus)}`,
    `Name: ${d.firstName} ${d.lastName}`,
    `Company: ${d.company}`,
    `Role: ${labelOf(roles, d.role)}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone || "Not provided"}`,
    "",
    d.message,
  ];
  const subject = `Project enquiry: ${labelOf(projectTypes, d.projectType)}, ${d.company}`;
  return `mailto:${site.contacts.sales.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

function inputClass(invalid: boolean) {
  return cx(
    "mt-2 block min-h-12 w-full rounded-[2px] border bg-white px-4 text-base text-carbon transition-colors placeholder:text-stone focus:border-carbon disabled:bg-carbon/5 disabled:text-stone",
    invalid ? "border-danger" : "border-carbon/25",
  );
}

function choiceClass(checked: boolean) {
  return cx(
    "flex min-h-14 cursor-pointer items-center gap-3 border px-4 py-3 text-[0.95rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-bronze-ink",
    checked ? "border-navy bg-navy text-white" : "border-carbon/20 bg-white hover:border-navy/60",
  );
}

function Check({ on, round }: { on: boolean; round?: boolean }) {
  return (
    <span aria-hidden="true" className={cx("flex size-5 shrink-0 items-center justify-center border", round ? "rounded-full" : "", on ? "border-ivory" : "border-carbon/40")}>
      {on ? <span className={cx("size-2.5 bg-ivory", round && "rounded-full")} /> : null}
    </span>
  );
}

function ChoiceGrid({
  id, legend, options, value, onChange, error, columns,
}: {
  id: string; legend: string; options: readonly { value: string; label: string }[]; value: string;
  onChange: (v: string) => void; error?: string; columns?: string;
}) {
  return (
    <fieldset id={id} aria-describedby={error ? `${id}-error` : undefined} aria-invalid={!!error}>
      <legend className="label text-stone-ink">{legend}</legend>
      <div className={cx("mt-4 grid gap-2", columns)}>
        {options.map((opt) => {
          const checked = value === opt.value;
          return (
            <label key={opt.value} className={choiceClass(checked)}>
              <input type="radio" name={id} value={opt.value} checked={checked} onChange={() => onChange(opt.value)} className="sr-only" />
              <Check on={checked} round />
              {opt.label}
            </label>
          );
        })}
      </div>
      {error ? <p id={`${id}-error`} className="mt-3 text-sm text-danger">{error}</p> : null}
    </fieldset>
  );
}

function Field({ id, label, optional, error, className, children }: { id: string; label: string; optional?: boolean; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {optional ? <span className="font-normal text-stone-ink">(optional)</span> : null}
      </label>
      {children}
      {error ? <p id={`${id}-error`} className="mt-2 text-sm text-danger">{error}</p> : null}
    </div>
  );
}

function TextField({
  id, label, value, onChange, error, optional, type = "text", autoComplete, inputMode, className,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; error?: string; optional?: boolean;
  type?: string; autoComplete?: string; inputMode?: "numeric" | "text"; className?: string;
}) {
  return (
    <Field id={id} label={label} optional={optional} error={error} className={className}>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass(!!error)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </Field>
  );
}

export { ChoiceGrid, Field, TextField, inputClass };
