import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--line)] bg-[var(--surface-2)] px-3 py-1 font-display text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--ink-dim)]",
        className
      )}
    >
      {children}
    </span>
  );
}
