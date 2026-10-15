import { describe, expect, it } from "vitest";
import { demonstrationJobs } from "./data";
import { createEmptyFilters, filterJobs } from "./search";

describe("job search", () => {
  it("matches a keyword across sample titles and combines location and experience", () => {
    const result = filterJobs(demonstrationJobs, { ...createEmptyFilters(), q: "react", location: "hyderabad", experience: "Fresher" });
    expect(result.map((job) => job.slug)).toEqual([]);
    const matching = filterJobs(demonstrationJobs, { ...createEmptyFilters(), q: "SQL", location: "REMOTE", experience: "0–1 years" });
    expect(matching.map((job) => job.slug)).toContain("entry-level-product-analyst-demo");
  });

  it("sorts matching results by title and company", () => {
    const base = { ...createEmptyFilters(), sort: "title" };
    expect(filterJobs(demonstrationJobs, base).map((job) => job.title)).toEqual(
      filterJobs(demonstrationJobs, base).map((job) => job.title).slice().sort((a, b) => a.localeCompare(b)),
    );
    expect(filterJobs(demonstrationJobs, { ...base, sort: "company" }).map((job) => job.companyName)[0]).toBe("Brightpath Learning");
  });

  it("does not expose an official application link or fabricate salary for demonstrations", () => {
    expect(demonstrationJobs.every((job) => job.status === "demonstration" && job.applyUrl === undefined && job.salaryMin === undefined && job.salaryMax === undefined)).toBe(true);
  });
});