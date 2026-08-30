"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import type { TouristSpot } from "@/lib/types/tourist_spots_data";

export default function TouristDestinations({ spots }: { spots: TouristSpot[] }) {
  const categories = useMemo(
    () => ["Semua", ...Array.from(new Set(spots.map((s) => s.category).filter(Boolean)))],
    [spots],
  );
  const [active, setActive] = useState("Semua");
  const filtered = active === "Semua" ? spots : spots.filter((s) => s.category === active);

  return (
    <section className="min-h-screen bg-paper pt-32 pb-24">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Destinasi</p>
          <h1 className="font-display text-4xl font-normal tracking-tight text-ink-900 md:text-6xl">Jelajahi Jogja</h1>
          <p className="mt-4 text-lg text-ink-500">Candi megah, pantai tersembunyi, dan spot foto terbaik.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                active === cat
                  ? "bg-gold-500 border-gold-500 text-volcanic-900"
                  : "bg-white border-sand-200 text-ink-500 hover:border-gold-400/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((spot, i) => (
            <motion.div
              layout
              key={spot.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="group overflow-hidden rounded-2xl bg-white border border-sand-200 hover:border-gold-400/30 transition-colors"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={spot.imageUrl}
                  alt={spot.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {spot.category && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-ink-900/80 text-paper">
                    {spot.category}
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1.5 mb-2 text-sm text-ink-500">
                  <Icon icon="mdi:map-marker" className="w-4 h-4 text-gold-600" />
                  {spot.location}
                </div>
                <h2 className="mb-2 font-display text-2xl text-ink-900 group-hover:text-gold-600 transition-colors">
                  {spot.name}
                </h2>
                <p className="text-sm leading-relaxed text-ink-500 line-clamp-3">{spot.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
