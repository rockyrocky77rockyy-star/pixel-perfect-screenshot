import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Clock } from "lucide-react";
import { PageBody, PageIntro } from "@/components/site/page-frame";
import { careerArticles } from "@/lib/jobs/data";
import { pageHead } from "@/lib/jobs/seo";

export const Route = createFileRoute("/resources/")({
  component: ResourcesIndexPage,
  head: () =>
    pageHead(
      "Career resources — SyncroTech Jobs",
      "Practical guides on resumes, off-campus applications, entry-level interview preparation and graduate trainee programmes.",
      "/resources",
    ),
});

function ResourcesIndexPage() {
  return (
    <>
      <PageIntro
        title="Career resources"
        description="Short, practical guides for the early stages of a technology career — written to be read in a few minutes and applied the same day."
      />
      <PageBody>
        <ul className="grid gap-4 sm:grid-cols-2">
          {careerArticles.map((article) => (
            <li key={article.id}>
              <Link
                to="/resources/$slug"
                params={{ slug: article.slug }}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand/40"
              >
                <p className="flex items-center gap-1.5 text-xs font-medium text-brand">
                  <BookOpen aria-hidden className="size-3.5" />
                  {article.category}
                  <span aria-hidden>·</span>
                  <Clock aria-hidden className="size-3.5" />
                  {article.readingMinutes} min read
                </p>
                <h2 className="mt-3 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{article.description}</p>
                <span className="mt-4 text-sm font-medium text-brand group-hover:underline">Read the guide</span>
              </Link>
            </li>
          ))}
        </ul>
      </PageBody>
    </>
  );
}
