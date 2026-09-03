"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/Button";

// Story beats — teks aja yang berganti, background tetap SATU gambar (parallax transform = 60fps)
const beats = [
  {
    label: "01 — Datanglah",
    title: "Temukan Jogja yang Sebenarnya",
    body: "Bukan cuma candi dan Malioboro. Ada hidden gems dan jalur yang cuma anak lokal yang tau.",
  },
  {
    label: "02 — Jelajahi",
    title: "Alam, Budaya, Petualangan",
    body: "Dari sunrise Borobudur sampai sandboarding Gumuk Pasir. Setiap sudut punya cerita.",
  },
  {
    label: "03 — Nikmati",
    title: "Tanpa Ribet, Tanpa Khawatir",
    body: "Pemandu lokal, armada nyaman, itinerary custom, harga ALL-IN. Logistik biar kami yang atur.",
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Background: SATU gambar, transform-only (translateY + scale) = compositor thread, gak repaint
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  // Fade hero keluar di akhir scroll
  const heroFade = useTransform(scrollYProgress, [0.75, 1], [1, 0]);

  // Opacity per beat — teks doang, murah
  const b0 = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const b1 = useTransform(scrollYProgress, [0.22, 0.5, 0.72], [0, 1, 0]);
  const b2 = useTransform(scrollYProgress, [0.66, 1], [0, 1]);

  // Progress bar per beat
  const p0 = useTransform(scrollYProgress, [0, 0.33], [1, 0]);
  const p1 = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 1, 0]);
  const p2 = useTransform(scrollYProgress, [0.66, 1], [0, 1]);

  // Scroll hint fade
  const hintFade = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative h-[260vh] bg-volcanic-900">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden will-change-transform">
        {/* SATU background image — parallax transform */}
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
          <Image
            src="/images/borobudur.jpg"
            alt="Borobudur sunrise"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-volcanic-950/70 via-volcanic-900/35 to-volcanic-950" />
        </motion.div>

        {/* Content — fade keluar pas scroll */}
        <motion.div
          style={{ opacity: heroFade }}
          className="relative z-10 flex h-full items-end px-6 pb-24 pt-40 lg:px-12"
        >
          <div className="mx-auto w-full max-w-[1400px]">
            {/* Beat 1 — tampil duluan, keluar pas beat 2 masuk */}
            <motion.div style={{ opacity: b0 }}>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-gold-300">{beats[0].label}</p>
              <h1 className="max-w-4xl font-display text-5xl leading-[0.98] tracking-tight text-sand-50 md:text-7xl lg:text-[7.5rem]">
                {beats[0].title}
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-sand-100/80">{beats[0].body}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/tours-pricing" variant="onDark">
                  Lihat Paket Tour
                </Button>
                <Button href="/tourist-destination" variant="onDarkGhost">
                  Jelajah Destinasi
                </Button>
              </div>
            </motion.div>

            {/* Beat 2 */}
            <motion.div style={{ opacity: b1 }} className="absolute inset-0 flex items-end px-6 pb-24 pt-40 lg:px-12">
              <div className="mx-auto w-full max-w-[1400px]">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-gold-300">{beats[1].label}</p>
                <h2 className="max-w-4xl font-display text-5xl leading-[0.98] tracking-tight text-sand-50 md:text-7xl lg:text-[7.5rem]">
                  {beats[1].title}
                </h2>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-sand-100/80">{beats[1].body}</p>
              </div>
            </motion.div>

            {/* Beat 3 */}
            <motion.div style={{ opacity: b2 }} className="absolute inset-0 flex items-end px-6 pb-24 pt-40 lg:px-12">
              <div className="mx-auto w-full max-w-[1400px]">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-gold-300">{beats[2].label}</p>
                <h2 className="max-w-4xl font-display text-5xl leading-[0.98] tracking-tight text-sand-50 md:text-7xl lg:text-[7.5rem]">
                  {beats[2].title}
                </h2>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-sand-100/80">{beats[2].body}</p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button href="/tours-pricing" variant="onDark">
                    Lihat Paket Tour
                  </Button>
                  <Button href="/tourist-destination" variant="onDarkGhost">
                    Jelajah Destinasi
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Progress indicator kanan */}
        <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
          {[p0, p1, p2].map((p, i) => (
            <div key={i} className="relative h-10 w-px bg-white/15 overflow-hidden">
              <motion.div style={{ scaleY: p }} className="absolute inset-0 origin-top bg-gold-400" />
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintFade }}
          className="absolute bottom-10 right-6 z-20 hidden flex-col items-center gap-3 lg:flex"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-sand-100/50">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-14 w-px bg-gold-400/60"
          />
        </motion.div>
      </div>
    </section>
  );
}
