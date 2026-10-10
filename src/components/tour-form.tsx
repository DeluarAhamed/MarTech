"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { tourLeadSchema } from "@/lib/lead-schema";
import { Field, TextField, inputClass } from "./lead-form";
import { site } from "@/content/site";
import { Bullet, cx } from "./ui";

const empty = { firstName: "", lastName: "", company: "", email: "", phone: "", preferredDates: "", groupSize: "", message: "" };

export function TourForm() {
  const id = useId();
  const router = useRouter();
  const [data, setData] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [mailFallback, setMailFallback] = useState("");
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = (key: keyof typeof empty, value: string) => setData((d) => ({ ...d, [key]: value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      formType: "tour" as const,
      ...data,
      groupSize: data.groupSize ? Number.parseInt(data.groupSize, 10) : null,
      startedAt: startedAt.current,
      website: honeypot.current?.value ?? "",
      pageUrl: window.location.pathname,
      attribution: getAttribution(),
    };
    const parsed = tourLeadSchema.safeParse(payload);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] ??= issue.message;
      setErrors(errs);
      document.getElementById(`${id}-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setErrors({});
    setSending(true);
    setServerError("");
    try {
      const res = await fetch("/api/leads/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (res.status >= 500) {
        const body = [
          `Name: ${data.firstName} ${data.lastName}`,
          `Company: ${data.company}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone || "—"}`,
          `Group size: ${data.groupSize || "—"}`,
          `Preferred dates: ${data.preferredDates || "—"}`,
          "",
          data.message,
        ].join("\n");
        setMailFallback(`mailto:${site.contacts.sales.email}?subject=${encodeURIComponent(`Factory tour request — ${data.company}`)}&body=${encodeURIComponent(body)}`);
        throw new Error("We couldn't submit your request online right now. You can send the same details by email in one click:");
      }
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong.");
      track("tour_request");
      router.push("/thank-you/");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setSending(false);
    }
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <TextField id={`${id}-firstName`} label="First name" value={data.firstName} onChange={(v) => set("firstName", v)} error={errors.firstName} autoComplete="given-name" />
      <TextField id={`${id}-lastName`} label="Last name" value={data.lastName} onChange={(v) => set("lastName", v)} error={errors.lastName} autoComplete="family-name" />
      <TextField id={`${id}-company`} label="Company or organization" value={data.company} onChange={(v) => set("company", v)} error={errors.company} autoComplete="organization" />
      <TextField id={`${id}-email`} label="Work email" type="email" value={data.email} onChange={(v) => set("email", v)} error={errors.email} autoComplete="email" />
      <TextField id={`${id}-phone`} label="Phone" optional type="tel" value={data.phone} onChange={(v) => set("phone", v)} error={errors.phone} autoComplete="tel" />
      <TextField id={`${id}-groupSize`} label="Group size" optional inputMode="numeric" value={data.groupSize} onChange={(v) => set("groupSize", v)} error={errors.groupSize} />
      <TextField className="sm:col-span-2" id={`${id}-preferredDates`} label="Preferred dates or weeks" optional value={data.preferredDates} onChange={(v) => set("preferredDates", v)} error={errors.preferredDates} />
      <Field id={`${id}-message`} label="What would you like to see?" optional className="sm:col-span-2">
        <textarea id={`${id}-message`} rows={3} value={data.message} onChange={(e) => set("message", e.target.value)} className={cx(inputClass(false), "py-3")} />
      </Field>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {serverError ? (
        <div role="alert" className="border-l-2 border-danger bg-danger/5 p-4 text-sm sm:col-span-2">
          <p>{serverError}</p>
          {mailFallback ? (
            <a href={mailFallback} className="mt-3 inline-flex min-h-11 items-center gap-2.5 rounded-full bg-navy px-5 text-[0.75rem] font-medium tracking-[0.06em] text-white uppercase">
              Email my tour request
            </a>
          ) : null}
        </div>
      ) : null}
      <div className="sm:col-span-2">
        <button type="submit" disabled={sending} className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-navy px-7 text-[0.8125rem] font-medium tracking-[0.04em] text-white uppercase transition-colors hover:bg-navy-2 disabled:opacity-60">
          <Bullet /> {sending ? "Sending…" : "Request a tour"}
        </button>
      </div>
    </form>
  );
}
