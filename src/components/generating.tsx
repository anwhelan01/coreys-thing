import { useEffect, useState } from "react";

const LINES = [
  "Start with a painful problem that sits close to revenue.",
  "Bundle two outcomes into one clear offer.",
  "Sell the result. Keep the AI in the fulfillment layer.",
  "Make the pitch simple enough to say at the front desk.",
  "If it takes five minutes to explain, it is still too complicated.",
  "Run the technology behind the scenes.",
  "Price the pilot before you have proof.",
  "Build the minimum sales asset. Then go talk to the market.",
  "Find businesses with visible demand. Then find the leak.",
  "A missing website is a prospecting signal, not a fact.",
  "AI cannot walk through the door for you.",
];

export function Generating({ startedAt }: { startedAt: number }) {
  const [i, setI] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setI((n) => (n + 1) % LINES.length);
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 2200);
    return () => window.clearInterval(tick);
  }, [startedAt]);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/70 px-6"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-lg rounded-[28px] bg-paper p-8 shadow-[var(--shadow-border)] sm:p-10">
        <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-mute">
          Running the 25 minutes · {mm}:{ss}
        </p>
        <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.03em] text-ink">
          Compressing the blank page.
        </h2>
        <p className="shimmer-text mt-6 min-h-16 text-base leading-relaxed">{LINES[i]}</p>
        <p className="mt-8 text-sm text-mute">
          Offer, price, pitch, site, walk-in list. Then you do the part AI cannot.
        </p>
      </div>
    </div>
  );
}
