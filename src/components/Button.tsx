"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark" | "onDark";
  arrow?: boolean;
  className?: string;
};

export default function Button({ href, children, variant = "primary", arrow = true, className = "" }: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold overflow-hidden select-none";

  const styles: Record<string, string> = {
    primary: "bg-gold-500 text-volcanic-900",
    dark: "bg-volcanic-900 text-sand-100",
    ghost: "border border-sand-300 text-ink-700",
    // untuk section gelap: gold solid, sheen terang (bukan invert gelap)
    onDark: "bg-gold-500 text-volcanic-900",
  };

  // invert fill color per variant
  const fill: Record<string, string> = {
    primary: "bg-volcanic-900",
    dark: "bg-gold-500",
    ghost: "bg-volcanic-900",
    onDark: "bg-gold-400",
  };

  // label color saat fill muncul
  const labelOnFill: Record<string, string> = {
    primary: "#F4F3EE",
    dark: "#0F1D1A",
    ghost: "#F4F3EE",
    onDark: "#0F1D1A",
  };

  const isDarkBg = variant === "onDark";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`inline-block ${className}`}
    >
      <Link href={href} className={`${base} ${styles[variant]}`} style={{ WebkitTapHighlightColor: "transparent" }}>
        {/* invert fill */}
        <motion.span
          initial={{ scaleY: 0 }}
          whileHover={{ scaleY: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 origin-bottom ${fill[variant]}`}
        />

        {/* label */}
        <motion.span
          initial={{
            color: isDarkBg ? "#0F1D1A" : variant === "ghost" ? "#3D4648" : variant === "dark" ? "#F4F3EE" : "#0F1D1A",
          }}
          whileHover={{ color: labelOnFill[variant] }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          {children}
        </motion.span>

        {/* arrow */}
        {arrow && (
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <Icon icon="mdi:arrow-right" className="w-5 h-5" />
          </motion.span>
        )}
      </Link>
    </motion.div>
  );
}
