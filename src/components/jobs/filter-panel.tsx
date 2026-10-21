import { Link } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { categories } from "@/lib/jobs/data";
import { employmentTypeOptions, workplaceOptions, datePostedOptions, sortOptions } from "@/lib/jobs/search-params";
import { isExperienceLevel } from "@/lib/jobs/search";
import type { SearchFilters } from "@/lib/jobs/types";
import { cn } from "@/lib/utils";

const experienceOptions = ["Fresher", "Internship", "0–1 years", "1–3 years", "3+ years"] as const;

const controlClass =
  "h-10 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-ring/40";

function SelectControl({
  id,
  label,
  name,
  value,
  options,
  anyLabel,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  options: readonly { value: string; label: string }[];
  anyLabel: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      <select id={id} name={name} defaultValue={value} className={cn(controlClass, "appearance-none bg-card")}>
        <option value="">{anyLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Filter form; submits as GET to /jobs so every filter is preserved in the URL. */
export function FilterPanel({ filters }: { filters: SearchFilters }) {
  const experience = isExperienceLevel(filters.experience) ? filters.experience : "";
  return (
    <form method="get" action="/jobs" aria-label="Job search filters" className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
        <SlidersHorizontal aria-hidden className="size-4 text-brand" />
        Refine results
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-q" className="text-xs font-medium text-muted-foreground">
            Keyword
          </Label>
          <input
            id="filter-q"
            name="q"
            type="text"
            defaultValue={filters.q}
            placeholder="Role, skill or company"
            className={cn(controlClass, "placeholder:text-muted-foreground/70")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-location" className="text-xs font-medium text-muted-foreground">
            Location
          </Label>
          <input
            id="filter-location"
            name="location"
            type="text"
            defaultValue={filters.location}
            placeholder="City or region"
            className={cn(controlClass, "placeholder:text-muted-foreground/70")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="filter-company" className="text-xs font-medium text-muted-foreground">
            Company
          </Label>
          <input
            id="filter-company"
            name="company"
            type="text"
            defaultValue={filters.company}
            placeholder="Employer name"
            className={cn(controlClass, "placeholder:text-muted-foreground/70")}
          />
        </div>
        <SelectControl
          id="filter-category"
          label="Category"
          name="category"
          value={filters.category}
          anyLabel="All categories"
          options={categories.map((category) => ({ value: category.id, label: category.name }))}
        />
        <SelectControl
          id="filter-workplace"
          label="Workplace"
          name="workplace"
          value={filters.workplace}
          anyLabel="Any workplace"
          options={workplaceOptions.map((value) => ({ value, label: value }))}
        />
        <SelectControl
          id="filter-employment"
          label="Employment type"
          name="employmentType"
          value={filters.employmentType}
          anyLabel="Any employment type"
          options={employmentTypeOptions.map((value) => ({ value, label: value }))}
        />
        <SelectControl
          id="filter-experience"
          label="Experience level"
          name="experience"
          value={experience}
          anyLabel="Any experience"
          options={experienceOptions.map((value) => ({ value, label: value }))}
        />
        <SelectControl
          id="filter-posted"
          label="Availability"
          name="datePosted"
          value={filters.datePosted}
          anyLabel="Any time"
          options={datePostedOptions}
        />
        <SelectControl
          id="filter-sort"
          label="Sort by"
          name="sort"
          value={filters.sort}
          anyLabel="Most recent"
          options={sortOptions}
        />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button type="submit">Apply filters</Button>
        <Link to="/jobs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand">
          Reset all
        </Link>
      </div>
    </form>
  );
}
