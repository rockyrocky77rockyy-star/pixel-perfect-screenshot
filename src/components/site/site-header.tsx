import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import mark from "@/assets/syncrotech-mark.png";

const primaryNav = [
  { to: "/jobs", label: "Jobs" },
  { to: "/companies", label: "Companies" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
] as const;

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
const navLinkActiveClass = "font-semibold text-foreground";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={close}>
          <img src={mark} alt="SyncroTech Jobs logo" className="h-8 w-8" />
          <span className="text-base font-bold tracking-tight text-foreground">
            SyncroTech <span className="text-brand">Jobs</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={navLinkClass}
              activeProps={{ className: navLinkActiveClass }}
              activeOptions={{ exact: false }}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="ml-2">
            <Link to="/jobs">
              <Search aria-hidden className="size-4" />
              Search jobs
            </Link>
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <Menu aria-hidden className="size-5 rotate-90" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" aria-label="Mobile" className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {primaryNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                activeProps={{ className: navLinkActiveClass }}
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2 w-full">
              <Link to="/jobs" onClick={close}>
                <Search aria-hidden className="size-4" />
                Search jobs
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
