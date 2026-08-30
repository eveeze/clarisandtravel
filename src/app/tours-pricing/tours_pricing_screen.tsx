"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import type { TourPackage } from "@/lib/types/tour_package";
import Image from "next/image";

export default function ToursPricingScreen({ packages }: { packages: TourPackage[] }) {
  const router = useRouter();
  const [type, setType] = useState<"local" | "international">("local");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return packages
      .filter((p) => p.touristType === type)
      .filter((p) => (q ? p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) : true));
  }, [packages, type, query]);

  const featured = filtered.find((p) => p.isPopular) ?? filtered[0];
  const rest = featured ? filtered.filter((p) => p.id !== featured.id) : filtered;

  const go = (slug: string) => router.push(`/tours-pricing/${slug}`);

  return (
    <section className="min-h-screen bg-paper pt-28 pb-28">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        {/* Header */}
        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Paket Tour</p>
            <h1 className="font-display text-5xl font-normal tracking-tight text-ink-900 md:text-7xl">
              Pilih
              <span className="block italic text-gold-600">Petualanganmu</span>
            </h1>
          </div>
          <p className="lg:text-right text-ink-500 max-w-sm lg:ml-auto">
            Harga transparan, armada bisa dipilih, itinerary custom sesuai ritme liburanmu.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex p-1 rounded-full bg-white border border-sand-200">
            {(["local", "international"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                  type === t ? "bg-gold-500 text-ink-900" : "text-ink-500 hover:text-ink-700"
                }`}
              >
                {t === "local" ? "Wisatawan Lokal" : "Wisatawan Asing"}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari paket..."
              className="w-full px-4 py-3 pl-11 rounded-full bg-white border border-sand-200 text-ink-700 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
            />
            <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-ink-400">Tidak ada paket yang cocok.</p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={type + query}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Featured package */}
              {featured && (
                <button
                  onClick={() => go(featured.slug)}
                  className="group mb-20 grid grid-cols-1 overflow-hidden rounded-3xl border border-sand-200 text-left lg:grid-cols-2"
                >
                  <div className="relative h-72 lg:h-full min-h-[20rem] overflow-hidden">
                    <Image
                      src={featured.thumbnail}
                      alt={featured.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-5 left-5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-gold-500 text-ink-900">
                      Pilihan Populer
                    </span>
                  </div>
                  <div className="flex flex-col justify-between p-8 bg-white lg:p-12">
                    <div>
                      <h2 className="mb-4 font-display text-3xl text-ink-900 md:text-5xl">{featured.name}</h2>
                      <p className="mb-6 text-ink-500">{featured.description}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {featured.features.slice(0, 4).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-ink-600">
                            <Icon icon="mdi:check-circle" className="w-5 h-5 text-gold-600" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-ink-400">Mulai dari</p>
                        <p className="font-display text-4xl text-gold-600 md:text-5xl">
                          Rp {featured.basePrice.toLocaleString("id-ID")}
                          <span className="ml-2 text-lg font-body text-ink-400">/{featured.duration}</span>
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-gold-500 text-ink-900 group-hover:bg-gold-400 transition-colors">
                        Lihat Detail
                        <Icon
                          icon="mdi:arrow-right"
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </button>
              )}

              {/* Editorial list */}
              <div className="divide-y divide-stone-800/60 border-y border-sand-200">
                {rest.map((pkg, i) => (
                  <button
                    key={pkg.id}
                    onClick={() => go(pkg.slug)}
                    className="group grid grid-cols-1 gap-2 py-8 text-left sm:grid-cols-12 sm:items-center sm:gap-6 transition-colors hover:bg-sand-100/60 px-2 -mx-2 rounded-xl"
                  >
                    <span className="font-display text-3xl text-ink-500 transition-colors group-hover:text-gold-600 sm:col-span-1">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl text-ink-900 transition-colors group-hover:text-gold-600 sm:col-span-6 md:text-3xl">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-3 sm:col-span-3 sm:justify-end">
                      <span className="text-sm text-ink-400">{pkg.duration}</span>
                      <span className="font-display text-2xl text-gold-600">
                        Rp {pkg.basePrice.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="sm:col-span-2 sm:flex sm:justify-end">
                      <Icon
                        icon="mdi:arrow-right"
                        className="w-6 h-6 text-ink-400 transition-all duration-300 group-hover:text-gold-600 group-hover:translate-x-2"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
