import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getReducedMotionInitial(_animate: object, reduced: boolean) {
  return reduced ? { opacity: 1, y: 0, x: 0, scale: 1 } : { opacity: 0, y: 24 };
}

export const motionEase = [0.16, 1, 0.3, 1] as const;

export const viewportReveal = {
  once: true,
  margin: "-10% 0px" as const,
};

export function extractGitHubRepo(url: string): { owner: string; repo: string } | null {
  if (!url || url === "#") return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}
