import { useRef } from "react";
import { skills } from "@/data/content";
import { SkillBlock } from "@/components/ui/SkillBlock";
import { SkillsLaptopReveal } from "@/components/skills/SkillsLaptopReveal";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="skills" ref={sectionRef} className="skills-section">
      <div className="skills-scroll-track">
        <div className="skills-sticky scroll-section-sticky">
          <div className="skills-layout">
            <header className="skills-header">
              <p className="skills-eyebrow"></p>
              <h2 className="skills-title">Skills</h2>
            </header>

            <div className="skills-orbital">
              <div className="skills-orbital__center">
                <SkillsLaptopReveal sectionRef={sectionRef} />
              </div>

              {skills.map((skill, i) => (
                <div
                  key={skill.category}
                  className={`skills-orbital__card skills-orbital__card--${i}`}
                >
                  <SkillBlock category={skill.category} items={skill.items} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
