# SyncroTech Jobs roadmap

- [x] Create semantic design tokens and a responsive shared site shell.
- [x] Implement typed demonstration listings, categories, company profiles, editorial content, and tested filtering.
- [x] Build the search homepage, filtered jobs, job details, category, company, resource, and informational pages.
- [x] Add per-page SEO metadata and noindex safeguards for demonstration-only pages.
- [x] Verify acceptance-critical flows and responsive layouts; read diagnostics and complete this roadmap.

## Deferred / documented limitations

- Sitemap: no public project URL exists yet, so no sitemap is generated (fabricating one would be
  dishonest). Create it through the supported router-derived sitemap setup once the site is
  published; robots.txt intentionally stays without a Sitemap directive until then.
- JobPosting structured data: intentionally never emitted while every listing is a demonstration.
- Contact page deliberately shows no invented contact details; publish real ones there when live.
