import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Download,
  MapPin,
  Pause,
  Play,
  Plus,
  Trash2,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { speakPitch } from "@/lib/ai/generate";
import { kitToMarkdown, prospectsToCsv, ventureToJson } from "@/lib/corey/export";
import { fieldCounts } from "@/lib/corey/stats";
import { useCorey } from "@/lib/corey/store";
import type { FieldEventKind, Kit, StageId, Venture } from "@/lib/corey/types";
import { downloadText, formatMoney, mapsUrl } from "@/lib/utils";

function Panel({
  kicker,
  title,
  children,
  actions,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] bg-bone/80 p-5 shadow-[var(--shadow-border)] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mute">{kicker}</p>
          <h2 className="mt-1 font-display text-3xl font-medium tracking-[-0.03em] text-ink">{title}</h2>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function BriefPanel({ venture }: { venture: Venture }) {
  const patchBrief = useCorey((s) => s.patchBrief);
  const b = venture.brief;
  return (
    <Panel kicker="00 · The starting point" title="Do not ask for more ideas. Start from this.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Operator" value={b.operatorName} onChange={(v) => patchBrief(venture.id, { operatorName: v })} />
        <Field label="City / region" value={b.location} onChange={(v) => patchBrief(venture.id, { location: v })} />
        <Field
          label="Neighborhood / route start"
          value={b.neighborhood}
          onChange={(v) => patchBrief(venture.id, { neighborhood: v })}
        />
        <Field label="Niche hint" value={b.nicheHint} onChange={(v) => patchBrief(venture.id, { nicheHint: v })} />
        <div className="sm:col-span-2">
          <Field
            label="Starting point"
            value={b.idea}
            multiline
            onChange={(v) => patchBrief(venture.id, { idea: v })}
          />
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Constraints"
            value={b.constraints}
            multiline
            onChange={(v) => patchBrief(venture.id, { constraints: v })}
          />
        </div>
      </div>
    </Panel>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block space-y-2">
      <Label>{label}</Label>
      {multiline ? (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

export function ProblemsPanel({ kit }: { kit: Kit }) {
  return (
    <Panel kicker="01 · Close to revenue" title={kit.problemHeadline}>
      <p className="max-w-2xl text-base leading-relaxed text-ink-soft">{kit.whyCloseToRevenue}</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {kit.leaks.map((leak) => (
          <li key={leak.name} className="rounded-2xl bg-paper p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-leak">Leak</p>
            <h3 className="mt-2 font-display text-xl font-medium">{leak.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{leak.description}</p>
            <p className="mt-4 text-sm">
              <span className="text-mute">Owner: </span>
              {leak.ownerPain}
            </p>
            <p className="mt-2 text-sm">
              <span className="text-mute">Dollar: </span>
              {leak.dollarShape}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mute">Five services. Bundle two.</p>
        <ul className="mt-3 divide-y divide-line">
          {kit.candidateServices.map((s) => (
            <li key={s.name} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="font-medium">
                  {s.name}{" "}
                  {s.selected ? (
                    <Badge tone="forest" className="ml-2">
                      Bundled
                    </Badge>
                  ) : null}
                </p>
                <p className="text-sm text-ink-soft">{s.description}</p>
              </div>
              <p className="text-sm text-mute sm:max-w-xs sm:text-right">{s.whyItSells}</p>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

export function OfferPanel({ kit }: { kit: Kit }) {
  return (
    <Panel
      kicker="02 · Two outcomes, one promise"
      title={kit.offer.name}
      actions={<CopyButton text={kit.offer.promise} label="Copy promise" />}
    >
      <p className="max-w-3xl font-display text-2xl leading-snug tracking-[-0.02em] text-ink">
        {kit.offer.promise}
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mute">Included</p>
          <ul className="mt-3 space-y-2">
            {kit.offer.included.map((item) => (
              <li key={item} className="text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mute">Not this</p>
          <ul className="mt-3 space-y-2">
            {kit.offer.notIncluded.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-ink-soft">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl bg-paper p-4 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-forest">Guarantee</p>
            <p className="mt-2 text-sm leading-relaxed">{kit.offer.guarantee}</p>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function PitchPanel({ kit }: { kit: Kit }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const script = useMemo(() => {
    return [kit.pitch.oneLiner, ...kit.pitch.threeSteps].join(" ");
  }, [kit.pitch]);

  async function hear() {
    if (playing && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    try {
      setPlaying(true);
      const result = await speakPitch({ data: { text: script.slice(0, 680) } });
      if (!result.ok) {
        toast.error(result.error);
        setPlaying(false);
        return;
      }
      const url = `data:${result.mime};base64,${result.base64}`;
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setPlaying(false);
      await audio.play();
    } catch {
      toast.error("Could not play pitch");
      setPlaying(false);
    }
  }

  return (
    <Panel
      kicker="03 · Say it at the desk"
      title="If this takes five minutes, it is still too complicated."
      actions={
        <>
          <Button type="button" variant="outline" size="sm" onClick={hear}>
            {playing ? <Pause /> : <Play />}
            {playing ? "Stop" : "Hear the pitch"}
          </Button>
          <CopyButton text={script} label="Copy pitch" />
        </>
      }
    >
      <blockquote className="max-w-3xl font-display text-2xl leading-snug tracking-[-0.02em]">
        {kit.pitch.oneLiner}
      </blockquote>
      <p className="mt-4 max-w-2xl text-sm italic text-ink-soft">{kit.pitch.doorOpener}</p>
      <ol className="mt-8 grid gap-3">
        {kit.pitch.threeSteps.map((step, i) => (
          <li key={step} className="flex gap-4 rounded-2xl bg-paper p-4 shadow-[var(--shadow-border)]">
            <span className="font-mono text-sm text-mute">0{i + 1}</span>
            <p className="text-sm leading-relaxed sm:text-base">{step}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mute">Objections</p>
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          {kit.pitch.objectionHandles.map((h) => (
            <li key={h.objection} className="rounded-2xl bg-paper p-4 shadow-[var(--shadow-border)]">
              <p className="text-sm font-medium">{h.objection}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{h.reply}</p>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

export function StackPanel({ kit }: { kit: Kit }) {
  return (
    <Panel kicker="04 · Behind the scenes" title={kit.stack.platform}>
      <p className="max-w-2xl text-base leading-relaxed">{kit.stack.positioning}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-paper p-5 shadow-[var(--shadow-border)]">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mute">You run</p>
          <ul className="mt-3 space-y-2">
            {kit.stack.operatorOwns.map((item) => (
              <li key={item} className="text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-paper p-5 shadow-[var(--shadow-border)]">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-forest">They keep</p>
          <ul className="mt-3 space-y-2">
            {kit.stack.clientOwns.map((item) => (
              <li key={item} className="text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}

export function PricePanel({ kit }: { kit: Kit }) {
  const c = kit.pricing.currency;
  return (
    <Panel kicker="05 · Pilot before proof" title="A number you can say out loud.">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[22px] bg-ink p-6 text-bone">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-bone/60">Founding client</p>
          <p className="mt-4 font-display text-4xl tracking-[-0.03em]">
            {formatMoney(kit.pricing.foundingSetup, c)}
            <span className="ml-2 text-lg text-bone/60">setup</span>
          </p>
          <p className="mt-2 font-display text-3xl tracking-[-0.03em]">
            {formatMoney(kit.pricing.foundingMonthly, c)}
            <span className="ml-2 text-lg text-bone/60">/ month</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-bone/75">{kit.pricing.foundingTerms}</p>
        </div>
        <div className="rounded-[22px] bg-paper p-6 shadow-[var(--shadow-border)]">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-mute">After proof</p>
          <p className="mt-4 font-display text-3xl tracking-[-0.03em]">
            {formatMoney(kit.pricing.laterSetupMin, c)}–{formatMoney(kit.pricing.laterSetupMax, c)}
            <span className="ml-2 text-lg text-mute">setup</span>
          </p>
          <p className="mt-2 font-display text-2xl tracking-[-0.03em]">
            {formatMoney(kit.pricing.laterMonthlyMin, c)}–{formatMoney(kit.pricing.laterMonthlyMax, c)}
            <span className="ml-2 text-lg text-mute">/ month</span>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{kit.pricing.whenToRaise}</p>
        </div>
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-leak">{kit.pricing.avoid}</p>
    </Panel>
  );
}

export function SitePanel({ kit, ventureId }: { kit: Kit; ventureId: string }) {
  return (
    <Panel
      kicker="06 · Minimum sales asset"
      title="Ninety percent is enough to walk in."
      actions={
        <Button asChild variant="ink" size="sm">
          <Link to="/s/$slug" params={{ slug: ventureId }}>
            Open the site <ArrowUpRight />
          </Link>
        </Button>
      }
    >
      <div className="overflow-hidden rounded-[22px] bg-ink text-bone">
        <div className="border-b border-white/10 px-6 py-4">
          <p className="font-display text-lg">{kit.site.brandName}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-bone/50">{kit.site.tagline}</p>
        </div>
        <div className="px-6 py-8 sm:px-10">
          <h3 className="max-w-xl font-display text-3xl leading-tight tracking-[-0.03em] sm:text-4xl">
            {kit.site.hero}
          </h3>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-bone/70">{kit.site.subhead}</p>
          <div className="mt-8 inline-flex rounded-full bg-forest-fg px-4 py-2 text-sm font-medium text-ink">
            {kit.site.cta}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-mute">{kit.site.footerNote}</p>
    </Panel>
  );
}

export function ProspectsPanel({ kit }: { kit: Kit }) {
  const ordered = [...kit.prospects].sort((a, b) => a.routeOrder - b.routeOrder);
  return (
    <Panel
      kicker="07 · Visible demand, visible leak"
      title="A walk-in list. Not a TAM slide."
      actions={
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => downloadText("walk-ins.csv", prospectsToCsv(kit), "text/csv")}
        >
          <Download />
          CSV
        </Button>
      }
    >
      <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
        Public signals only. A missing website is a prospecting signal, not proof they lack a CRM. Verify
        before you walk in. Route is closest to farthest from the neighborhood in the brief.
      </p>
      <ol className="mt-6 grid gap-3">
        {ordered.map((p) => (
          <li
            key={`${p.routeOrder}-${p.name}`}
            className="rounded-2xl bg-paper p-4 shadow-[var(--shadow-border)] sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[0.65rem] text-mute">
                  {String(p.routeOrder).padStart(2, "0")} · {p.niche}
                </p>
                <h3 className="mt-1 font-display text-xl font-medium">{p.name}</h3>
                <p className="text-sm text-mute">
                  {p.city} · {p.rating.toFixed(1)}★ · {p.reviewCount} reviews
                </p>
              </div>
              <a
                className="inline-flex h-11 items-center gap-2 rounded-[10px] px-3 text-sm text-forest no-underline shadow-[0_0_0_1px_var(--color-forest)]"
                href={mapsUrl(p.mapsQuery)}
                target="_blank"
                rel="noreferrer"
              >
                <MapPin className="size-4" />
                Maps
              </a>
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.leakSignals.map((s) => (
                <li key={s}>
                  <Badge tone="leak">{s}</Badge>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.whyWalkIn}</p>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

const SCRIPT_BEATS = [
  { key: "minutes0to2" as const, clock: "0–2", label: "Open" },
  { key: "minutes2to6" as const, clock: "2–6", label: "Find the leak" },
  { key: "minutes6to10" as const, clock: "6–10", label: "Score it" },
  { key: "minutes10to13" as const, clock: "10–13", label: "One fix" },
  { key: "minutes13to15" as const, clock: "13–15", label: "The ask" },
];

export function ScriptPanel({ kit }: { kit: Kit }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<number | null>(null);

  function toggle() {
    if (running) {
      if (timer.current) window.clearInterval(timer.current);
      setRunning(false);
      return;
    }
    setRunning(true);
    timer.current = window.setInterval(() => {
      setSeconds((s) => (s >= 15 * 60 ? s : s + 1));
    }, 1000);
  }

  function reset() {
    if (timer.current) window.clearInterval(timer.current);
    setRunning(false);
    setSeconds(0);
  }

  const minute = seconds / 60;
  const active =
    minute < 2 ? 0 : minute < 6 ? 1 : minute < 10 ? 2 : minute < 13 ? 3 : 4;

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <Panel
      kicker="08 · Fifteen minutes"
      title="A free assessment you can explain at the desk."
      actions={
        <>
          <Button type="button" variant="ink" size="sm" onClick={toggle}>
            {running ? <Pause /> : <Play />}
            {running ? "Pause" : "Start 15:00"}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={reset}>
            Reset
          </Button>
        </>
      }
    >
      <p className="font-mono text-4xl tabular-nums tracking-tight">
        {mm}:{ss}
      </p>
      <ol className="mt-6 grid gap-3">
        {SCRIPT_BEATS.map((beat, i) => (
          <li
            key={beat.key}
            className={`rounded-2xl p-4 shadow-[var(--shadow-border)] ${
              i === active ? "bg-ink text-bone" : "bg-paper text-ink"
            }`}
          >
            <p className={`font-mono text-[0.65rem] uppercase tracking-[0.14em] ${i === active ? "text-bone/60" : "text-mute"}`}>
              {beat.clock} · {beat.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed sm:text-base">{kit.assessmentScript[beat.key]}</p>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

const FIELD_KINDS: { kind: FieldEventKind; label: string }[] = [
  { kind: "door", label: "Door" },
  { kind: "conversation", label: "Owner conversation" },
  { kind: "assessment", label: "Assessment booked" },
  { kind: "paid", label: "Paid assessment" },
  { kind: "concierge", label: "Concierge client" },
  { kind: "note", label: "Note" },
];

export function FieldPanel({ venture }: { venture: Venture }) {
  const add = useCorey((s) => s.addFieldEvent);
  const remove = useCorey((s) => s.removeFieldEvent);
  const [kind, setKind] = useState<FieldEventKind>("door");
  const [prospectName, setProspectName] = useState("");
  const [note, setNote] = useState("");
  const counts = fieldCounts(venture.field);

  return (
    <Panel kicker="09 · The part AI cannot do" title="Doors. Conversations. Proof.">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {(
          [
            ["Doors", counts.doors],
            ["Conversations", counts.conversations],
            ["Assessments", counts.assessments],
            ["Paid", counts.paid],
            ["Concierge", counts.concierge],
          ] as const
        ).map(([label, n]) => (
          <div key={label} className="rounded-2xl bg-paper p-4 shadow-[var(--shadow-border)]">
            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-mute">{label}</dt>
            <dd className="mt-1 font-display text-3xl tabular-nums">{n}</dd>
          </div>
        ))}
      </dl>
      <form
        className="mt-6 grid gap-3 rounded-2xl bg-paper p-4 shadow-[var(--shadow-border)] sm:grid-cols-[1fr_1fr_1fr_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          add(venture.id, { kind, prospectName, note });
          setNote("");
        }}
      >
        <label className="space-y-2">
          <Label>Event</Label>
          <select
            className="h-11 w-full rounded-[10px] bg-bone px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]"
            value={kind}
            onChange={(e) => setKind(e.target.value as FieldEventKind)}
          >
            {FIELD_KINDS.map((k) => (
              <option key={k.kind} value={k.kind}>
                {k.label}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <Label>Prospect</Label>
          <Input value={prospectName} onChange={(e) => setProspectName(e.target.value)} placeholder="Shop name" />
        </label>
        <label className="space-y-2">
          <Label>Note</Label>
          <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="What happened" />
        </label>
        <div className="flex items-end">
          <Button type="submit" className="w-full sm:w-auto">
            <Plus />
            Log
          </Button>
        </div>
      </form>
      <ul className="mt-6 divide-y divide-line">
        {venture.field.length === 0 ? (
          <li className="py-6 text-sm text-mute">No field events yet. The kit is not the business. The walk-in is.</li>
        ) : (
          venture.field.map((e) => (
            <li key={e.id} className="flex items-start justify-between gap-3 py-3">
              <div>
                <p className="text-sm font-medium">
                  {e.kind}
                  {e.prospectName ? ` · ${e.prospectName}` : ""}
                </p>
                <p className="text-sm text-ink-soft">{e.note || "—"}</p>
                <p className="mt-1 font-mono text-[0.65rem] text-mute">{new Date(e.at).toLocaleString()}</p>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => remove(venture.id, e.id)} aria-label="Remove">
                <Trash2 />
              </Button>
            </li>
          ))
        )}
      </ul>
    </Panel>
  );
}

export function PlaybookPanel({ kit }: { kit: Kit }) {
  return (
    <Panel kicker="10 · Experiment to business" title="Enough to start selling. Not enough to claim it works.">
      <ol className="space-y-3">
        {kit.playbook.map((step, i) => (
          <li key={step} className="flex gap-4 rounded-2xl bg-paper p-4 shadow-[var(--shadow-border)]">
            <span className="font-mono text-sm text-mute">{String(i + 1).padStart(2, "0")}</span>
            <p className="text-sm leading-relaxed sm:text-base">{step}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft">{kit.nicheAdvice}</p>
    </Panel>
  );
}

export function ExportBar({ venture }: { venture: Venture }) {
  return (
    <div className="no-print flex flex-wrap gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => downloadText(`${venture.kit?.brandName ?? "venture"}.md`, kitToMarkdown(venture), "text/markdown")}
      >
        <Download />
        Markdown
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => downloadText(`${venture.kit?.brandName ?? "venture"}.json`, ventureToJson(venture), "application/json")}
      >
        <Download />
        JSON
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => window.print()}>
        Print
      </Button>
    </div>
  );
}

export function StagePanel({
  stage,
  venture,
}: {
  stage: StageId;
  venture: Venture;
}) {
  if (stage === "brief") return <BriefPanel venture={venture} />;
  if (!venture.kit) {
    return (
      <Panel kicker="Not yet" title="Run the 25 minutes first.">
        <p className="text-sm text-ink-soft">The kit is generated from the brief. Nothing to show on this stage until then.</p>
      </Panel>
    );
  }
  const kit = venture.kit;
  switch (stage) {
    case "problems":
      return <ProblemsPanel kit={kit} />;
    case "offer":
      return <OfferPanel kit={kit} />;
    case "pitch":
      return <PitchPanel kit={kit} />;
    case "stack":
      return <StackPanel kit={kit} />;
    case "price":
      return <PricePanel kit={kit} />;
    case "site":
      return <SitePanel kit={kit} ventureId={venture.id} />;
    case "prospects":
      return <ProspectsPanel kit={kit} />;
    case "script":
      return <ScriptPanel kit={kit} />;
    case "field":
      return <FieldPanel venture={venture} />;
    case "playbook":
      return <PlaybookPanel kit={kit} />;
    default:
      return <BriefPanel venture={venture} />;
  }
}
