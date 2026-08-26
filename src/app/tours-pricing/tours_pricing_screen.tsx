"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import type { TourPackage } from "@/lib/types/tour_package";
import Image from "next/image";

export default function ToursPricingScreen({
  packages,
}: {
  packages: TourPackage[];
}) {
  const router = useRouter();
  const [activeTourist, setActiveTourist] = useState<"local" | "international">("local");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return packages
      .filter((pkg) => pkg.touristType === activeTourist)
      .filter((pkg) =>
        q ? pkg.name.toLowerCase().includes(q) || pkg.description.toLowerCase().includes(q) : true,
      );
  }, [packages, activeTourist, query]);

  return (
    <section className="min-h-screen bg-ivory pt-28 pb-20">
      <div className="container px-4 mx-auto sm:px-6">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teak-500"
          >
            Paket Tour
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 font-display text-4xl font-bold text-ink-900 md:text-5xl"
          >
            Pilih Pengalaman Jogja Anda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-ink-500"
          >
            Harga transparan, armada bisa dipilih, itinerary custom.
          </motion.p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="inline-flex p-1 rounded-full bg-sand-100 border border-sand-200">
            {(["local", "international"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveTourist(type)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeTourist === type
                    ? "bg-forest-800 text-ivory"
                    : "text-ink-500 hover:text-ink-900"
                }`}
              >
                {type === "local" ? "Wisatawan Lokal" : "Wisatawan Asing"}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari paket tour..."
              className="w-full px-4 py-3 pl-11 rounded-xl bg-sand-50 border border-sand-200 text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-teak-500"
            />
            <Icon
              icon="mdi:magnify"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-ink-500">
            Tidak ada paket yang cocok dengan pencarian.
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                onClick={() => router.push(`/tours-pricing/${pkg.slug}`)}
                className={`group cursor-pointer overflow-hidden rounded-2xl bg-sand-50 border border-sand-200 shadow-card hover:shadow-cardHover transition-shadow ${
                  pkg.isPopular ? "ring-2 ring-teak-500/40" : ""
                }`}
              >
                <div className="overflow-hidden relative h-52">
                  <Image
                    src={pkg.thumbnail}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {pkg.isPopular && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-teak-500 text-ivory">
                      Populer
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="mb-1 font-display text-xl font-semibold text-ink-900">
                    {pkg.name}
                  </h3>
                  <p className="mb-4 text-sm text-ink-500 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="mb-4">
                    <span className="font-display text-2xl font-bold text-teak-600">
                      Rp {pkg.basePrice.toLocaleString("id-ID")}
                    </span>
                    <span className="ml-1 text-sm text-ink-400">/{pkg.duration}</span>
                  </div>

                  <ul className="mb-5 space-y-1.5">
                    {pkg.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-ink-500">
                        <Icon icon="mdi:check-circle" className="w-4 h-4 text-teak-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-1">
                      {pkg.vehicles.slice(0, 3).map((v) => (
                        <span
                          key={v.id}
                          title={v.name}
                          className="flex justify-center items-center w-7 h-7 rounded-full bg-sand-100 border border-sand-200"
                        >
                          <Icon icon="mdi:car" className="w-3.5 h-3.5 text-teak-600" />
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-teak-500 group-hover:underline">
                      Lihat Detail →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
