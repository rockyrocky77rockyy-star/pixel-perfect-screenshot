import { Link } from "@tanstack/react-router";
import { Briefcase, Building2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/lib/jobs/types";

/** Card summarizing one job listing. Every card carries a visible demonstration badge. */
export function JobCard({ job }: { job: Job }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link
            to="/jobs/$slug"
            params={{ slug: job.slug }}
            className="text-base font-semibold text-foreground transition-colors hover:text-brand"
          >
            {job.title}
          </Link>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Building2 aria-hidden className="size-3.5 shrink-0" />
            <Link
              to="/companies/$slug"
              params={{ slug: job.companyId }}
              className="transition-colors hover:text-brand"
            >
              {job.companyName}
            </Link>
          </p>
        </div>
        <Badge className="shrink-0 border border-warning/30 bg-warning/10 text-warning" variant="outline">
          <FlaskConical />
          Demo
        </Badge>
      </div>

      <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin aria-hidden className="size-3.5 shrink-0" />
          <dt className="sr-only">Location</dt>
          <dd>{job.location}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase aria-hidden className="size-3.5 shrink-0" />
          <dt className="sr-only">Work arrangement</dt>
          <dd>
            {job.workplaceType} · {job.employmentType} · {job.experienceLevel}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {job.skills.slice(0, 3).map((skill) => (
          <Badge key={skill} variant="secondary" className="font-medium">
            {skill}
          </Badge>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Demonstration listing — not a real vacancy.{" "}
        <Link to="/jobs/$slug" params={{ slug: job.slug }} className="font-medium text-brand hover:underline">
          View details
        </Link>
      </p>
    </article>
  );
}

import { FlaskConical } from "lucide-react";
