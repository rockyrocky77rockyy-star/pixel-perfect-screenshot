import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { DemoNotice } from "@/components/jobs/demo-notice";
import { PageBody, PageIntro } from "@/components/site/page-frame";
import { demonstrationCompanies } from "@/lib/jobs/data";
import { pageHead } from "@/lib/jobs/seo";

export const Route = createFileRoute("/companies/")({
  component: CompaniesIndexPage,
  head: () => ({
    ...pageHead(
      "Companies — SyncroTech Jobs",
      "Browse the employer directory. All profiles currently shown are clearly marked fictional demonstrations, not real employers.",
      "/companies",
      { noindex: true },
    ),
  }),
});

function CompaniesIndexPage() {
  return (
    <>
      <PageIntro
        title="Companies"
        description="A directory of employer profiles. Company profiles help you compare workplaces once real employers are added."
      />
      <PageBody>
        <DemoNotice tone="info">
          Every company profile below is a fictional demonstration used to show how the directory works. None of them
          is a real employer, and none represents a genuine hiring announcement.
        </DemoNotice>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demonstrationCompanies.map((company) => (
            <li key={company.id}>
              <Link
                to="/companies/$slug"
                params={{ slug: company.id }}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand/40"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-base font-bold text-primary"
                  >
                    {company.name.charAt(0)}
                  </span>
                  <h2 className="text-base font-semibold text-foreground transition-colors group-hover:text-brand">
                    {company.name}
                  </h2>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{company.industry}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin aria-hidden className="size-3.5 shrink-0" />
                  {company.location}
                </p>
                <p className="mt-4 text-xs font-medium text-warning">Demonstration profile</p>
              </Link>
            </li>
          ))}
        </ul>
      </PageBody>
    </>
  );
}
