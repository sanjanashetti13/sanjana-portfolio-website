"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display text-[13px] font-semibold uppercase tracking-[0.1em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--violet)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "rounded-[var(--radius-pill)] gradient-button px-7 py-3.5 transition-all duration-300 ease-out hover:-translate-y-0.5",
        ghost:
          "rounded-[var(--radius-pill)] border border-[var(--line)] bg-transparent px-6 py-3 text-[var(--ink-dim)] hover:-translate-y-0.5 hover:border-[rgba(221,231,242,0.4)] hover:text-[var(--violet)]",
      },
      size: {
        default: "",
        sm: "px-4 py-2 text-[11px]",
        hero: "h-14 rounded-full px-9 py-[18px] text-[14px] tracking-[0.08em] hover:scale-[1.03] active:scale-[0.99]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  magnetic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, magnetic = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      if (distance < 40) {
        x.set((deltaX / 40) * 6);
        y.set((deltaY / 40) * 6);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    if (magnetic && !asChild) {
      return (
        <motion.button
          ref={ref}
          style={{ x: springX, y: springY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(buttonVariants({ variant, size, className }))}
          {...(props as HTMLMotionProps<"button">)}
        >
          {children}
        </motion.button>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
