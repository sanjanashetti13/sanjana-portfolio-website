import { createContext, useContext, useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger);

const ScrollProgressContext = createContext<RefObject<number> | null>(null);

export function ScrollProgressProvider({
  pageRef,
  children,
}: {
  pageRef: RefObject<HTMLElement | null>;
  children: React.ReactNode;
}) {
  const progressRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !pageRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: pageRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      trigger.kill();
    };
  }, [pageRef, reduced]);

  return (
    <ScrollProgressContext.Provider value={progressRef}>
      {children}
    </ScrollProgressContext.Provider>
  );
}

export function useScrollProgressRef() {
  const ctx = useContext(ScrollProgressContext);
  const fallback = useRef(0);
  return ctx ?? fallback;
}
