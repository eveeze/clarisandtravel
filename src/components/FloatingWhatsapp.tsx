"use client";
import Link from "next/link";
import { motion } from "framer-motion";

import { Icon } from "@iconify/react/dist/iconify.js";
export default function FloatingWhatsappButton() {
  return (
    <Link href="#" target="_blank" rel="noreferrer noopener">
      {/* Contact Float */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed right-8 bottom-8 p-4 rounded-full border bg-white/10 backdrop-blur-md border-white/20"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex justify-center items-center w-12 h-12 bg-green-500 rounded-full cursor-pointer"
        >
          <Icon icon="solar:phone-bold" className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
    </Link>
  );
}
