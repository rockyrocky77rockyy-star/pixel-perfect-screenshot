# SyncroTech Jobs implementation plan

Build the uploaded brief into a responsive, working job-discovery application at `/`, using the project's existing TanStack Start and Tailwind setup. Preserve the existing framework; do not substitute React Router.

## Product experience
- Establish SyncroTech Jobs branding, a compact shared header/footer, accessible desktop and mobile navigation, and a focused, search-first homepage.
- Add working keyword, location, and career-stage search with URL-preserved criteria; clickable suggested searches; and category links that lead to meaningful, filtered pages.
- Make the job search usable with combined keyword, company, location, workplace, experience, employment, category, and available-date filters; active-filter clearing; empty states; and working sorting.
- Support stable job-detail, category, company-directory/company-detail, and career-resource pages, together with useful About, Contact, Privacy, and Terms content. Ensure every internal link resolves and invalid job/company slugs show not-found content.
- Keep official-application links honest: only real supplied URLs can be opened as official applications. Mark fictional listings and companies conspicuously as demonstrations, do not imply vacancies are real, and do not invent verification, salaries, deadlines, ratings, contact details, employers, partnerships, or job counts. Skip nonfunctional accounts, newsletter, advertisements, and reporting features.

## Data, search, and quality
- Define typed job, company, category, article, and filter data, with a small local demonstration dataset and a replaceable read-only data-provider boundary for possible future database integration.
- Centralize search/filter/sort and display-formatting rules; preserve filter state on refresh through query parameters; include appropriate results and missing-information states.
- Use the existing design system and accessible controls; ensure keyboard operation, reduced-motion support, readable layouts, and no horizontal overflow across mobile, tablet, and desktop.
- Add automated checks for key search/filter, sorting, safe demo-listing behavior, and route matching, and exercise the important search-to-details flow in the preview.

## SEO and launch boundaries
- Give every content route distinctive, app-specific title, description, Open Graph title/description and type, and Twitter card metadata. Use the supplied canonical domain (`https://job.syncrotech.online`) only for canonical metadata; never derive it from search parameters.
- Prepare structured JobPosting data only for a listing when all required details are genuine, its official source supports them, and it is currently open; never emit it for demonstrations.
- Review the existing robots rules and the supported sitemap installation guidance before changing either. Do not claim publication, live job feeds, search indexing, production data, or AdSense approval. If domain configuration or the supported sitemap setup cannot be verified, document that limitation rather than fabricating a sitemap or sitemap URL.

## Technical approach
- Extend file-based routes in the existing TanStack Start project; use its generated route tree, established UI components, and semantic CSS tokens. No backend, external jobs API, paid service, or credentials are needed for this phase.
- Keep presentation components, typed local data, and filtering/formatting helpers separated. Preserve SSR-safe imports and use each leaf route's `head()` for its metadata.
