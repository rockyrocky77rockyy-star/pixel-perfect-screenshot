import { Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import mark from "@/assets/syncrotech-mark.png";

const exploreLinks = [
  { to: "/jobs", label: "Browse jobs" },
  { to: "/companies", label: "Companies" },
  { to: "/resources", label: "Career resources" },
] as const;

const siteLinks = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src={mark} alt="SyncroTech Jobs logo" className="h-8 w-8" />
              <span className="text-base font-bold tracking-tight text-foreground">
                SyncroTech <span className="text-brand">Jobs</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A focused place to search for roles, compare employers and read practical career guidance for
              early-career technologists.
            </p>
          </div>
          <nav aria-label="Explore">
            <h2 className="text-sm font-semibold text-foreground">Explore</h2>
            <ul className="mt-3 space-y-2">
              {exploreLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Site information">
            <h2 className="text-sm font-semibold text-foreground">Site information</h2>
            <ul className="mt-3 space-y-2">
              {siteLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} SyncroTech Jobs. All rights reserved.</p>
          <p className="flex items-start gap-2 text-xs text-muted-foreground sm:max-w-md">
            <FlaskConical aria-hidden className="mt-0.5 size-3.5 shrink-0 text-warning" />
            Every listing currently shown is a clearly marked demonstration. None is a real vacancy.
          </p>
        </div>
      </div>
    </footer>
  );
}
