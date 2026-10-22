import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Building2, FlaskConical, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobCard } from "@/components/jobs/job-card";
import { PageBody } from "@/components/site/page-frame";
import { careerArticles, categories, jobsRepository } from "@/lib/jobs/data";
import { pageHead } from "@/lib/jobs/seo";
import careerPhoto from "@/assets/syncrotech-career-photo.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () =>
    pageHead(
      "SyncroTech Jobs — Honest job discovery for early-career technologists",
      "Search job listings by keyword, location and career stage, browse categories and employers, and read practical career guides. Every sample listing is clearly marked.",
      "/",
    ),
});

const suggestedSearches = [
  { label: "React roles", search: { q: "React" } },
  { label: "Data and SQL", search: { q: "SQL" } },
  { label: "Remote internships", search: { q: "intern", workplace: "Remote" } },
  { label: "Graduate programmes", search: { category: "graduate" } },
] as const;

function Index() {
  const jobs = jobsRepository.list().slice(0, 6);

  return (
    <>
      {/* Search-first hero */}
      <section className="border-b border-border bg-secondary/50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Badge variant="outline" className="mb-5 border-border bg-card text-muted-foreground">
              <FlaskConical aria-hidden className="size-3.5 text-warning" />
              Demonstration experience — listings are clearly marked samples
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Find your next role with <span className="text-brand">clear, honest</span> search
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Search by keyword, location and career stage. SyncroTech Jobs keeps the details you need up front —
              and always tells you exactly what each listing is.
            </p>

            <form method="get" action="/jobs" aria-label="Job search" className="mt-8 rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr_auto]">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="hero-q" className="text-xs font-medium text-muted-foreground">
                    Keyword
                  </label>
                  <input
                    id="hero-q"
                    name="q"
                    type="text"
                    placeholder="Role, skill or company"
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="hero-location" className="text-xs font-medium text-muted-foreground">
                    Location
                  </label>
                  <input
                    id="hero-location"
                    name="location"
                    type="text"
                    placeholder="City or region"
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" size="lg" className="h-10 w-full sm:w-auto">
                    Search jobs
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">Try:</span>
                {suggestedSearches.map((item) => (
                  <Link
                    key={item.label}
                    to="/jobs"
                    search={item.search}
                    className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </form>
          </div>

          <div className="relative hidden lg:block">
            <img
              src={careerPhoto}
              alt="A young graduate working at a laptop in a bright, modern coworking space"
              className="aspect-[4/3] w-full rounded-2xl border border-border object-cover shadow-md"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <PageBody>
        <section aria-labelledby="categories-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="categories-heading" className="text-2xl font-bold tracking-tight text-foreground">
                Explore categories
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Start from a field of work and see how listings in it are organised.
              </p>
            </div>
            <Link to="/jobs" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-brand hover:underline sm:flex">
              Browse all jobs
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to="/category/$slug"
                  params={{ slug: category.slug }}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
                >
                  <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-brand">
                    {category.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Demonstration listings */}
        <section aria-labelledby="featured-heading" className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="featured-heading" className="text-2xl font-bold tracking-tight text-foreground">
                Sample listings
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                A look at how openings will appear once real vacancies are added.
              </p>
            </div>
            <Link to="/jobs" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-brand hover:underline sm:flex">
              See all
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/10 p-4 text-sm leading-relaxed text-foreground">
            <FlaskConical aria-hidden className="mt-0.5 size-4 shrink-0 text-warning" />
            Every listing on SyncroTech Jobs is currently a clearly marked demonstration used to show how search and
            details work. None is a real vacancy, and no official application links are provided for samples.
          </p>
        </section>

        {/* Career resources */}
        <section aria-labelledby="resources-heading" className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="resources-heading" className="text-2xl font-bold tracking-tight text-foreground">
                Career resources
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Practical guides for resumes, applications and interviews.
              </p>
            </div>
            <Link to="/resources" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-brand hover:underline sm:flex">
              All resources
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {careerArticles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                to="/resources/$slug"
                params={{ slug: article.slug }}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
              >
                <p className="flex items-center gap-1.5 text-xs font-medium text-brand">
                  <BookOpen aria-hidden className="size-3.5" />
                  {article.category} · {article.readingMinutes} min read
                </p>
                <h3 className="mt-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Honesty promise */}
        <section aria-labelledby="honesty-heading" className="mt-14 rounded-2xl border border-border bg-secondary/60 p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-card">
              <ShieldCheck aria-hidden className="size-6 text-brand" />
            </div>
            <div>
              <h2 id="honesty-heading" className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                How we keep listings honest
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Sample listings and company profiles are always labelled as demonstrations. Official application
                links appear only when a real employer has supplied a genuine source — never for samples. Nothing is
                invented behind the scenes: no fake salaries, deadlines, ratings or contact details.
              </p>
              <Button asChild variant="outline" className="mt-5">
                <Link to="/about">Learn more about SyncroTech Jobs</Link>
              </Button>
            </div>
          </div>
        </section>
      </PageBody>
    </>
  );
}
