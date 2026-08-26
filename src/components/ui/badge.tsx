import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "ink",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: "ink" | "forest" | "leak" | "mute" }) {
  const tones = {
    ink: "text-ink shadow-[0_0_0_1px_var(--color-line)]",
    forest: "text-forest shadow-[0_0_0_1px_var(--color-forest)]",
    leak: "text-leak shadow-[0_0_0_1px_var(--color-leak)]",
    mute: "text-mute shadow-[0_0_0_1px_var(--color-line)]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-bone px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
