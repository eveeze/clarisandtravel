"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { TourPackage, VehicleType } from "@/lib/types/tour_package";
import BookingForm from "@/components/BookingForm";
import Image from "next/image";

export default function TourDetailClient({ tour }: { tour: TourPackage }) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);

  return (
    <main className="bg-ivory pt-24 pb-20">
      <div className="container px-4 mx-auto sm:px-6">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teak-500">
            {tour.touristType === "local" ? "Wisatawan Lokal" : "Wisatawan Asing"}
          </p>
          <h1 className="mb-3 font-display text-4xl font-bold text-ink-900 md:text-5xl">
            {tour.name}
          </h1>
          <p className="text-lg text-ink-500">{tour.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-10 md:grid-cols-3">
          {tour.images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden relative h-64 rounded-2xl"
            >
              <Image
                src={image}
                alt={`${tour.name} gambar ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink-900">
            Pilih Armada
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tour.vehicles.map((vehicle) => (
              <motion.button
                key={vehicle.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedVehicle(vehicle)}
                className={`text-left p-4 rounded-2xl border transition-colors ${
                  selectedVehicle?.id === vehicle.id
                    ? "bg-forest-800 border-forest-800 text-ivory"
                    : "bg-sand-50 border-sand-200 hover:border-teak-400"
                }`}
              >
                <div className="overflow-hidden relative mb-3 h-28 rounded-xl">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-semibold">{vehicle.name}</h3>
                <p className={`text-sm ${selectedVehicle?.id === vehicle.id ? "text-sand-300" : "text-ink-500"}`}>
                  {vehicle.capacity}
                </p>
                {vehicle.priceIncrement > 0 && (
                  <p className={`text-sm font-medium ${selectedVehicle?.id === vehicle.id ? "text-teak-400" : "text-teak-600"}`}>
                    +Rp {vehicle.priceIncrement.toLocaleString("id-ID")}
                  </p>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink-900">
            Itinerary
          </h2>
          <div className="space-y-4">
            {tour.itinerary.map((day) => (
              <div key={day.day} className="p-6 rounded-2xl bg-sand-50 border border-sand-200">
                <h3 className="mb-4 font-display text-xl font-semibold text-ink-900">
                  Hari {day.day}: {day.title}
                </h3>
                <div className="space-y-4">
                  {day.destinations.map((dest, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-28 text-sm font-medium text-teak-600">
                        {dest.time}
                      </div>
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

        <div className="p-6 rounded-2xl bg-forest-950 text-ivory md:p-8">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-2xl font-bold">Booking</h2>
            <span className="font-display text-3xl font-bold text-teak-400">
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
