import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-xl bg-bone px-3.5 py-3 text-sm text-ink shadow-[0_0_0_1px_var(--color-line)] placeholder:text-mute",
        "transition-[box-shadow] duration-150 focus:outline-none focus:shadow-[0_0_0_2px_color-mix(in_oklab,var(--color-forest)_45%,transparent)]",
        className,
      )}
      {...props}
    />
  );
}
