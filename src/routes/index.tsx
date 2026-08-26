import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { STAGES } from "@/lib/corey/stages";
import { useCorey } from "@/lib/corey/store";

export const Route = createFileRoute("/")({ component: Home });

const PRINCIPLES = [
  {
    n: "01",
    title: "Stop collecting ideas",
    body: "If you are using AI to come up with new business ideas you are wasting your time. The bottleneck is the distance to the first conversation.",
  },
  {
    n: "02",
    title: "Start at a leak",
    body: "A painful workflow that sits close to revenue. Missed calls. Dead inquiries. Jobs that never become reviews. The owner already feels it.",
  },
  {
    n: "03",
    title: "Sell the result",
    body: "Bundle two outcomes into one promise. Keep the AI in the fulfillment layer. If the offer takes five minutes to explain, it is still too complicated.",
  },
  {
    n: "04",
    title: "Walk through the door",
    body: "AI can package the offer, write the pitch, build the site, and order the route. It cannot replace the conversation with the owner.",
  },
];

function Home() {
  const hydrated = useHydrated();
  const ventures = useCorey((s) => s.ventures);
  const list = hydrated ? ventures : [];

  return (
    <AppShell>
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mute">Corey's thing you wanted</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.6rem,7vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.04em] text-ink">
            Idea to first
            <br />
            sales conversation.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Define the offer. Price it. Write the pitch. Build the site. Find the first prospects.
            Twenty-five minutes of blank-page work, removed. Then you walk in.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/new">
                Run the 25 minutes <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/v/$id" params={{ id: "signal-local" }}>
                Open Signal Local
              </Link>
            </Button>
          </div>
        </div>
        <aside className="rounded-[28px] bg-ink p-6 text-bone sm:p-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-bone/50">The experiment</p>
          <p className="mt-4 font-display text-2xl leading-snug tracking-[-0.02em]">
            AI did not build a proven business in 25 minutes. It compressed the work required to reach
            the first real sales conversation.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-bone/65">
            One defined problem. One productized offer. One proposed price. One simple pitch. One
            credible website. Ten local prospects. That is enough to stop researching and start testing.
          </p>
          <Link
            to="/playbook"
            className="mt-6 inline-flex items-center gap-2 text-sm text-bone no-underline hover:opacity-80"
          >
            <BookOpen className="size-4" />
            Read the playbook
          </Link>
        </aside>
      </section>

      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PRINCIPLES.map((p) => (
          <li key={p.n} className="rounded-[22px] bg-bone/80 p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[0.65rem] tracking-[0.16em] text-mute">{p.n}</p>
            <h2 className="mt-3 font-display text-xl font-medium tracking-[-0.02em]">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
          </li>
        ))}
      </ol>

      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-mute">The 25 minutes</p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-[-0.03em]">Eleven stages. One kit.</h2>
          </div>
        </div>
        <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-11">
          {STAGES.map((s) => (
            <li key={s.id} className="rounded-xl bg-bone px-3 py-3 shadow-[var(--shadow-border)]">
              <p className="font-mono text-[0.6rem] text-mute">{s.n}</p>
              <p className="mt-1 text-sm font-medium">{s.label}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-mute">Desk</p>
        <h2 className="mt-2 font-display text-3xl font-medium tracking-[-0.03em]">Ventures on this device</h2>
        <ul className="mt-6 grid gap-3">
          {list.map((v) => (
            <li key={v.id}>
              <Link
                to="/v/$id"
                params={{ id: v.id }}
                className="flex flex-col gap-1 rounded-[22px] bg-bone/80 px-5 py-4 no-underline shadow-[var(--shadow-border)] transition-colors hover:bg-bone sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-display text-xl">{v.kit?.brandName ?? "Untitled brief"}</p>
                  <p className="text-sm text-mute">
                    {v.brief.location} · {v.status}
                    {v.isDemo ? " · demo" : ""}
                  </p>
                </div>
                <span className="text-sm text-forest">{v.kit?.tagline ?? v.brief.idea.slice(0, 80)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
