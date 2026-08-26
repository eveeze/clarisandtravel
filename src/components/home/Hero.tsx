"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-volcanic-900">
      <motion.div style={{ opacity: fade }} className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Text */}
        <div className="py-28 lg:py-0">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-gold-400"
          >
            Tour & Travel Yogyakarta
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-stone-50"
          >
            Jelajahi
            <span className="block italic text-gold-300">Yogyakarta</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mt-7 max-w-md text-lg leading-relaxed text-stone-400"
          >
            Tur budaya, candi megah, dan hidden gems — ditemani pemandu lokal
            yang bikin perjalananmu terasa seperti teman lama.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button href="/tours-pricing">Lihat Paket Tour</Button>
            <Button href="/tourist-destination" variant="ghost">Jelajah Destinasi</Button>
          </motion.div>
        </div>

        {/* Arch image */}
        <motion.div style={{ y: imgY }} className="relative hidden lg:flex items-center justify-center">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            className="relative w-[26rem] h-[36rem]"
            style={{ borderTopLeftRadius: "13rem", borderTopRightRadius: "13rem", overflow: "hidden", border: "1px solid rgba(232,179,75,0.3)" }}
          >
            <Image
              src="/images/borobudur.jpg"
              alt="Borobudur, Yogyakarta"
              fill
              priority
              className="object-cover object-[center_30%]"
              sizes="416px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-volcanic-900/60 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}