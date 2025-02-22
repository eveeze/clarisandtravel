"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/tours-pricing", label: "Tours Pricing" },
  { href: "/tourist-destination", label: "Tourist Destination" },
  { href: "/blogs", label: "Blogs" },
  { href: "/gallery", label: "Gallery" },
];

const menuVariants = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 20,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.removeProperty("--vh");
    }

    const handleResize = () => {
      if (isMenuOpen) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.removeProperty("--vh");
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 z-50 w-full font-poppins transition-all duration-300 ${
        scrolled && !isMenuOpen
          ? "bg-primary-900/95 backdrop-blur-md shadow-lg py-2"
          : isMenuOpen
            ? "bg-primary-900 py-2" // Solid background when menu is open
            : "bg-gradient-to-r from-primary-900 to-primary-800 py-3"
      }`}
    >
      <div className="container flex justify-between items-center px-4 mx-auto sm:px-6">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center space-x-2 sm:space-x-3 group"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="overflow-hidden relative w-10 h-10 rounded-full border-2 sm:w-12 sm:h-12 border-accent-400/50"
          >
            <Image
              src="/logo.png"
              alt="Tour Logo"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>
          <div className="flex flex-col">
            <motion.span
              className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r sm:text-xl from-accent-300 to-accent-400"
              whileHover={{ scale: 1.02 }}
            >
              Claris and City
            </motion.span>
            <motion.span
              className="text-xs font-medium sm:text-sm text-secondary-200"
              whileHover={{ scale: 1.02 }}
            >
              Tour Jogja
            </motion.span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-1 md:flex">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-2"
            >
              <Link
                href={link.href}
                className={`relative py-2 px-3 lg:px-4 font-medium rounded-lg transition-all duration-300 
                  ${
                    activeLink === link.href
                      ? "text-accent-300 bg-primary-700/50"
                      : "text-secondary-100 hover:text-accent-300 hover:bg-primary-700/30"
                  }`}
                onClick={() => setActiveLink(link.href)}
              >
                <span className="relative z-10">{link.label}</span>
                {activeLink === link.href && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMenu}
          className="flex justify-center items-center p-3 -mr-3 rounded-lg transition-all duration-300 md:hidden focus:ring-2 focus:outline-none z-[60] hover:bg-primary-700/50 focus:ring-accent-400/50"
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={isMenuOpen ? "open" : "closed"}
            className="flex relative justify-center items-center w-6 h-6"
          >
            <motion.span
              className="absolute w-6 h-0.5 bg-secondary-100"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 0 : -8,
              }}
            />
            <motion.span
              className="absolute w-6 h-0.5 bg-secondary-100"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
            <motion.span
              className="absolute w-6 h-0.5 bg-secondary-100"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? 0 : 8,
              }}
            />
          </motion.div>
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 pt-16 md:hidden z-[55] bg-primary-900"
              style={{ height: "calc(var(--vh, 1vh) * 100)" }}
            >
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col justify-center items-center px-4 space-y-6 h-full"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={itemVariants}
                    className="w-full max-w-sm"
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        setActiveLink(link.href);
                        setIsMenuOpen(false);
                      }}
                      className={`block py-3 text-xl font-bold text-center rounded-lg transition-all duration-300
                        ${
                          activeLink === link.href
                            ? "text-accent-300 bg-primary-700/50"
                            : "text-secondary-100 hover:text-accent-300 hover:bg-primary-700/30"
                        }`}
                    >
                      {link.label}
                      {activeLink === link.href && (
                        <motion.div
                          className="mt-1 h-0.5 bg-accent-400"
                          layoutId="activeTabMobile"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
