"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react";

const navLinks = [
  { href: "/", label: "Beranda", index: "01" },
  { href: "/tours-pricing", label: "Paket Tour", index: "02" },
  { href: "/tourist-destination", label: "Destinasi", index: "03" },
  { href: "/gallery", label: "Galeri", index: "04" },
  { href: "/blogs", label: "Blog", index: "05" },
  { href: "/profile", label: "Tentang", index: "06" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const overHero = isHome && !scrolled && !isOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const textMain = overHero ? "text-sand-50" : "text-ink-900";

  return (
    <>
      <motion.header
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          overHero ? "bg-transparent" : "bg-paper/85 backdrop-blur-xl"
        }`}
        style={{
          borderBottom: scrolled || isOpen ? "1px solid rgba(32,28,24,0.08)" : "1px solid transparent",
        }}
      >
        <nav className="flex items-center justify-between px-6 py-4 mx-auto max-w-[1400px] lg:px-10">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div
              className={`relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-full transition-colors duration-500 ${
                overHero ? "bg-white/10 ring-1 ring-white/30" : "bg-volcanic-900 ring-2 ring-gold-500/70"
              }`}
            >
              <Image src="/logo.png" alt="Claris & City" width={24} height={24} className="object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-display text-xl tracking-tight transition-colors duration-500 ${textMain}`}>
                Claris &amp; City
              </span>
              <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-gold-500">Tour Jogja</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className={`hidden lg:flex items-center gap-8 ${textMain}`}>
            {navLinks.slice(0, 5).map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                    active
                      ? "text-gold-500"
                      : overHero
                        ? "text-sand-50 hover:text-sand-200"
                        : "text-ink-700 hover:text-gold-600"
                  }`}
                >
                  {link.label}
                  {/* underline gold yang muncul saat hover/active */}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold-500 transition-all duration-500 ease-out ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5">
            {/* Book CTA */}
            <Link
              href="/tours-pricing"
              className={`group relative hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full overflow-hidden select-none transition-colors duration-300 ${
                overHero
                  ? "bg-gold-500 text-volcanic-900 hover:text-sand-50"
                  : "bg-gold-500 text-volcanic-900 hover:text-sand-50"
              }`}
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] bg-volcanic-600" />
              <span className="relative z-10">Book</span>
              <Icon
                icon="mdi:arrow-right"
                className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-full overflow-hidden select-none transition-colors duration-300 ${
                isOpen
                  ? "bg-volcanic-900 text-sand-50"
                  : overHero
                    ? "text-sand-50 hover:text-white"
                    : "text-ink-900 hover:text-white"
              }`}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] bg-volcanic-600" />
              <span className="relative z-10 text-sm font-medium tracking-wide">{isOpen ? "Tutup" : "Menu"}</span>
              <Icon icon={isOpen ? "mdi:close" : "mdi:menu"} className="relative z-10 w-5 h-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen editorial menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col bg-paper"
          >
            <div className="flex-1 flex flex-col justify-center px-6 pt-24 pb-8 lg:px-20">
              <div className="mx-auto w-full max-w-5xl lg:grid lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-center">
                {/* Kolom kiri: judul editorial + kontak */}
                <div className="hidden lg:block">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-gold-500">Menu</p>
                  <p className="font-display text-5xl leading-tight text-ink-900">
                    Jelajahi
                    <span className="block italic text-gold-500">Jogja</span>
                  </p>
                  <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-500">
                    Tur budaya, candi megah, dan hidden gems — bersama pemandu lokal terbaik Yogyakarta.
                  </p>

                  <div className="mt-10 space-y-3 text-sm">
                    <a
                      href="https://wa.me/6285779536859"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-ink-700 hover:text-gold-600 transition-colors"
                    >
                      <Icon icon="mdi:whatsapp" className="w-5 h-5 text-gold-500" />
                      +62 857 7953 6859
                    </a>
                    <a
                      href="mailto:info@claristour.com"
                      className="flex items-center gap-3 text-ink-700 hover:text-gold-600 transition-colors"
                    >
                      <Icon icon="mdi:email-outline" className="w-5 h-5 text-gold-500" />
                      info@claristour.com
                    </a>
                    <a
                      href="https://www.instagram.com/clarisandcitytour_jgj/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-ink-700 hover:text-gold-600 transition-colors"
                    >
                      <Icon icon="mdi:instagram" className="w-5 h-5 text-gold-500" />
                      @clarisandcitytour_jgj
                    </a>
                  </div>
                </div>

                {/* Kolom kanan: nav links besar */}
                <nav className="w-full">
                  {navLinks.map((link, i) => {
                    const active = isActive(link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.06, duration: 0.55, ease }}
                        className="group border-b border-sand-200"
                      >
                        <Link
                          href={link.href}
                          className={`group flex items-center justify-between py-4 transition-colors duration-300 ${
                            active ? "text-gold-600" : "text-ink-900"
                          }`}
                        >
                          <div className="flex items-baseline gap-4 sm:gap-6">
                            <span className="text-xs sm:text-sm text-ink-400">{link.index}</span>
                            <span className="font-display text-5xl sm:text-6xl lg:text-7xl leading-none transition-colors duration-300 group-hover:text-gold-500">
                              {link.label}
                            </span>
                          </div>
                          <Icon
                            icon="mdi:arrow-top-right"
                            className="hidden w-7 h-7 text-ink-400 transition-all duration-300 group-hover:text-gold-500 group-hover:translate-x-1 group-hover:-translate-y-1 sm:block"
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* CTA bawah */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="border-t border-sand-200"
            >
              <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-0">
                <Link
                  href="/cek-booking"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-gold-600 transition-colors"
                >
                  <Icon icon="mdi:ticket-confirmation-outline" className="w-4 h-4" />
                  Cek status booking kamu
                </Link>
                <Link
                  href="/tours-pricing"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-full bg-gold-500 text-volcanic-900 hover:bg-gold-400 transition-colors duration-300"
                >
                  Booking Sekarang
                  <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
