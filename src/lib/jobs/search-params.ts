import { categories } from "./data";
import { createEmptyFilters, isExperienceLevel } from "./search";
import type { SearchFilters } from "./types";

export const workplaceOptions = ["On-site", "Hybrid", "Remote"] as const;
export const employmentTypeOptions = ["Full-time", "Part-time", "Internship"] as const;
export const datePostedOptions = [
  { value: "", label: "Any time" },
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
] as const;
export const sortOptions = [
  { value: "recent", label: "Most recent" },
  { value: "title", label: "Job title (A–Z)" },
  { value: "company", label: "Company (A–Z)" },
] as const;

const pick = (value: unknown, allowed: readonly string[]) =>
  typeof value === "string" && allowed.includes(value) ? value : "";
const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** Turn raw URL search parameters into safe, validated search filters. */
export function parseJobFilters(search: Record<string, unknown> | undefined): SearchFilters {
  return {
    q: text(search?.q, 120),
    location: text(search?.location, 80),
    company: text(search?.company, 80),
    experience: typeof search?.experience === "string" && isExperienceLevel(search.experience) ? search.experience : "",
    workplace: pick(search?.workplace, workplaceOptions),
    employmentType: pick(search?.employmentType, employmentTypeOptions),
    category: pick(search?.category, categories.map((category) => category.id)),
    datePosted: pick(search?.datePosted, ["", "any", "7", "30"]),
    sort: pick(search?.sort, sortOptions.map((option) => option.value)) || "recent",
  };
}

/** Serialize filters back into a query string, omitting defaults. */
export function filtersToQueryString(filters: SearchFilters): string {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.location) params.set("location", filters.location);
  if (filters.company) params.set("company", filters.company);
  if (filters.experience) params.set("experience", filters.experience);
  if (filters.workplace) params.set("workplace", filters.workplace);
  if (filters.employmentType) params.set("employmentType", filters.employmentType);
  if (filters.category) params.set("category", filters.category);
  if (filters.datePosted && filters.datePosted !== "any") params.set("datePosted", filters.datePosted);
  if (filters.sort !== "recent") params.set("sort", filters.sort);
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function withClearedFilter(filters: SearchFilters, key: keyof SearchFilters): SearchFilters {
  return { ...filters, [key]: "" } as SearchFilters;
}

const FILTER_KEYS = ["q", "location", "company", "experience", "workplace", "employmentType", "category", "datePosted"] as const;

export function countActiveFilters(filters: SearchFilters): number {
  return FILTER_KEYS.filter((key) => filters[key]).length;
}

export { createEmptyFilters };
