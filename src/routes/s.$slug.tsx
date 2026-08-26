import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { useCorey } from "@/lib/corey/store";

export const Route = createFileRoute("/s/$slug")({ component: SalesSite });

function SalesSite() {
  const { slug } = Route.useParams();
  const hydrated = useHydrated();
  const venture = useCorey((s) => s.ventures.find((v) => v.id === slug));

  if (!hydrated) {
    return <div className="min-h-dvh bg-ink" />;
  }

  if (!venture?.kit) {
    return (
      <AppShell>
        <h1 className="font-display text-4xl">No site yet.</h1>
        <Button asChild className="mt-6">
          <Link to="/">Back to desk</Link>
        </Button>
      </AppShell>
    );
  }

  const site = venture.kit.site;
  const offer = venture.kit.offer;
  const pricing = venture.kit.pricing;

  return (
    <div className="min-h-dvh bg-ink text-bone">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div>
          <p className="font-display text-lg tracking-[-0.02em]">{site.brandName}</p>
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-bone/45">{site.tagline}</p>
        </div>
        <a
          href="#book"
          className="rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink no-underline"
        >
          {site.cta}
        </a>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-24">
        <section className="pt-10 sm:pt-16">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-bone/40">Local service</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.04em]">
            {site.hero}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/70 sm:text-lg">{site.subhead}</p>
          <a
            id="book"
            href="#book"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-bone px-5 text-sm font-medium text-ink no-underline"
          >
            {site.cta}
          </a>
          <p className="mt-3 text-sm text-bone/45">{site.footerNote}</p>
        </section>

        <section className="mt-20 grid gap-4 md:grid-cols-3">
          {site.steps.map((step, i) => (
            <div key={step} className="rounded-[22px] bg-white/5 p-5">
              <p className="font-mono text-[0.65rem] text-bone/40">0{i + 1}</p>
              <p className="mt-3 text-base leading-relaxed">{step}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-3xl tracking-[-0.03em]">{offer.name}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-bone/70">{offer.promise}</p>
            <ul className="mt-6 space-y-2">
              {site.included.map((item) => (
                <li key={item} className="text-sm text-bone/80">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-[22px] bg-bone p-6 text-ink">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-mute">Founding clients</p>
            <p className="mt-4 font-display text-4xl tracking-[-0.03em]">
              {pricing.foundingSetup}
              <span className="text-lg text-mute"> setup</span>
            </p>
            <p className="mt-1 font-display text-3xl tracking-[-0.03em]">
              {pricing.foundingMonthly}
              <span className="text-lg text-mute"> / month</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{pricing.foundingTerms}</p>
            <p className="mt-4 text-sm">{offer.guarantee}</p>
          </aside>
        </section>
      </main>

      <footer className="border-t border-white/10 px-5 py-6 text-center text-xs text-bone/40">
        Minimum sales asset. Built with COREY.{" "}
        <Link to="/v/$id" params={{ id: slug }} className="text-bone/70">
          Back to the kit
        </Link>
      </footer>
    </div>
  );
}
