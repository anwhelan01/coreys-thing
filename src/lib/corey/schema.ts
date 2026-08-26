import { z } from "zod";

const leakSchema = z.object({
  name: z.string(),
  description: z.string(),
  ownerPain: z.string(),
  dollarShape: z.string(),
});

const serviceSchema = z.object({
  name: z.string(),
  description: z.string(),
  whyItSells: z.string(),
  selected: z.boolean(),
});

const offerSchema = z.object({
  name: z.string(),
  promise: z.string(),
  included: z.array(z.string()),
  guarantee: z.string(),
  notIncluded: z.array(z.string()),
});

const pitchSchema = z.object({
  oneLiner: z.string(),
  threeSteps: z.tuple([z.string(), z.string(), z.string()]),
  doorOpener: z.string(),
  objectionHandles: z
    .array(z.object({ objection: z.string(), reply: z.string() }))
    .min(2)
    .max(6),
});

const stackSchema = z.object({
  platform: z.string(),
  operatorOwns: z.array(z.string()),
  clientOwns: z.array(z.string()),
  positioning: z.string(),
});

const pricingSchema = z.object({
  currency: z.string(),
  foundingSetup: z.number(),
  foundingMonthly: z.number(),
  foundingTerms: z.string(),
  laterSetupMin: z.number(),
  laterSetupMax: z.number(),
  laterMonthlyMin: z.number(),
  laterMonthlyMax: z.number(),
  whenToRaise: z.string(),
  avoid: z.string(),
});

const siteSchema = z.object({
  brandName: z.string(),
  tagline: z.string(),
  hero: z.string(),
  subhead: z.string(),
  steps: z.tuple([z.string(), z.string(), z.string()]),
  included: z.array(z.string()),
  cta: z.string(),
  footerNote: z.string(),
});

const prospectSchema = z.object({
  name: z.string(),
  niche: z.string(),
  city: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  leakSignals: z.array(z.string()),
  whyWalkIn: z.string(),
  mapsQuery: z.string(),
  routeOrder: z.number(),
});

const scriptSchema = z.object({
  minutes0to2: z.string(),
  minutes2to6: z.string(),
  minutes6to10: z.string(),
  minutes10to13: z.string(),
  minutes13to15: z.string(),
});

export const kitSchema = z.object({
  brandName: z.string(),
  tagline: z.string(),
  problemHeadline: z.string(),
  whyCloseToRevenue: z.string(),
  leaks: z.array(leakSchema).min(2).max(6),
  candidateServices: z.array(serviceSchema).min(4).max(6),
  offer: offerSchema,
  pitch: pitchSchema,
  stack: stackSchema,
  pricing: pricingSchema,
  site: siteSchema,
  prospects: z.array(prospectSchema).min(6).max(12),
  assessmentScript: scriptSchema,
  playbook: z.array(z.string()).min(8).max(12),
  nicheAdvice: z.string(),
});

export const briefSchema = z.object({
  operatorName: z.string(),
  idea: z.string().min(8),
  location: z.string().min(2),
  neighborhood: z.string(),
  nicheHint: z.string(),
  constraints: z.string(),
});

export type KitInput = z.infer<typeof kitSchema>;

export function extractJson(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced?.[1]?.trim() ?? trimmed;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON object in model output");
  }
  return JSON.parse(candidate.slice(start, end + 1));
}

export function parseKit(text: string) {
  const raw = extractJson(text) as Record<string, unknown>;
  if (raw && typeof raw === "object") {
    const pitch = raw.pitch as { threeSteps?: unknown } | undefined;
    if (pitch && Array.isArray(pitch.threeSteps) && pitch.threeSteps.length >= 3) {
      pitch.threeSteps = pitch.threeSteps.slice(0, 3) as [string, string, string];
    }
    const site = raw.site as { steps?: unknown } | undefined;
    if (site && Array.isArray(site.steps) && site.steps.length >= 3) {
      site.steps = site.steps.slice(0, 3) as [string, string, string];
    }
  }
  return kitSchema.parse(raw);
}
