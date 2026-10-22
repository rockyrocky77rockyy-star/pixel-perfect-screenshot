import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, MapPin } from "lucide-react";
import { DemoNotice } from "@/components/jobs/demo-notice";
import { JobCard } from "@/components/jobs/job-card";
import { MissingRecord } from "@/components/site/missing-record";
import { PageBody } from "@/components/site/page-frame";
import { Button } from "@/components/ui/button";
import { companyForSlug, jobsRepository } from "@/lib/jobs/data";
import { notFoundHead, pageHead } from "@/lib/jobs/seo";

export const Route = createFileRoute("/companies/$slug")({
  head: ({ params }) => {
    const company = companyForSlug(params.slug);
    if (!company) return notFoundHead("Company not found — SyncroTech Jobs");
    return pageHead(
      `${company.name} — SyncroTech Jobs`,
      `${company.name} — ${company.industry} · ${company.location}. Demonstration company profile; not a real employer.`,
      `/companies/${company.id}`,
      { noindex: true },
    );
  },
  component: CompanyDetailPage,
});

function CompanyDetailPage() {
  const { slug } = Route.useParams();
  const company = companyForSlug(slug);

  if (!company) {
    return (
      <MissingRecord
        title="Company not found"
        description="This company profile doesn't exist. Browse the directory to see demonstration company profiles."
        backTo="/companies"
        backLabel="View companies"
      />
    );
  }

  const companyJobs = jobsRepository.list().filter((job) => job.companyId === company.id);

  return (
    <PageBody className="max-w-5xl">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/companies" className="transition-colors hover:text-brand">
          Companies
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        <span className="text-foreground">{company.name}</span>
      </nav>

      <header className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <span
          aria-hidden
          className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl font-bold text-primary"
        >
          {company.name.charAt(0)}
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{company.name}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Building2 aria-hidden className="size-3.5" />
              {company.industry}
            </span>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1.5">
              <MapPin aria-hidden className="size-3.5" />
              {company.location}
            </span>
          </p>
        </div>
      </header>

      <div className="mt-8">
        <DemoNotice tone="warning">
          <strong>Demonstration company profile.</strong> This is a fictional company used to show how profiles appear.
          It is not a real employer and does not represent a genuine hiring announcement.
        </DemoNotice>
      </div>

      <section aria-labelledby="about-company" className="mt-10">
        <h2 id="about-company" className="text-lg font-semibold text-foreground">
          About this profile
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{company.about}</p>
      </section>

      <section aria-labelledby="company-jobs" className="mt-10">
        <h2 id="company-jobs" className="text-xl font-bold tracking-tight text-foreground">
          Demonstration listings from {company.name}
        </h2>
        {companyJobs.length > 0 ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {companyJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No demonstration listings are connected to this profile yet.
          </p>
        )}
      </section>

      <div className="mt-12">
        <Button asChild variant="outline">
          <Link to="/jobs" search={{ company: company.name }}>
            Search jobs at {company.name}
          </Link>
        </Button>
      </div>
    </PageBody>
  );
}
