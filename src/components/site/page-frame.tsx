import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

/** Shared page shell: sticky header, flexible main area and site footer. */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

/** Consistent page heading block used at the top of content pages. */
export function PageIntro({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-14">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
        {children}
      </div>
    </div>
  );
}

/** Standard content container below the page intro. */
export function PageBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-12 ${className}`}>{children}</div>;
}
