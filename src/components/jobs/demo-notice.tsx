import { FlaskConical, Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Conspicuous notice used on every demonstration listing and company profile.
 * tone="warning" marks a fictional record; tone="info" explains how listings behave.
 */
export function DemoNotice({
  tone = "warning",
  children,
  className,
}: {
  tone?: "warning" | "info";
  children: React.ReactNode;
  className?: string;
}) {
  const Icon = tone === "warning" ? FlaskConical : Info;
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4 text-sm leading-relaxed",
        tone === "warning"
          ? "border-warning/30 bg-warning/10 text-foreground"
          : "border-border bg-secondary/60 text-foreground",
        className,
      )}
    >
      <Icon aria-hidden className={cn("mt-0.5 size-4 shrink-0", tone === "warning" ? "text-warning" : "text-brand")} />
      <div>{children}</div>
    </div>
  );
}
