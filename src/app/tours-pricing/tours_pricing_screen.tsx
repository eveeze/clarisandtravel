"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { tourPackages } from "@/lib/types/tour_package";
import Image from "next/image";

export default function ToursPricingScreen() {
  const router = useRouter();
  const [activeTourist, setActiveTourist] = useState<"local" | "international">(
    "local",
  );

  const handlePackageClick = (slug: string) => {
    router.push(`/tours-pricing/${slug}`);
  };

  const renderTourPackage = (pkg: (typeof tourPackages)[0]) => (
    <motion.div
      key={pkg.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`
        bg-white/10 backdrop-blur-md rounded-xl overflow-hidden
        hover:border-primary-500 transition-all duration-300 cursor-pointer
        ${pkg.isPopular ? "ring-2 ring-accent-500/50" : ""}
      `}
      onClick={() => handlePackageClick(pkg.slug)}
    >
      {/* Package Image */}
      <div className="relative w-full h-48">
        <Image
          src={pkg.thumbnail}
          alt={pkg.name}
          fill
          className="object-cover"
        />
        {pkg.isPopular && (
          <div className="absolute top-4 right-4">
            <span className="py-1 px-3 text-xs text-white rounded-full bg-accent-600/90 backdrop-blur-sm">
              Most Popular
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-white">{pkg.name}</h3>

        <p className="mb-4 text-sm text-primary-200 line-clamp-2">
          {pkg.description}
        </p>

        <div className="mb-4 text-white">
          <span className="text-3xl font-bold">
            Rp {pkg.basePrice.toLocaleString()}
          </span>
          <span className="ml-2 text-sm opacity-75">/ {pkg.duration}</span>
        </div>

        {/* Features */}
        <ul className="mb-6 space-y-2">
          {pkg.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-sm text-primary-200"
            >
              <Icon
                icon="mdi:check-circle"
                className="flex-shrink-0 mr-2 text-accent-500"
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* Vehicle Preview */}
        <div className="mb-6">
          <p className="mb-2 text-sm text-primary-200">Available Vehicles:</p>
          <div className="flex space-x-2">
            {pkg.vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex justify-center items-center w-8 h-8 rounded-full bg-white/10"
                title={vehicle.name}
              >
                <Icon icon="mdi:car" className="text-accent-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary Preview */}
        <div className="mb-6">
          <p className="mb-2 text-sm text-primary-200">Tour Duration:</p>
          <div className="flex space-x-2">
            {pkg.itinerary.map((day) => (
              <div
                key={day.day}
                className="py-1 px-3 text-xs rounded-full bg-white/10 text-primary-200"
              >
                Day {day.day}
              </div>
            ))}
          </div>
        </div>

        <button
          className="flex justify-center items-center py-3 space-x-2 w-full text-white rounded-lg transition-colors bg-accent-600 hover:bg-accent-700"
          onClick={(e) => {
            e.stopPropagation();
            handlePackageClick(pkg.slug);
          }}
        >
          <span>View Details</span>
          <Icon icon="mdi:arrow-right" className="text-lg" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <section className="py-12 px-4 mt-16 min-h-screen bg-gradient-to-b font-poppins from-primary-900 to-primary-800">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center text-white"
        >
          <h1 className="mb-4 text-4xl font-bold">
            Claris & City Tours Packages
          </h1>
          <p className="text-primary-200">
            Choose your perfect Jogja experience
          </p>
        </motion.div>

        {/* Tourist Type Selector */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex p-1 rounded-full bg-primary-800/50 backdrop-blur-sm"
          >
            {["local", "international"].map((type) => (
              <button
                key={type}
                onClick={() =>
                  setActiveTourist(type as "local" | "international")
                }
                className={`
                  px-6 py-2 rounded-full transition-all duration-300
                  ${
                    activeTourist === type
                      ? "bg-accent-600 text-white"
                      : "text-primary-200 hover:bg-primary-700/50"
                  }
                `}
              >
                {type === "local" ? "Local Tourist" : "International Tourist"}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search tours..."
              className="py-2 px-4 w-full text-white rounded-lg border focus:outline-none bg-white/10 border-primary-600/30 placeholder-primary-200 focus:border-accent-500"
            />
            <Icon
              icon="mdi:search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-200"
            />
          </div>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {tourPackages
            .filter((pkg) => pkg.touristType === activeTourist)
            .map(renderTourPackage)}
        </motion.div>
      </div>
    </section>
  );
}
