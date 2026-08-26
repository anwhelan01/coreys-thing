import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Generating } from "@/components/generating";
import { ExportBar, StagePanel } from "@/components/kit/panels";
import { StageNav } from "@/components/stage-nav";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { generateKit } from "@/lib/ai/generate";
import { STAGES } from "@/lib/corey/stages";
import { useCorey } from "@/lib/corey/store";
import type { StageId } from "@/lib/corey/types";

export const Route = createFileRoute("/v/$id")({ component: VentureDesk });

function VentureDesk() {
  const { id } = Route.useParams();
  const hydrated = useHydrated();
  const venture = useCorey((s) => s.ventures.find((v) => v.id === id));
  const setKit = useCorey((s) => s.setKit);
  const hydrateDemo = useCorey((s) => s.hydrateDemo);
  const [stage, setStage] = useState<StageId>("brief");
  const [running, setRunning] = useState(false);
  const [startedAt, setStartedAt] = useState(0);

  useEffect(() => {
    if (venture?.kit) setStage("offer");
  }, [venture?.id, Boolean(venture?.kit)]);

  if (!hydrated) {
    return (
      <AppShell>
        <div className="h-64 animate-pulse rounded-[28px] bg-bone" />
      </AppShell>
    );
  }

  if (!venture) {
    return (
      <AppShell>
        <h1 className="font-display text-4xl">No venture on this desk.</h1>
        <p className="mt-3 text-ink-soft">It may live on another browser. Load the demo or start a new one.</p>
        <div className="mt-6 flex gap-3">
          <Button
            onClick={() => {
              hydrateDemo();
            }}
          >
            Restore Signal Local
          </Button>
          <Button asChild variant="outline">
            <Link to="/new">New venture</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  async function rerun() {
    if (!venture) return;
    setRunning(true);
    setStartedAt(Date.now());
    try {
      const result = await generateKit({ data: { brief: venture.brief } });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setKit(venture.id, result.kit);
      setStage("offer");
      toast.success("Kit rebuilt");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setRunning(false);
    }
  }

  const current = STAGES.find((s) => s.id === stage) ?? STAGES[0];

  return (
    <AppShell>
      {running ? <Generating startedAt={startedAt} /> : null}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute">
            {venture.brief.location}
            {venture.isDemo ? " · demo" : ""}
          </p>
          <h1 className="mt-1 font-display text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            {venture.kit?.brandName ?? "Untitled brief"}
          </h1>
          <p className="mt-2 max-w-2xl text-ink-soft">{venture.kit?.tagline ?? venture.brief.idea}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={rerun} disabled={running}>
            {venture.kit ? "Rebuild kit" : "Run the 25 minutes"}
          </Button>
          {venture.kit ? (
            <Button asChild variant="ink">
              <Link to="/s/$slug" params={{ slug: venture.id }}>
                Open site
              </Link>
            </Button>
          ) : null}
        </div>
      </div>

      <div className="mt-8">
        <StageNav current={stage} onChange={setStage} locked={!venture.kit} />
      </div>

      <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-mute">
        {current.n} · {current.kicker}
      </p>

      <div className="mt-4">
        <StagePanel stage={stage} venture={venture} />
      </div>

      <div className="mt-6">
        <ExportBar venture={venture} />
      </div>
    </AppShell>
  );
}
