"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface PipelineItemProps {
  date: string;
  children: React.ReactNode;
  className?: string;
  isLast?: boolean;
}

export function PipelineItem({
  date,
  children,
  className,
  isLast = false,
}: PipelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !itemRef.current || !dotRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        dotRef.current,
        { scale: 0.6, backgroundColor: "transparent", borderColor: "var(--violet)" },
        {
          scale: 1,
          backgroundColor: "var(--violet)",
          borderColor: "var(--violet)",
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, itemRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={itemRef}
      className={cn(
        "relative grid grid-cols-1 gap-4 border-b border-[var(--line)] py-10 md:grid-cols-[170px_1fr] md:gap-8",
        isLast && "border-b-0",
        className
      )}
    >
      <div className="flex items-start gap-4 md:block">
        <div
          ref={dotRef}
          className="mt-1.5 hidden h-3 w-3 shrink-0 rounded-full border-2 border-[var(--violet)] bg-transparent md:block"
          aria-hidden="true"
        />
        <p className="font-display text-[13px] font-medium uppercase tracking-[0.12em] text-[var(--ink-faint)]">
          {date}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}
