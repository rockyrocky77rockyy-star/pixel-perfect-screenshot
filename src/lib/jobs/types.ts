export type WorkArrangement = "On-site" | "Hybrid" | "Remote";
export type EmploymentType = "Full-time" | "Part-time" | "Internship";
export type ExperienceLevel = "Fresher" | "Internship" | "0–1 years" | "1–3 years" | "3+ years";

export interface Job {
  id: string;
  slug: string;
  title: string;
  companyId: string;
  companyName: string;
  companyMark: string;
  location: string;
  workplaceType: WorkArrangement;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  minimumExperience?: number;
  maximumExperience?: number;
  salaryMin?: number;
  salaryMax?: number;
  currency?: "INR";
  categoryId: string;
  skills: string[];
  eligibility: string;
  description: string;
  responsibilities: string[];
  sourceName?: string;
  sourceUrl?: string;
  applyUrl?: string;
  status: "demonstration" | "active" | "expired";
  publishedAt?: string;
  applicationDeadline?: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  about: string;
  demonstration: boolean;
  officialWebsite?: string;
}

export interface JobCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface CareerArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  readingMinutes: number;
  introduction: string;
  sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
  relatedCategory: string;
}

export interface SearchFilters {
  q: string;
  location: string;
  experience: string;
  company: string;
  workplace: string;
  employmentType: string;
  category: string;
  datePosted: string;
  sort: string;
}