"use client";

import { useState } from "react";
import { Github, Linkedin, FileText } from "lucide-react";
import { profile } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ResumeViewer } from "@/components/ui/ResumeViewer";
import { toast } from "@/components/ui/use-toast";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast({
        title: "Message sent — I'll get back to you soon.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description:
          err instanceof Error
            ? `${err.message}. Please try again.`
            : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
              <p className="text-label font-display text-[var(--ink-faint)]"></p>
              <h2 className="font-display text-section-title mt-4 text-[var(--ink)]">
                Let&apos;s build something.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-body text-[var(--ink-dim)]">
                Open to Software Engineer roles in full-stack and AI. Reach out — I usually reply
                within a day.
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

              <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-lg text-left">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-label text-[var(--ink-faint)]">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-2 w-full rounded-[var(--radius-card)] border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--violet)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-label text-[var(--ink-faint)]">
                      Your mail id
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-2 w-full rounded-[var(--radius-card)] border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--violet)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-label text-[var(--ink-faint)]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      minLength={10}
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-2 w-full resize-none rounded-[var(--radius-card)] border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--violet)]"
                    />
                  </div>
                </div>
                <Button type="submit" magnetic className="mt-6 w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}