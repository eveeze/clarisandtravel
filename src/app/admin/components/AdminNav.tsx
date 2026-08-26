"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Icon } from "@iconify/react";

const links = [
  { href: "/admin", label: "Dashboard", icon: "solar:home-smile-bold" },
  { href: "/admin/packages", label: "Paket Tour", icon: "solar:map-bold" },
  { href: "/admin/blogs", label: "Blog", icon: "solar:notebook-bold" },
  { href: "/admin/spots", label: "Spot Wisata", icon: "solar:star-bold" },
  { href: "/admin/bookings", label: "Booking", icon: "solar:chat-round-dots-bold" },
];

export default function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 flex flex-col h-screen w-56 bg-slate-900 text-slate-200">
      <div className="px-6 py-5 border-b border-slate-800">
        <h1 className="text-lg font-bold text-white">Claris Admin</h1>
        <p className="mt-0.5 text-xs text-slate-400">Tour & Travel Jogja</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-amber-500 text-slate-900"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon icon={link.icon} className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-slate-800">
        <p className="text-xs text-slate-400 truncate">{email}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2 mt-2 px-3 py-2 w-full text-sm rounded-lg text-red-400 hover:bg-slate-800 transition-colors"
        >
          <Icon icon="solar:logout-2-bold" className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
