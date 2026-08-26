import { STAGES } from "./stages";
import type { Kit, Venture } from "./types";
import { fieldCounts } from "./stats";

function formatMoney(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function kitToMarkdown(venture: Venture): string {
  const { brief, kit, field, notes } = venture;
  const lines: string[] = [];
  lines.push(`# ${kit?.brandName ?? "Untitled venture"}`);
  lines.push("");
  lines.push(`> ${kit?.tagline ?? "The thing you wanted."}`);
  lines.push("");
  lines.push(`_COREY — idea to first sales conversation. Generated ${new Date(venture.updatedAt).toUTCString()}._`);
  lines.push("");
  lines.push("## Brief");
  lines.push("");
  lines.push(`- Operator: ${brief.operatorName || "—"}`);
  lines.push(`- Idea: ${brief.idea}`);
  lines.push(`- Location: ${brief.location}${brief.neighborhood ? ` (${brief.neighborhood})` : ""}`);
  if (brief.nicheHint) lines.push(`- Niche hint: ${brief.nicheHint}`);
  if (brief.constraints) lines.push(`- Constraints: ${brief.constraints}`);
  lines.push("");

  if (!kit) {
    lines.push("_Kit not generated yet._");
    return lines.join("\n");
  }

  lines.push("## The leak");
  lines.push("");
  lines.push(kit.problemHeadline);
  lines.push("");
  lines.push(kit.whyCloseToRevenue);
  lines.push("");
  for (const leak of kit.leaks) {
    lines.push(`### ${leak.name}`);
    lines.push("");
    lines.push(leak.description);
    lines.push("");
    lines.push(`- Owner pain: ${leak.ownerPain}`);
    lines.push(`- Dollar shape: ${leak.dollarShape}`);
    lines.push("");
  }

  lines.push("## Candidate services");
  lines.push("");
  for (const s of kit.candidateServices) {
    lines.push(`- **${s.name}**${s.selected ? " (bundled)" : ""} — ${s.description} _${s.whyItSells}_`);
  }
  lines.push("");

  lines.push(`## Offer — ${kit.offer.name}`);
  lines.push("");
  lines.push(kit.offer.promise);
  lines.push("");
  lines.push("Included:");
  for (const item of kit.offer.included) lines.push(`- ${item}`);
  lines.push("");
  lines.push(`Guarantee: ${kit.offer.guarantee}`);
  lines.push("");
  lines.push("Not included:");
  for (const item of kit.offer.notIncluded) lines.push(`- ${item}`);
  lines.push("");

  lines.push("## Pitch");
  lines.push("");
  lines.push(`**One-liner:** ${kit.pitch.oneLiner}`);
  lines.push("");
  lines.push(`**Door opener:** ${kit.pitch.doorOpener}`);
  lines.push("");
  kit.pitch.threeSteps.forEach((step, i) => {
    lines.push(`${i + 1}. ${step}`);
  });
  lines.push("");
  lines.push("Objections:");
  lines.push("");
  for (const h of kit.pitch.objectionHandles) {
    lines.push(`- **${h.objection}** — ${h.reply}`);
  }
  lines.push("");

  lines.push("## Stack");
  lines.push("");
  lines.push(kit.stack.platform);
  lines.push("");
  lines.push(kit.stack.positioning);
  lines.push("");
  lines.push("Operator owns:");
  for (const item of kit.stack.operatorOwns) lines.push(`- ${item}`);
  lines.push("");
  lines.push("Client keeps:");
  for (const item of kit.stack.clientOwns) lines.push(`- ${item}`);
  lines.push("");

  const cur = kit.pricing.currency;
  lines.push("## Price");
  lines.push("");
  lines.push(
    `Founding: ${formatMoney(kit.pricing.foundingSetup, cur)} setup + ${formatMoney(kit.pricing.foundingMonthly, cur)} / month. ${kit.pricing.foundingTerms}`,
  );
  lines.push("");
  lines.push(
    `Later: ${formatMoney(kit.pricing.laterSetupMin, cur)}–${formatMoney(kit.pricing.laterSetupMax, cur)} setup, ${formatMoney(kit.pricing.laterMonthlyMin, cur)}–${formatMoney(kit.pricing.laterMonthlyMax, cur)} / month.`,
  );
  lines.push("");
  lines.push(kit.pricing.whenToRaise);
  lines.push("");
  lines.push(`Avoid: ${kit.pricing.avoid}`);
  lines.push("");

  lines.push("## Site");
  lines.push("");
  lines.push(`# ${kit.site.brandName}`);
  lines.push(kit.site.tagline);
  lines.push("");
  lines.push(kit.site.hero);
  lines.push("");
  lines.push(kit.site.subhead);
  lines.push("");
  kit.site.steps.forEach((s, i) => lines.push(`${i + 1}. ${s}`));
  lines.push("");
  lines.push(`CTA: ${kit.site.cta}`);
  lines.push(kit.site.footerNote);
  lines.push("");

  lines.push("## Walk-in list");
  lines.push("");
  lines.push(
    "Public signals only. A missing website is a prospecting signal, not proof they lack a CRM. Verify before you walk in.",
  );
  lines.push("");
  const ordered = [...kit.prospects].sort((a, b) => a.routeOrder - b.routeOrder);
  for (const p of ordered) {
    lines.push(
      `${p.routeOrder}. **${p.name}** — ${p.niche}, ${p.city}. ${p.rating}★ / ${p.reviewCount} reviews.`,
    );
    lines.push(`   Leaks: ${p.leakSignals.join("; ")}`);
    lines.push(`   Why: ${p.whyWalkIn}`);
    lines.push(`   Maps: ${p.mapsQuery}`);
    lines.push("");
  }

  lines.push("## Fifteen-minute assessment");
  lines.push("");
  lines.push(`- 0–2: ${kit.assessmentScript.minutes0to2}`);
  lines.push(`- 2–6: ${kit.assessmentScript.minutes2to6}`);
  lines.push(`- 6–10: ${kit.assessmentScript.minutes6to10}`);
  lines.push(`- 10–13: ${kit.assessmentScript.minutes10to13}`);
  lines.push(`- 13–15: ${kit.assessmentScript.minutes13to15}`);
  lines.push("");

  lines.push("## Playbook");
  lines.push("");
  kit.playbook.forEach((step, i) => lines.push(`${i + 1}. ${step}`));
  lines.push("");
  lines.push(kit.nicheAdvice);
  lines.push("");

  if (notes) {
    lines.push("## Operator notes");
    lines.push("");
    lines.push(notes);
    lines.push("");
  }

  if (field.length) {
    const c = fieldCounts(field);
    lines.push("## Field");
    lines.push("");
    lines.push(
      `Doors ${c.doors} · conversations ${c.conversations} · assessments ${c.assessments} · paid ${c.paid} · concierge ${c.concierge}`,
    );
    lines.push("");
    for (const e of field) {
      lines.push(`- ${e.at.slice(0, 10)} · ${e.kind}${e.prospectName ? ` · ${e.prospectName}` : ""}${e.note ? ` — ${e.note}` : ""}`);
    }
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push(
    "Method: Corey Ganim. AI compresses the blank page. It does not walk through the door for you.",
  );
  lines.push(`Stages: ${STAGES.map((s) => s.label).join(" → ")}`);
  lines.push("");
  return lines.join("\n");
}

export function prospectsToCsv(kit: Kit): string {
  const header = [
    "routeOrder",
    "name",
    "niche",
    "city",
    "rating",
    "reviewCount",
    "leakSignals",
    "whyWalkIn",
    "mapsQuery",
  ];
  const rows = [...kit.prospects]
    .sort((a, b) => a.routeOrder - b.routeOrder)
    .map((p) =>
      [
        p.routeOrder,
        csv(p.name),
        csv(p.niche),
        csv(p.city),
        p.rating,
        p.reviewCount,
        csv(p.leakSignals.join(" | ")),
        csv(p.whyWalkIn),
        csv(p.mapsQuery),
      ].join(","),
    );
  return [header.join(","), ...rows].join("\n");
}

function csv(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function ventureToJson(venture: Venture) {
  return JSON.stringify(venture, null, 2);
}
