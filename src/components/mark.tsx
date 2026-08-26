import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Mark({ className, to = "/" }: { className?: string; to?: string }) {
  return (
    <Link
      to={to}
      className={cn("group inline-flex items-center gap-2.5 text-ink no-underline", className)}
    >
      <span className="grid size-8 place-items-center rounded-[4px] bg-forest text-[0.7rem] font-semibold tracking-[0.08em] text-forest-fg">
        C
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-medium tracking-[-0.03em]">COREY</span>
        <span className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-mute">
          The thing you wanted
        </span>
      </span>
    </Link>
  );
}
