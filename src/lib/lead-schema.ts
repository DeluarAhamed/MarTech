import { z } from "zod";
import { stateCodes } from "./us-states";

// Shared between the client form and the server route (docs/redesign/07 §2).

export const projectTypes = [
  { value: "housing-community", label: "Housing community" },
  { value: "single-family", label: "Single-family" },
  { value: "townhome-multifamily", label: "Townhome / multifamily" },
  { value: "adu", label: "ADU" },
  { value: "classroom", label: "Classroom / education" },
  { value: "office-flex", label: "Office / flex space" },
  { value: "workforce", label: "Workforce / employee housing" },
  { value: "pmrv", label: "PMRV" },
  { value: "flex", label: "Large project (FLEX™)" },
  { value: "other", label: "Something else" },
] as const;

export const projectStages = [
  { value: "exploring", label: "Exploring options" },
  { value: "land-secured", label: "Land secured" },
  { value: "entitlements", label: "Entitlements in progress" },
  { value: "entitled", label: "Entitled / permitted" },
  { value: "financed", label: "Financing secured" },
] as const;

export const plansStatuses = [
  { value: "stamped", label: "We have stamped plans" },
  { value: "schematic", label: "We have schematic plans" },
  { value: "need-design", label: "We need design services" },
] as const;

export const roles = [
  { value: "developer", label: "Developer" },
  { value: "gc", label: "General contractor" },
  { value: "architect", label: "Architect" },
  { value: "school", label: "School / district" },
  { value: "government", label: "Government" },
  { value: "investor", label: "Investor" },
  { value: "other", label: "Other" },
] as const;

export const timelines = [
  { value: "0-6", label: "Within 6 months" },
  { value: "6-12", label: "6–12 months" },
  { value: "12+", label: "12+ months" },
  { value: "unsure", label: "Not sure yet" },
] as const;

const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((item) => item.value) as [T[number]["value"], ...T[number]["value"][]];

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

export const attributionSchema = z
  .object({
    first: z.record(z.string(), z.string().max(500)).optional(),
    last: z.record(z.string(), z.string().max(500)).optional(),
    pages: z.array(z.string().max(300)).max(20).optional(),
  })
  .optional();

const contactFields = {
  firstName: z.string().trim().min(1, "Enter your first name").max(80),
  lastName: z.string().trim().min(1, "Enter your last name").max(80),
  company: z.string().trim().min(1, "Enter your company or organization").max(160),
  email: z.email("Enter a valid email address").max(200),
  phone: optionalText(40),
  message: optionalText(4000),
};

const meta = {
  website: z.string().max(0).optional().default(""), // honeypot
  startedAt: z.number().int().positive(),
  pageUrl: z.string().max(500).optional().default(""),
  attribution: attributionSchema,
};

export const projectLeadSchema = z.object({
  formType: z.literal("project"),
  projectType: z.enum(values(projectTypes), { error: "Choose a project type" }),
  units: z.number().int().min(0).max(100000).nullable().optional(),
  modelInterest: z.array(z.enum(["bohemian", "solterra", "castello", "custom"])).max(4).optional().default([]),
  city: z.string().trim().min(1, "Enter the project city").max(120),
  state: z.enum(stateCodes, { error: "Choose the project state" }),
  zip: optionalText(12),
  timeline: z.enum(values(timelines), { error: "Choose a timeline" }),
  projectStage: z.enum(values(projectStages), { error: "Choose a project stage" }),
  plansStatus: z.enum(values(plansStatuses), { error: "Choose a plans option" }),
  role: z.enum(values(roles), { error: "Choose your role" }),
  marketingConsent: z.boolean().optional().default(false),
  ...contactFields,
  ...meta,
});

export const tourLeadSchema = z.object({
  formType: z.literal("tour"),
  preferredDates: optionalText(200),
  groupSize: z.number().int().min(1).max(50).nullable().optional(),
  ...contactFields,
  ...meta,
});

export const leadSchema = z.discriminatedUnion("formType", [projectLeadSchema, tourLeadSchema]);

export type ProjectLead = z.infer<typeof projectLeadSchema>;
export type Lead = z.infer<typeof leadSchema>;
