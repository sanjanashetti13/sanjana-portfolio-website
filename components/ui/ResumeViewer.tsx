import type { ReactNode } from "react";
import { Download } from "lucide-react";
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

export function ResumeViewer({ trigger, title = "Resume" }: ResumeViewerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="flex flex-row items-center justify-between gap-4 border-b border-[var(--line)] p-4 pr-12">
          <DialogTitle>{title}</DialogTitle>
          <Button variant="ghost" size="sm" asChild>
            <a href={profile.resumeUrl} download="Sanjana_Shetti_Resume.pdf">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download
            </a>
          </Button>
        </DialogHeader>
        <iframe
          src={profile.resumeUrl}
          title={`${title} preview`}
          className="h-[70vh] w-full border-0 bg-[var(--bg)]"
        />
      </DialogContent>
    </Dialog>
  );
}
