"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/Button";

const chapters = [
  {
    img: "/images/borobudur.jpg",
    alt: "Borobudur sunrise",
    label: "Datanglah",
    headline: "Temukan Jogja yang Sebenarnya",
    body: "Bukan cuma candi dan Malioboro. Jogja punya hidden gems dan jalur yang cuma anak lokal yang tau.",
  },
  {
    img: "/images/gumuk-pasir.jpg",
    alt: "Gumuk Pasir Parangkusumo",
    label: "Jelajahi",
    headline: "Alam, Budaya, Petualangan",
    body: "Dari sunrise di Borobudur sampai sandboarding di Gumuk Pasir. Setiap sudut punya cerita yang menunggu.",
  },
  {
    img: "/images/jeep-merapi.jpg",
    alt: "Jeep Merapi",
    label: "Nikmati",
    headline: "Tanpa Ribet, Tanpa Khawatir",
    body: "Pemandu lokal, armada nyaman, itinerary custom, harga ALL-IN. Urusan logistik biar kami yang atur.",
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Parallax zoom bg — smooth, terus bergerak
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Crossfade: ch0 keluar saat ch1 masuk (0→1/3), ch1 keluar saat ch2 masuk (1/3→2/3)
  const op0 = useTransform(scrollYProgress, [0, 1 / 3], [1, 0]);
  const op1 = useTransform(scrollYProgress, [0, 1 / 3, 2 / 3], [0, 1, 0]);
  const op2 = useTransform(scrollYProgress, [1 / 3, 2 / 3], [0, 1]);
  const chapterOpacity = [op0, op1, op2];

  // Scroll hint fade out setelah chapter 1
  const hintOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={ref} className="relative h-[350vh] bg-volcanic-900">
      {/* Sticky viewport = panggung cerita */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background images — crossfade + parallax */}
        {chapters.map((ch, i) => (
          <motion.div
            key={ch.img}
            style={{
              opacity: chapterOpacity[i],
              scale: bgScale,
              y: bgY,
            }}
            className="absolute inset-0"
          >
            <Image src={ch.img} alt={ch.alt} fill priority={i === 0} className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-volcanic-950/70 via-volcanic-900/40 to-volcanic-950" />
          </motion.div>
        ))}

        {/* Teks per chapter */}
        {chapters.map((ch, i) => (
          <motion.div
            key={ch.label}
            style={{ opacity: chapterOpacity[i] }}
            className="absolute inset-0 z-10 flex items-end px-6 pb-24 pt-40 lg:px-12"
          >
            <div className="mx-auto w-full max-w-[1400px]">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-gold-300">{ch.label}</p>
              <h1 className="max-w-4xl font-display text-5xl leading-[0.98] tracking-tight text-sand-50 md:text-7xl lg:text-[8rem]">
                {ch.headline}
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-sand-100/80">{ch.body}</p>
              {i === 0 && (
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button href="/tours-pricing" variant="onDark">
                    Lihat Paket Tour
                  </Button>
                  <Button href="/tourist-destination" variant="onDarkGhost">
                    Jelajah Destinasi
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Chapter progress indicator */}
        <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
          {chapters.map((_, i) => (
            <div key={i} className="relative h-10 w-px bg-white/20 overflow-hidden">
              <motion.div style={{ scaleY: chapterOpacity[i] }} className="absolute inset-0 origin-top bg-gold-400" />
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 right-6 z-20 hidden flex-col items-center gap-3 lg:flex"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-sand-100/50">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-14 w-px bg-gold-400/60"
          />
        </motion.div>
      </div>
    </section>
  );
}
