import { createFileRoute } from "@tanstack/react-router";
import { Inbox } from "lucide-react";
import { PageBody, PageIntro } from "@/components/site/page-frame";
import { pageHead } from "@/lib/jobs/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () =>
    pageHead(
      "Contact — SyncroTech Jobs",
      "How to reach SyncroTech Jobs. Official contact details will be published here once the site goes live.",
      "/contact",
    ),
});

function ContactPage() {
  return (
    <>
      <PageIntro
        title="Contact"
        description="Questions, corrections or employer enquiries — here is how reaching SyncroTech Jobs will work."
      />
      <PageBody className="max-w-3xl">
        <div className="rounded-xl border border-border bg-secondary/60 p-6">
          <div className="flex items-start gap-3">
            <Inbox aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
            <div>
              <h2 className="text-base font-semibold text-foreground">Official contact details are not published yet</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                SyncroTech Jobs is in preparation and has not published an official contact address. To keep things
                honest, no placeholder email, phone number or form is shown here. Official contact details will appear
                on this page as soon as the site goes live.
              </p>
            </div>
          </div>
        </div>

        <section aria-labelledby="meanwhile" className="mt-10">
          <h2 id="meanwhile" className="text-xl font-semibold tracking-tight text-foreground">
            In the meantime
          </h2>
          <ul className="mt-4 space-y-2.5">
            {[
              "Treat every listing marked as a demonstration as sample content — never apply through it, because no application link exists for samples.",
              "If a message claims to come from SyncroTech Jobs and asks for payment or personal details, treat it with caution: no official communication channel exists yet.",
              "When real vacancies are added, each one will carry the employer's own official application source so you can verify it directly.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 leading-relaxed text-muted-foreground">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </PageBody>
    </>
  );
}
