import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import { Button } from "@/components/ui/Button";
import { downloadResume, openResume } from "@/lib/resume";

GlobalWorkerOptions.workerSrc = pdfWorker;

interface ResumePdfPreviewProps {
  src: string;
}

export function ResumePdfPreview({ src }: ResumePdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    setLoading(true);
    setError(false);
    container.replaceChildren();

    getDocument({ url: src })
      .promise.then(async (pdf) => {
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
          if (cancelled) return;

          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.35 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.className = "mx-auto mb-4 block w-full max-w-full";

          const context = canvas.getContext("2d");
          if (!context) continue;

          container.appendChild(canvas);
          await page.render({ canvasContext: context, viewport, canvas }).promise;
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <FileText className="h-10 w-10 text-[var(--ink-faint)]" aria-hidden="true" />
        <p className="max-w-sm text-sm text-[var(--ink-dim)]">
          Preview could not be loaded. Open or download the resume instead.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" size="sm" type="button" onClick={openResume}>
            Open Resume
          </Button>
          <Button variant="ghost" size="sm" type="button" onClick={() => void downloadResume()}>
            Download
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center text-sm text-[var(--ink-dim)]">
          Loading resume…
        </div>
      )}
      <div ref={containerRef} className="h-full overflow-auto p-4" />
    </div>
  );
}
