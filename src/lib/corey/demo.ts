import type { Kit, Venture } from "./types";

export const SIGNAL_LOCAL_KIT: Kit = {
  brandName: "Signal Local",
  tagline: "Turn every local lead into momentum.",
  problemHeadline:
    "Missed calls and ignored inquiries become lost appointments. Completed jobs without a review request become lost reputation.",
  whyCloseToRevenue:
    "Both leaks already exist inside the business. You are not selling an abstract AI transformation. You are showing the owner where leads die and where good work disappears without public proof.",
  leaks: [
    {
      name: "Missed-call leakage",
      description:
        "Inbound calls that hit voicemail during jobs, lunch, or after hours never get a fast text-back.",
      ownerPain: "The owner knows people called. They do not know who, or whether those people booked somewhere else.",
      dollarShape: "Each recovered appointment is a job ticket. Speed-to-lead is the whole game.",
    },
    {
      name: "Inquiry rot",
      description:
        "Website forms, Facebook messages, and Instagram DMs sit unanswered until the lead has gone cold.",
      ownerPain: "Staff treat the inbox as optional. The owner treats it as 'we were busy.'",
      dollarShape: "A quote that never goes out is revenue that never exists.",
    },
    {
      name: "Silent completions",
      description:
        "Jobs finish. Nobody asks for the Google review. Reputation grows only by accident.",
      ownerPain: "They have the work. They do not have the proof. New customers never see it.",
      dollarShape: "Reviews compound demand. A 4.7 with 140 reviews is a moat if you keep feeding it.",
    },
  ],
  candidateServices: [
    {
      name: "Appointment recovery",
      description: "Instant text-back for missed calls and a callback or booking path.",
      whyItSells: "The owner already feels this pain every day.",
      selected: true,
    },
    {
      name: "Review growth",
      description: "Automated review requests after completed jobs, tied to the Google profile.",
      whyItSells: "Reputation is visible, measurable, and close to future demand.",
      selected: true,
    },
    {
      name: "Local content engine",
      description: "A weekly cadence of neighborhood-specific posts and service pages.",
      whyItSells: "Useful later. Harder to sell on the first walk-in.",
      selected: false,
    },
    {
      name: "Estimate follow-up",
      description: "A sequence that follows unclosed quotes until they book or decline.",
      whyItSells: "Strong for trades with long quote cycles.",
      selected: false,
    },
    {
      name: "Front-desk chat assistant",
      description: "A simple after-hours assistant that captures intent and books or hands off.",
      whyItSells: "Sounds like AI. Owners hear 'chatbot' and stall.",
      selected: false,
    },
  ],
  offer: {
    name: "Local Lead and Reputation Engine",
    promise:
      "We help local businesses turn missed calls and new inquiries into booked appointments, then automatically turn happy customers into five-star reviews without adding work for their team.",
    included: [
      "Instant text-back for missed calls",
      "Immediate follow-up for website and social inquiries",
      "A simple booking or callback flow",
      "Appointment reminders",
      "Automated review requests after a completed job",
      "A monthly scorecard showing activity and results",
      "Done-for-you setup and ongoing management",
    ],
    guarantee: "Seven-day setup. Setup fee refunded if the system is not ready on time.",
    notIncluded: [
      "Replacing their existing CRM if they actually use one",
      "Running ads",
      "A custom app",
      "Anything that requires their staff to learn a new daily tool",
    ],
  },
  pitch: {
    oneLiner:
      "We help local businesses turn missed calls and new inquiries into booked appointments, then automatically turn happy customers into five-star reviews without adding work for your team.",
    threeSteps: [
      "We install missed-call text-back and instant follow-up so every lead gets a fast response.",
      "We connect a simple booking flow and reminders so more people actually schedule.",
      "After each job, we automate review requests to grow the business's Google rating.",
    ],
    doorOpener:
      "I help shops like yours stop losing jobs to voicemail and turn finished work into Google reviews. Can I ask what happens after a new lead comes in?",
    objectionHandles: [
      {
        objection: "We already have a system for that.",
        reply:
          "Good. I don't replace it. I add a managed response and review layer around it. If it's actually catching missed calls and asking for reviews, I should leave. Most shops have the login and not the process.",
      },
      {
        objection: "I don't have time for another tool.",
        reply:
          "That's the offer. Your team keeps two jobs: answer hot leads and mark jobs complete. Everything else runs behind the scenes.",
      },
      {
        objection: "How much?",
        reply:
          "Founding clients: $750 to set it up, $500 a month, cancel after 90 days. I collect the setup before I build. If I'm not live in seven days, the setup comes back.",
      },
      {
        objection: "I need to think about it.",
        reply:
          "Fair. The useful next step is a free 15-minute walkthrough of what happens after a new lead comes in. No pitch deck. Just the leak.",
      },
    ],
  },
  stack: {
    platform: "One platform as the back-end layer (GoHighLevel or equivalent).",
    operatorOwns: [
      "Missed-call text-back",
      "Shared inbox for new leads",
      "Follow-up messages",
      "Booking-link connection",
      "Review requests tied to the client's Google profile",
      "Monthly scorecard",
    ],
    clientOwns: ["Respond to hot leads", "Mark jobs or visits complete"],
    positioning:
      "We don't replace your current systems. We add a managed response and review layer around them.",
  },
  pricing: {
    currency: "USD",
    foundingSetup: 750,
    foundingMonthly: 500,
    foundingTerms: "Cancel anytime after 90 days. Setup collected before build.",
    laterSetupMin: 1500,
    laterSetupMax: 2500,
    laterMonthlyMin: 750,
    laterMonthlyMax: 1250,
    whenToRaise:
      "After the first verified result: you know what a recovered appointment is worth, how many leads the system touches, and how reliably it performs.",
    avoid:
      "Do not start with pay-per-lead. It adds attribution fights before you have proof, data, or a baseline.",
  },
  site: {
    brandName: "Signal Local",
    tagline: "Turn every local lead into momentum.",
    hero: "Missed calls are missed jobs. Finished work should become five-star proof.",
    subhead:
      "We install a managed response and review layer around the way your shop already works. Your team does not learn a new tool.",
    steps: [
      "Respond to missed calls and new inquiries quickly.",
      "Follow up until a lead books or speaks with the team.",
      "Ask satisfied customers for Google reviews.",
    ],
    included: [
      "Missed-call text-back",
      "Inquiry follow-up",
      "Booking or callback flow",
      "Reminders",
      "Review requests",
      "Monthly scorecard",
      "Done-for-you setup",
    ],
    cta: "Book a 15-minute leak walkthrough",
    footerNote: "Setup in seven days. Founding clients: $750 setup, $500 / month.",
  },
  prospects: [
    {
      name: "King Auto Repair",
      niche: "Independent auto repair",
      city: "Charlotte, NC",
      rating: 4.5,
      reviewCount: 251,
      leakSignals: [
        "No website link displayed on Google Maps at time of research",
        "Strong review volume with no obvious online booking path",
      ],
      whyWalkIn:
        "Real demand, established reputation, no obvious quote or book path. Help them ask for reviews consistently and respond when a negative one lands.",
      mapsQuery: "King Auto Repair Charlotte NC",
      routeOrder: 1,
    },
    {
      name: "Plaza Tire and Auto",
      niche: "Tires and auto service",
      city: "Charlotte, NC",
      rating: 4.7,
      reviewCount: 140,
      leakSignals: [
        "No website link displayed on Google Maps at time of research",
        "High rating, mid-size review base that can still compound",
      ],
      whyWalkIn:
        "Demand is visible. The online path to a quote or appointment is not. Classic leak pattern.",
      mapsQuery: "Plaza Tire and Auto Charlotte NC",
      routeOrder: 2,
    },
    {
      name: "Park Road Service Center",
      niche: "Independent auto repair",
      city: "Charlotte, NC",
      rating: 4.8,
      reviewCount: 312,
      leakSignals: [
        "Owner-operated feel",
        "Reviews mention wait times and callbacks",
      ],
      whyWalkIn:
        "High trust, high volume. Callbacks and review requests are the conversation, not 'AI.'",
      mapsQuery: "Park Road Service Center Charlotte NC",
      routeOrder: 3,
    },
    {
      name: "South End Detail Co.",
      niche: "Auto detailing",
      city: "Charlotte, NC",
      rating: 4.9,
      reviewCount: 86,
      leakSignals: [
        "Booking appears to run through DMs and phone",
        "Review velocity is lumpy",
      ],
      whyWalkIn:
        "Premium local service. Missed DMs are missed calendar slots. Reviews should be a machine, not a mood.",
      mapsQuery: "South End car detailing Charlotte NC",
      routeOrder: 4,
    },
    {
      name: "NoDa Family Dentistry",
      niche: "Dental practice",
      city: "Charlotte, NC",
      rating: 4.6,
      reviewCount: 198,
      leakSignals: [
        "New-patient path is a form with no after-hours text-back",
        "Reviews mention front-desk wait",
      ],
      whyWalkIn:
        "Appointment value is high. A missed new-patient call is a four-figure leak.",
      mapsQuery: "NoDa Family Dentistry Charlotte NC",
      routeOrder: 5,
    },
    {
      name: "Eastway Animal Clinic",
      niche: "Veterinary clinic",
      city: "Charlotte, NC",
      rating: 4.4,
      reviewCount: 167,
      leakSignals: [
        "Phone-first booking",
        "Negative reviews cluster around callbacks",
      ],
      whyWalkIn:
        "Callbacks are the leak. Review replies are the second conversation.",
      mapsQuery: "Eastway Animal Clinic Charlotte NC",
      routeOrder: 6,
    },
    {
      name: "Commonwealth HVAC",
      niche: "Residential HVAC",
      city: "Charlotte, NC",
      rating: 4.7,
      reviewCount: 223,
      leakSignals: [
        "Estimate follow-up looks manual",
        "Website is brochure-thin",
      ],
      whyWalkIn:
        "Seasonal spikes punish slow follow-up. Quotes that sit are jobs that leave.",
      mapsQuery: "Commonwealth HVAC Charlotte NC",
      routeOrder: 7,
    },
    {
      name: "Plaza Midwood House Cleaners",
      niche: "Residential cleaning",
      city: "Charlotte, NC",
      rating: 4.8,
      reviewCount: 74,
      leakSignals: [
        "Leads appear to arrive via Instagram and voicemail",
        "No obvious recapture of one-off deep cleans into recurring",
      ],
      whyWalkIn:
        "Owner-operated, physical, inbound. Recurring revenue hides behind a missed text.",
      mapsQuery: "house cleaning Plaza Midwood Charlotte NC",
      routeOrder: 8,
    },
    {
      name: "Sugar Creek Lawn Co.",
      niche: "Lawn and landscape",
      city: "Charlotte, NC",
      rating: 4.5,
      reviewCount: 91,
      leakSignals: [
        "Quote requests via Facebook",
        "Review asks are inconsistent after spring rush",
      ],
      whyWalkIn:
        "Visible trucks, visible demand, quiet follow-up. Walk the lot, not the DMs first.",
      mapsQuery: "Sugar Creek lawn care Charlotte NC",
      routeOrder: 9,
    },
    {
      name: "Dilworth Plumbing Co.",
      niche: "Residential plumbing",
      city: "Charlotte, NC",
      rating: 4.6,
      reviewCount: 154,
      leakSignals: [
        "Emergency calls after hours",
        "Website contact form with no SMS path",
      ],
      whyWalkIn:
        "After-hours voicemail is a competing plumber's next job. Text-back is the offer.",
      mapsQuery: "Dilworth Plumbing Charlotte NC",
      routeOrder: 10,
    },
  ],
  assessmentScript: {
    minutes0to2:
      "Walk me through what happens after a new lead comes in. Phone, form, Facebook, walk-in — start at the first signal and talk me through the next ten minutes.",
    minutes2to6:
      "Find where leads fall through. Who owns that step? How long does it take? How often does it happen? What is a missed follow-up worth in a real job ticket?",
    minutes6to10:
      "Score the problem from 1–5 on frequency, dollar cost, and ease of fix. Write the score in their words, not yours.",
    minutes10to13:
      "Recommend one fix. Not an AI transformation. Something concrete: texting back missed callers, following up on quotes, or sending each lead to the right person.",
    minutes13to15:
      "I can map the whole process and give you a step-by-step fix. Want me to send you the paid assessment?",
  },
  playbook: [
    "Pick one niche with frequent inbound calls and valuable appointments.",
    "Speak with five owners before making the offer more complicated.",
    "Confirm how missed calls, web inquiries, booking, and reviews work today.",
    "Sell one transparent founding-client pilot.",
    "Collect the setup fee before building the full system.",
    "Install only the workflows required for that client's process.",
    "Track response time, conversations, bookings, review requests, and reviews generated.",
    "Send the client a simple monthly scorecard.",
    "Document every setup step as a reusable checklist.",
    "Turn the first verified result into proof, then raise the price.",
  ],
  nicheAdvice:
    "Start with independently operated service businesses that have visible demand, a physical location you can walk into, and a weak or missing online booking path. Auto, home services, dental, and vet clinics are the easiest first conversations because a missed lead has an obvious dollar value.",
};

export const SIGNAL_LOCAL_VENTURE: Venture = {
  id: "signal-local",
  createdAt: "2026-08-13T14:21:57.000Z",
  updatedAt: "2026-08-13T14:46:00.000Z",
  status: "ready",
  isDemo: true,
  brief: {
    operatorName: "Corey",
    idea: "Help a completely non-technical operator build an AI services business from scratch, sold to local businesses.",
    location: "Charlotte, NC",
    neighborhood: "near my neighborhood in Charlotte",
    nicheHint: "Independently operated service businesses with inbound calls",
    constraints:
      "Non-technical operator. Must be sellable on a walk-in. Fulfillment cannot require the client to learn several new tools.",
  },
  kit: SIGNAL_LOCAL_KIT,
  field: [
    {
      id: "demo-note-1",
      at: "2026-08-13T14:46:00.000Z",
      kind: "note",
      prospectName: "",
      note: "Kit complete. Not a proven business — enough to walk in tomorrow with something specific to pitch.",
    },
  ],
  notes: "Source experiment: Corey Ganim, 13 Aug 2026. Twenty-five minutes from blank page to walk-in list.",
};
