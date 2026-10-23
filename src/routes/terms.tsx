import { createFileRoute } from "@tanstack/react-router";
import { PageBody, PageIntro } from "@/components/site/page-frame";
import { pageHead } from "@/lib/jobs/seo";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () =>
    pageHead(
      "Terms — SyncroTech Jobs",
      "The terms that apply to using SyncroTech Jobs, including how demonstration listings must be treated.",
      "/terms",
    ),
});

function TermsPage() {
  return (
    <>
      <PageIntro
        title="Terms of use"
        description="The ground rules for using SyncroTech Jobs, in plain language."
      />
      <PageBody className="max-w-3xl">
        <section aria-labelledby="acceptable-use">
          <h2 id="acceptable-use" className="text-xl font-semibold tracking-tight text-foreground">
            Using the site
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            You are welcome to browse, search and read everything on SyncroTech Jobs for your own job search and
            learning. Please don't attempt to disrupt the site, scrape it in ways that degrade it for others, or
            present its content as your own service.
          </p>
        </section>

        <section aria-labelledby="demonstrations" className="mt-10">
          <h2 id="demonstrations" className="text-xl font-semibold tracking-tight text-foreground">
            Demonstration listings
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Every listing and company profile currently shown is a clearly marked demonstration. Samples are not real
            vacancies, the named companies are fictional, and no official application link exists for any of them.
            Never treat a sample as a genuine opening, and never rely on sample details — eligibility notes, skills or
            responsibilities — as real requirements.
          </p>
        </section>

        <section aria-labelledby="no-applications" className="mt-10">
          <h2 id="no-applications" className="text-xl font-semibold tracking-tight text-foreground">
            No applications through this site
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            SyncroTech Jobs does not accept or forward applications. When genuine vacancies are added, each will carry
            the employer's own official application source, and applying will always take place with the employer, not
            through this site.
          </p>
        </section>

        <section aria-labelledby="no-warranty" className="mt-10">
          <h2 id="no-warranty" className="text-xl font-semibold tracking-tight text-foreground">
            No warranty
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The site is provided as it is, without guarantees about availability or completeness. Career resources
            offer general guidance, not professional advice. Nothing on this site is an offer of employment.
          </p>
        </section>

        <section aria-labelledby="changes" className="mt-10">
          <h2 id="changes" className="text-xl font-semibold tracking-tight text-foreground">
            Changes
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            These terms may be updated as the site develops. The version published here is the one that applies.
          </p>
        </section>
      </PageBody>
    </>
  );
}
