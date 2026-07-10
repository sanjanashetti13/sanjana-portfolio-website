import { motion, useTransform } from "framer-motion";
import type { RefObject } from "react";
import { useSkillsLaptopReveal } from "@/lib/useSkillsLaptopReveal";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { SkillsAmbientBackground } from "./SkillsAmbientBackground";
import { LaptopWorkspaceScreen } from "./LaptopWorkspaceScreen";

interface SkillsLaptopRevealProps {
  sectionRef: RefObject<HTMLElement | null>;
}

function LaptopBase() {
  return (
    <div className="skills-laptop-reveal__base">
      <div className="skills-laptop-reveal__keyboard" />
      <div className="skills-laptop-reveal__trackpad" />
    </div>
  );
}

function LaptopLidStatic() {
  return (
    <div className="skills-laptop-reveal__hinge">
      <div
        className="skills-laptop-reveal__lid skills-laptop-reveal__lid--open"
        style={{ transform: "rotateX(-20deg)" }}
      >
        <div className="skills-laptop-reveal__lid-top" />
        <div className="skills-laptop-reveal__lid-back" />
        <div className="skills-laptop-reveal__bezel skills-laptop-reveal__bezel--lit">
          <div className="skills-laptop-reveal__screen skills-laptop-reveal__screen--on">
            <LaptopWorkspaceScreen />
          </div>
        </div>
      </div>
    </div>
  );
}

function LaptopLidAnimated({
  lidOpen,
  screenOpacity,
  screenBrightness,
  displayGlow,
}: Pick<
  ReturnType<typeof useSkillsLaptopReveal>,
  "lidOpen" | "screenOpacity" | "screenBrightness" | "displayGlow"
>) {
  const screenFilter = useTransform(screenBrightness, (b) => `brightness(${b})`);
  const bezelGlow = useTransform(
    displayGlow,
    (g) => `0 0 ${24 + g * 36}px rgba(221, 231, 242, ${0.12 + g * 0.28})`
  );
  const screenShineOpacity = useTransform(displayGlow, (g) => g * 0.35);
  const lidTopOpacity = useTransform(lidOpen, [90, 30, -20], [1, 0, 0]);

  return (
    <div className="skills-laptop-reveal__hinge">
      <motion.div
        className="skills-laptop-reveal__lid"
        style={{
          rotateX: lidOpen,
          transformOrigin: "50% 100%",
          transformPerspective: 1200,
        }}
      >
        <motion.div className="skills-laptop-reveal__lid-top" style={{ opacity: lidTopOpacity }} />
        <div className="skills-laptop-reveal__lid-back" />
        <motion.div className="skills-laptop-reveal__bezel" style={{ boxShadow: bezelGlow }}>
          <motion.div
            className="skills-laptop-reveal__screen"
            style={{ opacity: screenOpacity, filter: screenFilter }}
          >
            <LaptopWorkspaceScreen />
          </motion.div>
          <motion.div
            className="skills-laptop-reveal__screen-shine"
            style={{ opacity: screenShineOpacity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export function SkillsLaptopReveal({ sectionRef }: SkillsLaptopRevealProps) {
  const reduced = usePrefersReducedMotion();
  const reveal = useSkillsLaptopReveal(sectionRef);
  const illuminationOpacity = useTransform(reveal.displayGlow, (g) => g * 0.42);

  if (reduced) {
    return (
      <div className="skills-laptop-reveal skills-laptop-reveal--static" aria-hidden="true">
        <SkillsAmbientBackground ambientGlow={reveal.ambientGlow} />
        <div className="skills-laptop-reveal__stage">
          <div className="skills-laptop-reveal__rig">
            <div className="skills-laptop-reveal__shadow skills-laptop-reveal__shadow--visible" />
            <div className="skills-laptop-reveal__device">
              <LaptopBase />
              <LaptopLidStatic />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="skills-laptop-reveal" aria-hidden="true">
      <SkillsAmbientBackground ambientGlow={reveal.ambientGlow} />
      <motion.div
        className="skills-laptop-reveal__illumination"
        style={{ opacity: illuminationOpacity }}
      />

      <div className="skills-laptop-reveal__stage">
        <motion.div
          className="skills-laptop-reveal__rig"
          style={{ y: reveal.riseY, rotateZ: reveal.rotateZ }}
        >
          <motion.div
            className="skills-laptop-reveal__shadow"
            style={{ opacity: reveal.shadowOpacity, scaleX: reveal.shadowScale }}
          />
          <div className="skills-laptop-reveal__device">
            <LaptopBase />
            <LaptopLidAnimated
              lidOpen={reveal.lidOpen}
              screenOpacity={reveal.screenOpacity}
              screenBrightness={reveal.screenBrightness}
              displayGlow={reveal.displayGlow}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
