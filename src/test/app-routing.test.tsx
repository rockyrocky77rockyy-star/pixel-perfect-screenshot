import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  const pagePaths = [
    "/",
    "/jobs",
    "/jobs/frontend-developer-demo",
    "/jobs/does-not-exist",
    "/category/it-jobs",
    "/category/does-not-exist",
    "/companies",
    "/companies/sampleworks",
    "/companies/does-not-exist",
    "/resources",
    "/resources/resume-guide-for-freshers",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  it("matches a dedicated page route for every site path instead of falling back to not found", () => {
    for (const path of pagePaths) {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId, `expected a page route for ${path}`).not.toBe(rootRouteId);
    }
  });
});
