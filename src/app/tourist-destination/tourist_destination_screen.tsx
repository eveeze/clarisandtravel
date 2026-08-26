"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import type { TouristSpot } from "@/lib/types/tourist_spots_data";

export default function TouristDestinations({
  spots,
}: {
  spots: TouristSpot[];
}) {
  const categories = useMemo(
    () => ["Semua", ...Array.from(new Set(spots.map((s) => s.category).filter(Boolean)))],
    [spots],
  );
  const [active, setActive] = useState("Semua");

  const filtered = active === "Semua" ? spots : spots.filter((s) => s.category === active);

  return (
    <section className="min-h-screen bg-ivory pt-28 pb-20">
      <div className="container px-4 mx-auto sm:px-6">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teak-500">
            Destinasi
          </p>
          <h1 className="font-display text-4xl font-bold text-ink-900 md:text-5xl">
            Jelajahi Jogja
          </h1>
          <p className="mt-3 text-lg text-ink-500">
            Candi megah, pantai tersembunyi, dan spot foto terbaik di Yogyakarta.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                active === cat
                  ? "bg-forest-800 border-forest-800 text-ivory"
                  : "bg-sand-50 border-sand-200 text-ink-500 hover:border-teak-400"
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
              className="group overflow-hidden rounded-2xl bg-sand-50 border border-sand-200 shadow-card hover:shadow-cardHover transition-shadow"
            >
              <div className="overflow-hidden relative h-56">
                <Image
                  src={spot.imageUrl}
                  alt={spot.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {spot.category && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-forest-950/80 text-ivory">
                    {spot.category}
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1.5 mb-1 text-sm text-ink-500">
                  <Icon icon="mdi:map-marker" className="w-4 h-4 text-teak-500" />
                  {spot.location}
                </div>
                <h2 className="mb-2 font-display text-xl font-semibold text-ink-900">
                  {spot.name}
                </h2>
                <p className="text-sm leading-relaxed text-ink-500 line-clamp-3">
                  {spot.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
