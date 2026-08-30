"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  className?: string;
};

export default function Button({ href, children, variant = "primary", arrow = true, className = "" }: ButtonProps) {
  const isPrimary = variant === "primary";

  const base =
    "relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold overflow-hidden select-none";

  const styles = isPrimary ? "bg-gold-500 text-white" : "border border-sand-300 text-ink-700";

  return (
    <motion.div whileHover="hover" whileTap="tap" initial="initial" className={`inline-block ${className}`}>
      <Link href={href} className={`${base} ${styles}`} style={{ WebkitTapHighlightColor: "transparent" }}>
        {/* invert fill (rise from bottom) */}
        <motion.span
          variants={{
            initial: { scaleY: 0 },
            hover: { scaleY: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
            tap: { scaleY: 1, transition: { duration: 0.15 } },
          }}
          className={`absolute inset-0 origin-bottom ${isPrimary ? "bg-volcanic-900" : "bg-gold-500"}`}
        />

        {/* label */}
        <motion.span
          variants={{
            initial: { color: isPrimary ? "#FFFFFF" : "#3D4648" },
            hover: { color: isPrimary ? "#D5A93F" : "#FFFFFF", transition: { duration: 0.25 } },
            tap: { color: isPrimary ? "#D5A93F" : "#FFFFFF" },
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
