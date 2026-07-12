import { Suspense, lazy, useMemo, useState, type ReactNode } from "react";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { downloadResume, getResumeUrl, openResume } from "@/lib/resume";

const ResumePdfPreview = lazy(() =>
  import("@/components/ui/ResumePdfPreview").then((module) => ({
    default: module.ResumePdfPreview,
  }))
);

interface ResumeViewerProps {
  trigger: ReactNode;
  title?: string;
}

export function ResumeViewer({ trigger, title = "Resume" }: ResumeViewerProps) {
  const [open, setOpen] = useState(false);
  const resumeUrl = useMemo(getResumeUrl, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="flex flex-row items-center justify-between gap-3 border-b border-[var(--line)] p-4 pr-12">
          <DialogTitle>{title}</DialogTitle>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={openResume}>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Open
            </Button>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => void downloadResume()}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download
            </Button>
          </div>
        </DialogHeader>

        <div className="relative h-[70vh] w-full bg-[var(--bg)]">
          {open && (
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center text-sm text-[var(--ink-dim)]">
                  Loading resume…
                </div>
              }
            >
              <ResumePdfPreview src={resumeUrl} />
            </Suspense>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
