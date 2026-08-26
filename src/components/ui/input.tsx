import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-[10px] bg-bone px-3.5 text-sm text-ink shadow-[0_0_0_1px_var(--color-line)] placeholder:text-mute",
        "transition-[box-shadow] duration-150 focus:outline-none focus:shadow-[0_0_0_2px_color-mix(in_oklab,var(--color-forest)_45%,transparent)]",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
