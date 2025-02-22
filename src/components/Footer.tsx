"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function Footer() {
  const quickLinks = [
    { title: "Tours Pricing", href: "/tours-pricing" },
    { title: "Tourist Destination", href: "/tourist-destination" },
    { title: "Blogs", href: "/blogs" },
    { title: "Gallery", href: "/gallery" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bottom-0 py-12 w-full bg-gradient-to-r text-secondary-100 font-poppins from-primary-900 to-primary-800"
    >
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex gap-4 items-center">
              <Image
                src="/logo.png"
                alt="Logo Claris and City Tour Jogja"
                width={80}
                height={80}
                className="rounded-lg"
              />
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400">
                Claris and City Tour Jogja
              </h2>
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                href="https://www.facebook.com/alexa.deby.5/"
                target="_blank"
                className="transition-colors hover:text-accent-300"
              >
                <Icon icon="mdi:facebook" width={24} height={24} />
              </Link>
              <Link
                target="_blank"
                href="https://www.instagram.com/clarisandcitytour_jgj/"
                className="transition-colors hover:text-accent-300"
              >
                <Icon icon="mdi:instagram" width={24} height={24} />
              </Link>
              <Link
                href="#"
                target="_blank"
                className="transition-colors hover:text-accent-300"
              >
                <Icon icon="mdi:twitter" width={24} height={24} />
              </Link>
              <Link
                href="#"
                target="_blank"
                className="transition-colors hover:text-accent-300"
              >
                <Icon icon="ic:baseline-tiktok" width={24} height={24} />
              </Link>
              <Link
                target="_blank"
                href="https://www.youtube.com/@Clarisandcitytour"
                className="transition-colors hover:text-accent-300"
              >
                <Icon icon="mdi:youtube" width={24} height={24} />
              </Link>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-center">
                <Icon
                  icon="mdi:map-marker"
                  className="text-accent-400"
                  width={20}
                  height={20}
                />
                <p className="text-sm text-secondary-300">
                  123 Malioboro Street, Yogyakarta, Indonesia
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Icon
                  icon="mdi:phone"
                  className="text-accent-400"
                  width={20}
                  height={20}
                />
                <p className="text-sm text-secondary-300">+62 857 7953 6859</p>
              </div>
              <div className="flex gap-3 items-center">
                <Icon
                  icon="mdi:email"
                  className="text-accent-400"
                  width={20}
                  height={20}
                />
                <p className="text-sm text-secondary-300">
                  info@claristour.com
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index }}
                >
                  <Link
                    href={link.href}
                    className="flex gap-2 items-center text-sm transition-colors hover:text-accent-300"
                  >
                    <Icon
                      icon="mdi:chevron-right"
                      width={16}
                      height={16}
                      className="text-accent-400"
                    />
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400">
              Company Profile
            </h3>
            <div className="space-y-4 text-sm text-secondary-300">
              <p>
                Founded in 2020, Claris and City Tour Jogja has been providing
                exceptional tour experiences in Yogyakarta. We specialize in
                both private and group tours, offering personalized services to
                ensure memorable adventures for our clients.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2 text-accent-400">✓</span> Professional
                  Tour Guides
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-accent-400">✓</span> Customizable
                  Packages
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-accent-400">✓</span> 24/7 Customer
                  Support{" "}
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-accent-400">✓</span> Comfortable
                  Transportation
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="pt-8 mt-12 text-sm text-center border-t border-gray-700 text-secondary-300"
        >
          <p>© 2024 Claris and City Tour Jogja. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
