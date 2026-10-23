const SITE_ORIGIN = "https://job.syncrotech.online";

interface PageHeadOptions {
  /** Open Graph type; "article" for individual listings and articles. */
  type?: string;
  /** Exclude the page from search engines (used for demonstration-only pages). */
  noindex?: boolean;
}

/** Shared head metadata for a leaf route: title, description, Open Graph, Twitter card and canonical. */
export function pageHead(title: string, description: string, path: string, options: PageHeadOptions = {}) {
  const { type = "website", noindex = false } = options;
  const canonical = new URL(path, SITE_ORIGIN).toString();
  const meta = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: canonical },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (noindex) meta.push({ name: "robots", content: "noindex, follow" });
  return {
    meta,
    links: [{ rel: "canonical", href: canonical }],
  };
}

/** Head metadata for a missing job/company/category page: keep it out of search indexes. */
export function notFoundHead(title: string) {
  return {
    meta: [{ title }, { name: "robots", content: "noindex" }],
  };
}

export const categoryMetadataPath = (slug: string) => `/category/${slug}`;
