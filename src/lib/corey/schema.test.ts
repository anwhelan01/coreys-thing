import assert from "node:assert/strict";
import { test } from "node:test";
import { extractJson, kitSchema, parseKit } from "./schema.ts";

const kit = {
  brandName: "Signal Local",
  tagline: "Turn every local lead into momentum.",
  problemHeadline: "Missed calls become lost appointments.",
  whyCloseToRevenue: "The leak already exists.",
  leaks: [
    { name: "Missed-call leakage", description: "Voicemail.", ownerPain: "Unknown callers.", dollarShape: "Job tickets." },
    { name: "Silent completions", description: "No review ask.", ownerPain: "No proof.", dollarShape: "Demand." },
  ],
  candidateServices: [
    { name: "Appointment recovery", description: "Text-back.", whyItSells: "Felt daily.", selected: true },
    { name: "Review growth", description: "Ask after jobs.", whyItSells: "Visible.", selected: true },
    { name: "Content engine", description: "Posts.", whyItSells: "Later.", selected: false },
    { name: "Estimate follow-up", description: "Quotes.", whyItSells: "Trades.", selected: false },
    { name: "Front-desk chat", description: "After hours.", whyItSells: "Sounds like a bot.", selected: false },
  ],
  offer: {
    name: "Local Lead and Reputation Engine",
    promise: "Missed calls to bookings, jobs to reviews.",
    included: ["Text-back", "Follow-up", "Booking", "Reminders", "Reviews"],
    guarantee: "Seven-day setup.",
    notIncluded: ["Ads", "A custom app", "A new daily tool"],
  },
  pitch: {
    oneLiner: "We turn missed calls into bookings and jobs into reviews.",
    threeSteps: ["Text-back.", "Booking flow.", "Review asks."],
    doorOpener: "What happens after a new lead comes in?",
    objectionHandles: [
      { objection: "We have a system.", reply: "If it catches missed calls, I leave." },
      { objection: "No time.", reply: "You keep two jobs." },
    ],
  },
  stack: {
    platform: "One platform.",
    operatorOwns: ["Text-back", "Inbox", "Follow-up", "Reviews"],
    clientOwns: ["Hot leads", "Mark jobs complete"],
    positioning: "A managed layer. Not a replacement.",
  },
  pricing: {
    currency: "USD",
    foundingSetup: 750,
    foundingMonthly: 500,
    foundingTerms: "Cancel after 90 days.",
    laterSetupMin: 1500,
    laterSetupMax: 2500,
    laterMonthlyMin: 750,
    laterMonthlyMax: 1250,
    whenToRaise: "After the first verified result.",
    avoid: "Do not start with pay-per-lead.",
  },
  site: {
    brandName: "Signal Local",
    tagline: "Turn every local lead into momentum.",
    hero: "Missed calls are missed jobs.",
    subhead: "A managed layer around how you already work.",
    steps: ["Respond fast.", "Follow up.", "Ask for reviews."],
    included: ["Text-back", "Follow-up", "Booking", "Reminders", "Reviews"],
    cta: "Book a 15-minute leak walkthrough",
    footerNote: "$750 setup, $500 / month.",
  },
  prospects: [
    {
      name: "King Auto Repair",
      niche: "Auto",
      city: "Charlotte, NC",
      rating: 4.5,
      reviewCount: 251,
      leakSignals: ["No website link", "No booking path"],
      whyWalkIn: "Demand without a quote path.",
      mapsQuery: "King Auto Repair Charlotte NC",
      routeOrder: 1,
    },
    {
      name: "Plaza Tire and Auto",
      niche: "Tires",
      city: "Charlotte, NC",
      rating: 4.7,
      reviewCount: 140,
      leakSignals: ["No website link", "High rating"],
      whyWalkIn: "Visible demand.",
      mapsQuery: "Plaza Tire and Auto Charlotte NC",
      routeOrder: 2,
    },
    {
      name: "Park Road Service Center",
      niche: "Auto",
      city: "Charlotte, NC",
      rating: 4.8,
      reviewCount: 312,
      leakSignals: ["Callbacks in reviews", "Owner-operated"],
      whyWalkIn: "High volume.",
      mapsQuery: "Park Road Service Center Charlotte NC",
      routeOrder: 3,
    },
    {
      name: "South End Detail Co.",
      niche: "Detailing",
      city: "Charlotte, NC",
      rating: 4.9,
      reviewCount: 86,
      leakSignals: ["DM booking", "Lumpy reviews"],
      whyWalkIn: "Premium local.",
      mapsQuery: "South End car detailing Charlotte NC",
      routeOrder: 4,
    },
    {
      name: "NoDa Family Dentistry",
      niche: "Dental",
      city: "Charlotte, NC",
      rating: 4.6,
      reviewCount: 198,
      leakSignals: ["Form only", "Front-desk wait"],
      whyWalkIn: "High appointment value.",
      mapsQuery: "NoDa Family Dentistry Charlotte NC",
      routeOrder: 5,
    },
    {
      name: "Eastway Animal Clinic",
      niche: "Vet",
      city: "Charlotte, NC",
      rating: 4.4,
      reviewCount: 167,
      leakSignals: ["Phone-first", "Callback complaints"],
      whyWalkIn: "Callbacks are the leak.",
      mapsQuery: "Eastway Animal Clinic Charlotte NC",
      routeOrder: 6,
    },
  ],
  assessmentScript: {
    minutes0to2: "Walk me through what happens after a new lead comes in.",
    minutes2to6: "Find the leak.",
    minutes6to10: "Score 1-5.",
    minutes10to13: "One concrete fix.",
    minutes13to15: "Offer the paid assessment.",
  },
  playbook: [
    "Pick one niche.",
    "Speak with five owners.",
    "Confirm today's process.",
    "Sell one founding pilot.",
    "Collect setup first.",
    "Install only required workflows.",
    "Track the numbers.",
    "Send a scorecard.",
    "Document the checklist.",
    "Raise on proof.",
  ],
  nicheAdvice: "Start with independently operated service businesses.",
};

test("kit schema accepts a complete operator kit", () => {
  const parsed = kitSchema.parse(kit);
  assert.equal(parsed.brandName, "Signal Local");
  assert.equal(parsed.prospects.length, 6);
  assert.equal(parsed.candidateServices.filter((s) => s.selected).length, 2);
});

test("extractJson handles fenced blocks and leading prose", () => {
  const inner = JSON.stringify({ brandName: "X" });
  assert.deepEqual(extractJson("here you go\n```json\n" + inner + "\n```"), { brandName: "X" });
  assert.deepEqual(extractJson('noise {"brandName":"Y"} trailing'), { brandName: "Y" });
});

test("parseKit coerces 3-step arrays from model JSON", () => {
  const parsed = parseKit(JSON.stringify(kit));
  assert.equal(parsed.offer.name, "Local Lead and Reputation Engine");
  assert.equal(parsed.pitch.threeSteps.length, 3);
  assert.equal(parsed.site.steps.length, 3);
});
