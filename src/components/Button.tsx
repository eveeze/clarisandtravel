import Link from "next/link";
import { Icon } from "@iconify/react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "dark";
  arrow?: boolean;
  className?: string;
};

/**
 * Button — konsisten, best-practice, gampang diubah per tema.
 * Semua warna dari tailwind tokens (tailwind.config.ts), bukan hardcode hex.
 * Hover: hanya ganti shade warna, bukan "invert fill" yang bisa bikin tombol
 * nyatu sama background section.
 */
export default function Button({ href, children, variant = "primary", arrow = true, className = "" }: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold overflow-hidden select-none transition-colors duration-300";

  const styles: Record<string, string> = {
    // Gold solid — kontras tinggi di bg terang MAUPUN gelap
    primary: "bg-gold-500 text-volcanic-900 hover:bg-gold-400",
    // Volcanic solid — untuk dipakai di section terang
    dark: "bg-volcanic-900 text-sand-100 hover:bg-volcanic-700",
    // Outline
    ghost: "border border-sand-300 text-ink-700 hover:bg-sand-100",
  };

  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
      {arrow && (
        <Icon icon="mdi:arrow-right" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}
