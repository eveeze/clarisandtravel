"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark";
  arrow?: boolean;
  className?: string;
};

export default function Button({ href, children, variant = "primary", arrow = true, className = "" }: ButtonProps) {
  const isPrimary = variant === "primary";
  const isDark = variant === "dark";

  const base =
    "relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold overflow-hidden select-none";

  // Dark text on gold (kontras ~7:1), putih di volcanic (dark variant)
  const styles = isPrimary
    ? "bg-gold-500 text-ink-900"
    : isDark
      ? "bg-volcanic-900 text-sand-100"
      : "border border-ink-900/20 text-ink-900";

  return (
    <motion.div whileHover="hover" whileTap="tap" initial="initial" className={`inline-block ${className}`}>
      <Link href={href} className={`${base} ${styles}`} style={{ WebkitTapHighlightColor: "transparent" }}>
        {/* invert fill */}
        <motion.span
          variants={{
            initial: { scaleY: 0 },
            hover: { scaleY: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
            tap: { scaleY: 1, transition: { duration: 0.15 } },
          }}
          className={`absolute inset-0 origin-bottom ${
            isPrimary ? "bg-volcanic-900" : isDark ? "bg-gold-500" : "bg-ink-900"
          }`}
        />

        {/* label */}
        <motion.span
          variants={{
            initial: { color: isPrimary ? "#14191A" : isDark ? "#F4F3EE" : "#14191A" },
            hover: {
              color: isPrimary ? "#F4F3EE" : isDark ? "#14191A" : "#F4F3EE",
              transition: { duration: 0.25 },
            },
            tap: { color: isPrimary ? "#F4F3EE" : isDark ? "#14191A" : "#F4F3EE" },
          }}
          className="relative z-10"
        >
          {children}
        </motion.span>

        {/* arrow */}
        {arrow && (
          <motion.span
            variants={{
              initial: { x: 0 },
              hover: { x: 6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
              tap: { x: 8 },
            }}
            className="relative z-10"
          >
            <Icon icon="mdi:arrow-right" className="w-5 h-5" />
          </motion.span>
        )}
      </Link>
    </motion.div>
  );
}
