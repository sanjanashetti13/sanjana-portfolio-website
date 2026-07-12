import { useMemo, useState, type ReactNode } from "react";
import { Download, ExternalLink } from "lucide-react";
import { profile } from "@/data/content";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ResumeViewerProps {
  trigger: ReactNode;
  title?: string;
}

const RESUME_FILENAME = "Sanjana_Shetti_Resume.pdf";

function getResumeHref(): string {
  if (typeof window === "undefined") return profile.resumeUrl;
  return new URL(profile.resumeUrl, window.location.origin).href;
}

export function ResumeViewer({ trigger, title = "Resume" }: ResumeViewerProps) {
  const [open, setOpen] = useState(false);
  const resumeHref = useMemo(getResumeHref, [open]);

  const handleOpen = () => {
    window.open(resumeHref, "_blank", "noopener,noreferrer");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumeHref;
    link.download = RESUME_FILENAME;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="flex flex-row items-center justify-between gap-3 border-b border-[var(--line)] p-4 pr-12">
          <DialogTitle>{title}</DialogTitle>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={handleOpen}>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Open
            </Button>
            <Button variant="ghost" size="sm" type="button" onClick={handleDownload}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download
            </Button>
          </div>
        </DialogHeader>

        <div className="relative h-[70vh] w-full bg-[var(--bg)]">
          {open && (
            <iframe
              src={`${resumeHref}#view=FitH`}
              title={`${title} preview`}
              className="h-full w-full border-0"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
