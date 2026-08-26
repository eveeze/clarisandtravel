"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tours-pricing", label: "Paket Tour" },
  { href: "/tourist-destination", label: "Destinasi" },
  { href: "/gallery", label: "Galeri" },
  { href: "/blogs", label: "Blog" },
  { href: "/profile", label: "Tentang" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-volcanic-900/90 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden border rounded-full border-gold-400/30">
            <Image src="/logo.png" alt="Claris & City" fill className="object-cover" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold tracking-tight text-stone-100">
              Claris & City
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold-400">
              Tour Jogja
            </span>
          </div>
        </Link>

        <div className="items-center hidden gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide transition-colors text-stone-300 hover:text-gold-400"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/tours-pricing"
            className="px-6 py-2.5 text-sm font-semibold rounded-full bg-gold-500 text-volcanic-900 hover:bg-gold-400 transition-colors"
          >
            Booking
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex flex-col items-center justify-center w-8 h-8 lg:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-[1.5px] bg-stone-100 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
          <span className={`block w-6 h-[1.5px] bg-stone-100 mt-[6px] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[1.5px] bg-stone-100 mt-[6px] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-volcanic-900 border-t border-stone-800/50 lg:hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium rounded-xl text-stone-300 hover:bg-stone-800/50"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/tours-pricing"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 mt-4 text-sm font-semibold text-center rounded-xl bg-gold-500 text-volcanic-900"
              >
                Booking
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}