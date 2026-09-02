"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/Button";

const ease = [0.22, 1, 0.36, 1] as const;

const chapters = [
  {
    img: "/images/borobudur.jpg",
    alt: "Borobudur sunrise",
    label: "Datanglah",
    headline: "Temukan Jogja yang Sebenarnya",
    body: "Bukan cuma candi dan Malioboro. Jogja punya hidden gems, warung makan yang cuma anak lokal tau, dan jalur yang gak ada di Google Maps.",
  },
  {
    img: "/images/gumuk-pasir.jpg",
    alt: "Gumuk Pasir Parangkusumo",
    label: "Jelajahi",
    headline: "Alam, Budaya, Petualangan",
    body: "Dari sunrise di Borobudur hingga sandboarding di Gumuk Pasir. Setiap sudut Jogja punya cerita yang menunggu kamu temukan.",
  },
  {
    img: "/images/jeep-merapi.jpg",
    alt: "Jeep Merapi",
    label: "Nikmati",
    headline: "Tanpa Ribet, Tanpa Khawatir",
    body: "Pemandu lokal, armada nyaman, itinerary custom, dan harga ALL-IN. Yang ada cuma pengalaman—urusan logistik biar kami yang atur.",
  },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 });
  };

  return (
    <section ref={ref} onMouseMove={handleMouse} className="relative bg-volcanic-900">
      {/* Sticky hero — parallax room 40vh */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image with parallax + mouse tilt */}
        <motion.div style={{ y: imgY, scale }} className="absolute inset-0">
          <Image src={chapters[0].img} alt="" fill priority className="object-cover opacity-50" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-volcanic-950/70 via-volcanic-900/30 to-volcanic-950" />
        </motion.div>

        {/* Mouse-driven subtle transform */}
        <motion.div
          style={{ x: mouse.x * -16, y: mouse.y * -16, opacity: fade }}
          className="relative z-10 flex h-full items-end px-6 pb-24 pt-40 lg:px-12"
        >
          <div className="mx-auto w-full max-w-[1400px]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-gold-300"
            >
              {chapters[0].label}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="max-w-4xl font-display text-6xl leading-[0.95] tracking-tight text-sand-50 md:text-8xl lg:text-[9rem]"
            >
              {chapters[0].headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="mt-8 max-w-lg text-lg leading-relaxed text-sand-100/80"
            >
              {chapters[0].body}
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

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: fade }}
          className="absolute bottom-10 right-6 z-10 hidden lg:flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-sand-100/50">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-14 w-px bg-gold-400/60"
          />
        </motion.div>
      </div>

      {/* ===== Story chapters ===== */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-48 lg:px-12">
        {chapters.slice(1).map((ch, i) => (
          <motion.div
            key={ch.label}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 0.8, ease }}
            className="mt-48 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center"
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-gold-400">{ch.label}</p>
              <h2 className="font-display text-4xl leading-tight text-sand-50 md:text-6xl">{ch.headline}</h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-sand-100/70">{ch.body}</p>
            </div>
            <div className={`relative h-80 overflow-hidden rounded-2xl lg:h-96 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <Image src={ch.img} alt={ch.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
