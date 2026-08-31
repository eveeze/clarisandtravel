"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { whatsappLink } from "@/lib/contact";

export default function FloatingWhatsappButton() {
  return (
    <Link
      href={whatsappLink("Halo Claris & Travel, saya ingin bertanya tentang paket tour.")}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat WhatsApp"
      className="fixed right-6 bottom-6 z-40"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white"
      >
        <Icon icon="mdi:whatsapp" className="w-7 h-7" />
      </motion.div>
    </Link>
  );
}
