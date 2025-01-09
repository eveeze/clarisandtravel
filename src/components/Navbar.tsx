"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/private-tour", label: "Private Tour" },
  { href: "/tourist-destination", label: "Tourist Destination" },
  { href: "/blogs", label: "Blogs" },
  { href: "/gallery", label: "Gallery" },
];

const menuVariants = {
  open: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
      scale: { duration: 0.2 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    scale: 0.8,
    transition: {
      y: { stiffness: 1000 },
      scale: { duration: 0.2 },
    },
  },
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

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
      className={`fixed top-0 left-0 z-50 w-full font-poppins transition-all duration-500 ${
        scrolled
          ? "bg-primary-900/95 backdrop-blur-md shadow-lg py-2"
          : "bg-gradient-to-r from-primary-900 to-primary-800 py-4"
      }`}
    >
      <div className="container flex justify-between items-center px-6 mx-auto">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="overflow-hidden relative w-12 h-12 rounded-full border-2 border-accent-400/50"
          >
            <Image
              src="/logo.png"
              alt="Tour Logo"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>
          <div className="flex flex-col">
            <motion.span
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400"
              whileHover={{ scale: 1.02 }}
            >
              Claris and City
            </motion.span>
            <motion.span
              className="text-sm font-medium text-secondary-200"
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
                className={`relative py-2 px-4 font-medium rounded-lg transition-all duration-300 
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
          className="flex z-50 justify-center items-center p-2 rounded-lg transition-all duration-300 md:hidden focus:ring-2 focus:outline-none hover:bg-primary-700/50 focus:ring-accent-400/50"
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={isMenuOpen ? "open" : "closed"}
            className="flex relative justify-center items-center w-6 h-6"
          >
            <motion.span
              className="absolute w-6 h-0.5 text-center transition-all duration-300 transform bg-secondary-100"
              style={{ top: isMenuOpen ? "50%" : "25%" }}
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                translateY: isMenuOpen ? 0 : 0,
              }}
            />
            <motion.span
              className="absolute top-1/2 w-6 h-0.5 transition-all duration-300 transform bg-secondary-100"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
            <motion.span
              className="absolute w-6 h-0.5 transition-all duration-300 transform bg-secondary-100"
              style={{ bottom: isMenuOpen ? "50%" : "25%" }}
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                translateY: isMenuOpen ? 0 : 0,
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
              className="fixed inset-0 z-40 bg-gradient-to-b md:hidden from-primary-900/98 to-primary-800/98 backdrop-blur-xl"
            >
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col justify-center items-center px-6 space-y-8 h-full"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={itemVariants}
                    className="w-full max-w-md"
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        setActiveLink(link.href);
                        toggleMenu();
                      }}
                      className={`block py-4 text-2xl font-bold text-center rounded-lg transition-all duration-300
                        ${
                          activeLink === link.href
                            ? "text-accent-300 bg-primary-700/50"
                            : "text-secondary-100 hover:text-accent-300 hover:bg-primary-700/30"
                        }`}
                    >
                      {link.label}
                      {activeLink === link.href && (
                        <motion.div
                          className="mt-2 h-0.5 bg-accent-400"
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
