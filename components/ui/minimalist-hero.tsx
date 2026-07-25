import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

export type MinimalistHeroPortraitProps = {
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  className?: string;
  show?: boolean;
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-[var(--ink)]/60 transition-colors hover:text-[var(--ink)]"
  >
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[var(--ink)]/60 transition-colors hover:text-[var(--ink)]"
  >
    <Icon className="h-5 w-5" />
  </a>
);

export function MinimalistHeroPortrait({
  imageSrc,
  imageAlt,
  children,
  className,
  show = true,
}: MinimalistHeroPortraitProps) {
  const reducedMotion = usePrefersReducedMotion();

  if (!show) return null;

  return (
    <div className={cn("relative flex h-full w-full items-center justify-center", className)}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative h-[min(300px,74vw)] w-[min(300px,74vw)] overflow-hidden rounded-full border border-white/15 bg-[#141218] md:h-[min(400px,38vw)] md:w-[min(400px,38vw)] lg:h-[min(480px,30vw)] lg:w-[min(480px,30vw)]"
      >
        {/* Soft ambient fill */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(168,85,247,0.22),transparent_62%)]"
          aria-hidden="true"
          animate={
            reducedMotion
              ? undefined
              : { opacity: [0.55, 1, 0.55], scale: [1, 1.04, 1] }
          }
          transition={
            reducedMotion
              ? undefined
              : { duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
          }
        />

        {/* Neon halo ring behind the photo */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          aria-hidden="true"
          style={{
            boxShadow: `
              0 0 0 3px rgba(255, 255, 255, 0.92),
              0 0 14px 4px rgba(216, 180, 254, 0.95),
              0 0 36px 12px rgba(168, 85, 247, 0.7),
              0 0 70px 24px rgba(147, 51, 234, 0.35),
              inset 0 0 18px 2px rgba(243, 232, 255, 0.45)
            `,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.06, 1],
                  opacity: [0.75, 1, 0.75],
                  rotate: [0, 180, 360],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  scale: { duration: 3.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  opacity: { duration: 3.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  rotate: { duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                }
          }
        />

        {children ?? (
          <motion.img
            src={imageSrc}
            alt={imageAlt ?? "Hero portrait"}
            className="absolute inset-x-0 bottom-0 top-auto z-10 mx-auto h-[100%] w-full object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: 16 }}
            animate={
              reducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 1, y: [0, -8, 0] }
            }
            transition={
              reducedMotion
                ? { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }
                : {
                    opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
                    y: {
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1.1,
                    },
                  }
            }
            onError={(event) => {
              const target = event.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/avatar/sanjana.png";
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

export function MinimalistHero({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) {
  return (
    <div
      className={cn(
        "relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-[var(--bg)] p-8 font-sans md:p-12",
        className
      )}
    >
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-wider text-[var(--ink)]"
        >
          {logoText}
        </motion.div>
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-1.5 md:hidden"
          aria-label="Open menu"
          type="button"
        >
          <span className="block h-0.5 w-6 bg-[var(--ink)]" />
          <span className="block h-0.5 w-6 bg-[var(--ink)]" />
          <span className="block h-0.5 w-5 bg-[var(--ink)]" />
        </motion.button>
      </header>

      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 text-center md:order-1 md:text-left"
        >
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-[var(--ink)]/80 md:mx-0">
            {mainText}
          </p>
          <a
            href={readMoreLink}
            className="mt-4 inline-block text-sm font-medium text-[var(--ink)] underline decoration-from-font"
          >
            Read More
          </a>
        </motion.div>

        <div className="relative order-1 flex h-full items-center justify-center md:order-2">
          <MinimalistHeroPortrait imageSrc={imageSrc} imageAlt={imageAlt} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
        >
          <h1 className="text-7xl font-extrabold text-[var(--ink)] md:text-8xl lg:text-9xl">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-[var(--ink)]/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
}
