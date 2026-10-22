import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, CalendarDays, Clock, FlaskConical, Globe, GraduationCap, MapPin, ShieldAlert } from "lucide-react";
import { DemoNotice } from "@/components/jobs/demo-notice";
import { JobCard } from "@/components/jobs/job-card";
import { MissingRecord } from "@/components/site/missing-record";
import { PageBody } from "@/components/site/page-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, jobsRepository } from "@/lib/jobs/data";
import { notFoundHead, pageHead } from "@/lib/jobs/seo";

export const Route = createFileRoute("/jobs/$slug")({
  head: ({ params }) => {
    const job = jobsRepository.getBySlug(params.slug);
    if (!job) return notFoundHead("Job not found — SyncroTech Jobs");
    return pageHead(
      `${job.title} at ${job.companyName} — SyncroTech Jobs`,
      `${job.title} — ${job.location} · ${job.workplaceType} · ${job.employmentType} · ${job.experienceLevel}. Demonstration listing; not a real vacancy.`,
      `/jobs/${job.slug}`,
      { type: "article", noindex: true },
    );
  },
  component: JobDetailPage,
});

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}

function JobDetailPage() {
  const { slug } = Route.useParams();
  const job = jobsRepository.getBySlug(slug);

  if (!job) {
    return (
      <MissingRecord
        title="Job not found"
        description="This listing doesn't exist or is no longer available. Browse the job search to find demonstration listings."
        backTo="/jobs"
        backLabel="Browse jobs"
      />
    );
  }

  const category = categories.find((item) => item.id === job.categoryId);
  const relatedJobs = jobsRepository.list().filter((item) => item.companyId === job.companyId && item.id !== job.id);

  return (
    <PageBody className="max-w-5xl">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/jobs" className="transition-colors hover:text-brand">
          Jobs
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        <span className="text-foreground">{job.title}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <DemoNotice tone="warning">
            <strong>Demonstration listing.</strong> This is a fictional sample used to show how job details appear. It
            is not a real vacancy, no employer is hiring through it, and there is no official application link.
          </DemoNotice>

          <header className="mt-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{job.title}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-base text-muted-foreground">
              <Building2 aria-hidden className="size-4 shrink-0" />
              <Link
                to="/companies/$slug"
                params={{ slug: job.companyId }}
                className="font-medium text-foreground transition-colors hover:text-brand"
              >
                {job.companyName}
              </Link>
              <span aria-hidden>·</span>
              <MapPin aria-hidden className="size-4 shrink-0" />
              {job.location}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="font-medium">{job.workplaceType}</Badge>
              <Badge variant="secondary" className="font-medium">{job.employmentType}</Badge>
              <Badge variant="secondary" className="font-medium">{job.experienceLevel}</Badge>
              <Badge variant="outline" className="border-warning/30 bg-warning/10 font-medium text-warning">
                <FlaskConical aria-hidden className="size-3" />
                Demonstration
              </Badge>
            </div>
          </header>

          <section aria-labelledby="about-role" className="mt-10">
            <h2 id="about-role" className="text-lg font-semibold text-foreground">
              About this role
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{job.description}</p>
          </section>

          <section aria-labelledby="responsibilities" className="mt-8">
            <h2 id="responsibilities" className="text-lg font-semibold text-foreground">
              Example responsibilities
            </h2>
            <ul className="mt-3 space-y-2">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2 leading-relaxed text-muted-foreground">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="eligibility" className="mt-8">
            <h2 id="eligibility" className="text-lg font-semibold text-foreground">
              Eligibility
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{job.eligibility}</p>
          </section>

          <section aria-labelledby="skills" className="mt-8">
            <h2 id="skills" className="text-lg font-semibold text-foreground">
              Example skills
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="font-medium">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          <section aria-labelledby="applying-safely" className="mt-10 rounded-xl border border-border bg-secondary/60 p-6">
            <h2 id="applying-safely" className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <ShieldAlert aria-hidden className="size-5 text-brand" />
              Applying safely to roles like this
            </h2>
            <ul className="mt-4 space-y-2.5">
              {[
                "Find the vacancy on the employer's own careers page or another employer-identified source before sharing personal information.",
                "Check that role details and eligibility are consistent with what the employer has published.",
                "A genuine employer never asks for payment to apply. Walk away from any opportunity that does.",
                "Record the role, official page, application date and next step so you can track your applications.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit" aria-label="Listing summary">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Listing summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <SummaryRow label="Location" value={job.location} />
              <SummaryRow label="Workplace" value={job.workplaceType} />
              <SummaryRow label="Employment type" value={job.employmentType} />
              <SummaryRow label="Experience level" value={job.experienceLevel} />
              <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
                <dt className="text-muted-foreground">Category</dt>
                <dd className="text-right font-medium">
                  {category ? (
                    <Link to="/category/$slug" params={{ slug: category.slug }} className="text-brand hover:underline">
                      {category.name}
                    </Link>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
            </dl>
            <div className="mt-5 rounded-lg bg-secondary/60 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span aria-hidden className="flex size-8 items-center justify-center rounded-md bg-card text-sm font-bold text-primary">
                  {job.companyMark}
                </span>
                {job.companyName}
              </p>
              <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                <Link to="/companies/$slug" params={{ slug: job.companyId }}>
                  View company profile
                </Link>
              </Button>
            </div>
            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <CalendarDays aria-hidden className="mt-0.5 size-3.5 shrink-0" />
              Demonstration records carry no posted date, deadline or salary — nothing is invented for samples.
            </p>
          </div>
        </aside>
      </div>

      {relatedJobs.length > 0 && (
        <section aria-labelledby="related-jobs" className="mt-14">
          <h2 id="related-jobs" className="text-xl font-bold tracking-tight text-foreground">
            More demonstration listings from {job.companyName}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {relatedJobs.map((item) => (
              <JobCard key={item.id} job={item} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <Button asChild variant="outline">
          <Link to="/jobs">
            <ArrowLeft aria-hidden className="size-4" />
            Back to job search
          </Link>
        </Button>
      </div>
    </PageBody>
  );
}
