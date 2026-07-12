"use client";

import { Github, Linkedin, FileText } from "lucide-react";
import { profile } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ResumeViewer } from "@/components/ui/ResumeViewer";

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-shell">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-10 md:p-[60px]">
            <GlowOrb
              size={300}
              color="violet"
              opacity={0.15}
              className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
            />

            <div className="relative z-10 text-center">
              <h2 className="font-display text-section-title text-[var(--ink)]">
                Let&apos;s build something.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-body text-[var(--ink-dim)]">
                Open to any Software Engineering roles in full-stack and AI. Reach me out by any of these
                links below. I usually reply within a day.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button variant="ghost" asChild>
                  <a
                    href={`mailto:${profile.email}`}
                    onClick={(event) => {
                      event.currentTarget.blur();
                    }}
                  >
                    Email Me
                  </a>
                </Button>
                <Button variant="ghost" asChild>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button variant="ghost" asChild>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
                <ResumeViewer
                  trigger={
                    <Button variant="ghost">
                      <FileText className="h-4 w-4" />
                      Resume
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
