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
 * Button konsisten, token-driven.
 * Warna dikontrol dari tailwind.config.ts -> gampang diubah per tema.
 * Hover: hanya ubah shade warna bg + arrow slide — tidak ada invert-fill
 * yang bisa bikin tombol nyatu dengan background section.
 */
export default function Button({ href, children, variant = "primary", arrow = true, className = "" }: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-colors duration-300 select-none";

  const variants: Record<string, string> = {
    // Emas solid — untuk semua section (terang maupun gelap, tetap kontras)
    primary: "bg-gold-500 text-volcanic-900 hover:bg-gold-400",
    // Hijau solid — untuk dipakai di section terang
    dark: "bg-volcanic-900 text-sand-100 hover:bg-volcanic-700",
    // Outline netral — override className untuk section gelap
    ghost: "border border-sand-300 text-ink-700 hover:bg-sand-100 hover:border-sand-400",
  };

  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {children}
      {arrow && (
        <Icon icon="mdi:arrow-right" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}
