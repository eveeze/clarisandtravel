"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { TourPackage, VehicleType } from "@/lib/types/tour_package";
import BookingForm from "@/components/BookingForm";
import Image from "next/image";

export default function TourDetailClient({ tour }: { tour: TourPackage }) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);

  return (
    <main className="bg-paper pt-28 pb-24">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">
            {tour.touristType === "local" ? "Wisatawan Lokal" : "Wisatawan Asing"}
          </p>
          <h1 className="mb-4 font-display text-4xl font-normal tracking-tight text-ink-900 md:text-6xl">
            {tour.name}
          </h1>
          <p className="text-lg text-ink-500">{tour.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-14 md:grid-cols-3">
          {tour.images.map((image, index) => (
            <div key={index} className="relative h-64 overflow-hidden rounded-2xl">
              <Image src={image} alt={`${tour.name} ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mb-14">
          <h2 className="mb-6 font-display text-3xl text-ink-900">Pilih Armada</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tour.vehicles.map((vehicle) => (
              <motion.button
                key={vehicle.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedVehicle(vehicle)}
                className={`text-left p-4 rounded-2xl border transition-colors ${
                  selectedVehicle?.id === vehicle.id
                    ? "bg-gold-500 border-gold-500 text-volcanic-900"
                    : "bg-white border-sand-200 hover:border-gold-400/40"
                }`}
              >
                <div className="relative mb-3 h-24 overflow-hidden rounded-xl">
                  <Image src={vehicle.image} alt={vehicle.name} fill className="object-contain" />
                </div>
                <h3 className="font-semibold">{vehicle.name}</h3>
                <p
                  className={`text-sm ${selectedVehicle?.id === vehicle.id ? "text-volcanic-900/70" : "text-ink-500"}`}
                >
                  {vehicle.capacity}
                </p>
                {vehicle.priceIncrement > 0 && (
                  <p
                    className={`text-sm font-medium ${selectedVehicle?.id === vehicle.id ? "text-volcanic-900" : "text-gold-600"}`}
                  >
                    +Rp {vehicle.priceIncrement.toLocaleString("id-ID")}
                  </p>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mb-14">
          <h2 className="mb-6 font-display text-3xl text-ink-900">Itinerary</h2>
          <div className="space-y-4">
            {tour.itinerary.map((day) => (
              <div key={day.day} className="p-6 rounded-2xl bg-white border border-sand-200">
                <h3 className="mb-4 font-display text-2xl text-ink-900">
                  <span className="ed-num mr-3">{String(day.day).padStart(2, "0")}</span>
                  {day.title}
                </h3>
                <div className="space-y-4">
                  {day.destinations.map((dest, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-28 text-sm font-medium text-gold-600">{dest.time}</div>
                      <div>
                        <h4 className="font-semibold text-ink-900">{dest.name}</h4>
                        <p className="text-sm text-ink-500">{dest.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-paper border border-sand-200 md:p-10">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-3xl text-ink-900">Booking</h2>
            <span className="font-display text-4xl text-gold-600">
              Rp {(tour.basePrice + (selectedVehicle?.priceIncrement ?? 0)).toLocaleString("id-ID")}
            </span>
          </div>
          <BookingForm
            packageSlug={tour.slug}
            packageName={tour.name}
            vehicleOptions={tour.vehicles.map((v) => ({ name: v.name }))}
          />
        </div>
      </div>
    </main>
  );
}
