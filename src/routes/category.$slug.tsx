import { createFileRoute, Link } from "@tanstack/react-router";
import { DemoNotice } from "@/components/jobs/demo-notice";
import { JobCard } from "@/components/jobs/job-card";
import { MissingRecord } from "@/components/site/missing-record";
import { PageBody, PageIntro } from "@/components/site/page-frame";
import { Button } from "@/components/ui/button";
import { categoryForSlug, jobsRepository } from "@/lib/jobs/data";
import { notFoundHead, pageHead } from "@/lib/jobs/seo";
import { createEmptyFilters, filterJobs } from "@/lib/jobs/search";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const category = categoryForSlug(params.slug);
    if (!category) return notFoundHead("Category not found — SyncroTech Jobs");
    return pageHead(
      `${category.name} — SyncroTech Jobs`,
      category.description,
      `/category/${category.slug}`,
      { noindex: true },
    );
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const category = categoryForSlug(slug);

  if (!category) {
    return (
      <MissingRecord
        title="Category not found"
        description="This category doesn't exist. Explore all categories from the homepage or open the job search."
        backTo="/jobs"
        backLabel="Browse jobs"
      />
    );
  }

  const results = filterJobs(jobsRepository.list(), { ...createEmptyFilters(), category: category.id });

  return (
    <>
      <PageIntro title={category.name} description={category.description} />
      <PageBody>
        <DemoNotice tone="info">
          Listings in this category are clearly marked demonstrations. None is a real vacancy, and no official
          application links are provided for samples.
        </DemoNotice>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {results.length > 0
              ? `${results.length} demonstration ${results.length === 1 ? "listing" : "listings"} in this category.`
              : "No demonstration listings in this category yet."}
          </p>
          <Button asChild variant="outline">
            <Link to="/jobs" search={{ category: category.id }}>
              Open in job search
            </Link>
          </Button>
        </div>

        {results.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </PageBody>
    </>
  );
}
