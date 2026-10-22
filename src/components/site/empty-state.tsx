import type { ReactNode } from "react";
import { SearchX } from "lucide-react";

/** Friendly empty state with an optional recovery action. */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-14 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
        <SearchX aria-hidden className="size-6 text-muted-foreground" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
