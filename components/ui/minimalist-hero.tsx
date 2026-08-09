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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative flex h-[min(340px,78vw)] w-[min(260px,64vw)] items-center justify-center md:h-[min(440px,42vw)] md:w-[min(340px,30vw)] lg:h-[min(520px,34vw)] lg:w-[min(400px,24vw)]"
      >
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.3),transparent_70%)] blur-3xl"
          aria-hidden="true"
          animate={
            reducedMotion
              ? undefined
              : { opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.08, 0.95] }
          }
          transition={
            reducedMotion
              ? undefined
              : { duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
          }
        />

        {children ?? (
          <motion.div
            className="relative z-10 flex h-full w-full items-center justify-center"
            initial={{ opacity: 0, y: 16, rotate: 0 }}
            animate={
              reducedMotion
                ? { opacity: 1, y: 0, rotate: 0 }
                : { opacity: 1, y: [0, -8, 0], rotate: 0 }
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
          >
            {/* Thin silhouette backdrop that follows the cutout outline */}
            <img
              src={imageSrc}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 m-auto h-full w-full scale-[1.045] object-contain object-center [image-orientation:none]"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(72%) sepia(28%) saturate(1200%) hue-rotate(220deg) brightness(1.05)",
                opacity: 0.9,
              }}
              onError={(event) => {
                const target = event.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/avatar/sanjana.png";
              }}
            />
            <img
              src={imageSrc}
              alt={imageAlt ?? "Hero portrait"}
              className="relative z-10 h-full w-full object-contain object-center [image-orientation:none]"
              style={{
                filter: `
                  drop-shadow(0 0 1px rgba(255, 255, 255, 0.9))
                  drop-shadow(0 0 10px rgba(216, 180, 254, 0.75))
                  drop-shadow(0 0 24px rgba(168, 85, 247, 0.45))
                `,
              }}
              onError={(event) => {
                const target = event.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/avatar/sanjana.png";
              }}
            />
          </motion.div>
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
