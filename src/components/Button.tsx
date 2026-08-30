import Link from "next/link";
import { Icon } from "@iconify/react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark" | "onDark" | "onDarkGhost";
  arrow?: boolean;
  className?: string;
};

/**
 * Button — SATU style untuk seluruh website (match Hero).
 * - Fill animasi naik dari bawah via CSS group-hover (area penuh tombol)
 * - Warna token-driven (tailwind.config.ts), gampang diubah per tema
 * - variant onDark* khusus section gelap (gak blend sama bg volcanic)
 */
export default function Button({ href, children, variant = "primary", arrow = true, className = "" }: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold overflow-hidden select-none";

  const styles: Record<string, string> = {
    primary: "bg-gold-500 text-volcanic-900",
    dark: "bg-volcanic-900 text-sand-100",
    ghost: "border border-sand-300 text-ink-700",
    onDark: "bg-gold-500 text-volcanic-900",
    onDarkGhost: "border border-sand-200/40 text-sand-100",
  };

  // fill yang naik dari bawah saat hover — SELALU hijau volcanic, jangan volcanic-900
  const fill: Record<string, string> = {
    primary: "bg-volcanic-600",
    dark: "bg-gold-500",
    ghost: "bg-volcanic-600",
    onDark: "bg-gold-400",
    onDarkGhost: "bg-sand-100",
  };

  // warna label saat fill muncul
  const labelHover: Record<string, string> = {
    primary: "hover:text-sand-100",
    dark: "hover:text-volcanic-900",
    ghost: "hover:text-sand-100",
    onDark: "hover:text-volcanic-900",
    onDarkGhost: "hover:text-volcanic-900",
  };

  return (
    <Link
      href={href}
      className={`${base} ${styles[variant]} ${labelHover[variant]} ${className}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* invert fill — naik dari bawah */}
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${fill[variant]}`}
      />

      <span className="relative z-10">{children}</span>

      {arrow && (
        <Icon
          icon="mdi:arrow-right"
          className="relative z-10 w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
        />
      )}
    </Link>
  );
}
