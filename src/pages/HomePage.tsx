import { useRef } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { GitHubActivitySection } from "@/components/sections/GitHubActivity";
import { Skills } from "@/components/sections/Skills";
import { Achievement } from "@/components/sections/Achievement";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { ScrollRobotBackground } from "@/components/layout/ScrollRobotBackground";
import { ScrollProgressProvider } from "@/lib/scrollProgress";

export function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollProgressProvider pageRef={pageRef}>
      <ScrollRobotBackground />
      <div ref={pageRef} className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <GitHubActivitySection />
        <Skills />
        <Achievement />
        <Education />
        <Contact />
      </div>
    </ScrollProgressProvider>
  );
}
