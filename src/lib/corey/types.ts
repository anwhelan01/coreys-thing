export const STAGE_IDS = [
  "brief",
  "problems",
  "offer",
  "pitch",
  "stack",
  "price",
  "site",
  "prospects",
  "script",
  "field",
  "playbook",
] as const;

export type StageId = (typeof STAGE_IDS)[number];

export type Brief = {
  operatorName: string;
  idea: string;
  location: string;
  neighborhood: string;
  nicheHint: string;
  constraints: string;
};

export type ServiceIdea = {
  name: string;
  description: string;
  whyItSells: string;
  selected: boolean;
};

export type Leak = {
  name: string;
  description: string;
  ownerPain: string;
  dollarShape: string;
};

export type Offer = {
  name: string;
  promise: string;
  included: string[];
  guarantee: string;
  notIncluded: string[];
};

export type Pitch = {
  oneLiner: string;
  threeSteps: [string, string, string];
  doorOpener: string;
  objectionHandles: { objection: string; reply: string }[];
};

export type Stack = {
  platform: string;
  operatorOwns: string[];
  clientOwns: string[];
  positioning: string;
};

export type Pricing = {
  currency: string;
  foundingSetup: number;
  foundingMonthly: number;
  foundingTerms: string;
  laterSetupMin: number;
  laterSetupMax: number;
  laterMonthlyMin: number;
  laterMonthlyMax: number;
  whenToRaise: string;
  avoid: string;
};

export type SiteCopy = {
  brandName: string;
  tagline: string;
  hero: string;
  subhead: string;
  steps: [string, string, string];
  included: string[];
  cta: string;
  footerNote: string;
};

export type Prospect = {
  name: string;
  niche: string;
  city: string;
  rating: number;
  reviewCount: number;
  leakSignals: string[];
  whyWalkIn: string;
  mapsQuery: string;
  routeOrder: number;
};

export type AssessmentScript = {
  minutes0to2: string;
  minutes2to6: string;
  minutes6to10: string;
  minutes10to13: string;
  minutes13to15: string;
};

export type FieldEventKind =
  | "door"
  | "conversation"
  | "assessment"
  | "paid"
  | "concierge"
  | "note";

export type FieldEvent = {
  id: string;
  at: string;
  kind: FieldEventKind;
  prospectName: string;
  note: string;
};

export type Kit = {
  brandName: string;
  tagline: string;
  problemHeadline: string;
  whyCloseToRevenue: string;
  leaks: Leak[];
  candidateServices: ServiceIdea[];
  offer: Offer;
  pitch: Pitch;
  stack: Stack;
  pricing: Pricing;
  site: SiteCopy;
  prospects: Prospect[];
  assessmentScript: AssessmentScript;
  playbook: string[];
  nicheAdvice: string;
};

export type VentureStatus = "brief" | "ready" | "in-field";

export type Venture = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: VentureStatus;
  isDemo: boolean;
  brief: Brief;
  kit: Kit | null;
  field: FieldEvent[];
  notes: string;
};

export type GenerateInput = {
  brief: Brief;
};
