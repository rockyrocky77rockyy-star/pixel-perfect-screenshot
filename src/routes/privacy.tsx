import { createFileRoute } from "@tanstack/react-router";
import { PageBody, PageIntro } from "@/components/site/page-frame";
import { pageHead } from "@/lib/jobs/seo";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () =>
    pageHead(
      "Privacy — SyncroTech Jobs",
      "How SyncroTech Jobs handles information: no accounts, no application data and no profiles built about you.",
      "/privacy",
    ),
});

function PrivacyPage() {
  return (
    <>
      <PageIntro
        title="Privacy"
        description="Plain-language notes on what SyncroTech Jobs does and does not handle."
      />
      <PageBody className="max-w-3xl">
        <section aria-labelledby="no-accounts">
          <h2 id="no-accounts" className="text-xl font-semibold tracking-tight text-foreground">
            No accounts, no applications
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            SyncroTech Jobs does not offer accounts, and you cannot apply for jobs through this site. We do not ask
            for your resume, contact details or any application information, so there is nothing of that kind to store
            or share.
          </p>
        </section>

        <section aria-labelledby="technical" className="mt-10">
          <h2 id="technical" className="text-xl font-semibold tracking-tight text-foreground">
            Standard technical data
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Like any website, the hosting infrastructure that serves these pages processes standard technical request
            data — such as your browser type and the pages requested — in order to deliver the site and keep it
            working. Your search criteria stay in the page address of your own browser; they are not attached to a
            profile about you.
          </p>
        </section>

        <section aria-labelledby="demonstrations" className="mt-10">
          <h2 id="demonstrations" className="text-xl font-semibold tracking-tight text-foreground">
            Demonstration content
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Companies, listings and eligibility notes shown as demonstrations are fictional sample content. They
            reference no real person and collect nothing from anyone.
          </p>
        </section>

        <section aria-labelledby="changes" className="mt-10">
          <h2 id="changes" className="text-xl font-semibold tracking-tight text-foreground">
            Changes to this policy
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            If the way this site handles information ever changes — for example when accounts or applications are
            introduced — this page will be updated first, before any new feature asks you for anything.
          </p>
        </section>
      </PageBody>
    </>
  );
}
