function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function bellLift(scrollProgress: number, start: number, end: number, peak: number, spread: number) {
  if (scrollProgress < start || scrollProgress > end) return 0;

  const t = 1 - Math.abs(scrollProgress - peak) / spread;

  return clamp01(t);
}

/** Smooth bell curve for the Achievement section scroll band (~0.68–0.86). */
export function achievementRobotLift(scrollProgress: number): number {
  return bellLift(scrollProgress, 0.68, 0.86, 0.76, 0.1);
}

/** Smooth bell curve for the Education section scroll band (~0.82–0.98). */
export function educationRobotLift(scrollProgress: number): number {
  return bellLift(scrollProgress, 0.82, 0.98, 0.9, 0.1);
}

/** Dim the floating robot behind Projects + GitHub so cards stay readable. */
export function projectsGithubRobotDim(scrollProgress: number): number {
  const dimOpacity = 0.32;

  if (scrollProgress >= 0.3 && scrollProgress <= 0.66) return dimOpacity;
  if (scrollProgress > 0.24 && scrollProgress < 0.3) {
    const t = (scrollProgress - 0.24) / 0.06;
    return 1 - t * (1 - dimOpacity);
  }
  if (scrollProgress > 0.66 && scrollProgress < 0.72) {
    const t = (scrollProgress - 0.66) / 0.06;
    return dimOpacity + t * (1 - dimOpacity);
  }

  return 1;
}

export function scrollRobotLift(scrollProgress: number): number {
  return Math.max(achievementRobotLift(scrollProgress), educationRobotLift(scrollProgress));
}

export function getRobotRigTargetY(scrollProgress: number): number {
  const zoneLift = scrollRobotLift(scrollProgress);
  return -scrollProgress * 1.35 + zoneLift * 1.55;
}
