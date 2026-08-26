# COREY

**The thing you wanted.**

> If you're using AI to come up with new business ideas you're wasting your time.
>
> Use it to remove the work between an idea and your first sales conversation.

COREY is that removal. A field operator, not a brainstorm. You give it a starting point. It returns a defined offer, a price you can say out loud, a pitch that fits at a front desk, a minimum sales site, a walk-in list ordered as a route, a fifteen-minute assessment script, and the playbook from experiment to business.

Then you walk through the door. That part is still human.

It is named for [Corey Ganim](https://x.com/coreyganim). It is **Corey's thing you wanted** — his public 25-minute playbook, implemented as software you can run, clone, and take into the field. Independent of Corey. Faithful to the work.

[Original thread](https://x.com/coreyganim/status/2087934957880828283) · [Long-form](https://x.com/i/article/2087907509558550528)

---

## What you get in 25 minutes

Not a proven business. Enough to stop researching.

| Stage | What leaves the blank page |
| --- | --- |
| 00 Brief | A starting point. Not a list of ideas. |
| 01 The leak | A problem that sits close to revenue |
| 02 Offer | Two outcomes, one promise, a guarantee you control |
| 03 Pitch | One line. Three steps. Door opener. Objections. |
| 04 Stack | One platform. Client keeps two jobs. |
| 05 Price | Setup + retainer. Pilot before proof. |
| 06 Site | A credible one-pager. Ninety percent is enough. |
| 07 Walk-ins | Ten prospects. Visible demand, visible leak. A route. |
| 08 Script | The 15-minute assessment, on a clock |
| 09 Field | Doors, conversations, assessments, paid, concierge |
| 10 Playbook | Five owners before you complicate the offer |

Signal Local — the Charlotte experiment from the article — ships as a live demo. Open it. Steal the shape. Then run it on your city.

---

## Clone and install

```bash
curl -fsSL https://raw.githubusercontent.com/anwhelan01/coreys-thing/main/install.sh | bash
```

Or, if you already have the repo:

```bash
git clone https://github.com/anwhelan01/coreys-thing.git
cd coreys-thing
chmod +x install.sh
./install.sh
npm run dev
```

Needs **Node 22+**, git, and npm. Live kit generation talks to xAI from the server. In Grok App Builder the key is injected. On a local clone:

```bash
export XAI_API_KEY=xai-...
```

Never commit a key. See `.env.example`.

Without a key the desk still runs. Signal Local is fully loaded. Export, field log, script timer, and the sales site all work offline.

---

## How to run a kit

1. Open **New venture**.
2. Give it a city, a neighborhood to walk from, and a starting point that is already close to money. Not "an AI business." Something like *missed calls at independent auto shops in Charlotte*.
3. Hit **Run the 25 minutes**.
4. Read the offer out loud. If it takes five minutes, it is still too complicated — rebuild.
5. Open the site. It is a minimum sales asset, not a brand.
6. Walk the list. Public signals only. A missing website is a prospecting signal, not a fact.
7. Log doors. The kit is not the business. The conversation is.

The people who make money with AI services will not be the ones who collect the most ideas. They will be the ones who move faster, then do the work AI cannot do.

---

## The rules baked in

These are Corey's. The model is instructed to obey them. The UI is designed so you cannot hide from them.

- Start with a painful workflow that sits close to revenue.
- Bundle two outcomes. Sell the result. Keep AI in the fulfillment layer.
- Pitch simple enough to say at the front desk.
- Run technology behind the scenes. The client keeps two jobs.
- Price the pilot before you have proof. Setup plus retainer. Not pay-per-lead.
- Build the minimum sales asset, then talk to the market.
- Find visible demand, then find the leak.
- Speak with five owners before you make the offer more complicated.
- Collect the setup fee before you build.
- Raise the price from evidence.

---

## What's in the box

```
src/lib/corey/     types, schema, Signal Local demo, export, field stats
src/lib/ai/        Grok generation, Corey's system prompt, pitch voice
src/routes/        desk, new venture, kit, playbook, live sales site
src/components/    operator chrome, stage rail, kit panels
install.sh         clone + install
clone.sh           one-liner entry
docs/PLAYBOOK.md   the method, written for the field
```

Kits live in `localStorage` on the device that generated them. There are no accounts. There is no shared database of other people's ideas. That is the point.

---

## Credit

Playbook, language, and the Signal Local experiment: **Corey Ganim**. Read him. Follow him. This software does not replace that.

Implementation: Tony Whelan ([@tonywhelan](https://x.com/tonywhelan)). MIT. Not affiliated with Corey.

The opportunity is using AI to remove the friction between an idea and your next sales conversation.

Walk through the door.
