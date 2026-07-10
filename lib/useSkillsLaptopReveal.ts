import { useEffect } from "react";
import {
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger);

/** Lid flat on keyboard (sleeping) → open 110° toward the user */
const LID_CLOSED_DEG = 90;
const LID_OPEN_DEG = -20;

const REST = {
  riseY: 160,
  rotateZ: -4,
  lidOpen: LID_CLOSED_DEG,
  screenOpacity: 0,
  screenBrightness: 0.35,
  displayGlow: 0,
  shadowOpacity: 0,
  shadowScale: 0.72,
  ambientGlow: 0.15,
} as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function segment(p: number, start: number, end: number) {
  if (p <= start) return 0;
  if (p >= end) return 1;
  return (p - start) / (end - start);
}

function applyOpenState(
  values: {
    riseY: MotionValue<number>;
    rotateZ: MotionValue<number>;
    lidOpen: MotionValue<number>;
    screenOpacity: MotionValue<number>;
    screenBrightness: MotionValue<number>;
    displayGlow: MotionValue<number>;
    shadowOpacity: MotionValue<number>;
    shadowScale: MotionValue<number>;
    ambientGlow: MotionValue<number>;
  },
  p: number
) {
  const riseP = easeOutCubic(segment(p, 0, 0.26));
  values.riseY.set(lerp(REST.riseY, 0, riseP));
  values.rotateZ.set(lerp(REST.rotateZ, 0, riseP));
  values.shadowOpacity.set(lerp(REST.shadowOpacity, 0.85, riseP));
  values.shadowScale.set(lerp(REST.shadowScale, 1, riseP));

  const lidP = easeOutCubic(segment(p, 0.2, 0.55));
  values.lidOpen.set(lerp(LID_CLOSED_DEG, LID_OPEN_DEG, lidP));

  const screenP = easeOutCubic(segment(p, 0.48, 0.72));
  values.screenOpacity.set(screenP);
  values.screenBrightness.set(lerp(REST.screenBrightness, 1, screenP));
  values.displayGlow.set(screenP);
  values.ambientGlow.set(lerp(REST.ambientGlow, 1, easeOutCubic(segment(p, 0.35, 0.85))));
}

export type SkillsLaptopRevealState = {
  riseY: MotionValue<number>;
  rotateZ: MotionValue<number>;
  lidOpen: MotionValue<number>;
  screenOpacity: MotionValue<number>;
  screenBrightness: MotionValue<number>;
  displayGlow: MotionValue<number>;
  shadowOpacity: MotionValue<number>;
  shadowScale: MotionValue<number>;
  ambientGlow: MotionValue<number>;
  scrollProgress: MotionValue<number>;
  reduced: boolean;
};

export function useSkillsLaptopReveal(
  sectionRef: React.RefObject<HTMLElement | null>
): SkillsLaptopRevealState {
  const reduced = usePrefersReducedMotion();

  const riseY = useMotionValue(reduced ? 0 : REST.riseY);
  const rotateZ = useMotionValue(reduced ? 0 : REST.rotateZ);
  const lidOpen = useMotionValue(reduced ? LID_OPEN_DEG : REST.lidOpen);
  const screenOpacity = useMotionValue(reduced ? 1 : REST.screenOpacity);
  const screenBrightness = useMotionValue(reduced ? 1 : REST.screenBrightness);
  const displayGlow = useMotionValue(reduced ? 1 : REST.displayGlow);
  const shadowOpacity = useMotionValue(reduced ? 1 : REST.shadowOpacity);
  const shadowScale = useMotionValue(reduced ? 1 : REST.shadowScale);
  const ambientGlow = useMotionValue(reduced ? 1 : REST.ambientGlow);
  const scrollProgress = useMotionValue(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) {
      applyOpenState(
        {
          riseY,
          rotateZ,
          lidOpen,
          screenOpacity,
          screenBrightness,
          displayGlow,
          shadowOpacity,
          shadowScale,
          ambientGlow,
        },
        1
      );
      scrollProgress.set(1);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const values = {
      riseY,
      rotateZ,
      lidOpen,
      screenOpacity,
      screenBrightness,
      displayGlow,
      shadowOpacity,
      shadowScale,
      ambientGlow,
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.35,
      onUpdate: (self) => {
        scrollProgress.set(self.progress);
        applyOpenState(values, self.progress);
      },
    });

    applyOpenState(values, trigger.progress);
    scrollProgress.set(trigger.progress);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      trigger.kill();
    };
  }, [
    ambientGlow,
    displayGlow,
    lidOpen,
    reduced,
    riseY,
    rotateZ,
    screenBrightness,
    screenOpacity,
    scrollProgress,
    sectionRef,
    shadowOpacity,
    shadowScale,
  ]);

  return {
    riseY,
    rotateZ,
    lidOpen,
    screenOpacity,
    screenBrightness,
    displayGlow,
    shadowOpacity,
    shadowScale,
    ambientGlow,
    scrollProgress,
    reduced,
  };
}
