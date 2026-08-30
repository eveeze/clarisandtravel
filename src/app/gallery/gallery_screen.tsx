"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react";
import type { GalleryItem } from "@/lib/data";

export default function GalleryScreen({ items }: { items: GalleryItem[] }) {
  const categories = useMemo(() => ["Semua", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const [active, setActive] = useState("Semua");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const filtered = active === "Semua" ? items : items.filter((i) => i.category === active);

  return (
    <section className="min-h-screen bg-paper pt-32 pb-24">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Galeri</p>
          <h1 className="font-display text-4xl font-normal tracking-tight text-ink-900 md:text-6xl">Momen di Jogja</h1>
          <p className="mt-4 text-lg text-ink-500">Potret perjalanan dan destinasi favorit bersama kami.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                active === cat
                  ? "bg-gold-500 border-gold-500 text-ink-900"
                  : "bg-white border-sand-200 text-ink-500 hover:border-gold-400/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-ink-400">Belum ada foto.</p>
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
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/40 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="font-display text-xl text-ink-900">{item.title}</p>
                  <p className="text-xs text-ink-500">
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
            className="fixed inset-0 z-[70] flex items-center justify-center bg-volcanic-950/95 p-4"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-sand-100 text-ink-900 hover:bg-sand-200"
              aria-label="Tutup"
            >
              <Icon icon="mdi:close" width={24} height={24} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image src={lightbox.image} alt={lightbox.title} fill className="object-cover" />
              </div>
              <div className="mt-4 text-center">
                <p className="font-display text-xl text-ink-900">{lightbox.title}</p>
                <p className="text-sm text-ink-500">
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
