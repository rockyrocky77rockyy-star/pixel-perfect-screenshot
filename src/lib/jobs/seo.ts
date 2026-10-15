const SITE_ORIGIN = "https://job.syncrotech.online";

export function pageHead(title: string, description: string, path: string, type = "website") {
  const canonical = new URL(path, SITE_ORIGIN).toString();
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: canonical },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function categoryMetadataPath(slug: string) {
  return `/category/${slug}`;
}