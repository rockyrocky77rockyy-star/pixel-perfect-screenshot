import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { MissingRecord } from "@/components/site/missing-record";
import { PageBody } from "@/components/site/page-frame";
import { articleForSlug, categories } from "@/lib/jobs/data";
import { notFoundHead, pageHead } from "@/lib/jobs/seo";

export const Route = createFileRoute("/resources/$slug")({
  head: ({ params }) => {
    const article = articleForSlug(params.slug);
    if (!article) return notFoundHead("Resource not found — SyncroTech Jobs");
    return pageHead(
      `${article.title} — SyncroTech Jobs resources`,
      article.description,
      `/resources/${article.slug}`,
      { type: "article" },
    );
  },
  component: ResourceArticlePage,
});

function ResourceArticlePage() {
  const { slug } = Route.useParams();
  const article = articleForSlug(slug);

  if (!article) {
    return (
      <MissingRecord
        title="Resource not found"
        description="This guide doesn't exist. Browse all career resources to find what you need."
        backTo="/resources"
        backLabel="All resources"
      />
    );
  }

  const relatedCategory = categories.find((category) => category.slug === article.relatedCategory);

  return (
    <PageBody className="max-w-3xl">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/resources" className="transition-colors hover:text-brand">
          Resources
        </Link>
        <span aria-hidden className="mx-2">
          /
        </span>
        <span className="text-foreground">{article.title}</span>
      </nav>

      <article className="mt-8">
        <header>
          <p className="flex items-center gap-1.5 text-sm font-medium text-brand">
            <BookOpen aria-hidden className="size-4" />
            {article.category}
            <span aria-hidden>·</span>
            <Clock aria-hidden className="size-4" />
            {article.readingMinutes} min read
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{article.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{article.introduction}</p>
        </header>

        {article.sections.map((section) => (
          <section key={section.title} aria-labelledby={`section-${section.title.replace(/\s+/g, "-").toLowerCase()}`} className="mt-10">
            <h2
              id={`section-${section.title.replace(/\s+/g, "-").toLowerCase()}`}
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-3 space-y-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 leading-relaxed text-muted-foreground">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      {relatedCategory && (
        <aside aria-label="Related roles" className="mt-12 rounded-xl border border-border bg-secondary/60 p-6">
          <h2 className="text-base font-semibold text-foreground">Related roles (demonstrations)</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            See how openings in this field appear in the job search. Listings are clearly marked demonstrations, not
            real vacancies.
          </p>
          <Link
            to="/category/$slug"
            params={{ slug: relatedCategory.slug }}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
          >
            Browse {relatedCategory.name}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </aside>
      )}
    </PageBody>
  );
}
