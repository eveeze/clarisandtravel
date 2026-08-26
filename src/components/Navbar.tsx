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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full bg-ivory/95 backdrop-blur-md border-b border-sand-200 transition-all duration-300 ${
        scrolled ? "shadow-card" : ""
      }`}
    >
      <nav className="container flex items-center justify-between px-4 py-3 mx-auto sm:px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="overflow-hidden relative w-10 h-10 rounded-full border border-sand-200">
            <Image
              src="/logo.png"
              alt="Claris and City Tour Jogja"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold text-forest-900">
              Claris & City
            </span>
            <span className="text-[11px] font-medium uppercase tracking-widest text-teak-600">
              Tour Jogja
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
                activeLink === link.href
                  ? "text-teak-600"
                  : "text-ink-500 hover:text-forest-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/tours-pricing"
            className="hidden px-5 py-2.5 text-sm font-semibold rounded-xl bg-teak-500 text-ivory hover:bg-teak-600 transition-colors sm:inline-block"
          >
            Booking
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col justify-center items-center gap-1.5 p-2 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-forest-900 transition-transform ${
                isMenuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-forest-900 transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-forest-900 transition-transform ${
                isMenuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-sand-200 bg-ivory lg:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.href);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeLink === link.href
                      ? "bg-sand-100 text-teak-600"
                      : "text-ink-500 hover:bg-sand-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/tours-pricing"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 mt-2 font-semibold text-center rounded-xl bg-teak-500 text-ivory hover:bg-teak-600"
              >
                Booking Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
