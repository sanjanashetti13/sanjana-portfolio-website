import { profile } from "@/data/content";

export const RESUME_FILENAME = "Sanjana_Shetti_Resume.pdf";
export const RESUME_URL = profile.resumeUrl;

export function getResumeUrl(): string {
  if (typeof window === "undefined") return RESUME_URL;
  return new URL(RESUME_URL, window.location.origin).href;
}

export function openResume(): void {
  window.open(getResumeUrl(), "_blank", "noopener,noreferrer");
}

export async function downloadResume(): Promise<void> {
  const response = await fetch(RESUME_URL);
  if (!response.ok) {
    throw new Error("Resume not found");
  }

  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = RESUME_FILENAME;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(blobUrl);
}
