import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/playbook")({ component: PlaybookPage });

const SECTIONS = [
  {
    n: "00",
    title: "The thing you wanted",
    body: [
      "If you're using AI to come up with new business ideas you're wasting your time.",
      "Use it to remove the work between an idea and your first sales conversation: define the offer, price it, write the pitch, build the site, and find the first prospects.",
      "This is COREY. It is the documented playbook from Corey Ganim, turned into an operator you can run in under 25 minutes — then take outside.",
    ],
  },
  {
    n: "01",
    title: "Start with a painful problem that sits close to revenue",
    body: [
      "Do not ask for the most futuristic AI business possible. Ask for something a non-technical person could start, sell to local businesses, and scale if it worked.",
      "Appointment recovery. Review growth. A local content engine. Estimate follow-up. A simple front-desk assistant. The first two stand out because the value is easy for an owner to understand.",
      "Missed calls and ignored inquiries become lost appointments. Completed jobs without review requests become lost reputation. Both problems already exist. You are showing the leak, not selling a transformation.",
    ],
  },
  {
    n: "02",
    title: "Bundle two outcomes into one clear offer",
    body: [
      "The Signal Local offer was a Local Lead and Reputation Engine: turn missed calls and new inquiries into booked appointments, then turn happy customers into five-star reviews without adding work for the team.",
      "Include a guarantee around something you control — implementation speed, not lead volume.",
      "Most weak AI offers describe the technology. The owner cares about answering more leads, booking more appointments, and earning more reviews. Sell the result. Keep the AI in the fulfillment layer.",
    ],
  },
  {
    n: "03",
    title: "Make the pitch simple enough to say at the front desk",
    body: [
      "One line. Three steps. That is enough for an initial conversation.",
      "You do not explain models, agents, APIs, or workflow logic at the desk. The owner needs the leak, the outcome, and how little extra work their team will have.",
      "If your offer takes five minutes to explain, it is still too complicated.",
    ],
  },
  {
    n: "04",
    title: "Run the technology behind the scenes",
    body: [
      "One platform as the back-end layer. The operator configures missed-call text-back, a shared inbox, follow-up, booking, and review requests.",
      "The client keeps two jobs: respond to hot leads, and mark jobs complete.",
      "If a prospect already has a sophisticated CRM they actually use, integrate lightly or skip them. The easiest first clients barely use the system they have.",
      "Positioning: we don't replace your current systems. We add a managed response and review layer around them.",
    ],
  },
  {
    n: "05",
    title: "Price the pilot before you have proof",
    body: [
      "Founding structure from the experiment: $750 setup, $500 a month, cancel after 90 days. After proof: $1,500–$2,500 setup, $750–$1,250 a month. Those were proposed prices, not validated ones.",
      "Do not start with pay-per-lead. It adds attribution fights before you have proof, data, or a baseline.",
      "A setup fee plus a predictable retainer is easy for both sides. Collect the setup before you build. Raise from evidence.",
    ],
  },
  {
    n: "06",
    title: "Build the minimum sales asset",
    body: [
      "The site for Signal Local was named in the experiment and built around one promise: turn every local lead into momentum.",
      "It was roughly 90 percent there. That is the point. The website did not need a design award. It needed to make the business look credible enough for the next sales conversation.",
      "Do not spend three weeks polishing a brand before you know whether anyone wants the offer.",
    ],
  },
  {
    n: "07",
    title: "Find prospects based on visible business leaks",
    body: [
      "Independently operated service businesses near you. Strong Google reviews. Weak or missing website presence. Owner-operated. A physical location you can visit.",
      "Order them into a practical route. Public signals only. A missing website link is not proof they lack a CRM. It is a prospecting signal.",
      "The strongest insight is not 'find businesses that need AI.' Find businesses with visible demand, then identify where the current process is leaking money.",
    ],
  },
  {
    n: "08",
    title: "The 15-minute assessment",
    body: [
      "0–2: Walk me through what happens after a new lead comes in.",
      "2–6: Find where leads are falling through. Who owns that step? How long? How often? What is a missed follow-up worth?",
      "6–10: Score the problem 1–5 on frequency, dollar cost, and ease of fix.",
      "10–13: Recommend one fix. Not an AI transformation. Text-back, quote follow-up, or routing.",
      "13–15: I can map the whole process and give you a step-by-step fix. Want me to send you the paid assessment?",
      "Track every week: doors, owner conversations, assessments booked, paid assessments sold.",
    ],
  },
  {
    n: "09",
    title: "From experiment to operating business",
    body: [
      "Pick one niche with frequent inbound calls and valuable appointments.",
      "Speak with five owners before making the offer more complicated.",
      "Confirm how missed calls, inquiries, booking, and reviews work today.",
      "Sell one transparent founding-client pilot. Collect the setup fee before building the full system.",
      "Install only the workflows required for that client. Track response time, conversations, bookings, review requests, and reviews generated.",
      "Send a simple monthly scorecard. Document every setup step as a reusable checklist. Turn the first verified result into proof, then raise the price.",
      "The most important step is number two. The kit cannot replace the conversation.",
    ],
  },
  {
    n: "10",
    title: "Final thoughts",
    body: [
      "The people who make money with AI services will not be the ones who collect the most business ideas. They will be the ones who use AI to move faster, then do the human work AI cannot do: walk through the door, ask better questions, close the first client, deliver the result, and turn that result into a repeatable business.",
      "COREY is named for that. The thing you wanted was never another list. It was the shortest honest path from an idea to a conversation that can take money.",
    ],
  },
];

function PlaybookPage() {
  return (
    <AppShell>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute">
        Method · Corey Ganim · August 2026
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl font-medium tracking-[-0.04em] sm:text-6xl">
        Corey's thing you wanted.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
        A public playbook, implemented as an operator. Independent of Corey. Faithful to the work.
        Source thread and long-form: @coreyganim.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/new">Run it on your idea</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/v/$id" params={{ id: "signal-local" }}>
            Inspect Signal Local
          </Link>
        </Button>
        <a
          className="inline-flex h-11 items-center rounded-[10px] px-4 text-sm text-forest shadow-[0_0_0_1px_var(--color-forest)] no-underline"
          href="https://x.com/coreyganim/status/2087934957880828283"
          target="_blank"
          rel="noreferrer"
        >
          Original thread
        </a>
      </div>

      <div className="mt-14 space-y-10">
        {SECTIONS.map((s) => (
          <article key={s.n} className="grid gap-4 border-t border-line pt-8 md:grid-cols-[7rem_1fr]">
            <p className="font-mono text-sm text-mute">{s.n}</p>
            <div>
              <h2 className="font-display text-3xl font-medium tracking-[-0.03em]">{s.title}</h2>
              <div className="mt-4 max-w-2xl space-y-3">
                {s.body.map((p) => (
                  <p key={p} className="text-base leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
