import { useEffect, useRef } from "react";

export const HEAD_Y_LIMIT = (20 * Math.PI) / 180;
export const HEAD_X_LIMIT = (10 * Math.PI) / 180;
export const NECK_FACTOR = 0.32;
export const LERP = 0.06;

export function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export type NormalizedMouse = { x: number; y: number };

export function useMouseNormalized() {
  const mouse = useRef<NormalizedMouse>({ x: 0, y: 0 });
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia("(pointer: coarse)").matches;

    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 8) return;
      last = now;
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    if (!isTouch.current) {
      window.addEventListener("mousemove", onMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMove);
    }
  }, []);

  return { mouse, isTouch };
}
