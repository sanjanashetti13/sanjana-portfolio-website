import { cn } from "@/lib/utils";

interface GlowOrbProps {
  size: number;
  color: "violet" | "pink";
  opacity: number;
  className?: string;
}

const colorMap = {
  violet: "bg-[var(--violet)]",
  pink: "bg-[var(--pink)]",
};

export function GlowOrb({ size, color, opacity, className }: GlowOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full blur-[100px]",
        colorMap[color],
        className
      )}
      style={{
        width: size,
        height: size,
        opacity,
      }}
    />
  );
}
