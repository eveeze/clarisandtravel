"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-volcanic-900">
      {/* Full-bleed background */}
      <motion.div style={{ y: imgY, scale }} className="absolute inset-0">
        <Image
          src="/images/borobudur.jpg"
          alt="Borobudur, Yogyakarta"
          fill
          priority
          className="object-cover object-[center_35%] opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-volcanic-950/60 via-volcanic-900/30 to-volcanic-950" />
      </motion.div>

      {/* Editorial content — full bleed */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex min-h-screen items-end px-6 pb-24 pt-40 lg:px-12"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-gold-300"
          >
            Tour &amp; Travel Yogyakarta
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="max-w-5xl font-display text-6xl font-normal leading-[0.95] tracking-tight text-sand-50 md:text-8xl lg:text-[9rem]"
          >
            Jelajahi
            <span className="block italic text-gold-400">Yogyakarta</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-sand-100/90"
          >
            Tur budaya, candi megah, dan hidden gems — ditemani pemandu lokal yang bikin perjalananmu terasa seperti
            teman lama.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button href="/tours-pricing" variant="onDark">
              Lihat Paket Tour
            </Button>
            <Button href="/tourist-destination" variant="onDarkGhost">
              Jelajah Destinasi
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-8 right-6 z-10 hidden lg:block"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-sand-100/60">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-2 h-12 w-px bg-gold-400/60"
        />
      </motion.div>
    </section>
  );
}
