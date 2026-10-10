import type { ProjectLead } from "./lead-schema";
import { westernStates } from "./us-states";

// Initial rubric from docs/redesign/07 §4. Weights are starting assumptions, not data —
// bump RUBRIC_VERSION whenever they change so historical scores stay interpretable.
export const RUBRIC_VERSION = "v2"; // v2: location scoring added (client coverage decision 2026-10-09)

export type LeadBand = "priority" | "qualified" | "nurture";

const FREE_MAIL = new Set(["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com", "proton.me", "protonmail.com", "live.com", "msn.com"]);

const stagePoints: Record<ProjectLead["projectStage"], number> = {
  financed: 25,
  entitled: 20,
  entitlements: 15,
  "land-secured": 12,
  exploring: 0,
};

const timelinePoints: Record<ProjectLead["timeline"], number> = { "0-6": 10, "6-12": 6, "12+": 0, unsure: 0 };

export function scoreLead(lead: ProjectLead) {
  const breakdown: Record<string, number> = {};

  breakdown.stage = stagePoints[lead.projectStage];

  const units = lead.units ?? 0;
  const isClassroom = lead.projectType === "classroom";
  if ((isClassroom && units >= 20) || units >= 50) breakdown.scale = 20;
  else if (units >= 10) breakdown.scale = 12;
  else if (units >= 2) breakdown.scale = 6;
  else breakdown.scale = 0;

  // Western U.S. is the stated focus; elsewhere, only FLEX-scale projects get location credit.
  if (westernStates.includes(lead.state)) breakdown.location = 15;
  else breakdown.location = units >= 50 || lead.projectType === "flex" ? 10 : 0;

  breakdown.timeline = timelinePoints[lead.timeline];
  breakdown.role = ["developer", "gc", "school"].includes(lead.role) ? 8 : 0;
  breakdown.plans = lead.plansStatus === "stamped" ? 6 : lead.plansStatus === "schematic" ? 3 : 0;

  const domain = lead.email.split("@")[1]?.toLowerCase() ?? "";
  breakdown.businessEmail = domain && !FREE_MAIL.has(domain) ? 4 : 0;

  const score = Object.values(breakdown).reduce((a, b) => a + b, 0);
  const band: LeadBand = score >= 60 ? "priority" : score >= 35 ? "qualified" : "nurture";

  return { score, band, breakdown, rubricVersion: RUBRIC_VERSION };
}
