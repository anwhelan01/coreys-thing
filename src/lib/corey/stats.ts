import type { FieldEvent, FieldEventKind } from "./types";

export function fieldCounts(events: FieldEvent[]) {
  const count = (kind: FieldEventKind) => events.filter((e) => e.kind === kind).length;
  return {
    doors: count("door"),
    conversations: count("conversation"),
    assessments: count("assessment"),
    paid: count("paid"),
    concierge: count("concierge"),
  };
}
