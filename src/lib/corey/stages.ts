import type { StageId } from "./types";

export const STAGES: {
  id: StageId;
  n: string;
  label: string;
  kicker: string;
}[] = [
  { id: "brief", n: "00", label: "Brief", kicker: "The starting point" },
  { id: "problems", n: "01", label: "The leak", kicker: "Close to revenue" },
  { id: "offer", n: "02", label: "Offer", kicker: "Two outcomes, one promise" },
  { id: "pitch", n: "03", label: "Pitch", kicker: "Say it at the desk" },
  { id: "stack", n: "04", label: "Stack", kicker: "Behind the scenes" },
  { id: "price", n: "05", label: "Price", kicker: "Pilot before proof" },
  { id: "site", n: "06", label: "Site", kicker: "Minimum sales asset" },
  { id: "prospects", n: "07", label: "Walk-ins", kicker: "Visible demand, visible leak" },
  { id: "script", n: "08", label: "Script", kicker: "Fifteen minutes" },
  { id: "field", n: "09", label: "Field", kicker: "Doors and conversations" },
  { id: "playbook", n: "10", label: "Playbook", kicker: "Experiment to business" },
];

export function stageById(id: StageId) {
  return STAGES.find((s) => s.id === id) ?? STAGES[0];
}
