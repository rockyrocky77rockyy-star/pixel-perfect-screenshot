import { describe, expect, it } from "vitest";
import {
  countActiveFilters,
  filtersToQueryString,
  parseJobFilters,
  withClearedFilter,
} from "./search-params";

describe("job filter URL parameters", () => {
  it("keeps valid values, trims text and drops invalid choices", () => {
    const filters = parseJobFilters({
      q: "  react  ",
      location: "Pune",
      workplace: "TOTALLY-REMOTE",
      employmentType: "Internship",
      experience: "Fresher",
      category: "data",
      datePosted: "7",
      sort: "title",
    });
    expect(filters.q).toBe("react");
    expect(filters.location).toBe("Pune");
    expect(filters.workplace).toBe("");
    expect(filters.employmentType).toBe("Internship");
    expect(filters.experience).toBe("Fresher");
    expect(filters.category).toBe("data");
    expect(filters.datePosted).toBe("7");
    expect(filters.sort).toBe("title");
  });

  it("falls back to recent sorting and rejects unknown categories", () => {
    const filters = parseJobFilters({ sort: "salary", category: "astronomy", datePosted: "any" });
    expect(filters.sort).toBe("recent");
    expect(filters.category).toBe("");
    expect(filters.datePosted).toBe("any");
  });

  it("caps free-text inputs at 120 characters", () => {
    expect(parseJobFilters({ q: "x".repeat(400) }).q).toHaveLength(120);
    expect(parseJobFilters({ location: "y".repeat(400) }).location).toHaveLength(80);
  });

  it("serializes only non-default values so clean searches have an empty query string", () => {
    expect(filtersToQueryString(parseJobFilters({}))).toBe("");
    expect(filtersToQueryString(parseJobFilters({ datePosted: "any" }))).toBe("");
    expect(filtersToQueryString(parseJobFilters({ q: "SQL", workplace: "Remote", datePosted: "7", sort: "title" }))).toBe(
      "?q=SQL&workplace=Remote&datePosted=7&sort=title",
    );
  });

  it("counts active filters and ignores the any-time availability default", () => {
    expect(countActiveFilters(parseJobFilters({ datePosted: "any" }))).toBe(0);
    expect(countActiveFilters(parseJobFilters({ q: "SQL", datePosted: "30" }))).toBe(2);
  });

  it("clears one filter while preserving the rest", () => {
    const cleared = withClearedFilter(parseJobFilters({ q: "SQL", location: "Pune", sort: "title" }), "q");
    expect(cleared.q).toBe("");
    expect(cleared.location).toBe("Pune");
    expect(cleared.sort).toBe("title");
  });
});
