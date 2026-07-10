import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/content";

const socialLinks = [
  { href: profile.github, label: "GitHub", icon: Github },
  { href: profile.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
];

export function SocialRail() {
  return (
    <aside
      className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-[26px] min-[900px]:flex"
      aria-label="Social links"
    >
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("mailto") ? undefined : "_blank"}
          rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
          className="text-[var(--ink-dim)] transition-all duration-200 hover:-translate-y-[3px] hover:text-[var(--violet)]"
          aria-label={link.label}
        >
          <link.icon className="h-5 w-5" />
        </a>
      ))}
    </aside>
  );
}
