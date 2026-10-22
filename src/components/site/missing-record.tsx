import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBody } from "@/components/site/page-frame";

/** Inline not-found content for invalid job, company or category slugs. */
export function MissingRecord({
  title,
  description,
  backTo,
  backLabel,
}: {
  title: string;
  description: string;
  backTo: string;
  backLabel: string;
}) {
  return (
    <PageBody>
      <div className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-14 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
          <Compass aria-hidden className="size-6 text-muted-foreground" />
        </div>
        <h1 className="mt-4 text-lg font-semibold text-foreground">{title}</h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to={backTo as never}>{backLabel}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </div>
    </PageBody>
  );
}
