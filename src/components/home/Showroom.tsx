"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react";

const featureIcons: { match: string; icon: string }[] = [
  { match: "seat", icon: "mdi:car-seat" },
  { match: "ac", icon: "mdi:air-conditioner" },
  { match: "climate", icon: "mdi:air-conditioner" },
  { match: "luggage", icon: "mdi:bag-suitcase" },
  { match: "storage", icon: "mdi:bag-suitcase-outline" },
  { match: "trunk", icon: "mdi:bag-suitcase" },
  { match: "fuel", icon: "mdi:fuel" },
  { match: "economic", icon: "mdi:speedometer" },
  { match: "drive", icon: "mdi:speedometer" },
  { match: "safety", icon: "mdi:shield-car" },
  { match: "group", icon: "mdi:account-group" },
  { match: "family", icon: "mdi:account-group" },
  { match: "modern", icon: "mdi:car-connected" },
  { match: "access", icon: "mdi:car-door" },
  { match: "ride", icon: "mdi:car-cruise-control" },
  { match: "smooth", icon: "mdi:car-cruise-control" },
];

function iconFor(feature: string): string {
  const f = feature.toLowerCase();
  return featureIcons.find((x) => f.includes(x.match))?.icon ?? "mdi:car";
}

type Vehicle = {
  id: number;
  name: string;
  capacity: string;
  image: string;
  description: string;
  features: string[];
  priceLabel: string;
  sortOrder: number;
};

export default function Showroom({ vehicles }: { vehicles: Vehicle[] }) {
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const pages = Math.ceil(vehicles.length / perView);

  useEffect(() => {
    const onResize = () => {
      setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    };
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const clamped = Math.min(index, Math.max(0, pages - 1));
  const visible = vehicles.slice(clamped * perView, clamped * perView + perView);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {visible.map((v) => (
            <motion.div
              key={`${index}-${v.id}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col h-full overflow-hidden rounded-2xl bg-volcanic-800 border border-stone-800/60 hover:border-gold-400/30 transition-colors"
            >
              <div className="relative h-60 bg-volcanic-900/60 flex items-center justify-center p-8">
                <Image src={v.image} alt={v.name} width={280} height={160} className="object-contain h-40 w-auto" />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-2xl text-stone-50">{v.name}</h3>
                  <span className="text-sm text-stone-500">{v.capacity}</span>
                </div>
                {v.priceLabel && <p className="mb-3 text-sm font-semibold text-gold-400">{v.priceLabel}</p>}
                {v.description && <p className="mb-5 text-sm leading-relaxed text-stone-400">{v.description}</p>}
                {v.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {v.features.map((f) => (
                      <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-volcanic-900 border border-stone-800/60 text-stone-300">
                        <Icon icon={iconFor(f)} className="w-4 h-4 text-gold-400" />
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {pages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={clamped === 0}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-stone-700 text-stone-300 hover:border-gold-400 hover:text-gold-400 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <Icon icon="mdi:arrow-left" className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === clamped ? "w-8 bg-gold-400" : "w-1.5 bg-stone-700 hover:bg-stone-600"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((i) => Math.min(pages - 1, i + 1))}
            disabled={clamped >= pages - 1}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-stone-700 text-stone-300 hover:border-gold-400 hover:text-gold-400 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <Icon icon="mdi:arrow-right" className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}