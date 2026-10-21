import { Link } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Friendly empty state with an optional recovery action. */
export function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-14 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
        <SearchX aria-hidden className="size-6 text-muted-foreground" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
      {actionLabel && actionTo && (
        <Button asChild variant="outline" className="mt-6">
          <Link to={actionTo as never}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
