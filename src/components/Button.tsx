import Link from "next/link";
import { Icon } from "@iconify/react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide overflow-hidden transition-all duration-300";

  const styles =
    variant === "primary"
      ? "bg-gold-500 text-volcanic-900 hover:shadow-[0_8px_30px_rgba(232,179,75,0.28)]"
      : "border border-stone-700 text-stone-200 hover:border-gold-400 hover:text-gold-400 hover:bg-gold-400/5";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {/* sheen sweep for primary */}
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
      )}
      <span className="relative z-10 transition-[letter-spacing] duration-300 group-hover:tracking-widest">
        {children}
      </span>
      {arrow && (
        <Icon
          icon="mdi:arrow-right"
          className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5"
        />
      )}
    </Link>
  );
}
