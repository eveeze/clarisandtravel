"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import type { TourPackage, VehicleType } from "@/lib/types/tour_package";
import type { PackageReview } from "@/lib/data";
import BookingForm from "@/components/BookingForm";
import Image from "next/image";

type TourDetailClientProps = {
  tour: TourPackage;
  reviews: PackageReview[];
  summary: { count: number; average: number };
};

function Stars({ rating, size = "text-sm" }: { rating: number; size?: string }) {
  return (
    <span className={`${size} tracking-tight text-gold-400`} aria-label={`Rating ${rating} dari 5`}>
      {"★".repeat(Math.round(rating))}
      <span className="text-sand-300">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export default function TourDetailClient({ tour, reviews, summary }: TourDetailClientProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);

  const price = tour.basePrice + (selectedVehicle?.priceIncrement ?? 0);
  const heroImage = tour.images[0] ?? tour.thumbnail;

  return (
    <main className="bg-paper">
      {/* ============ HERO — full-bleed, editorial ============ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={heroImage} alt={tour.name} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-volcanic-950 via-volcanic-900/70 to-volcanic-900/30" />
        </div>

        <div className="flex min-h-[78vh] items-end px-6 pb-16 pt-40 lg:px-10">
          <div className="mx-auto w-full max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] rounded-full bg-gold-500 text-volcanic-950">
                  {tour.touristType === "local" ? "Wisatawan Lokal" : "Wisatawan Asing"}
                </span>
                {tour.isPopular && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] rounded-full bg-white/15 text-sand-50 backdrop-blur-sm">
                    <Icon icon="solar:fire-bold" className="w-3.5 h-3.5 text-gold-400" />
                    Paling Laris
                  </span>
                )}
                {summary.count > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-white/15 text-sand-50 backdrop-blur-sm">
                    <Stars rating={summary.average} size="text-xs" />
                    {summary.average.toLocaleString("id-ID")} · {summary.count} review
                  </span>
                )}
              </div>

              <h1 className="max-w-3xl font-display text-5xl font-normal leading-[1.05] tracking-tight text-sand-50 md:text-7xl">
                {tour.name}
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand-100/90">{tour.description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-sand-100/90">
                <span className="inline-flex items-center gap-2">
                  <Icon icon="solar:clock-circle-bold" className="w-5 h-5 text-gold-400" />
                  {tour.duration}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Icon icon="solar:user-rounded-bold" className="w-5 h-5 text-gold-400" />
                  {tour.features.length}+ fasilitas termasuk
                </span>
                <span className="inline-flex items-center gap-2 font-medium text-gold-300">
                  <Icon icon="solar:wallet-bold" className="w-5 h-5" />
                  Mulai {formatRp(tour.basePrice)}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ BODY — grid: konten kiri, booking sticky kanan ============ */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 lg:grid-cols-[1fr_400px]">
          {/* ---- kolom kiri ---- */}
          <div className="space-y-16">
            {/* Trust strip */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { icon: "solar:calendar-check-bold", t: "Bisa Reschedule", d: "Gratis sampai 48 jam sebelum H-1" },
                { icon: "solar:shield-check-bold", t: "Refund 100%", d: "Kalau dibatalkan dari pihak kami" },
                { icon: "solar:wallet-check-bold", t: "Harga ALL-IN", d: "Sopir, bensin, parkir & retribusi" },
                { icon: "solar:user-id-bold", t: "Pemandu Lokal", d: "Hafal jalur sepi & spot terbaik" },
              ].map((f) => (
                <div key={f.t} className="rounded-2xl border border-sand-200 bg-white p-4 shadow-card">
                  <Icon icon={f.icon} className="mb-2 h-6 w-6 text-gold-500" />
                  <p className="text-sm font-semibold text-ink-900">{f.t}</p>
                  <p className="mt-0.5 text-xs leading-snug text-ink-500">{f.d}</p>
                </div>
              ))}
            </div>

            {/* Gallery */}
            <div>
              <Eyebrow index="01" label="Galeri" />
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {tour.images.map((image, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-2xl ${i === 0 ? "sm:col-span-2 h-80 sm:h-96" : "h-56"}`}
                  >
                    <Image
                      src={image}
                      alt={`${tour.name} ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Armada */}
            <div>
              <Eyebrow index="02" label="Pilih Armada" />
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {tour.vehicles.map((vehicle) => (
                  <motion.button
                    key={vehicle.id}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={`relative overflow-hidden rounded-2xl border p-5 text-left transition-colors ${
                      selectedVehicle?.id === vehicle.id
                        ? "border-gold-500 bg-gold-500/5 shadow-gold"
                        : "border-sand-200 bg-white shadow-card hover:border-gold-400/50"
                    }`}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="relative h-20 w-full overflow-hidden rounded-xl bg-sand-50">
                        <Image src={vehicle.image} alt={vehicle.name} fill className="object-contain p-2" />
                      </div>
                      <span
                        className={`ml-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border ${
                          selectedVehicle?.id === vehicle.id
                            ? "border-gold-500 bg-gold-500 text-volcanic-950"
                            : "border-sand-300 text-transparent"
                        }`}
                      >
                        <Icon icon="solar:check-bold" className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <h3 className="font-semibold text-ink-900">{vehicle.name}</h3>
                    <p className="text-sm text-ink-500">{vehicle.capacity}</p>
                    <p className="mt-1 text-sm font-medium text-gold-600">
                      {vehicle.priceIncrement > 0 ? `+${formatRp(vehicle.priceIncrement)}` : "Harga dasar"}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Itinerary — signature timeline */}
            <div>
              <Eyebrow index="03" label="Itinerary Perjalanan" />
              <div className="relative mt-8">
                {/* garis vertikal */}
                <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-gold-500/60 via-sand-300 to-transparent" />

                <div className="space-y-8">
                  {tour.itinerary.map((day) => (
                    <div key={day.day} className="relative pl-16">
                      <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/40 bg-white shadow-card">
                        <span className="font-display text-xl text-gold-600">{String(day.day).padStart(2, "0")}</span>
                      </div>

                      <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-card">
                        <h3 className="mb-4 font-display text-2xl text-ink-900">{day.title}</h3>
                        <div className="space-y-4">
                          {day.destinations.map((dest, index) => (
                            <div key={index} className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-20 pt-0.5 text-sm font-semibold text-gold-600">
                                {dest.time}
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-semibold text-ink-900">{dest.name}</h4>
                                <p className="text-sm leading-relaxed text-ink-500">{dest.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <Eyebrow index="04" label="Apa Kata Wisatawan" />
              {reviews.length === 0 ? (
                <p className="mt-6 text-ink-500">Belum ada review untuk paket ini. Jadilah yang pertama!</p>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {reviews.map((r) => (
                    <div key={r.id} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-card">
                      <div className="mb-2 flex items-center justify-between">
                        <Stars rating={r.rating} size="text-base" />
                        <span className="text-xs text-ink-400">
                          {r.createdAt.toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="font-semibold text-ink-900">{r.customerName}</p>
                      <p className="mt-2 leading-relaxed text-ink-500">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ---- kolom kanan: booking sticky ---- */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-sand-200 bg-white p-7 shadow-cardHover">
              <div className="mb-6 border-b border-sand-200 pb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">Total</p>
                <p className="mt-1 font-display text-4xl text-gold-600">{formatRp(price)}</p>
                <p className="mt-1 text-sm text-ink-500">
                  {selectedVehicle
                    ? `${selectedVehicle.name} · ${selectedVehicle.capacity}`
                    : "Pilih armada di samping"}
                </p>
              </div>
              <BookingForm
                packageSlug={tour.slug}
                packageName={tour.name}
                vehicleOptions={tour.vehicles.map((v) => ({ name: v.name }))}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-2xl text-gold-500">{index}</span>
      <span className="h-px w-10 bg-gold-400/50" />
      <h2 className="font-display text-3xl text-ink-900">{label}</h2>
    </div>
  );
}
