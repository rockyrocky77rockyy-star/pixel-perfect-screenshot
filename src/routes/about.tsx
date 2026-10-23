import { createFileRoute, Link } from "@tanstack/react-router";
import { FlaskConical, ShieldCheck, Search } from "lucide-react";
import { PageBody, PageIntro } from "@/components/site/page-frame";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/jobs/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    pageHead(
      "About — SyncroTech Jobs",
      "What SyncroTech Jobs is, how listings behave today, and the principles that keep every sample clearly marked.",
      "/about",
    ),
});

function AboutPage() {
  return (
    <>
      <PageIntro
        title="About SyncroTech Jobs"
        description="A focused job-discovery experience for early-career technologists, built around clear search and honest presentation."
      />
      <PageBody className="max-w-3xl">
        <section aria-labelledby="what-is" className="prose-sm">
          <h2 id="what-is" className="text-xl font-semibold tracking-tight text-foreground">
            What SyncroTech Jobs is
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            SyncroTech Jobs is a place to search for roles, compare employers and read practical career guidance. The
            experience is being prepared in stages: search, filters, categories, company profiles and career resources
            are in place today, ready to carry real vacancies when they are supplied.
          </p>
        </section>

        <section aria-labelledby="how-listings" className="mt-10">
          <h2 id="how-listings" className="text-xl font-semibold tracking-tight text-foreground">
            How listings behave today
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <FlaskConical aria-hidden className="mt-0.5 size-5 shrink-0 text-warning" />
              <div>
                <h3 className="text-base font-semibold text-foreground">Every sample is labelled</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  All listings and company profiles currently shown are clearly marked demonstrations. None is a real
                  vacancy or a real employer, and none represents a hiring announcement.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
              <div>
                <h3 className="text-base font-semibold text-foreground">Official links only when they are real</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  An official application link appears only when a genuine employer has supplied a real application
                  source. Samples never get one, and nothing is invented behind the scenes — no salaries, deadlines,
                  ratings or contact details.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Search aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
              <div>
                <h3 className="text-base font-semibold text-foreground">Search you can rely on</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Keyword, location and career-stage search combine with company, workplace, employment type, category
                  and availability filters, and your criteria stay in the page address so refreshing keeps your
                  results.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="whats-next" className="mt-10">
          <h2 id="whats-next" className="text-xl font-semibold tracking-tight text-foreground">
            What comes next
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            As genuine vacancies and employer details are supplied, they will replace the demonstration content, with
            official application links pointing only at employer-identified sources. Until then, the demonstration
            labels stay in place.
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/jobs">Browse demonstration listings</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/resources">Read career resources</Link>
          </Button>
        </div>
      </PageBody>
    </>
  );
}
