import { motion, useTransform, type MotionValue } from "framer-motion";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${8 + ((i * 17) % 84)}%`,
  top: `${6 + ((i * 23) % 88)}%`,
  size: 2 + (i % 3),
  delay: (i % 6) * 0.7,
  duration: 4.5 + (i % 4) * 1.2,
}));

interface SkillsAmbientBackgroundProps {
  ambientGlow: MotionValue<number>;
}

export function SkillsAmbientBackground({ ambientGlow }: SkillsAmbientBackgroundProps) {
  const glowOpacity = useTransform(ambientGlow, (v) => v * 0.55);

  return (
    <div className="skills-ambient" aria-hidden="true">
      <motion.div className="skills-ambient__radial" style={{ opacity: glowOpacity }} />
      <div className="skills-ambient__particles">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="skills-ambient__dot"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
