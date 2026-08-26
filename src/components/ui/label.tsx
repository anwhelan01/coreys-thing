import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mute",
        className,
      )}
      {...props}
    />
  );
}
