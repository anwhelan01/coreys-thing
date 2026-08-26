import { STAGES } from "@/lib/corey/stages";
import type { StageId } from "@/lib/corey/types";
import { cn } from "@/lib/utils";

export function StageNav({
  current,
  onChange,
  locked,
}: {
  current: StageId;
  onChange: (id: StageId) => void;
  locked?: boolean;
}) {
  return (
    <div className="no-print -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ol className="flex min-w-max gap-1 pb-1">
        {STAGES.map((stage) => {
          const active = stage.id === current;
          return (
            <li key={stage.id}>
              <button
                type="button"
                disabled={locked && stage.id !== "brief"}
                onClick={() => onChange(stage.id)}
                className={cn(
                  "flex min-h-11 flex-row items-center gap-2 rounded-xl px-3 py-2 text-left transition-colors",
                  active ? "bg-ink text-bone" : "text-ink-soft hover:bg-bone hover:text-ink",
                  locked && stage.id !== "brief" && "opacity-40",
                )}
              >
                <span className="font-mono text-[0.62rem] tracking-[0.14em] opacity-70">{stage.n}</span>
                <span className="whitespace-nowrap text-sm font-medium">{stage.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
