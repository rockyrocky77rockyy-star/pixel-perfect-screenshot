import type { ExperienceLevel, Job, SearchFilters } from "./types";

const includes = (value: string | undefined, query: string) =>
  !query.trim() || (value ?? "").toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());

export function filterJobs(jobs: readonly Job[], filters: SearchFilters): Job[] {
  const filtered = jobs.filter((job) => {
    const searchable = [job.title, job.companyName, ...job.skills, job.description, job.categoryId].join(" ");
    const companyMatch = includes(job.companyName, filters.company);
    const locationMatch = includes(job.location, filters.location);
    const experienceMatch = !filters.experience || job.experienceLevel === filters.experience;
    const workplaceMatch = !filters.workplace || job.workplaceType.toLocaleLowerCase() === filters.workplace.toLocaleLowerCase();
    const employmentMatch = !filters.employmentType || job.employmentType.toLocaleLowerCase() === filters.employmentType.toLocaleLowerCase();
    const categoryMatch = !filters.category || job.categoryId === filters.category || categoriesForJob(job.categoryId).includes(filters.category);
    const time = !filters.datePosted || filters.datePosted === "any" ||
      (filters.datePosted === "30" && Boolean(job.publishedAt && Date.now() - Date.parse(job.publishedAt) <= 30 * 86400000)) ||
      (filters.datePosted === "7" && Boolean(job.publishedAt && Date.now() - Date.parse(job.publishedAt) <= 7 * 86400000));
    return includes(searchable, filters.q) && companyMatch && locationMatch && experienceMatch && workplaceMatch && employmentMatch && categoryMatch && time;
  });

  switch (filters.sort) {
    case "title": return filtered.sort((a, b) => a.title.localeCompare(b.title));
    case "company": return filtered.sort((a, b) => a.companyName.localeCompare(b.companyName) || a.title.localeCompare(b.title));
    case "recent":
    default: return filtered.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "") || a.title.localeCompare(b.title));
  }
}

function categoriesForJob(id: string): string[] {
  if (id === "software") return ["technology"];
  if (id === "technology") return ["software"];
  if (id === "internships") return ["internship"];
  if (id === "graduate") return ["graduate-trainee"];
  return [];
}

export function isExperienceLevel(value: string): value is ExperienceLevel {
  return ["Fresher", "Internship", "0–1 years", "1–3 years", "3+ years"].includes(value);
}

export function createEmptyFilters(): SearchFilters {
  return { q: "", location: "", experience: "", company: "", workplace: "", employmentType: "", category: "", datePosted: "", sort: "recent" };
}