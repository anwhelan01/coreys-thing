import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Generating } from "@/components/generating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateKit } from "@/lib/ai/generate";
import { SIGNAL_LOCAL_VENTURE } from "@/lib/corey/demo";
import { useCorey } from "@/lib/corey/store";
import type { Brief } from "@/lib/corey/types";

export const Route = createFileRoute("/new")({ component: NewVenture });

const PRESETS: { label: string; brief: Brief }[] = [
  {
    label: "Local AI services · Charlotte",
    brief: SIGNAL_LOCAL_VENTURE.brief,
  },
  {
    label: "Trades follow-up · Manchester",
    brief: {
      operatorName: "",
      idea: "A non-technical operator selling a missed-call and quote-follow-up service to independent trades.",
      location: "Manchester, UK",
      neighborhood: "Ancoats",
      nicheHint: "Plumbers, electricians, HVAC",
      constraints: "Must be walk-in sellable. Client cannot be asked to learn a new CRM.",
    },
  },
  {
    label: "Clinic reputation · Chorley",
    brief: {
      operatorName: "",
      idea: "Help owner-led clinics recover missed new-patient calls and turn completed visits into Google reviews.",
      location: "Chorley, England",
      neighborhood: "town centre",
      nicheHint: "Dental, physio, vet",
      constraints: "Keep fulfillment on one platform. Founding price easy to say in GBP.",
    },
  },
];

function NewVenture() {
  const navigate = useNavigate();
  const createVenture = useCorey((s) => s.createVenture);
  const setKit = useCorey((s) => s.setKit);
  const [brief, setBrief] = useState<Brief>({
    operatorName: "",
    idea: "",
    location: "",
    neighborhood: "",
    nicheHint: "",
    constraints: "",
  });
  const [running, setRunning] = useState(false);
  const [startedAt, setStartedAt] = useState(0);

  function set<K extends keyof Brief>(key: K, value: Brief[K]) {
    setBrief((b) => ({ ...b, [key]: value }));
  }

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (brief.idea.trim().length < 8 || brief.location.trim().length < 2) {
      toast.error("Need a starting point and a city.");
      return;
    }
    const id = createVenture(brief);
    setRunning(true);
    setStartedAt(Date.now());
    try {
      const result = await generateKit({ data: { brief } });
      if (!result.ok) {
        toast.error(result.error);
        await navigate({ to: "/v/$id", params: { id } });
        return;
      }
      setKit(id, result.kit);
      toast.success("Kit ready. The walk-in is on you.");
      await navigate({ to: "/v/$id", params: { id } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
      await navigate({ to: "/v/$id", params: { id } });
    } finally {
      setRunning(false);
    }
  }

  return (
    <AppShell>
      {running ? <Generating startedAt={startedAt} /> : null}
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute">00 · Brief</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
        Do not ask for ideas. Give it a starting point.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
        Location, a painful job near revenue, and any constraint that keeps the offer honest. COREY
        does the rest of the blank page. You still have to walk through the door.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            className="rounded-full bg-bone px-3 py-2 text-sm text-ink-soft shadow-[0_0_0_1px_var(--color-line)] hover:text-ink"
            onClick={() => setBrief(p.brief)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <form onSubmit={run} className="mt-8 grid gap-4 rounded-[28px] bg-bone/80 p-5 shadow-[var(--shadow-border)] sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <Label>Your name</Label>
            <Input
              value={brief.operatorName}
              onChange={(e) => set("operatorName", e.target.value)}
              placeholder="Optional"
            />
          </label>
          <label className="space-y-2">
            <Label>City / region</Label>
            <Input
              required
              value={brief.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="Charlotte, NC"
            />
          </label>
          <label className="space-y-2">
            <Label>Neighborhood / route start</Label>
            <Input
              value={brief.neighborhood}
              onChange={(e) => set("neighborhood", e.target.value)}
              placeholder="Where you will walk from"
            />
          </label>
          <label className="space-y-2">
            <Label>Niche hint</Label>
            <Input
              value={brief.nicheHint}
              onChange={(e) => set("nicheHint", e.target.value)}
              placeholder="Auto shops, clinics, trades"
            />
          </label>
        </div>
        <label className="space-y-2">
          <Label>Starting point</Label>
          <Textarea
            required
            rows={5}
            value={brief.idea}
            onChange={(e) => set("idea", e.target.value)}
            placeholder="Help a non-technical operator sell an AI service to local businesses…"
          />
        </label>
        <label className="space-y-2">
          <Label>Constraints</Label>
          <Textarea
            rows={3}
            value={brief.constraints}
            onChange={(e) => set("constraints", e.target.value)}
            placeholder="Non-technical. Walk-in sellable. One fulfillment platform."
          />
        </label>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button type="submit" size="lg" disabled={running}>
            Run the 25 minutes
          </Button>
          <p className="text-sm text-mute">User-initiated. One kit per run. Results stay on this device.</p>
        </div>
      </form>
    </AppShell>
  );
}
