import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { DemoNotice } from "@/components/jobs/demo-notice";
import { FilterPanel } from "@/components/jobs/filter-panel";
import { JobCard } from "@/components/jobs/job-card";
import { EmptyState } from "@/components/site/empty-state";
import { PageBody, PageIntro } from "@/components/site/page-frame";
import { Button } from "@/components/ui/button";
import { categories, jobsRepository } from "@/lib/jobs/data";
import { pageHead } from "@/lib/jobs/seo";
import { filterJobs } from "@/lib/jobs/search";
import {
  countActiveFilters,
  createEmptyFilters,
  datePostedOptions,
  parseJobFilters,
  withClearedFilter,
} from "@/lib/jobs/search-params";
import type { SearchFilters } from "@/lib/jobs/types";

export const Route = createFileRoute("/jobs/")({
  // Input type carries optional fields so partial search objects are accepted on links.
  validateSearch: (search: Partial<SearchFilters>): SearchFilters =>
    parseJobFilters(search as Record<string, unknown> | undefined),
  component: JobsIndexPage,
  head: () => ({
    ...pageHead(
      "Browse jobs — SyncroTech Jobs",
      "Search and filter job listings by keyword, company, location, workplace, experience level, employment type, category and availability.",
      "/jobs",
      { noindex: true },
    ),
  }),
});

const FILTER_LABELS: Record<string, string> = {
  q: "Keyword",
  location: "Location",
  company: "Company",
  experience: "Experience",
  workplace: "Workplace",
  employmentType: "Employment",
  category: "Category",
  datePosted: "Posted",
};

function filterValueLabel(key: keyof SearchFilters, value: string): string {
  if (key === "category") return categories.find((category) => category.id === value)?.name ?? value;
  if (key === "datePosted") return datePostedOptions.find((option) => option.value === value)?.label ?? value;
  return value;
}

const isActive = (filters: SearchFilters, key: keyof SearchFilters) =>
  key === "datePosted"
    ? Boolean(filters.datePosted) && filters.datePosted !== "any"
    : Boolean(filters[key]);

function JobsIndexPage() {
  const filters = Route.useSearch();
  const allJobs = jobsRepository.list();
  const results = filterJobs(allJobs, filters);

  const activeChips = (Object.keys(FILTER_LABELS) as (keyof SearchFilters)[])
    .filter((key) => isActive(filters, key))
    .map((key) => ({
      key,
      label: `${FILTER_LABELS[key]}: ${filterValueLabel(key, filters[key])}`,
    }));

  return (
    <>
      <PageIntro
        title="Browse jobs"
        description="Combine keyword, company, location, workplace, experience, employment type, category and availability filters. Your criteria stay in the page address, so refreshing keeps your results."
      />
      <PageBody>
        <DemoNotice tone="info">
          All listings shown here are clearly marked demonstrations used to show how search works. None is a real
          vacancy, and no official application links are provided for samples.
        </DemoNotice>

        <div className="mt-6">
          <FilterPanel filters={filters} />
        </div>

        {(activeChips.length > 0 || countActiveFilters(filters) > 0) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <Link
                key={chip.key}
                to="/jobs"
                search={withClearedFilter(filters, chip.key)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
                aria-label={`Remove filter: ${chip.label}`}
              >
                {chip.label}
                <X aria-hidden className="size-3" />
              </Link>
            ))}
            <Link
              to="/jobs"
              search={createEmptyFilters()}
              className="text-xs font-medium text-muted-foreground underline-offset-2 transition-colors hover:text-brand hover:underline"
            >
              Clear all
            </Link>
          </div>
        )}

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          Showing {results.length} of {allJobs.length} demonstration listings
          {activeChips.length > 0 ? " for your filters" : ""}.
        </p>

        {results.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState
              title="No matching demonstration listings"
              description="Try removing a filter, checking the spelling, or broadening your keyword to see more samples."
              action={
                <Button asChild variant="outline">
                  <Link to="/jobs" search={createEmptyFilters()}>
                    Clear all filters
                  </Link>
                </Button>
              }
            />
          </div>
        )}
      </PageBody>
    </>
  );
}
