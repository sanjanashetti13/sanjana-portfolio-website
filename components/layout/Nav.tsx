"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { profile } from "@/data/content";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { useHeroNavName } from "@/components/layout/HeroNavNameContext";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const { navNameRef, registerNav, unregisterNav } = useHeroNavName();

  useEffect(() => {
    registerNav();
    return unregisterNav;
  }, [registerNav, unregisterNav]);

  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-[var(--line)] backdrop-blur-[14px]"
      style={{ background: "var(--nav-bg)" }}
    >
      <nav className="container-main flex h-20 items-center justify-between gap-6" aria-label="Main navigation">
        <Link to="/" className="nav-brand min-w-0 shrink" aria-label="Home">
          <span ref={navNameRef} className="nav-brand-name">
            {profile.name}
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-6">
          <div className="hidden items-center gap-10 min-[860px]:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>
          <ThemeToggle className="hidden min-[860px]:flex" />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
