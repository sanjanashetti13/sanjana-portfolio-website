import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_MQ = "(min-width: 1024px)";
const HEADER_OFFSET = 80;

type DockMetrics = {
  startTop: number;
  startLeft: number;
  endTop: number;
  endLeft: number;
  scale: number;
  scrollDistance: number;
};

function captureMetrics(hero: HTMLElement, nav: HTMLElement): DockMetrics {
  clearHeroDockStyles(hero);

  const heroRect = hero.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  const scale = navRect.height / heroRect.height;
  const scaledHeight = heroRect.height * scale;

  return {
    startTop: heroRect.top,
    startLeft: heroRect.left,
    endTop: navRect.top + (navRect.height - scaledHeight) / 2,
    endLeft: navRect.left,
    scale,
    scrollDistance: Math.max(180, heroRect.top - HEADER_OFFSET + 40),
  };
}

function clearHeroDockStyles(hero: HTMLElement) {
  gsap.set(hero, { clearProps: "all" });
  hero.style.position = "";
  hero.style.top = "";
  hero.style.left = "";
  hero.style.width = "";
  hero.style.zIndex = "";
  hero.style.margin = "";
  hero.style.pointerEvents = "";
}

function setNavVisible(nav: HTMLElement, visible: boolean, opacity = visible ? 1 : 0) {
  gsap.set(nav, { opacity });
  nav.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
}

function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

export function useHeroNameDock(
  heroRef: RefObject<HTMLElement | null>,
  navRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  isHome: boolean
) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const hero = heroRef.current;
    const nav = navRef.current;
    if (!nav) return;

    if (!enabled) {
      if (isHome) {
        setNavVisible(nav, false);
        if (hero) clearHeroDockStyles(hero);
      } else {
        setNavVisible(nav, true);
        if (hero) clearHeroDockStyles(hero);
      }
      return;
    }

    if (!hero) return;

    setNavVisible(nav, false);
    clearHeroDockStyles(hero);

    if (reduced) {
      const onScroll = () => {
        const heroRect = hero.getBoundingClientRect();
        const docked = heroRect.bottom < HEADER_OFFSET;
        setNavVisible(nav, docked);
        gsap.set(hero, { opacity: docked ? 0 : 1 });
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        clearHeroDockStyles(hero);
        setNavVisible(nav, true);
      };
    }

    let metrics = captureMetrics(hero, nav);
    let trigger: ScrollTrigger | null = null;

    const applyDockProgress = (progress: number) => {
      if (progress <= 0) {
        clearHeroDockStyles(hero);
        setNavVisible(nav, false);
        return;
      }

      const clamped = Math.min(1, Math.max(0, progress));
      const top = lerp(metrics.startTop, metrics.endTop, clamped);
      const left = lerp(metrics.startLeft, metrics.endLeft, clamped);
      const scale = lerp(1, metrics.scale, clamped);

      // Lock to viewport so scroll only moves the name upward into the header.
      hero.style.position = "fixed";
      hero.style.top = `${top}px`;
      hero.style.left = `${left}px`;
      hero.style.width = "max-content";
      hero.style.maxWidth = "min(48vw, 360px)";
      hero.style.zIndex = "60";
      hero.style.margin = "0";
      hero.style.pointerEvents = "none";
      hero.style.transformOrigin = "left center";

      gsap.set(hero, {
        scale,
        opacity: clamped > 0.92 ? 1 - (clamped - 0.92) / 0.08 : 1,
        willChange: "transform",
      });

      const navOpacity = clamped > 0.92 ? (clamped - 0.92) / 0.08 : 0;
      setNavVisible(nav, navOpacity > 0.5, navOpacity);
    };

    const mountDesktopDock = () => {
      trigger?.kill();
      metrics = captureMetrics(hero, nav);
      setNavVisible(nav, false);

      trigger = ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        end: () => `+=${metrics.scrollDistance}`,
        scrub: 0.35,
        invalidateOnRefresh: true,
        onRefresh: () => {
          metrics = captureMetrics(hero, nav);
        },
        onUpdate: (self) => applyDockProgress(self.progress),
      });
    };

    const mountMobileDock = () => {
      trigger?.kill();

      const onScroll = () => {
        const heroRect = hero.getBoundingClientRect();
        const docked = heroRect.bottom < HEADER_OFFSET;
        setNavVisible(nav, docked);
        if (docked) {
          clearHeroDockStyles(hero);
          gsap.set(hero, { opacity: 0 });
        } else {
          clearHeroDockStyles(hero);
          gsap.set(hero, { opacity: 1 });
        }
      };

      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    };

    const mq = window.matchMedia(DESKTOP_MQ);
    let removeMobileListener: (() => void) | undefined;

    const applyMode = () => {
      removeMobileListener?.();
      removeMobileListener = undefined;
      trigger?.kill();
      trigger = null;
      clearHeroDockStyles(hero);
      setNavVisible(nav, false);

      if (mq.matches) {
        mountDesktopDock();
      } else {
        removeMobileListener = mountMobileDock();
      }
    };

    const onResize = () => {
      applyMode();
      ScrollTrigger.refresh();
    };

    applyMode();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      removeMobileListener?.();
      trigger?.kill();
      clearHeroDockStyles(hero);
      setNavVisible(nav, true);
    };
  }, [heroRef, navRef, enabled, isHome, reduced]);
}
