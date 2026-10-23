import { useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";

/**
 * Submit a search form as a TanStack navigation to /jobs, keeping only the
 * filters the user actually filled in so URLs stay clean and shareable.
 */
export function useJobSearchSubmit() {
  const navigate = useNavigate();
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const search: Record<string, string> = {};
    for (const [key, raw] of data.entries()) {
      const value = String(raw).trim();
      if (!value) continue;
      if (key === "sort" && value === "recent") continue;
      if (key === "datePosted" && value === "any") continue;
      search[key] = value;
    }
    void navigate({ to: "/jobs", search });
  };
}
