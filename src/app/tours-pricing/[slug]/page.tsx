"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  TourPackage,
  VehicleType,
  tourPackages,
} from "@/lib/types/tour_package";
import Image from "next/image";

export default function TourPackageDetail() {
  const params = useParams();
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(
    null,
  );

  const tour = tourPackages.find((t) => t.slug === params.slug) as TourPackage;

  if (!tour) return <div>Tour not found</div>;

  const calculateTotalPrice = () => {
    return tour.basePrice + (selectedVehicle?.priceIncrement || 0);
  };

  return (
    <div className="mt-20 min-h-screen text-white bg-gradient-to-b from-primary-900 to-primary-800">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container py-8 px-4 mx-auto"
      >
        {/* Header Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="mb-4 text-4xl font-bold">{tour.name}</h1>
          <p className="text-primary-200">{tour.description}</p>
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3"
        >
          {tour.images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden relative h-64 rounded-lg"
            >
              <Image
                src={image}
                alt={`${tour.name} image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>

        {/* Vehicle Selection */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-2xl font-bold">Select Your Vehicle</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {tour.vehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                whileHover={{ scale: 1.02 }}
                className={`
                  p-4 rounded-lg cursor-pointer transition-all
                  ${
                    selectedVehicle?.id === vehicle.id
                      ? "bg-accent-600"
                      : "bg-white/10"
                  }
                `}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                <div className="overflow-hidden relative mb-4 h-40 rounded-lg">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mb-2 font-bold">{vehicle.name}</h3>
                <p className="text-sm text-primary-200">{vehicle.capacity}</p>
                <p className="text-sm text-accent-400">
                  Additional cost: Rp {vehicle.priceIncrement.toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Itinerary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-2xl font-bold">Tour Itinerary</h2>
          <div className="space-y-6">
            {tour.itinerary.map((day) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 rounded-lg bg-white/10"
              >
                <h3 className="mb-4 text-xl font-bold">
                  Day {day.day}: {day.title}
                </h3>
                <div className="space-y-4">
                  {day.destinations.map((dest, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-24 text-accent-400">
                        {dest.time}
                      </div>
                      <div>
                        <h4 className="font-bold">{dest.name}</h4>
                        <p className="text-primary-200">{dest.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Booking Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-lg bg-white/10"
        >
          <h2 className="mb-4 text-2xl font-bold">Booking Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>Rp {tour.basePrice.toLocaleString()}</span>
            </div>
            {selectedVehicle && (
              <div className="flex justify-between">
                <span>Vehicle Upgrade ({selectedVehicle.name})</span>
                <span>
                  Rp {selectedVehicle.priceIncrement.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold">
              <span>Total Price</span>
              <span>Rp {calculateTotalPrice().toLocaleString()}</span>
            </div>
            <button className="py-3 w-full rounded-lg transition-colors bg-accent-600 hover:bg-accent-700">
              Book Now
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
