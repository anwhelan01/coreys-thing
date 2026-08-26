import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SIGNAL_LOCAL_VENTURE } from "./demo";
import type { Brief, FieldEvent, FieldEventKind, Kit, Venture, VentureStatus } from "./types";

type CoreyState = {
  ventures: Venture[];
  createVenture: (brief: Brief) => string;
  hydrateDemo: () => string;
  setKit: (id: string, kit: Kit) => void;
  patchBrief: (id: string, brief: Partial<Brief>) => void;
  patchKit: (id: string, kit: Partial<Kit>) => void;
  setStatus: (id: string, status: VentureStatus) => void;
  setNotes: (id: string, notes: string) => void;
  addFieldEvent: (
    id: string,
    event: { kind: FieldEventKind; prospectName?: string; note?: string },
  ) => void;
  removeFieldEvent: (ventureId: string, eventId: string) => void;
  removeVenture: (id: string) => void;
  resetDemo: () => void;
};

function nowIso() {
  return new Date().toISOString();
}

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useCorey = create<CoreyState>()(
  persist(
    (set, get) => ({
      ventures: [SIGNAL_LOCAL_VENTURE],
      createVenture: (brief) => {
        const id = newId();
        const venture: Venture = {
          id,
          createdAt: nowIso(),
          updatedAt: nowIso(),
          status: "brief",
          isDemo: false,
          brief,
          kit: null,
          field: [],
          notes: "",
        };
        set({ ventures: [venture, ...get().ventures] });
        return id;
      },
      hydrateDemo: () => {
        const existing = get().ventures.find((v) => v.id === SIGNAL_LOCAL_VENTURE.id);
        if (existing) return existing.id;
        set({ ventures: [SIGNAL_LOCAL_VENTURE, ...get().ventures] });
        return SIGNAL_LOCAL_VENTURE.id;
      },
      setKit: (id, kit) => {
        set({
          ventures: get().ventures.map((v) =>
            v.id === id
              ? { ...v, kit, status: v.status === "brief" ? "ready" : v.status, updatedAt: nowIso() }
              : v,
          ),
        });
      },
      patchBrief: (id, brief) => {
        set({
          ventures: get().ventures.map((v) =>
            v.id === id ? { ...v, brief: { ...v.brief, ...brief }, updatedAt: nowIso() } : v,
          ),
        });
      },
      patchKit: (id, kit) => {
        set({
          ventures: get().ventures.map((v) =>
            v.id === id && v.kit
              ? { ...v, kit: { ...v.kit, ...kit }, updatedAt: nowIso() }
              : v,
          ),
        });
      },
      setStatus: (id, status) => {
        set({
          ventures: get().ventures.map((v) =>
            v.id === id ? { ...v, status, updatedAt: nowIso() } : v,
          ),
        });
      },
      setNotes: (id, notes) => {
        set({
          ventures: get().ventures.map((v) =>
            v.id === id ? { ...v, notes, updatedAt: nowIso() } : v,
          ),
        });
      },
      addFieldEvent: (id, event) => {
        const row: FieldEvent = {
          id: newId(),
          at: nowIso(),
          kind: event.kind,
          prospectName: event.prospectName ?? "",
          note: event.note ?? "",
        };
        set({
          ventures: get().ventures.map((v) =>
            v.id === id
              ? {
                  ...v,
                  field: [row, ...v.field],
                  status: v.status === "ready" ? "in-field" : v.status,
                  updatedAt: nowIso(),
                }
              : v,
          ),
        });
      },
      removeFieldEvent: (ventureId, eventId) => {
        set({
          ventures: get().ventures.map((v) =>
            v.id === ventureId
              ? { ...v, field: v.field.filter((e) => e.id !== eventId), updatedAt: nowIso() }
              : v,
          ),
        });
      },
      removeVenture: (id) => {
        set({ ventures: get().ventures.filter((v) => v.id !== id) });
      },
      resetDemo: () => {
        set({
          ventures: [
            SIGNAL_LOCAL_VENTURE,
            ...get().ventures.filter((v) => v.id !== SIGNAL_LOCAL_VENTURE.id),
          ],
        });
      },
    }),
    { name: "corey-thing-v1" },
  ),
);

export function selectVenture(id: string) {
  return useCorey.getState().ventures.find((v) => v.id === id);
}

export { fieldCounts } from "./stats";
