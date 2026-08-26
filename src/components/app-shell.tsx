import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Mark } from "@/components/mark";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Desk" },
  { to: "/new", label: "New venture" },
  { to: "/playbook", label: "Playbook" },
] as const;

export function AppShell({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="paper-grid min-h-dvh">
      <header className="no-print sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Mark />
          <nav className="flex items-center gap-1 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-3 py-2 text-ink-soft no-underline transition-colors hover:bg-bone hover:text-ink"
                activeProps={{ className: "bg-bone text-ink" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className={cn("mx-auto px-4 py-8 sm:px-6 sm:py-10", wide ? "max-w-6xl" : "max-w-6xl")}>
        {children}
      </div>
    </div>
  );
}
