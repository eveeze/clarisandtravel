"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react";
import type { GalleryItem } from "@/lib/data";

export default function GalleryScreen({ items }: { items: GalleryItem[] }) {
  const categories = useMemo(
    () => ["Semua", ...Array.from(new Set(items.map((i) => i.category)))],
    [items],
  );
  const [active, setActive] = useState("Semua");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = active === "Semua" ? items : items.filter((i) => i.category === active);

  return (
    <section className="min-h-screen bg-ivory pt-28 pb-20">
      <div className="container px-4 mx-auto sm:px-6">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teak-500">
            Galeri
          </p>
          <h1 className="font-display text-4xl font-bold text-ink-900 md:text-5xl">
            Momen di Jogja
          </h1>
          <p className="mt-3 text-lg text-ink-500">
            Potret perjalanan dan destinasi favorit bersama kami.
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

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-ink-500">Belum ada foto.</p>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <motion.button
                layout
                key={item.id}
                onClick={() => setLightbox(item)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-display text-lg font-semibold text-ivory">
                    {item.title}
                  </p>
                  <p className="text-xs text-sand-200">
                    {item.category} · {item.location}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-forest-950/95 p-4"
          >
            <button
              className="absolute top-5 right-5 p-2 rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20"
              aria-label="Tutup"
            >
              <Icon icon="mdi:close" width={24} height={24} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image src={lightbox.image} alt={lightbox.title} fill className="object-cover" />
              </div>
              <div className="mt-4 text-center text-ivory">
                <p className="font-display text-xl font-semibold">{lightbox.title}</p>
                <p className="text-sm text-sand-200">
                  {lightbox.category} · {lightbox.location}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
