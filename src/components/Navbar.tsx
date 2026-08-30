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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

  return (
    <>
      <motion.header
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          isOpen ? "bg-paper" : scrolled ? "bg-paper/90 backdrop-blur-xl" : "bg-transparent"
        }`}
        style={{ borderBottom: scrolled || isOpen ? "1px solid rgba(20,25,26,0.08)" : "1px solid transparent" }}
      >
        <nav className="flex items-center justify-between px-6 lg:px-10 py-5 mx-auto max-w-[1400px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-volcanic-900 ring-2 ring-gold-500/70">
              <Image src="/logo.png" alt="Claris & City" width={24} height={24} className="object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl tracking-tight text-ink-900">Claris &amp; City</span>
              <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-gold-600">Tour Jogja</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Book CTA — gold (echoes logo ring/tagline) */}
            <Link
              href="/tours-pricing"
              className="hidden lg:inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-full bg-gold-600 hover:bg-gold-500 transition-colors duration-300"
            >
              Book
              <Icon icon="mdi:arrow-right" className="w-4 h-4" />
            </Link>

            {/* Menu toggle — outline, not solid black */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-full border transition-colors duration-300 ${
                isOpen
                  ? "border-ink-900 bg-ink-900 text-white"
                  : "border-ink-900/20 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-white"
              }`}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            >
              <span className="text-sm font-medium tracking-wide">{isOpen ? "Tutup" : "Menu"}</span>
              <span className="flex flex-col gap-[5px]">
                <span
                  className={`block w-5 h-[1.5px] bg-current transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
                />
                <span
                  className={`block w-5 h-[1.5px] bg-current transition-transform duration-300 ${isOpen ? "-rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen menu overlay — same light theme */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col bg-paper"
          >
            <div className="flex-1 flex flex-col justify-center px-6 pt-28 pb-10 sm:px-10 lg:px-20">
              <nav className="w-full max-w-4xl mx-auto lg:max-w-5xl">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-sand-200"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center justify-between py-4 sm:py-5 ${
                          active ? "text-gold-600" : "text-ink-900"
                        }`}
                      >
                        <div className="flex items-baseline gap-4 sm:gap-6">
                          <span className="text-xs sm:text-sm text-ink-400">{link.index}</span>
                          <span className="font-display text-4xl sm:text-5xl lg:text-6xl leading-none transition-colors duration-300 group-hover:text-gold-600">
                            {link.label}
                          </span>
                        </div>
                        <Icon
                          icon="mdi:arrow-up-right"
                          className="hidden w-6 h-6 text-ink-400 transition-all duration-300 group-hover:text-gold-600 group-hover:translate-x-1 group-hover:-translate-y-1 sm:block"
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-full max-w-4xl mx-auto mt-10 lg:max-w-5xl"
              >
                <Link
                  href="/tours-pricing"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-ink-900 rounded-full border border-ink-900/15 hover:bg-ink-900 hover:text-white transition-colors duration-300"
                >
                  Booking Sekarang
                  <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Contact bar at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="border-t border-sand-200"
            >
              <div className="flex flex-wrap gap-x-8 gap-y-3 px-6 py-5 sm:px-10 lg:px-20 max-w-4xl lg:max-w-5xl mx-auto">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink-400 mb-1">WhatsApp</p>
                  <p className="text-sm text-ink-900">+62 857 7953 6859</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink-400 mb-1">Email</p>
                  <p className="text-sm text-ink-900">info@claristour.com</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink-400 mb-1">Instagram</p>
                  <p className="text-sm text-ink-900">@clarisandcitytour_jgj</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
